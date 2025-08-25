import { addMinutes } from "date-fns";
import pool from "../db.js";
import { getNowTimestamp, toDateTimeTZ } from "../utils/timeslotUtils.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";
import { defaultError } from "../error.js";

export class SessionService extends BaseService {
  constructor(db) {
    super(db);
  }

  async getCenterSessions(center_id) {
    return this.findAllByField(Tables.Sessions, "center_id", center_id);
  }

  async getSessionSubscriptions(sessionId) {
    const sql = `SELECT s.id, s.status, c.email AS customer_email, s.cancelled_at, s.cancelled_by  FROM ${Tables.Subscriptions} s
      INNER JOIN ${Tables.Customers} c ON s.customer_id = c.id
      WHERE s.session_id = $1
    `;
    const subs = await this.db.query(sql, [sessionId]);
    return subs.rows;
  }

  async cancelSession(session_id, staff_id) {
    const staffResponse = await this.db.query(
      `SELECT id FROM ${Tables.CenterStaff} WHERE user_id = $1`,
      [staff_id]
    );
    const staff = staffResponse.rows[0];

    if (!staff?.id) {
      throw defaultError(500, "Cannot cancel, staff not found!");
    }

    const currentTimestamp = getNowTimestamp();

    const cancelSessionSql = `UPDATE ${Tables.Sessions} SET status = 'cancelled', cancelled_at = $2, cancelled_by = $3 WHERE id = $1`;
    const cancelSubsSql = `UPDATE ${Tables.Subscriptions} SET status = 'cancelled', cancelled_at = $2, cancelled_by = $3 WHERE session_id = $1`;
    await this.withTransaction(async (client) => {
      await client.query(cancelSessionSql, [
        session_id,
        currentTimestamp,
        staff.id,
      ]);
      await client.query(cancelSubsSql, [
        session_id,
        currentTimestamp,
        staff.id,
      ]);
    });

    return { sessionId: session_id };
  }

  async cancelSubscription(subscriptionId, sessionId, userId) {
    const sessionLockSql = `
        SELECT id, capacity
          FROM ${Tables.Sessions}
        WHERE id = $1
          FOR UPDATE
        `;

    const activeCountSql = `
        SELECT COUNT(*) AS current_active
          FROM ${Tables.Subscriptions}
        WHERE session_id = $1
          AND status = 'active'
          AND cancelled_at IS NULL
          AND id != $2
        `;

    return this.withTransaction(async (client) => {
      const sessionLockRes = await client.query(sessionLockSql, [sessionId]);
      const session = sessionLockRes.rows[0];

      if (!session) throw defaultError(500, "Session not found!");

      const activeCountRes = await client.query(activeCountSql, [
        sessionId,
        subscriptionId,
      ]);

      const maxCapacity = parseInt(session.capacity, 10);
      const currentActive = parseInt(activeCountRes.rows[0].current_active, 10);

      const currentTimestamp = getNowTimestamp();
      const cancelSql = `
        UPDATE ${Tables.Subscriptions}
          SET status = 'cancelled', cancelled_at = $2, cancelled_by = $3
        WHERE id = $1
      `;
      await client.query(cancelSql, [subscriptionId, currentTimestamp, userId]);

      if (currentActive < maxCapacity) {
        const promoteSql = `
        UPDATE ${Tables.Subscriptions}
        SET status = 'active'
        WHERE id = (
          SELECT id
          FROM ${Tables.Subscriptions}
          WHERE session_id = $1
            AND status = 'waiting_list'
            AND cancelled_at IS NULL
          ORDER BY created_at ASC
          LIMIT 1
        )
        RETURNING *
      `;
        const promoteRes = await client.query(promoteSql, [sessionId]);
        //eslint-disable-next-line
        console.log("Promoted subscription:", promoteRes.rows[0]);
      }

      return { subscriptionId };
    });
  }

  async createCenterSession(data) {
    const { center_id, subservice_id, staff_id, price, duration, capacity } =
      data;
    const allowedFields = [
      "center_id",
      "subservice_id",
      "staff_id",
      "price",
      "start_time",
      "end_time",
      "duration",
      "capacity",
    ];

    const start_time = toDateTimeTZ(data.date, data.timeslot);
    const end_time = addMinutes(start_time, duration);

    const finalData = {
      center_id: center_id,
      subservice_id: subservice_id,
      staff_id: staff_id,
      price: price,
      duration: duration,
      capacity: capacity,
      start_time: start_time,
      end_time: end_time,
    };

    const session = await this.insert(
      Tables.Sessions,
      finalData,
      allowedFields
    );

    return session;
  }

  async addSessionSubscription(session_id, customer_id) {
    const checkSql = `SELECT id FROM ${Tables.Subscriptions} WHERE session_id = $1 AND customer_id = $2`;

    const checkDuplicate = await this.db.query(checkSql, [
      session_id,
      customer_id,
    ]);

    if (checkDuplicate.rows.length > 0) {
      throw defaultError(500, "User already subscrbed to this session!");
    }

    const capacitySql = `SELECT capacity FROM ${Tables.Sessions} WHERE id = $1 FOR UPDATE`;
    const currentCapacitySql = `SELECT COUNT(*) AS capacity FROM ${Tables.Subscriptions} WHERE session_id = $1 AND status = 'active'`;
    let subscription = {};

    await this.withTransaction(async (client) => {
      const maxCapacityRes = await client.query(capacitySql, [session_id]);
      const currectCapacityRes = await client.query(currentCapacitySql, [
        session_id,
      ]);

      const maxCapacity = parseInt(maxCapacityRes.rows[0]?.capacity, 10);
      const currentCapacity = parseInt(
        currectCapacityRes.rows[0]?.capacity,
        10
      );

      if (typeof maxCapacity !== "number" || Number.isNaN(maxCapacity)) {
        throw defaultError(500, "Invalid session capacity!");
      }

      if (
        typeof currentCapacity !== "number" ||
        Number.isNaN(currentCapacity)
      ) {
        throw defaultError(500, "Invalid current capacity!");
      }

      if (currentCapacity < maxCapacity) {
        subscription = await this.insert(
          Tables.Subscriptions,
          { session_id, customer_id },
          ["session_id", "customer_id"],
          client
        );
      } else {
        subscription = await this.insert(
          Tables.Subscriptions,
          { session_id, customer_id, status: "waiting_list" },
          ["session_id", "customer_id", "status"],
          client
        );
      }
    });

    return subscription;
  }
}

export const sessionService = new SessionService(pool);
