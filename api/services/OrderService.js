import pool from "../db.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";

class OrderService extends BaseService {
  constructor(db) {
    super(db);
  }

  async getCenterOrders(center_id) {
    const sql = `
        SELECT o.id, 'reservation' AS type, c.email AS customer_email, s.name AS subservice_name, u.email AS staff_email, r.price, r.start_time, r.status, o.created_at FROM ${Tables.Orders} o
            INNER JOIN ${Tables.Reservations} r ON o.reservation_id = r.id
            INNER JOIN ${Tables.Subservices} s ON r.subservice_id = s.id
            INNER JOIN ${Tables.Customers} c ON o.customer_id = c.id
            INNER JOIN ${Tables.CenterStaff} cs ON cs.id = r.staff_id
            INNER JOIN ${Tables.Users} u ON u.id = cs.user_id
        WHERE o.center_id = $1
    `;
    const orders = await this.db.query(sql, [center_id]);
    return orders.rows;
  }
}

export const orderService = new OrderService(pool);
