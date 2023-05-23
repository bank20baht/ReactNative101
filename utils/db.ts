import SQLite from 'react-native-sqlite-storage';

export const openDatabase = () => {
  const db = SQLite.openDatabase(
    {
      name: 'test2.db',
      location: 'default',
    },
    () => {
      console.log('Database opened successfully');
    },
    error => {
      console.error('Failed to open database: ', error);
    },
  );

  return db;
};

export const createTable = (db: any) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, listName TEXT, info TEXT, date TEXT, status TEXT)',
      [],
      (_: any, result: any) => {
        console.log('Table created successfully');
      },
      (error: any) => {
        console.error('Failed to create table: ', error);
      },
    );
  });
};
