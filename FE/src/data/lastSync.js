import * as SQLite from "expo-sqlite";
import { getStepById, insertSyncStep } from "./stepCounter";
import { SyncStepService, SynceStepServiceToLocal } from "../services/user";
import {
  getRunningInfosById,
  getRunningInfosUpdatedAfterSyncById,
  insertRunningInfo,
} from "./runningInfo";
import {
  createTableLocations,
  getTheLocationsById,
  insertLocation,
} from "./locations";

const db = SQLite.openDatabase("ui.db");

export const createTableLastSync = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS lastSync (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            stepId INTEGER NOT NULL,
            runningInfoId INTEGER NOT NULL,
            locationId INTEGER NOT NULL
        );`,
        [],
        () => {
          console.log("create table lastSync success");
          resolve(true);
        },
        (error) => {
          console.log("createTableLastSync error");
          reject(error);
        }
      );
    });
  });
};

export const updateStepIdLastSync = ({ stepId, runningInfoId, locationId }) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO lastSync (stepId, runningInfoId, locationId)
    VALUES (${stepId || 0}, ${runningInfoId || 0}, ${locationId || 0});`;
    db.transaction(
      (tx) => {
        tx.executeSql(query);
      },
      [],
      () => {
        console.log("update stepId lastSync success");
        resolve("updateStepIdLastSync success");
      },
      (error) => {
        console.log("updateStepIdLastSync error");

        reject(error);
      }
    );
  });
};

export const getStepIdLastSync = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM lastSync
        ORDER by id DESC
        LIMIT 1`,
        [],
        (tx, result) => {
          const ids =
            result?.rows?._array?.length > 0 ? result.rows._array[0] : {};
          resolve(ids);
        },
        (error) => {
          console.log("getStepIdLastSync error");
          reject(error);
        }
      );
    });
  });
};

export const StepSync = async (userId) => {
  try {
    const { stepId, runningInfoId, locationId } = await getStepIdLastSync();

    let data = {
      id: userId,
      steps: [],
      runningInfos: [],
      locations: [],
    };

    let lastIds = {
      stepId: null,
      runningInfoId: null,
      locationId: null,
    };
    // handle sync steps
    const stepsSync = await getStepById(stepId ? stepId : 0);
    if (stepsSync.length > 0) {
      data.steps = stepsSync;
      lastIds.stepId =
        stepsSync?.length > 0 ? stepsSync[stepsSync.length - 1].id : 0;
    }

    // handle sync runningInfos
    const runningInfosInsertedAfterSync = await getRunningInfosById(
      runningInfoId ? runningInfoId : 0
    );
    const runningInfosUpdatedAfterSync =
      await getRunningInfosUpdatedAfterSyncById();
    const runningInfosSync = [
      ...runningInfosUpdatedAfterSync,
      ...runningInfosInsertedAfterSync,
    ];
    console.log("runningInfos", runningInfosSync);
    if (runningInfosSync.length > 0) {
      data.runningInfos = runningInfosSync;
      lastIds.runningInfoId =
        runningInfosSync?.length > 0
          ? runningInfosSync[runningInfosSync.length - 1].id
          : 0;
    }

    // handle sync locations
    const locationsSync = await getTheLocationsById(
      locationId ? locationId : 0
    );
    if (locationsSync.length > 0) {
      data.locations = locationsSync;
      lastIds.locationId =
        locationsSync?.length > 0
          ? locationsSync[locationsSync.length - 1].id
          : 0;
    }

    if (
      data.steps.length > 0 ||
      data.runningInfos.length > 0 ||
      data.locations.length > 0
    ) {
      const resSync = await SyncStepService(data);
      if (resSync && resSync.success === 1) {
        await updateStepIdLastSync(lastIds);
      }
    }
  } catch (error) {
    console.log("StepSync error");

    console.log(error);
  }
};

export const StepSyncToLocal = async (userId) => {
  try {
    const res = await SynceStepServiceToLocal(userId);
    if (res && res.success === 1 && res.data) {
      inintalData = res.data;
      const lastIds = {
        stepId: null,
        runningInfoId: null,
        locationId: null,
      };

      if (res.data.syncedSteps) {
        const lastStepId =
          res?.data?.syncedSteps?.length > 0
            ? res?.data?.syncedSteps.length
            : 0;
        console.log(lastStepId);
        lastIds.stepId = lastStepId;

        await res?.data?.syncedSteps?.map(async (step) => {
          await insertSyncStep(step.date, step.value, step.type, step.time);
        });
      }

      if (res.data.runningInfos) {
        const lastRunningInfoId =
          res?.data?.runningInfos?.length > 0
            ? res?.data?.runningInfos.length
            : 0;
        lastIds.runningInfoId = lastRunningInfoId;

        await res.data.runningInfos.map(async (runningInfo) => {
          await insertRunningInfo(runningInfo);
        });

        // const syncedLocations = await res.data.runningInfos
        //   .reverse()
        //   .reduce(async (promise, runningInfo) => {
        //     await insertRunningInfo(runningInfo);
        //     if (runningInfo.locations) {
        //       return promise.then(async (last) => {
        //         const l = async () => {
        //           return [...last, ...runningInfo.locations];
        //         };
        //         return await l();
        //       });
        //     }
        //   }, Promise.resolve([]));

        // const lastLocationId = syncedLocations.length;
        // lastIds.locationId = lastLocationId;
        // await syncedLocations.map(async (location) => {
        //   await insertLocation(location);
        // });
      }

      if (res.data.locations) {
        const lastLocationInfoId =
          res?.data?.locations?.length > 0 ? res?.data?.locations.length : 0;
        lastIds.locationId = lastLocationInfoId;

        await res.data.locations.map(async (location) => {
          await insertLocation(location);
        });
      }

      await updateStepIdLastSync(lastIds);
    }
  } catch (error) {
    console.log("StepSyncToLocal Error: ", error);
  }
};
