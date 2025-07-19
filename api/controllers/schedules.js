import { scheduleService } from "../services/ScheduleService.js";

// GET
export const getCenterSchedule = async (req, res, next) => {
  try {
    const center = req.center;
    const schedule = await scheduleService.getCenterSchedule(center.id);
    return res.json(schedule);
  } catch (error) {
    next(error);
  }
};

// PATCH
export const updateCenterSchedule = async (req, res, next) => {
  try {
    const schedule = await scheduleService.updateCenterSchedule(req.body);
    return res.json(schedule);
  } catch (error) {
    next(error);
  }
};
