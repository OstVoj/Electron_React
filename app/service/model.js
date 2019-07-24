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

const addIndividual = (
  dbPath: string,
  refId: number,
  jsonData: string,
  callback
) => {
  const tableName = 'individuals';
  const keyValue = {
    columns: ['refId', 'jsonData'],
    values: [refId, jsonData]
  };
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = `INSERT OR REPLACE INTO \`${tableName}`;
    query += `\` (\`${keyValue.columns.join('`, `')}\`)`;
    query += ` VALUES (${placeHoldersString(keyValue.values.length)})`;
    const statement = db.prepare(query);
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

const addVehicle = (
  dbPath: string,
  refId: number,
  jsonData: string,
  callback
) => {
  const tableName = 'vehicles';
  const keyValue = {
    columns: ['refId', 'jsonData'],
    values: [refId, jsonData]
  };
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = `INSERT OR REPLACE INTO \`${tableName}`;
    query += `\` (\`${keyValue.columns.join('`, `')}\`)`;
    query += ` VALUES (${placeHoldersString(keyValue.values.length)})`;
    const statement = db.prepare(query);
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

const updateIndividual = (
  dbPath: string,
  jsonData: string,
  refId: number,
  callback
) => {
  const tableName = 'individuals';
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = `UPDATE \`${tableName}\``;
    query += ' SET ';
    query += `\`jsonData\`='${jsonData}'`;
    query += ' WHERE `refId` IS ?';
    const statement = db.prepare(query);

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
  const db = SQL.dbOpen(dbPath);
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
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    const query = `SELECT * FROM \`individuals\` WHERE \`refId\`=${refId}`;
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
  }
};

const deleteIndividual = (dbPath: string, refId: number, callback) => {
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    const query = 'DELETE FROM `individuals` WHERE `refId` IS ?';
    const statement = db.prepare(query);
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

const getVehicle = (dbPath: string, refId: number, callback) => {
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    const query = `SELECT * FROM \`vehicles\` WHERE \`refId\`=${refId}`;
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
  }
};

const deleteVehicle = (dbPath: string, refId: number, callback) => {
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    const query = 'DELETE FROM `vehicles` WHERE `refId` IS ?';
    const statement = db.prepare(query);
    try {
      if (statement.run([refId])) {
      } else {
        console.log('model.deletePerson', 'No data found for person_id =');
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

const addRecord = (
  dbPath: string,
  id: number,
  officerId: string,
  type: string,
  recordType: string,
  jsonData: string,
  callback
) => {
  const tableName = 'records';
  const keyValue = {
    columns: ['id', 'officerId', 'type', 'recordType', 'jsonData'],
    values: [id, officerId, type, recordType, jsonData]
  };
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = `INSERT OR REPLACE INTO \`${tableName}`;
    query += `\` (\`${keyValue.columns.join('`, `')}\`)`;
    query += ` VALUES (${placeHoldersString(keyValue.values.length)})`;
    const statement = db.prepare(query);
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

const deleteRecord = (dbPath: string, id: number, callback) => {
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    const query = 'DELETE FROM `records` WHERE `id` IS ?';
    const statement = db.prepare(query);
    try {
      if (statement.run([id])) {
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

const getRecords = (dbPath: string) => {
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    const query = 'SELECT * FROM `records`';
    try {
      let row = db.exec(query);
      if (row !== undefined && row.length > 0) {
        row = rowsFromSqlDataObject(row[0]);
        const promise = new Promise(resolve => {
          resolve(row);
        });
        return promise.then(response => response).catch(err => err);
      }
      const promise = new Promise(resolve => {
        resolve(null);
      });
      return promise.then(response => response).catch(err => err);
    } catch (error) {
      console.log('model.getPeople', error.message);
    } finally {
      SQL.dbClose(db, dbPath);
    }
  } else {
    console.log('can not open db');
  }
};

const getRecordById = (dbPath: string, id: number, callback) => {
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    const query = 'SELECT * FROM `records` WHERE `id` IS ?';
    const statement = db.prepare(query, [id]);
    try {
      if (statement.step()) {
        const values = [statement.get()];
        const columns = statement.getColumnNames();
        const row = rowsFromSqlDataObject({ values, columns });
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

const addAttachment = (
  dbPath: string,
  refId: number,
  fileName: string,
  callback
) => {
  const tableName = 'attachments';
  const keyValue = {
    columns: ['refId', 'filename'],
    values: [refId, fileName]
  };
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    let query = `INSERT OR REPLACE INTO \`${tableName}`;
    query += `\` (\`${keyValue.columns.join('`, `')}\`)`;
    query += ` VALUES (${placeHoldersString(keyValue.values.length)})`;
    const statement = db.prepare(query);
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

const getAttachments = (dbPath: string, refId: number, callback) => {
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    const query = `SELECT * FROM \`attachments\` WHERE \`refId\`=${refId}`;
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
  }
};

const deleteAttachments = (dbPath: string, refId: number, callback) => {
  const db = SQL.dbOpen(dbPath);
  if (db !== null) {
    const query = 'DELETE FROM `attachments` WHERE `refId` IS ?';
    const statement = db.prepare(query);
    try {
      if (statement.run([refId])) {
      } else {
        console.log(
          'model.deletePerson',
          'No data found for person_id =',
          refId
        );
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
  const data = {};
  let i = 0;
  let j = 0;
  for (const valueArray of object.values) {
    data[i] = {};
    j = 0;
    for (const column of object.columns) {
      Object.assign(data[i], { [column]: valueArray[j] });
      j++;
    }
    i++;
  }
  return data;
};

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
  addVehicle,
  getIndividuals,
  getIndividual,
  deleteIndividual,
  getVehicle,
  deleteVehicle,
  updateIndividual,
  addRecord,
  deleteRecord,
  getRecords,
  getRecordById,
  getAttachments,
  addAttachment,
  deleteAttachments
};
