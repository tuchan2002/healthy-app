import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ui.db");
const startDay = new Date(
  new Date().getTime() + 7 * 60 * 60 * 1000
).setUTCHours(0, 0, 0, 0);
export const createTableSteps = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS steps (
        	id INTEGER PRIMARY KEY AUTOINCREMENT,
          date date NOT NULL DEFAULT (date(current_timestamp,'localtime')),
          value int not NULL,
          type int not null default 0);`,
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
  const time = new Date(new Date().getTime() + 7 * 60 * 60 * 1000).getTime();
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
        WHERE date = date(CURRENT_timestamp,'localtime')`,
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

export const getStepByDate = (date = "2023-04-28") => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT type,count(*) as stepsCount from steps
        WHERE date = ?
        GROUP BY type;`,
        [date],
        (transact, resultset) => {
          resolve(resultset?.rows?._array);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};
