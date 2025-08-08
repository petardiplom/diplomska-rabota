import pool from "../db.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";

class StaffService extends BaseService {
  constructor(db) {
    super(db);
  }

  async getCenterStaff(center_id) {
    const sql = `
    SELECT cf.*, u.username, u.email FROM ${Tables.CenterStaff} cf
        INNER JOIN ${Tables.Users} u ON cf.user_id = u.id
    WHERE cf.center_id = $1`;

    const response = await this.db.query(sql, [center_id]);

    return response.rows;
  }

  async getSubserviceStaff(subservice_id, center_id) {
    const sql = `
    SELECT cf.*, u.username, u.email FROM ${Tables.CenterStaff} cf
        INNER JOIN ${Tables.SubserviceStaff} ss ON cf.id = ss.center_staff_id
        INNER JOIN ${Tables.Users} u ON cf.user_id = u.id
    WHERE ss.subservice_id = $1 AND cf.center_id = $2`;

    const response = await this.db.query(sql, [subservice_id, center_id]);

    return response.rows;
  }
}

export const staffService = new StaffService(pool);
