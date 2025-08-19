import { format, getISODay, parse } from "date-fns";

export const disabledDays = (date, disabledDays = []) => {
  const day = getISODay(date);
  return disabledDays.includes(day);
};

export const mergeDateWithTimeslot = (date, timeslot) => {
  return parse(
    `${format(date, "yyyy-MM-dd")} ${timeslot}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
};
