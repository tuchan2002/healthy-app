import { burnedCalorineByRunning } from "./caculateCalorine";

export const getFilterDataMethod = (allLocations, weight = 0) => {
  const dataArray = [];
  let tempId = -1;
  let distance = 0;
  let duration = 0;
  let path = [];

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
          path.push({
            latitude: allLocations[i].latitude,
            longitude: allLocations[i].longitude,
          });
        }
        dataArray.push({
          distance,
          duration,
          date: allLocations[i - 1].createdAt,
          kcal: burnedCalorineByRunning(weight, distance / 1000),
          path,
        });

        distance = 0;
        duration = 0;
        path = [];
      }
    }
    distance += allLocations[i].speed;
    duration++;
    path.push({
      latitude: allLocations[i].latitude,
      longitude: allLocations[i].longitude,
    });
  }

  return dataArray.reverse();
};

export const getTopData = (workoutRecordData) => {
  if (workoutRecordData.length === 0) {
    return { duration: 0, times: 0, kcal: 0 };
  }

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
