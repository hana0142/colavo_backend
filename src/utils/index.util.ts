/**
 * @method checkEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description check value empty
 */
export const checkEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method getDateToString
 * @param {string} value
 * @returns {string} 'year-month-day'
 * @description get date value to string
 */
export const getDateToString = (value: string): string => {
  const year = value.substring(0, 4);
  const month = value.substring(4, 6);
  const day = value.substring(6, 8);
  return `${year}-${month}-${day}`;
};

/**
 * @method getDayToUnix
 * @param {string} start_date
 * @returns {number} unix
 * @description get day value to unix 
 */
export const getDayToUnix = (start_date: string): number => {
  const unix = (new Date(start_date).getTime() / 1000).toString();
  return parseInt(unix);
};

/**
 * @method getWeekToArray
 * @param {Date} start_date
 * @param {Number} count
 * @returns {Array} resultArray
 * @description get week to array
 */
export const getWeekToArray = (start_date: Date, count: number, MAX = 8, MIN = 1) => {
  const startDay = start_date.getDay() + 1;

  const resultArray = [];
  for (let i = 0; i < count; i++) {
    const tmpDate = new Date(start_date.getTime());
    const num = startDay + i < MAX && startDay + i >= MIN ? startDay + i : startDay + i + MIN - MAX;
    const iDate = new Date(tmpDate.setDate(tmpDate.getDate() + i));
    const unixNum = (iDate.getTime() / 1000) * 1;
    resultArray.push({ weekday: num, day_modifier: i, start_of_day: unixNum });
  }

  return resultArray;
};

/**
 * @method changeTimezone
 * @param {Date} date
 * @param {string} ianatz
 * @returns {Date} 
 * @description change Timezone
 */
export const changeTimezone = (date: Date, ianatz: string): Date => {
  const currentTimezone = date.getTimezoneOffset() * 60 * 1000;
  const timezoneDate = new Date(date.getTime() + currentTimezone);
  const invdate = new Date(
    date.toLocaleString('en-US', {
      timeZone: ianatz,
    }),
  );
  const diff = timezoneDate.getTime() - invdate.getTime();

  return new Date(date.getTime() + diff); // needs to substract
};

/**
 * @method getTomorrow
 * @param {number} unixDate
 * @param {number} days
 * @returns {number} dateToUnix
 * @description get tomorrow
 */
export const getTomorrow = (unixDate: number, days: number): number => {
  const date = new Date(unixDate * 1000);
  const tomorrowDate = new Date(date.setDate(date.getDate() + days));
  const dateToUnix = (tomorrowDate.getTime() / 1000) * 1;

  return dateToUnix;
};