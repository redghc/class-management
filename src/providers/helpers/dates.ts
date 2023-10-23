import { DateTime } from 'luxon';

// * Convert a JS Date to a string - 'dd/MM/yyyy'
export const JSDateToString = (date: Date): string => {
  return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy');
};

// * Convert a ISO Date to a string - 'dd/MM/yyyy'
export const ISODateToString = (date: string): string => {
  return DateTime.fromISO(date).toFormat('dd/MM/yyyy');
};
