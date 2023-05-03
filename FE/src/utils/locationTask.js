import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { insertLocation } from "../data/locations";

export const LOCATION_TASK_NAME = "background-location-task";

export const checkRegisteredLocationTask = () => {
  const isDefined = TaskManager.isTaskDefined(LOCATION_TASK_NAME);

  return isDefined;
};

export const registerLocationTask = async () => {
  if (!checkRegisteredLocationTask()) {
    console.log("Not defined yet!");

    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
      if (data) {
        const { locations } = data;
        // console.log("task data:", locations[0]);
        const res = await insertLocation(locations[0].coords);
        return;
      }
      if (error) {
        console.log("task error:", error);
        return;
      }
    });
  }
};

export const unregisterLocationTask = async () => {
  if (checkRegisteredLocationTask()) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);

    await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
  }
};
