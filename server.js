import {
  displayNameController,
  displayDataController,
  createStudentController,
  allStudentsController,
  editStudentController,
  updateStudentController,
  confirmDeleteController,
  deleteStudentController,
  imageController,
} from "./controller/studentController.js";
import { getFile } from "./model/students.js";

const studentPattren = new URLPattern({ pathname: "/displayData/:sid" });
const editStudentPattern = new URLPattern({
  pathname: "/edit/:sid",
});
const confirmDeletePattern = new URLPattern({
  pathname: "/confirmDelete/:sid",
});
const deleteStudentPattern = new URLPattern({
  pathname: "/delete/:sid",
});
const imagePattern = new URLPattern({
  pathname: "/images/:fileId",
});

export async function server(req) {
  //console.log(req);
  //get the path from the request
  const url = new URL(req.url);

  if (url.pathname == "/" && req.method == "GET") {
    return displayNameController(req);
  }
  if (url.pathname == "/" && req.method == "POST") {
    return createStudentController(req);
  }

  const path = url.pathname;

  if (studentPattren.test(req.url) && req.method == "GET") {
    const match = studentPattren.exec(req.url);
    const { sid } = match.pathname.groups;
    return displayDataController({ req, sid });
  }

  if (imagePattern.test(req.url)) {
    const { fileId } = imagePattern.exec(req.url).pathname.groups;
    return imageController({ fileId });
  }
  // ALL STUDENTS - GET
  if (url.pathname == "/allStudents" && req.method == "GET") {
    return allStudentsController(req);
  }

  // EDIT STUDENT - GET
  if (editStudentPattern.test(req.url) && req.method == "GET") {
    const match = editStudentPattern.exec(req.url);
    const { sid } = match.pathname.groups;

    return editStudentController({ req, sid });
  }

  // EDIT STUDENT - POST
  if (editStudentPattern.test(req.url) && req.method == "POST") {
    const match = editStudentPattern.exec(req.url);
    const { sid } = match.pathname.groups;

    return updateStudentController({ req, sid });
  }

  if (confirmDeletePattern.test(req.url) && req.method == "GET") {
    const match = confirmDeletePattern.exec(req.url);
    const { sid } = match.pathname.groups;

    return confirmDeleteController({ req, sid });
  }
  // DELETE STUDENT - POST
  if (deleteStudentPattern.test(req.url) && req.method == "POST") {
    const match = deleteStudentPattern.exec(req.url);
    const { sid } = match.pathname.groups;

    return deleteStudentController({ req, sid });
  }

  return new Response("Page not found", { status: 404 });
}
