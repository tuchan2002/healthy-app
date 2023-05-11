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
            isStopped BOOLEAN DEFAULT(0),
            createdAt DATE NOT NULL,
            updatedAt DATE NOT NULL
        );`,
        [],
        () => {
          console.log("create table running_info success");
          resolve({
            success: 1,
            message: "Create table running_infos success",
          });
        },
        (error) => {
          console.log("createTableRunningInfos error");
          reject({ success: 0, message: error.message });
        },
      );
    });
  });
};

export const insertRunningInfo = ({
  target,
  isStarted,
  isStopped = 0,
  createdAt,
  updatedAt,
}) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        const query = `INSERT INTO running_infos (target, isStarted, createdAt, updatedAt)
            VALUES (${target}, ${isStarted}, "${createdAt || new Date()}", "${
          updatedAt || new Date()
        }");`;
        tx.executeSql(query);
      },
      [],
      () => {
        console.log("insert success");
        resolve("insert success");
      },
      (error) => {
        console.log("insertRunningInfo error");
        reject("Error insert running_infos:" + error.message);
      },
    );
  });
};

export const updateRunningInfo = ({ runningInfoId }) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        const query = `UPDATE running_infos SET isStopped = 1 WHERE id = ${runningInfoId};`;
        tx.executeSql(query);
      },
      [],
      () => {
        resolve({ success: 1, message: "update running info success" });
      },
      (error) => {
        console.log("updateRunningInfo error");

        reject("Error update running_infos:" + error.message);
      },
    );
  });
};

export const getTheLastRunningInfo = () => {
  return new Promise((resolve, reject) => {
    const DATE_FROM = new Date();
    DATE_FROM.setHours(0, 0, 0, 0);
    const query = `SELECT * FROM running_infos WHERE isStarted = 1 AND isStopped = 0 ORDER BY id DESC LIMIT 1;`;
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (transact, resultset) => {
          resolve(resultset?.rows?._array);
        });
      },
      (error) => {
        console.log("getTheLastRunningInfo error");

        reject(error);
      },
    );
  });
};

export const getRunningInfosById = (runningInfoId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM running_infos WHERE id > ${
      runningInfoId || 0
    };`;
    console.log(query);
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (transact, resultset) => {
          resolve(resultset?.rows?._array);
        },
        (error) => reject(error),
      );
    });
  });
};
