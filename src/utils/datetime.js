export function convertDate(date) {
  if (date) {
    const newDate = new Date(date);

    return {
      hour: newDate.getHours(),
      minute: newDate.getMinutes(),
      day: newDate.getDay() + 1,
      date: newDate.getDate(),
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    };
  }

  return null;
}

/**
 * Convert date to format 'Thứ xx, xx tháng xx năm xxxx'.
 *
 * @param {*} date
 * @returns
 */
export function convertDateToString1(date) {
  if (date) {
    const convertedDate = convertDate(date);

    return `Thứ ${convertedDate.day}, ${convertedDate.date} tháng ${convertedDate.month} năm ${convertedDate.year}`;
  }
  return null;
}

/**
 * Convert date to format 'hh:mm'.
 *
 * @param {*} date
 * @returns
 */
export function convertDateToString2(date) {
  if (date) {
    const convertedDate = convertDate(date);

    return `${formatTime(convertedDate.hour)}:${formatTime(
      convertedDate.minute,
    )}`;
  }
  return null;
}

/**
 * Format date, month with 2 letters.
 *
 * @param {*} time
 * @returns
 */
function formatTime(time) {
  if (String(time).length < 2) {
    return `0${time}`;
  }

  return time;
}
