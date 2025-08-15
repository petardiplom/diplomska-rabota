import pool from "../db.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";
import { startOfMonth, endOfMonth, subDays, addDays } from "date-fns";

class CalendarService extends BaseService {
  constructor(db) {
    super(db);
  }

  async getCalendarEvents(centerId, date) {
    const start = subDays(startOfMonth(date), 7);
    const end = addDays(endOfMonth(date), 7);

    const sql = `
        WITH staff_users AS (
            SELECT cs.id AS staff_id, u.id AS user_id, cs.role, u.email, u.username FROM ${Tables.CenterStaff} cs
                INNER JOIN ${Tables.Users} u ON cs.user_id = u.id
            WHERE cs.center_id = $1
        )
        SELECT r.id AS id, r.id AS reservation_id, s.name AS title, s.color, ss.name AS subservice_name, c.email AS customer_email, su.email AS staff_email, r.start_time AS start, r.end_time AS end, r.duration, r.price, r.status, r.cancelled_at, r.cancelled_by
        FROM ${Tables.Reservations} r
            INNER JOIN ${Tables.Subservices} ss ON r.subservice_id = ss.id
            INNER JOIN ${Tables.Services} s on ss.service_id = s.id
            INNER JOIN ${Tables.Customers} c ON r.customer_id = c.id
            INNER JOIN staff_users su ON r.staff_id = su.staff_id
        WHERE r.center_id = $1 AND r.start_time BETWEEN $2 AND $3
    `;

    const events = await this.db.query(sql, [centerId, start, end]);

    return events.rows;
  }
}

export const calendarService = new CalendarService(pool);
