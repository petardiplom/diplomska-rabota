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

// // POST

// export const addUserCenter = async (req, res, next) => {
//   try {
//     const centers = await centerService.addUserCenter({
//       owner_id: req.user.id,
//       ...req.body,
//     });
//     return res.json(centers);
//   } catch (error) {
//     next(error);
//   }
// };
