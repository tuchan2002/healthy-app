import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ui.db");

export const createTableRunningInfos = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS running_infos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            target INTEGER NOT NULL,
            isStarted BOOLEAN DEFAULT(0),
            createdAt DATE NOT NULL
        );`,
        [],
        () =>
          resolve({
            success: 1,
            message: "Create table running_infos success",
          }),
        (error) => reject({ success: 0, message: error.message }),
      );
    });
  });
};

export const insertRunningInfo = ({ target, isStarted }) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        const query = `INSERT INTO running_infos (target, isStarted, createdAt)
            VALUES (${target}, ${isStarted}, "${new Date()}");`;
        console.log(query);
        tx.executeSql(query);
      },
      [],
      () => {
        console.log("insert success");
        resolve("insert success");
      },
      (error) => {
        console.log("error");
        reject("Error insert running_infos:" + error.message);
      },
    );
  });
};

export const getTheLastRunningInfo = () => {
  return new Promise((resolve, reject) => {
    const DATE_FROM = new Date();
    DATE_FROM.setHours(0, 0, 0, 0);
    const query = `SELECT * FROM running_infos WHERE createdAt >= "${DATE_FROM}" AND createdAt <= "${new Date()}" ORDER BY createdAt DESC LIMIT 1;`;
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (transact, resultset) => {
          resolve(resultset?.rows?._array);
        });
      },
      (error) => reject(error),
    );
  });
};
