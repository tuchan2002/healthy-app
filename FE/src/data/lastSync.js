import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ui.db");

export const createTableLocations = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS lastSync (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            typeId INTEGER NOT NULL
        );`,
        [],
        () => console.log("create table lastSync success"),
        (error) => console.log("Error create table lastSync: ", error)
      );
    });
  } catch (error) {
    console.log(error);
  }
};
