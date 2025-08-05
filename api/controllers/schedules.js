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

export const getStaffSchedule = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    const center = req.center;

    const schedule = await scheduleService.getStaffSchedule(center.id, staffId);
    return res.json(schedule);
  } catch (error) {
    next(error);
  }
};

// PATCH
export const updateSchedule = async (req, res, next) => {
  try {
    const schedule = await scheduleService.updateSchedule(req.body);
    return res.json(schedule);
  } catch (error) {
    next(error);
  }
};
