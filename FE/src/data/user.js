import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ui.db");

export const createTableAuthUsers = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS auth_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            username VARCHAR(100),
            avatar VARCHAR(100),
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

export const insertUser = (authUser) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO auth_users (user_id, username, avatar)
        VALUES (${authUser.id}, ${authUser.username}, ${authUser.avatar});`
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

export const getAuthUserId = () => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql(`select user_id from auth_users limit 1;`, [], (transact, resultset) => {
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
