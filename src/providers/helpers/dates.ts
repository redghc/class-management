import { DateTime } from 'luxon';

// * Convert a JS Date to a string - 'dd/MM/yyyy'
export const JSDateToString = (date: Date): string => {
  return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy');
};

// * Convert a ISO Date to a string - 'dd/MM/yyyy'
export const ISODateToString = (date: string): string => {
  return DateTime.fromISO(date).toFormat('dd/MM/yyyy');
};

// * Convert a JS Date to DateTime
export const JSDateToDateTime = (date: Date | null): DateTime | null => {
  if (!date) return null;
  return DateTime.fromJSDate(date);
};

// * Convert a DateTime to a JS Date
export const DateTimeToJSDate = (date: DateTime | null): Date | null => {
  if (!date) return null;
  return date.toJSDate();
};
