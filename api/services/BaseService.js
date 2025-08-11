import { getAvailableTimeslots } from "../utils/timeslotUtils.js";
import { Tables } from "./tables.js";
import { buildInsertQuery, buildUpdateQuery } from "./utils.js";

export class BaseService {
  constructor(db) {
    this.db = db;
  }

  async withTransaction(callback, pool = this.db) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await callback(client);
      await client.query("COMMIT");
      return result;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async findById(table, id) {
    const result = await this.db.query(`SELECT * FROM ${table} WHERE id = $1`, [
      id,
    ]);
    return result.rows[0] || null;
  }

  async findAllByField(table, field, value, ignoreArchived = false) {
    let sql = `SELECT * FROM ${table} WHERE ${field} = $1 ORDER BY id ASC`;

    if (ignoreArchived) {
      sql = `SELECT * FROM ${table} WHERE ${field} = $1 AND archived_at IS NULL ORDER BY id ASC`;
    }

    const result = await this.db.query(sql, [value]);
    return result.rows;
  }

  async insert(table, data, allowedFields, client = this.db, returning = "*") {
    const { query, values } = buildInsertQuery(
      table,
      data,
      allowedFields,
      returning
    );

    const result = await client.query(query, values);
    return result.rows[0];
  }

  async update(
    table,
    data,
    allowedFields,
    whereClause,
    whereValues,
    client = this.db,
    returning = "*"
  ) {
    const { query, values } = buildUpdateQuery(
      table,
      data,
      allowedFields,
      whereClause,
      whereValues,
      returning
    );
    const result = await client.query(query, values);
    return result.rows[0];
  }

  async getAvailableTimeslots(
    date,
    centerSchedule,
    staffSchedule,
    reservations = [],
    serviceDuration = 90,
    slotDuration = 30
  ) {
    return getAvailableTimeslots(
      date,
      centerSchedule,
      staffSchedule,
      reservations,
      serviceDuration,
      slotDuration
    );
  }

  async createOrder(
    center_id,
    customer_id,
    reservation_id,
    subscription_id,
    created_by,
    price,
    payment_method,
    client = this.db
  ) {
    const allowedFields = [
      "center_id",
      "customer_id",
      "reservation_id",
      "subscription_id",
      "created_by",
      "price",
      "payment_method",
    ];
    const order = await this.insert(
      Tables.Orders,
      {
        center_id,
        customer_id,
        reservation_id,
        subscription_id,
        created_by,
        price,
        payment_method,
      },
      allowedFields,
      client
    );
    return order;
  }
}
