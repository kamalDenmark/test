import { escape } from "@std/html";
import { getFlash } from "./flash.js";

export function render(content, req, responseHeaders) {
  //console.log("render");
  //const { request } = req;

  const flashMessage = getFlash(req.headers, responseHeaders);
  const cookieHtml = `
  <aside>
  <p>${escape(flashMessage)}</p>
  </aside>
  `;

  //must be full html page where should it come from
  return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<header>
    <nav>
        <a href="/">Home</a>
        <a href="/allStudents">All Students</a>
        
    </nav>
</header>
<main>
    ${cookieHtml}
    ${content}
    </main>
    <footer></footer>
</body>
</html>
    `;
}
