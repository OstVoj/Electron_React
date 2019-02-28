import utility from '../utils/utility';

const SQL = require('sql.js');
const fs = require('fs');
const path = require('path');

const initDb = (appPath: string, callBack) => {
  const dbPath = path.join(appPath, 'adam602.db');
  const db = SQL.dbOpen(dbPath);
  if (db === null) {
    /* The file doesn't exist so create a new database. */
    createDb(dbPath);
  } else {
    /*
      The file is a valid sqlite3 database. This simple query will demonstrate
      whether it's in good health or not.
    */
    const query = 'SELECT count(*) as `count` FROM `sqlite_master`';
    const row = db.exec(query);
    const tableCount = parseInt(row[0].values);
    if (tableCount === 0) {
      console.log('The file is an empty SQLite3 database.');
      createDb(dbPath);
    } else {
      console.log('The database has', tableCount, 'tables.');
    }
    if (typeof callback === 'function') {
      callback();
    }
  }
};

const createDb = (dbPath: string) => {
  // Create a database.
  const db = new SQL.Database();
  const query = fs.readFileSync(
    path.join(__dirname, '../db', 'db.sql'),
    'utf8'
  );
  const result = db.exec(query);
  if (
    Object.keys(result).length === 0 &&
    typeof result.constructor === 'function' &&
    SQL.dbClose(db, dbPath)
  ) {
    console.log('Created a new database.');
  } else {
    console.log('model.initDb.createDb failed.');
  }
};

const addIndividual = (dbPath: string, jsonData: string, callback) => {
  const refId = utility.getRandomInt();
  const tableName = 'individuals';
  const keyValue = {
    columns: ['refId', 'jsonData'],
    values: [refId, jsonData]
  };
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = 'INSERT OR REPLACE INTO `' + tableName;
    query += '` (`' + keyValue.columns.join('`, `') + '`)';
    query += ' VALUES (' + placeHoldersString(keyValue.values.length) + ')';
    let statement = db.prepare(query);
    try {
      if (statement.run(keyValue.values)) {
        console.log('saved');
      } else {
        console.log('model.saveFormData', 'Query failed for', keyValue.values);
      }
    } catch (error) {
      console.log('model.saveFormData', error.message);
    } finally {
      SQL.dbClose(db, dbPath);
      if (typeof callback === 'function') {
        callback();
      }
    }
  }
};

const updateIndividual = (dbPath: string, jsonData: string, refId: number, callback) => {
  const tableName = 'individuals';
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = 'UPDATE `' + tableName + '`';
    query += ' SET ';
    query += '`jsonData`=\'' + jsonData + '\'';
    query += ' WHERE `refId` IS ?';
    let statement = db.prepare(query);

    try {
      if (statement.run([refId])) {
        console.log('saved');
      } else {
        console.log('model.saveFormData', 'Query failed for', keyValue.values);
      }
    } catch (error) {
      console.log('model.saveFormData', error.message);
    } finally {
      SQL.dbClose(db, dbPath);
      if (typeof callback === 'function') {
        callback();
      }
    }
  }
};

const getIndividuals = (dbPath: string, callback) => {
  const db = SQL.dbOpen(dbPath)
  if (db !== null) {
    const query = 'SELECT * FROM `individuals`';
    try {
      let row = db.exec(query);
      if (row !== undefined && row.length > 0) {
        row = rowsFromSqlDataObject(row[0]);
        if (typeof callback === 'function') {
          callback(row);
        }
      } else {
        callback(null);
      }
    } catch (error) {
      console.log('model.getPeople', error.message);
    } finally {
      SQL.dbClose(db, dbPath);
    }
  } else {
    console.log('can not open db');
  }
};

const getIndividual = (dbPath: string, refId: number, callback) => {
  const db = SQL.dbOpen(dbPath)
  if (db !== null) {
    const query = 'SELECT * FROM `individuals` WHERE `refId` IS ?'
    const statement = db.prepare(query, [refId])
    try {
      if (statement.step()) {
        const values = [statement.get()];
        const columns = statement.getColumnNames();
        const row = rowsFromSqlDataObject({values: values, columns: columns});
        if (typeof callback === 'function') {
          callback(row);
        }
      } else {
        console.log('model.getPeople', 'No data found for person_id =', pid);
      }
    } catch (error) {
      console.log('model.getPeople', error.message);
    } finally {
      SQL.dbClose(db, dbPath);
    }
  }
};

const deleteIndividual = (dbPath: string, refId: number, callback) => {
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = 'DELETE FROM `individuals` WHERE `refId` IS ?';
    let statement = db.prepare(query);
    try {
      if (statement.run([refId])) {
      } else {
        console.log('model.deletePerson', 'No data found for person_id =', pid);
      }
    } catch (error) {
      console.log('model.deletePerson', error.message);
    } finally {
      SQL.dbClose(db, dbPath);
      if (typeof callback === 'function') {
        console.log('deleted');
        callback();
      }
    }
  }
};

const addRecord = (dbPath: string, officerId: string, type: string, jsonData: string, callback) => {
  const id = utility.getRandomInt();
  const tableName = 'records';
  const keyValue = {
    columns: ['officerId', 'type', 'jsonData'],
    values: [officerId, type, jsonData]
  };
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = 'INSERT OR REPLACE INTO `' + tableName;
    query += '` (`' + keyValue.columns.join('`, `') + '`)';
    query += ' VALUES (' + placeHoldersString(keyValue.values.length) + ')';
    let statement = db.prepare(query);
    try {
      if (statement.run(keyValue.values)) {
        console.log('saved');
      } else {
        console.log('model.saveFormData', 'Query failed for', keyValue.values);
      }
    } catch (error) {
      console.log('model.saveFormData', error.message);
    } finally {
      SQL.dbClose(db, dbPath);
      if (typeof callback === 'function') {
        callback();
      }
    }
  }
};

const placeHoldersString = (length: number) => {
  let places = '';
  for (let i = 1; i <= length; i++) {
    places += '?, ';
  }
  return /(.*),/.exec(places)[1];
};

SQL.dbOpen = (databaseFileName: string) => {
  try {
    return new SQL.Database(fs.readFileSync(databaseFileName));
  } catch (error) {
    console.log("Can't open database file.", error.message);
    return null;
  }
};

const rowsFromSqlDataObject = object => {
  let data = {};
  let i = 0;
  let j = 0;
  for (let valueArray of object.values) {
    data[i] = {};
    j = 0;
    for (let column of object.columns) {
      Object.assign(data[i], {[column]: valueArray[j]});
      j++;
    }
    i++;
  }
  return data;
}

SQL.dbClose = (databaseHandle, databaseFileName) => {
  try {
    const data = databaseHandle.export();
    const buffer = Buffer.alloc(data.length, data);
    fs.writeFileSync(databaseFileName, buffer);
    databaseHandle.close();
    return true;
  } catch (error) {
    console.log("Can't close database file.", error);
    return null;
  }
};

export default {
  initDb,
  addIndividual,
  getIndividuals,
  getIndividual,
  deleteIndividual,
  updateIndividual,
  addRecord
};
