import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ui.db");

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
        },
      );
    });
  });
};
