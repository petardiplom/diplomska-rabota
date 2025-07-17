import pool from "../db.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";

class ScheduleService extends BaseService {
  constructor(db) {
    super(db);
  }

  async getCenterSchedule(center_id) {
    const sql = `
        SELECT 
            sched.id AS id,
            sched.day_of_week,
            sched.is_closed,
            sched.work_start,
            sched.work_end,
            COALESCE(
                json_agg(
                json_build_object(
                    'break_start', sb.break_start,
                    'break_end', sb.break_end
                )
                ) FILTER (WHERE sb.id IS NOT NULL),
                '[]'::json
            ) AS breaks
        FROM ${Tables.Schedules} sched
        LEFT JOIN ${Tables.ScheduleBreaks} sb ON sb.schedule_id = sched.id
        WHERE sched.center_id = $1 AND sched.staff_id IS NULL
        GROUP BY sched.id, sched.day_of_week, sched.is_closed, sched.work_start, sched.work_end
        ORDER BY sched.day_of_week;
    `;
    const response = await this.db.query(sql, [center_id]);

    return response.rows;
  }
}

export const scheduleService = new ScheduleService(pool);
