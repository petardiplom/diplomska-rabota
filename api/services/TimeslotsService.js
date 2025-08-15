import pool from "../db.js";
import { defaultError } from "../error.js";
import { ScheduleService } from "./ScheduleService.js";
import { Tables } from "./tables.js";

class TimeslotsService extends ScheduleService {
  constructor(db) {
    super(db);
  }

  async getTimeslots(date, centerId, staffId, subserviceId) {
    //todo
    // get center, staff schedule
    // get center, staff breaks
    // get reservations (not done atm)

    const centerSchedule = await this.getCenterSchedule(centerId);
    const staffSchedule = await this.getStaffSchedule(centerId, staffId);
    const subservice = await this.findById(Tables.Subservices, subserviceId);
    const reservations = await this.db.query(
      `SELECT * FROM ${Tables.Reservations} WHERE center_id = $1 AND start_time >= $2::date AND start_time < ($2::date + INTERVAL '1day')`,
      [centerId, date]
    );

    if (!subservice) {
      throw defaultError(500, "Subservice not found!");
    }

    if (!reservations) {
      throw defaultError(500, "Error reservations!");
    }

    const response = await this.getAvailableTimeslots(
      date,
      centerSchedule,
      staffSchedule,
      reservations.rows,
      subservice.duration
    );
    return response;
  }
}

export const timeslotsService = new TimeslotsService(pool);
