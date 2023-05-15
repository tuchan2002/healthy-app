import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { insertLocation } from "../data/locations";

export const LOCATION_TASK_NAME = "background-location-task";

export const checkRegisteredLocationTask = () => {
  const isDefined = TaskManager.isTaskDefined(LOCATION_TASK_NAME);

  return isDefined;
};

export const registerLocationTask = async (forceUpdateLocations) => {
  if (!checkRegisteredLocationTask()) {
    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
      if (data) {
        const { locations } = data;
        // console.log("task data:", locations[0]);
        await insertLocation(locations[0].coords);
        forceUpdateLocations();
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
    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);

      console.log("stop update locations");
    } catch (error) {
      console.log("Error stop location update: ", error);
    }

    try {
      await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);

      console.log("unregister all tasks");
    } catch (error) {
      console.log("Error unregister task: ", error);
    }
  }
};
