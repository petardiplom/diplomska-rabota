import { format, isValid } from "date-fns";
import { enGB } from "date-fns/locale";

export const printPrice = (value, currency = "EUR", locale = "de-DE") => {
  if (value == null || isNaN(value)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

export const printInputDate = (date) => {
  const parsed = new Date(date);
  if (!isValid(parsed)) return "";
  return format(date, "yyyy-MM-dd");
};

export const printDate = (date, locale = enGB) => {
  const parsed = new Date(date);
  if (!isValid(parsed)) return "";
  return format(parsed, "dd/MM/yyyy", { locale });
};

export const printDateTime = (date, locale = enGB) => {
  const parsed = new Date(date);
  if (!isValid(parsed)) return "";
  return format(parsed, "dd/MM/yyyy HH:mm", { locale });
};

export const printTime = (date, locale = enGB) => {
  const parsed = new Date(date);
  if (!isValid(parsed)) return "";
  return format(parsed, "HH:mm", { locale });
};
