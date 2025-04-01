import { ONE_MINUTE_MILLISECONDS } from '@constant/date.constants';
import dayjs from 'dayjs';
import moment from 'moment-timezone';

export const getMillisecondsFromMinutes = (minutes: number) => {
  return minutes * ONE_MINUTE_MILLISECONDS;
};

export const getMinutesFromMilliseconds = (milliseconds: number) => {
  return milliseconds / ONE_MINUTE_MILLISECONDS;
};

export const getDateByTimestamp = (timestamps: number) => {
  const date = new Date(timestamps);

  return {
    date,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    dayOfMonth: date.getDate(),
    dayOfWeek: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  };
};

export const getCurrentDate = () => {
  const date = new Date();

  return {
    date,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    dayOfMonth: date.getDate(),
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  };
};

export const getDateByTimezone = (timezone: string) => {
  const timeToCheck = moment();

  const timeInTimezone = timeToCheck.tz(timezone);

  return {
    hours: timeInTimezone.hour(),
    minutes: timeInTimezone.minute(),
    year: timeInTimezone.year(),
    month: timeInTimezone.month(),
    day: timeInTimezone.hour(),
    milliSeconds: timeInTimezone.milliseconds(),
    timezone,
  };
};

export const getDayTimestampsByMonth = (
  startMonth: number,
  endMonth: number,
) => {
  const timestamps = [];

  let day = 1;
  let currentTime = startMonth;

  while (currentTime < endMonth) {
    let startTime = dayjs(currentTime).startOf('date').valueOf();
    let endTime = dayjs(currentTime).endOf('date').valueOf();

    if (startTime < startMonth) {
      startTime = startMonth;
    }

    if (endTime > endMonth) {
      endTime = endMonth;
    }

    timestamps.push({
      day,
      startTime,
      endTime,
    });

    day++;
    currentTime = endTime;
  }

  return timestamps;
};

export const getMonthTimestampsByYear = (year: number) => {
  const timestamps = [];

  for (let month = 0; month < 12; month++) {
    const startTime = new Date(year, month, 1).getTime();
    const endTime = new Date(year, month + 1, 1).getTime();

    timestamps.push({
      startTime,
      endTime,
      month,
    });
  }

  return timestamps;
};
