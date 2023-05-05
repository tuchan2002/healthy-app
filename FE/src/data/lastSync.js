import * as SQLite from "expo-sqlite";
import { getStepById, insertSyncStep } from "./stepCounter";
import { SyncStepService, SyncedStepServiceToLocal } from "../services/user";

const db = SQLite.openDatabase("ui.db");

export const createTableLastSync = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS lastSync (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            stepId INTEGER NOT NULL
        );`,
        [],
        () => {
          console.log("create table lastSync success");
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

export const updateStepIdLastSync = (value) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO lastSync (stepId)
            VALUES (${value});`
        );
      },
      [],
      () => {
        console.log("update stepId lastSync success");
        resolve("updateStepIdLastSync success");
      },
      (error) => {
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
            LIMIT 1`,
        [],
        (tx, result) => {
          const stepId =
            result?.rows?._array[0]?.length > 0 ? result.rows[0].stepId : 0;
          resolve(stepId);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

export const StepSync = async (userId) => {
  try {
    const stepId = await getStepIdLastSync();
    const stepsSync = await getStepById(stepId);
    const data = {
      id: userId,
      steps: stepsSync,
    };
    const resSync = await SyncStepService(data);
    console.log(resSync);
    if (resSync && resSync.success === 1) {
      const lastStepId =
        stepsSync?.length > 0 ? stepsSync[stepsSync.length - 1].id : 0;
      await updateStepIdLastSync(lastStepId);
    }
  } catch (error) {
    console.log(error);
  }
};

export const StepSyncToLocal = async (userId) => {
  try {
    const res = await SyncedStepServiceToLocal(userId);
    console.log(res.success);
    if (res && res.success === 1 && res.data && res.data.syncedSteps) {
      res?.data?.syncedSteps?.map(async (step) => {
        await insertSyncStep(step.date, step.value, step.type);
      });
    }
  } catch (error) {
    console.log("StepSyncToLocal", error);
  }
};
