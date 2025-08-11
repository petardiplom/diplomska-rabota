import { addMinutes } from "date-fns";
import pool from "../db.js";
import { toDateTimeTZ } from "../utils/timeslotUtils.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";

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
