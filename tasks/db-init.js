import { db } from "../tools/db.js";

db.exec(`
      Drop table if exists students;
      Drop table if exists files;

CREATE TABLE students (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    marks INTEGER,
    fileId INTEGER,
    FOREIGN KEY (fileId) REFERENCES files(id)
);

CREATE TABLE files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    bytes BLOB NOT NULL
);


`);
