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

export const buildSteps = (arr) => {
  const arrSteps = new Array(96).fill(0);
  for (let i = 0; i < arr.length; i++) {
    arrSteps[arr[i].type] = arr[i].stepsCount;
  }
  return arrSteps;
};
