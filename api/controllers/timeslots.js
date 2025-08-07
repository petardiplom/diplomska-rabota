import { format } from "date-fns";
import { timeslotsService } from "../services/TimeslotsService.js";

// GET
export const getTimeslots = async (req, res, next) => {
  try {
    const center = req.center;
    // console.log("REQ QUERY", req.query);

    const { date, staffId } = req.query;

    const slots = await timeslotsService.getTimeslots(date, center.id, staffId);

    return res.json(slots);
  } catch (error) {
    next(error);
  }
};
