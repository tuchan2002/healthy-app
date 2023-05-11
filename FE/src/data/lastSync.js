import * as SQLite from "expo-sqlite";
import { getStepById, insertSyncStep } from "./stepCounter";
import { SyncService, SyncedServiceToLocal } from "../services/user";
import { getRunningInfosById, insertRunningInfo } from "./runningInfo";
import { getTheLocationsById, insertLocation } from "./locations";

const db = SQLite.openDatabase("ui.db");

export const createTableLastSync = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS lastSync (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            stepId INTEGER NOT NULL,
            runningInfoId INTEGER,
            locationId INTEGER
        );`,
        [],
        () => {
          console.log("create table lastSync success");
          resolve(true);
        },
        (error) => {
          reject(error);
        },
      );
    });
  });
};

export const updateIdsLastSync = ({ stepId, runningInfoId, locationId }) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO lastSync (stepId, runningInfoId, locationId)
            VALUES (${stepId}, ${runningInfoId}, ${locationId});`,
        );
      },
      [],
      () => {
        console.log("update ids lastSync success");
        resolve("updateIdsLastSync success");
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const getIdsLastSync = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM lastSync
        ORDER by id DESC
        LIMIT 1`,
        [],
        (tx, result) => {
          const ids =
            result?.rows?._array?.length > 0 ? result.rows._array[0] : 0;
          resolve(ids);
        },
        (error) => {
          reject(error);
        },
      );
    });
  });
};

export const sync = async (userId) => {
  try {
    const {
      stepId = 0,
      runningInfoId = 0,
      locationId = 0,
    } = await getIdsLastSync();

    let lastIds = {
      stepId: 0,
      runningInfoId: 0,
      locationId: 0,
    };
    let data = {
      id: userId,
    };
    // handle sync steps
    const stepsSync = await getStepById(stepId);
    if (stepsSync.length > 0) {
      data.steps = stepsSync;
    }

    // hanlde sync runningInfos
    const runningInfosSync = await getRunningInfosById(runningInfoId);
    if (runningInfosSync.length > 0) {
      data.runningInfos = runningInfosSync;
    }

    // handle sync locations
    const locationsSync = await getTheLocationsById(locationId);
    if (locationsSync.length > 0) {
      data.locations = locationsSync;
    }

    console.log("sync data", data);

    if (data.steps || data.runningInfos || data.locations) {
      const resSync = await SyncService(data);
      console.log(resSync, lastIds);
      if (resSync && resSync.success === 1) {
        if (data.steps) {
          const lastStepId =
            stepsSync?.length > 0 ? stepsSync[stepsSync.length - 1].id : 0;
          lastIds.stepId = lastStepId;
        }

        if (data.runningInfos) {
          const lastRunningInfoId =
            runningInfosSync?.length > 0
              ? runningInfosSync[runningInfosSync.length - 1].id
              : 0;
          lastIds.runningInfoId = lastRunningInfoId;
        }

        if (data.locations) {
          const lastLocationId =
            locationsSync?.length > 0
              ? locationsSync[locationsSync.length - 1]
              : 0;
          lastIds.locationId = lastLocationId;
        }

        if (lastIds) {
          await updateIdsLastSync(lastIds);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const StepSyncToLocal = async (userId) => {
  try {
    const res = await SyncedServiceToLocal(userId);
    console.log("syncRes", res);
    if (res && res.success === 1 && res.data) {
      let lastIds = {
        stepId: null,
        runningInfoId: null,
        locationId: null,
      };
      if (res.data.syncedSteps) {
        const lastStepId =
          res?.data?.syncedSteps?.length > 0
            ? res?.data?.syncedSteps.length
            : 0;
        lastIds.stepId = lastStepId;
        await res?.data?.syncedSteps?.map(async (step) => {
          await insertSyncStep(step.date, step.value, step.type);
        });
      }

      if (res.data.runningInfos) {
        const lastRunningInfoId = res.data.runningInfos.length;

        lastIds.runningInfoId = lastRunningInfoId;
        const syncedLocations = await res.data.runningInfos.reduce(
          async (locations, runningInfo) => {
            await insertRunningInfo({
              target: runningInfo.target,
              isStarted: runningInfo.isStarted ? 1 : 0,
              isStopped: runningInfo.isStopped ? 1 : 0,
              createdAt: runningInfo.createdAt,
              updatedAt: runningInfo.updatedAt,
            });

            return [...locations, ...runningInfo.locations];
          },
          [],
        );

        const lastLocationId = syncedLocations.length;
        lastIds.locationId = lastLocationId;
        await syncedLocations.map(async (location) => {
          await insertLocation(location);
        });
      }

      await updateIdsLastSync(lastIds);
    }
  } catch (error) {
    console.log("StepSyncToLocal", error);
  }
};
