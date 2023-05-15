import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ui.db");

export const createTableLocations = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE table if not EXISTS locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            runningInfoId INTEGER NOT NULL,
            longitude FLOAT NOT NULL,
            latitude FLOAT NOT NULL,
            speed FLOAT NOT NULL,
            createdAt DATE NOT NULL
        );`,
        [],
        () => {
          console.log("create table locations success");
          resolve(true);
        },
        (error) => {
          console.log("Error create table locations: ", error);
          reject(false);
        },
      );
    });
  });
};

export const insertLocation = (location) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = `INSERT INTO locations (runningInfoId, longitude, latitude, speed, createdAt)
            VALUES (${location.runningInfoId}, ${location.longitude}, ${
        location.latitude
      }, ${location.speed}, "${location.createdAt || new Date()}");`;
      tx.executeSql(
        query,
        [],
        () => {
          console.log("Insert location success");
          resolve("insert success");
        },
        (error) => {
          console.log("Error insert location: ", error);
          reject("Error insert location:" + error.message);
        }
      );
    });
  });
};

export const getTheLastLocation = () => {
  return new Promise((resolve, reject) => {
    const DATE_FROM = new Date();
    DATE_FROM.setHours(0, 0, 0, 0);
    const query = `SELECT * FROM locations WHERE createdAt >= "${DATE_FROM}" AND createdAt <= "${new Date()}" LIMIT 1;`;
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (transact, resultset) => {
          resolve(resultset?.rows?._array);
        });
      },
      (error) => reject(error)
    );
  });
};

export const getTheRunningLocation = (runningInfoId) => {
  return new Promise((resolve, reject) => {
    const DATE_FROM = new Date();
    DATE_FROM.setHours(0, 0, 0, 0);
    const query = `SELECT * FROM locations WHERE createdAt >= "${DATE_FROM}" AND createdAt <= "${new Date()}" AND runningInfoId = ${runningInfoId} AND speed >= 0.08333 AND speed <= 0.33333;`;
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (transact, resultset) => {
          resolve(resultset?.rows?._array);
        });
      },
      (error) => reject(error)
    );
  });
};

export const getTheLocation = (runningInfoId) => {
  return new Promise((resolve, reject) => {
    const DATE_FROM = new Date();
    DATE_FROM.setHours(0, 0, 0, 0);
    const query = `SELECT * FROM locations WHERE createdAt >= "${DATE_FROM}" AND createdAt <= "${new Date()}" AND runningInfoId = ${runningInfoId};`;
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (transact, resultset) => {
          resolve(resultset?.rows?._array);
        });
      },
      (error) => reject(error)
    );
  });
};

export const getAllLocations = () => {
  return new Promise((resolve, reject) => {
    const DATE_FROM = new Date();
    DATE_FROM.setHours(0, 0, 0, 0);
    const query = `SELECT * FROM locations WHERE createdAt >= "${DATE_FROM}" AND createdAt <= "${new Date()}";`;
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (transact, resultset) => {
          resolve(resultset?.rows?._array);
        });
      },
      (error) => reject(error)
    );
  });
};

export const getTheLocationsById = (locationId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM locations WHERE id > ${locationId || 0};`;
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (transact, resultset) => {
          resolve(resultset?.rows?._array);
        },
        (error) => reject(error)
      );
    });
  });
};
