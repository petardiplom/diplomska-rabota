import {
  format,
  addMinutes,
  isBefore,
  isAfter,
  getISODay,
  max,
  min,
} from "date-fns";
import { toDate } from "date-fns-tz";

const TIMEZONE = "Europe/Skopje";

// TODO get timezone from center
export const toDateTimeTZ = (date, time, timezone = TIMEZONE) => {
  const localDateTimeStr = `${format(date, "yyyy-MM-dd")} ${time}`;
  return toDate(localDateTimeStr, { timeZone: timezone });
};

const getActivePeriod = (schedule, date) => {
  const day = getISODay(date);
  const entry = schedule.find((s) => s.day_of_week === day);
  if (!entry) return null;
  const breaks = entry.breaks?.map((b) => ({
    start: toDateTimeTZ(date, b.break_start),
    end: toDateTimeTZ(date, b.break_end),
  }));
  return {
    start: toDateTimeTZ(date, entry.work_start),
    end: toDateTimeTZ(date, entry.work_end),
    breaks,
  };
};

const generateTimeSlots = (start, end, intervalMinutes, duration) => {
  const slots = [];
  let current = start;

  while (true) {
    const slotEnd = addMinutes(current, duration);

    if (isAfter(slotEnd, end)) break;

    slots.push({ start: current, end: slotEnd });

    current = addMinutes(current, intervalMinutes);
  }
  return slots;
};

const overlaps = (slot, block) => {
  return isBefore(slot.start, block.end) && isAfter(slot.end, block.start);
};

const isSlotAvailable = (slot, breaks, reservations) => {
  const result = !breaks.some((b) => overlaps(slot, b));

  return result;
};

export const getAvailableTimeslots = (
  date,
  centerSchedule,
  staffSchedule,
  reservations,
  serviceDuration,
  slotInterval
) => {
  const center = getActivePeriod(centerSchedule, date);
  const staff = getActivePeriod(staffSchedule, date);
  // center or staff is not working
  if (!center || !staff) return [];

  // center and staff overlap start and end
  const now = toDate(new Date(), { timeZone: TIMEZONE });
  const start = max([now, center.start, staff.start]);
  const end = min([center.end, staff.end]);

  const rawSlots = generateTimeSlots(start, end, slotInterval, serviceDuration);

  const parsedReservations = reservations.map((r) => ({
    start: new Date(r.start_time),
    end: new Date(r.end_time),
  }));

  const allBreaks = [...(center.breaks ?? []), ...(staff.breaks ?? [])];

  return rawSlots.filter((slot) =>
    isSlotAvailable(slot, allBreaks, parsedReservations)
  );
};
