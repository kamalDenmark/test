import { escape } from "@std/html";

const nameToLi = (student) =>
  `<li><a href= "/displayData/${student.id}">${student.name}</a></li>`;

/* const nameToLi = (student) =>
  `<li><a href= "/displayData/${student.id}">${escape(student.name)}</a></li>`; */

export function namesHtml(students, { errors = {} }) {
  //console.log("namesHtml");
  // console.log("errors:");
  // console.log(errors);
  const html = students.map(nameToLi);
  return `
  <ul>${html.join("")}</ul>
  <p>if we do not mention action in form element, then browser will submitt same rul and method is post. </p>
   <p> so url will be like http://localhost:8000/ </p>
  
  <form method="POST" enctype="multipart/form-data">
    <label for= "sname">Name: </label>
    <input id="sname" name="sname" value="${errors.sname?.value || ""}">
    <span class="error">${errors.sname?.message || ""}</span>
    <label for= "smarks">Marks: </label>
    <input id= "smarks" name="smarks" value="${errors.smarks?.value || ""}">
    <span class="error">${errors.smarks?.message || ""}</span>
    <br/>
    <br/>
    <label for= "simage">Upload Image: </label>
    <input id= "simage" name="simage" type="file" accept="image/*">
    <br/>
    <br/>
    <button type="submit">Add Student</button>
  </form>
  `;
}

/* export function namesHtml(students, errors) {
  //console.log(students);
  const html = students.map(nameToLi);
  return `
  <ul>${html.join("")}</ul>
  <p>if we do not mention action in form element, then browser will submitt same rul and method is post. </p>
   <p> so url will be like http://localhost:8000/ </p>
  
  <form method="POST">
    <label for= "sname">Name: </label>
    <input id= "sname" name="sname">
    <label for= "smarks">Marks: </label>
    <input id= "smarks" name="smarks" value="${errors || ""}">
    <span class="error">${errors || ""}</span>
    <button type="submit">Add Student</button>
  </form>
  `;
} */
export function studentHtml(studentData) {
  return `<h1>Student Data</h1>
    <p>Name of studnet is: ${studentData.name}</p>
    <p>marks of studnet is: ${studentData.marks}</p>
    <img src="/images/${studentData.fileId}" style="width: 100%">
    `;
}
// Display all students in a table
export function allStudentsHtml(students) {
  const rows = students.map((student) => {
    return `
      <tr>
        <td>${student.name}</td>
        <td>${student.marks}</td>

        <td>
        /*here no form element so mehtod is GET and browser will submit url like http://localhost:8000/edit/1
         where 1 is student id. because in href we say 
        
        */
          <a href="/edit/${student.id}">Edit</a>
        </td>

        <td>
          <a href="/confirmDelete/${student.id}">Delete</a>
        </td>
      </tr>
    `;
  });

  return `
    <h1>All Students</h1>

    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Marks</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        ${rows.join("")}
      </tbody>
    </table>

  `;
}

// Edit student form
export function editStudentHtml(student) {
  return `
    <h1>Edit Student</h1>
    /*here action is telling that url be like http://localhost:8000/edit/1 where 1 is student id and
    method is post*/
    <form method="POST" action="/edit/${student.id}">

      <label for="sname">Name:</label>
      <input
        id="sname"
        name="sname"
        value="${student.name}"
      >

      <br><br>

      <label for="smarks">Marks:</label>
      <input
        id="smarks"
        name="smarks"
        value="${student.marks}"
      >

      <br><br>

      <button type="submit">Save</button>
    </form>

    
  `;
}
export function confirmDeleteHtml(student) {
  return `
    <h1>Delete Student</h1>

    <p>
      Are you sure you want to delete
      <strong>${student.name}</strong>?
    </p>

    <p>Marks: ${student.marks}</p>

    <form method="POST" action="/delete/${student.id}">
      <button type="submit">OK</button>
    </form>

    <p>
      <a href="/allStudents">Cancel</a>
    </p>
  `;
}
