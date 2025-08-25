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
        ),
        session_count AS (
          SELECT ses.id AS session_id, count(sub.id) AS current_capacity
            FROM ${Tables.Sessions} ses
            LEFT OUTER JOIN ${Tables.Subscriptions} sub ON ses.id = sub.session_id
          GROUP BY ses.id
        )
        SELECT r.id AS id, r.id AS reservation_id, null AS session_id, 'reservation' AS type, 1 AS current_capacity, s.name AS title, s.color, ss.name AS subservice_name, c.email AS customer_email, su.email AS staff_email, r.start_time AS start, r.end_time AS end, r.duration, r.price, r.status::text, r.cancelled_at, r.cancelled_by, 1 AS capacity
        FROM ${Tables.Reservations} r
            INNER JOIN ${Tables.Subservices} ss ON r.subservice_id = ss.id
            INNER JOIN ${Tables.Services} s on ss.service_id = s.id
            INNER JOIN ${Tables.Customers} c ON r.customer_id = c.id
            INNER JOIN staff_users su ON r.staff_id = su.staff_id
        WHERE r.center_id = $1 AND r.start_time BETWEEN $2 AND $3
        UNION
        SELECT s.id AS id, null AS reservation_id, s.id AS session_id, 'session' AS type, sc.current_capacity, ser.name AS title, ser.color, ss.name AS subservice_name, null AS customer_email, su.email AS staff_email, s.start_time AS start, s.end_time AS end, s.duration, s.price, s.status::text, s.cancelled_at, s.cancelled_by, s.capacity
        FROM ${Tables.Sessions} s
            INNER JOIN ${Tables.Subservices} ss ON s.subservice_id = ss.id
            INNER JOIN ${Tables.Services} ser on ss.service_id = ser.id
            INNER JOIN staff_users su ON s.staff_id = su.staff_id
            LEFT OUTER JOIN session_count sc ON s.id = sc.session_id
        WHERE s.center_id = $1 AND s.start_time BETWEEN $2 AND $3
    `;

    const events = await this.db.query(sql, [centerId, start, end]);

    return events.rows;
  }
}

export const calendarService = new CalendarService(pool);
