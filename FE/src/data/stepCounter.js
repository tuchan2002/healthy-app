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
        () => console.log("create table step success"),
        (error) => {
          console.log("create table step error: ");
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
        resolve("insert steps success");
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
          console.log("getStepByDate success");
          resolve(resultset?.rows?._array);
        },
        (error) => {
          console.log("getStepByDate error");
          reject(error);
        }
      );
    });
  });
};

export const getStepByMonth = (month = "2023-04-28") => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT count(*) as stepsCount,strftime('%d', "date") as type from steps
        WHERE strftime('%Y-%m', "date") = strftime('%Y-%m', ?)
        GROUP BY strftime('%d', "date");`,
        [month],
        (transact, resultset) => {
          console.log("getStepByMonth success");
          resolve(resultset?.rows?._array);
        },
        (error) => {
          console.log("getStepByMonth error");
          reject(error);
        }
      );
    });
  });
};

export const getStepByYear = (month = "2023-04-28") => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT count(*) as stepsCount,strftime('%m', "date") as type from steps
        WHERE strftime('%Y', "date") = strftime('%Y', ?)
        GROUP BY strftime('%m', "date");`,
        [month],
        (transact, resultset) => {
          console.log("getStepByYear success");
          resolve(resultset?.rows?._array);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};
