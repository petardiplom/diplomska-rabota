import pool from "../db.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";

class CustomerService extends BaseService {
  constructor(db) {
    super(db);
  }

  async getCenterCustomers(centerId) {
    return this.findAllByField(Tables.Customers, "center_id", centerId, true);
  }

  async getArchivedCenterCustomers(centerId) {
    const sql = `SELECT * FROM ${Tables.Customers} WHERE center_id = $1 AND archived_at IS NOT NULL ORDER BY id ASC`;
    const reponse = await this.db.query(sql, [centerId]);
    return reponse.rows;
  }

  async getCustomerById(customerId) {
    return this.findById(Tables.Customers, customerId);
  }

  async addCustomer(centerId, data) {
    const allowedFields = [
      "email",
      "center_id",
      "firstname",
      "lastname",
      "phone",
    ];

    return this.insert(
      Tables.Customers,
      { center_id: centerId, ...data },
      allowedFields
    );
  }

  async updateCustomer(customerId, data) {
    const allowedFields = ["email", "firstname", "lastname", "phone"];

    return this.update(Tables.Customers, data, allowedFields, "id = $5", [
      customerId,
    ]);
  }

  async archiveCustomer(customerId) {
    const archivedAt = new Date();
    const updateSql = `UPDATE ${Tables.Customers} SET archived_at = $2 WHERE id = $1 RETURNING *`;
    const result = await this.db.query(updateSql, [customerId, archivedAt]);

    if (result.rowCount === 0) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  }

  async restoreCustomer(customerId) {
    const updateSql = `UPDATE ${Tables.Customers} SET archived_at = null WHERE id = $1 RETURNING *`;
    const result = await this.db.query(updateSql, [customerId]);

    if (result.rowCount === 0) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  }
}

export const customerService = new CustomerService(pool);
