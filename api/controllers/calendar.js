import { calendarService } from "../services/CalendarService.js";

// GET
export const getCalendarEvents = async (req, res, next) => {
  try {
    const center = req.center;
    const { date } = req.query;
    const events = await calendarService.getCalendarEvents(center.id, date);
    return res.json(events);
  } catch (error) {
    next(error);
  }
};
