import {
  getStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getFile,
} from "../model/students.js";
import {
  namesHtml,
  studentHtml,
  allStudentsHtml,
  editStudentHtml,
  confirmDeleteHtml,
} from "../view/students.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { required, validateSchema } from "../tools/validation.js";
import { newItemSchema } from "../schema/newItemSchema.js";

export function displayNameController(req) {
  //get the names from database, we have imported db
  const students = getStudents();
  //each name should be converted into li tag and at the end it will wrapped into ul
  const content = namesHtml(students, "");
  //then pass this html in displayGrade function
  const headers = new Headers({ "content-type": "text/html" });
  //return new Response(displayNames(content), { headers });
  return new Response(render(content, req, headers), { headers });
}
export function displayDataController({ req, sid }) {
  const student = getStudent(sid);

  const content = studentHtml(student);
  const headers = new Headers({ "content-type": "text/html" });
  //return new Response(displayData(content), { headers });
  return new Response(render(content, req, headers), { headers });
}
/* export function imageController(fileId) {
  const fileData = getFile(fileId);
  return new Response(fileData.bytes, {
    headers: {
      "Content-Type": fileData.type,
    },
  });
} */
export function imageController({ fileId }) {
  console.log(fileId);
  const file = getFile(fileId);
  return new Response(file);
}

export async function createStudentController(req) {
  const formData = await req.formData();
  const n = formData.get("sname"); //here sname is the name property of input element we created in vieww
  const m = formData.get("smarks"); //here smakrs is the name property of input element we created in vieww
  const img = formData.get("simage");

  //here we do some validation
  const { errors } = validateSchema(formData, newItemSchema);
  if (errors.sname.error || errors.smarks.error) {
    const students = getStudents();
    const content = namesHtml(students, { errors });
    const headers = new Headers({ "content-type": "text/html" });
    return new Response(render(content, req, headers), { headers });
  }

  createStudent(n, m, img);
  //return redirect("/", "test");
  return redirect("/", `Added '${n}' to the list`);
}

// Display all students
export function allStudentsController(req) {
  const students = getStudents();
  const content = allStudentsHtml(students);
  const headers = new Headers({ "content-type": "text/html" });
  return new Response(render(content, req, headers), { headers });
}

// Show edit page
export function editStudentController({ req, sid }) {
  const student = getStudent(sid);
  const content = editStudentHtml(student);
  const headers = new Headers({ "content-type": "text/html" });
  return new Response(render(content, req, headers), { headers });
}

// Save edited student
export async function updateStudentController({ req, sid }) {
  const formData = await req.formData();

  const sname = formData.get("sname");
  const smarks = formData.get("smarks");

  updateStudent(sid, sname, smarks);

  return redirect("/allStudents");
}

export function confirmDeleteController({ req, sid }) {
  const student = getStudent(sid);

  const content = confirmDeleteHtml(student);

  const headers = new Headers({ "content-type": "text/html" });
  return new Response(render(content, req, headers), { headers });
}

// Delete student
export function deleteStudentController({ req, sid }) {
  deleteStudent(sid);

  return redirect("/allStudents");
}
