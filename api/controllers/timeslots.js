import { format } from "date-fns";
import { timeslotsService } from "../services/TimeslotsService.js";

// GET
export const getTimeslots = async (req, res, next) => {
  try {
    const center = req.center;

    const { date, staffId, subserviceId } = req.query;

    const slots = await timeslotsService.getTimeslots(
      date,
      center.id,
      staffId,
      subserviceId
    );

    return res.json(slots);
  } catch (error) {
    next(error);
  }
};
