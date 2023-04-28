import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ui.db");
const startDay = new Date().setUTCHours(0, 0, 0, 0);
export const createTableSteps = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS steps (
        	id INTEGER PRIMARY KEY AUTOINCREMENT,
          date date NOT NULL DEFAULT CURRENT_DATE,
          value int not NULL,
          type int not null default 0)`,
        [],
        () => console.log("create success"),
        (error) => {
          console.log("create error: ");
          console.log(error);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const insertStep = (value) => {
  const time = new Date().getTime();
  const type = Math.floor((time - startDay) / (1000 * 60 * 15));
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO steps (value,type)
            VALUES (${value},${type});`
        );
      },
      [],
      () => {
        resolve("insert success");
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getSteps = () => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql(`select * from  steps;`, [], (transact, resultset) => {
          console.log(resultset?.rows?._array);
        });
      },
      (error) => console.log(error)
    );
  } catch (error) {
    console.log(error);
  }
};

export const droptTable = (nameTable) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE ${nameTable}`,
        [],
        () => console.log("drop success"),
        (error) => console.log(error)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const countStepOfDay = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT count(*) as count from steps
        WHERE date = CURRENT_DATE`,
        [],
        (tx, result) => {
          resolve(result?.rows?._array[0]?.count);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};
