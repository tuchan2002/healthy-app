import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ui.db");

export const createTableSteps = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS steps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            value int not NULL
        )`,
        [],
        () => console.log("create success"),
        (error) => console.log(error)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const insertStep = (value) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO steps (value)
        VALUES (${value});`
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
        WHERE date(time) = date(CURRENT_DATE);`,
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
