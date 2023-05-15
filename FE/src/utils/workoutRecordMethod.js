import { burnedCalorineByRunning } from "./caculateCalorine";

export const getFilterDataMethod = (allLocations, weight = 0) => {
  const dataArray = [];
  let tempId = -1;
  let distance = 0;
  let duration = 0;

  console.log(allLocations.length);
  for (let i = 0; i < allLocations.length; i++) {
    if (
      tempId != Number(allLocations[i].runningInfoId) ||
      i === allLocations.length - 1
    ) {
      tempId = Number(allLocations[i].runningInfoId);

      if (i > 0) {
        if (i === allLocations.length - 1) {
          distance += allLocations[i].speed;
          duration++;
        }
        dataArray.push({
          distance,
          duration,
          date: allLocations[i - 1].createdAt,
          kcal: burnedCalorineByRunning(weight, distance),
        });
        distance = 0;
        duration = 0;
      }
    }
    distance += allLocations[i].speed;
    duration++;
  }

  return dataArray.reverse();
};

export const getTopData = (workoutRecordData) => {
  return {
    duration: workoutRecordData.reduce(
      (total, wkRecord) => total + wkRecord.duration,
      0
    ),
    times: workoutRecordData.length,
    kcal: workoutRecordData.reduce(
      (total, wkRecord) => total + wkRecord.kcal,
      0
    ),
  };
};
