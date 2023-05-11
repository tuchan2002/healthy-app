import moment from "moment";

export const MAGAVG = 4;

export const buildLabelsSteps = () => {
  const arr = [];
  for (let i = 0; i < 96; i++) {
    if (i === 0) {
      arr.push("0:00");
    } else if (i === 23) {
      arr.push("6:00");
    } else if (i === 47) {
      arr.push("12:00");
    } else if (i === 71) {
      arr.push("18:00");
    } else if (i === 95) {
      arr.push("24:00");
    } else {
      arr.push("");
    }
  }
  return arr;
};

export const buildSteps = (arr, arrLabels) => {
  // console.log("------------------------------------");
  // console.log(arr);
  // console.log(arrLabels);
  // console.log("------------------------------------");

  const arrSteps = new Array(arrLabels.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    if (Number(arr[i].type) < arrSteps.length) {
      arrSteps[Number(arr[i].type)] = arr[i].stepsCount;
    }
  }
  return arrSteps;
};

export const buildDayOfMonth = (month) => {
  const arr = [];
  const arr31 = [1, 3, 5, 7, 8, 10, 12];
  const arr30 = [4, 6, 9, 11];
  if (arr31.includes(month)) {
    for (let i = 1; i <= 31; i++) {
      if (i === 1 || i % 5 === 0 || i === 31) {
        arr.push(i.toString());
      } else {
        arr.push(" ");
      }
    }
  } else if (arr30.includes(month)) {
    for (let i = 1; i <= 30; i++) {
      if (i % 5 === 0 || i === 1) {
        arr.push(i.toString());
      } else {
        arr.push(" ");
      }
    }
  } else {
    for (let i = 1; i <= 28; i++) {
      if (i === 1 || i % 5 === 0 || i === 28) {
        arr.push(i.toString());
      } else {
        arr.push(" ");
      }
    }
  }
  return arr;
};

export const buildTimeLabel = (tooltip = { index: 0 }, key = 0) => {
  if (key === 1) {
    return (
      moment(new Date(tooltip.index * 15 * 60 * 1000 + 5 * 3600 * 1000)).format(
        "hh:mm"
      ) +
      " ~ " +
      moment(
        new Date(
          tooltip.index * 15 * 60 * 1000 + 5 * 3600 * 1000 + 15 * 60 * 1000
        )
      ).format("hh:mm")
    );
  } else if (key === 2) {
    return tooltip.index + 1 < 10
      ? "Mùng " + (tooltip.index + 1)
      : "Ngày " + (tooltip.index + 1);
  }
  return "Tháng " + tooltip.index;
};
