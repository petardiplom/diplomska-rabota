import { addMinutes } from "date-fns";
import pool from "../db.js";
import { getNowTimestamp, toDateTimeTZ } from "../utils/timeslotUtils.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";
import { defaultError } from "../error.js";

export class ReservationService extends BaseService {
  constructor(db) {
    super(db);
  }

  async getCenterReservations(center_id) {
    return this.findAllByField(Tables.Reservations, "center_id", center_id);
  }

  async getCustomerReservations(customer_id) {
    return this.findAllByField(Tables.Reservations, "customer_id", customer_id);
  }

  async cancelReservation(reservation_id, user_id) {
    const staffResponse = await this.db.query(
      `SELECT id FROM ${Tables.CenterStaff} WHERE user_id = $1`,
      [user_id]
    );
    const staff = staffResponse.rows[0];

    if (!staff?.id) {
      throw defaultError(500, "Cannot cancel, staff not found!");
    }

    const currentTimestamp = getNowTimestamp();

    console.log("CURRENT TIMESTAMP!!", currentTimestamp);

    const sql = `UPDATE ${Tables.Reservations} SET status = 'cancelled', cancelled_at = $2, cancelled_by = $3 WHERE id = $1`;
    return this.db.query(sql, [reservation_id, currentTimestamp, staff.id]);
  }

  async createCenterReservation(data) {
    const {
      center_id,
      customer_id,
      user_id,
      subservice_id,
      staff_id,
      price,
      duration,
    } = data;
    const allowedFields = [
      "center_id",
      "subservice_id",
      "customer_id",
      "staff_id",
      "price",
      "start_time",
      "end_time",
      "duration",
    ];

    const start_time = toDateTimeTZ(data.date, data.timeslot);
    const end_time = addMinutes(start_time, duration);

    const finalData = {
      center_id: center_id,
      customer_id: customer_id,
      subservice_id: subservice_id,
      staff_id: staff_id,
      price: price,
      duration: duration,
      start_time: start_time,
      end_time: end_time,
    };

    await this.withTransaction(async (client) => {
      const reservation = await this.insert(
        Tables.Reservations,
        finalData,
        allowedFields,
        client
      );

      await this.createOrder(
        center_id,
        customer_id,
        reservation.id,
        null,
        user_id,
        price,
        "cash",
        client
      );

      return reservation;
    });
  }
}

export const reservationService = new ReservationService(pool);
