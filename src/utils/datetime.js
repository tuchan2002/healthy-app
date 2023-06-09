export function convertDate(date) {
  if (date) {
    const newDate = new Date(date);

    return {
      hour: newDate.getHours(),
      minute: newDate.getMinutes(),
      day: newDate.getDay() + 1 === 1 ? 8 : newDate.getDay() + 1,
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
 * @param {Date} date
 * @returns
 */
export function convertDateToString1(date) {
  if (date) {
    const convertedDate = convertDate(date);

    return `${
      convertedDate.day === 8 ? "Chủ nhật" : `Thứ ${convertedDate.day}`
    }, ${convertedDate.date} tháng ${convertedDate.month} năm ${
      convertedDate.year
    }`;
  }
  return null;
}

/**
 * Convert date to format 'hh:mm'.
 *
 * @param {Date} date
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
 * Convert date to format "Th xx, xx thg xx".
 *
 * @param {Date} date
 * @returns
 */
export function convertDateToString3(date) {
  if (date) {
    const convertedDate = convertDate(date);

    return `${
      convertedDate.day === 8 ? "Chủ nhật" : `Th ${convertedDate.day}`
    }, ${convertedDate.date} thg ${convertedDate.month}`;
  }
}

/**
 * Format date, month with 2 letters.
 *
 * @param {integer} time
 * @returns
 */
function formatTime(time) {
  if (String(time).length < 2) {
    return `0${time}`;
  }

  return time;
}
