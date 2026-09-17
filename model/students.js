import { db } from "../tools/db.js";

export function getStudents() {
  //getting all students from students
  return db.prepare("select id, name, marks from students; ").all();
}
export function getStudent(sid) {
  //comment added in getStudent
  return db
    .prepare("select id, name, marks, fileId from students where id = ?; ")
    .get(sid);
}
export async function createStudent(sname, smarks, file) {
  /* const sqlStatement = `INSERT INTO students (name, marks)
         VALUES ('${sname}', '${smarks}')`;
  console.log("sqlStatement");
  console.log(sqlStatement);
  db.exec(sqlStatement); */
  const fileRecord = await createFile(file);
  db.prepare(
    `
        INSERT INTO students (name, marks, fileId)
        VALUES (:sname, :smarks, :fileId)
    `,
  ).run({ sname, smarks, fileId: fileRecord.id });
  /* db.prepare("INSERT INTO students (name, marks) VALUES (?, ?)").run(
    sname,
    smarks,
  ); */
  /* db.prepare("insert into students (name, marks) values ($sname, $smarks)").run(
    { $sname: snmae, $smarks: smarks },
  ); */
}
export async function createFile(file) {
  const { name, type } = file;
  const bytes = await file.bytes();
  return db
    .prepare(
      `
        INSERT INTO files(name, type, bytes)
        VALUES (:name, :type, :bytes )
        RETURNING id;
    `,
    )
    .get({ name, type, bytes });
}
export function getFile(fileId) {
  const { type, name, bytes } = db
    .prepare(`SELECT * FROM files WHERE id=:fileId`)
    .get(fileId);
  return new File([bytes], name, { type });
}

export function updateStudent(sid, sname, smarks) {
  db.prepare(
    "update students set name = $sname, marks = $smarks where id = $sid",
  ).run({
    $sid: sid,
    $sname: sname,
    $smarks: smarks,
  });
}

export function deleteStudent(sid) {
  db.prepare("delete from students where id = $sid").run({
    $sid: sid,
  });
}
