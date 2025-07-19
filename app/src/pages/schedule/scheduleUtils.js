export const timeStringToDate = (timeStr) => {
  if (!timeStr) return null;
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return new Date(0, 0, 0, hours, minutes, seconds || 0);
};

export const dateToTimeString = (date) => {
  if (!date) return null;
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
};

export const convertToDate = (data) => {
  return data.map((day) => {
    return {
      ...day,
      is_closed: day.is_closed,
      work_start: day.work_start ? timeStringToDate(day.work_start) : null,
      work_end: day.work_end ? timeStringToDate(day.work_end) : null,
      breaks: day.breaks.map((brk) => ({
        break_start: timeStringToDate(brk.break_start),
        break_end: timeStringToDate(brk.break_end),
      })),
    };
  });
};

export const convertToString = (data) => {
  return data.map((day) => {
    return {
      ...day,
      is_closed: day.is_closed,
      work_start: day.work_start ? dateToTimeString(day.work_start) : null,
      work_end: day.work_end ? dateToTimeString(day.work_end) : null,
      breaks: day.breaks.map((brk) => ({
        break_start: dateToTimeString(brk.break_start),
        break_end: dateToTimeString(brk.break_end),
      })),
    };
  });
};

const validateDay = (day) => {
  const errors = {
    work_start: null,
    work_end: null,
    breaks: [],
  };

  if (!day.is_closed) {
    if (!day.work_start) {
      errors.work_start = "Required";
    }
    if (!day.work_end) {
      errors.work_end = "Required";
    }
    if (day.work_start && day.work_end && day.work_start >= day.work_end) {
      errors.work_start = "Must be before end time";
      errors.work_end = "Must be after start time";
    }

    day.breaks.forEach((brk) => {
      let breakErrors = { break_start: null, break_end: null };

      if (!brk.break_start || !brk.break_end) {
        breakErrors.break_start = "Required";
        breakErrors.break_end = "Required";
      } else if (brk.break_start >= brk.break_end) {
        breakErrors.break_start = "Must be before to";
        breakErrors.break_end = "Must be after from";
      } else if (
        (day.work_start && brk.break_start < day.work_start) ||
        (day.work_end && brk.break_end > day.work_end)
      ) {
        breakErrors.break_start = "Outside working hours";
        breakErrors.break_end = "Outside working hours";
      }

      errors.breaks.push(breakErrors);
    });
  }

  return errors;
};

export const validateSchedule = (days) => {
  const allErrors = days.map(validateDay);
  const hasAnyError = allErrors.some(
    (err) =>
      err.work_start ||
      err.work_end ||
      err.breaks.some((b) => b.break_start || b.break_end)
  );
  return { allErrors, hasAnyError };
};
