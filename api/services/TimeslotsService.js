import pool from "../db.js";
import { ScheduleService } from "./ScheduleService.js";

class TimeslotsService extends ScheduleService {
  constructor(db) {
    super(db);
  }

  async getTimeslots(date, centerId, staffId) {
    //todo
    // get center, staff schedule
    // get center, staff breaks
    // get reservations (not done atm)

    const centerSchedule = await this.getCenterSchedule(centerId);
    const staffSchedule = await this.getStaffSchedule(centerId, staffId);

    const response = await this.getAvailableTimeslots(
      date,
      centerSchedule,
      staffSchedule
    );
    return response;
  }
}

export const timeslotsService = new TimeslotsService(pool);
