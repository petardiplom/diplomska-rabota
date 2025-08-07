import pool from "../db.js";
import { BaseService } from "./BaseService.js";
import { Tables } from "./tables.js";

export class ScheduleService extends BaseService {
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
        WHERE sched.center_id = $1 AND sched.center_staff_id IS NULL
        GROUP BY sched.id, sched.day_of_week, sched.is_closed, sched.work_start, sched.work_end
        ORDER BY sched.day_of_week;
    `;
    const response = await this.db.query(sql, [center_id]);

    return response.rows;
  }

  async getStaffSchedule(center_id, staff_id) {
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
        WHERE sched.center_id = $1 AND sched.center_staff_id = $2
        GROUP BY sched.id, sched.day_of_week, sched.is_closed, sched.work_start, sched.work_end
        ORDER BY sched.day_of_week;
    `;
    const response = await this.db.query(sql, [center_id, staff_id]);

    return response.rows;
  }

  async updateSchedule(schedule) {
    await this.withTransaction(async (client) => {
      const updateSql = `UPDATE ${Tables.Schedules} SET work_start = $1, work_end = $2, is_closed = $3 WHERE id = $4`;
      const deleteBreakSql = `DELETE FROM ${Tables.ScheduleBreaks} WHERE schedule_id = $1`;
      const insertBreakSql = `INSERT INTO ${Tables.ScheduleBreaks} (schedule_id, break_start, break_end) VALUES ($1, $2, $3)`;

      for (const day of schedule) {
        await client.query(updateSql, [
          day.work_start,
          day.work_end,
          day.is_closed,
          day.id,
        ]);
        await client.query(deleteBreakSql, [day.id]);
        for (const brk of day.breaks) {
          await client.query(insertBreakSql, [
            day.id,
            brk.break_start,
            brk.break_end,
          ]);
        }
      }

      return true;
    });
  }
}

export const scheduleService = new ScheduleService(pool);
