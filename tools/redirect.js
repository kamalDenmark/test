import { setFlash } from "./flash.js";
export function redirect(location, message) {
  const headers = new Headers({ location });
  if (message) {
    setFlash(headers, message);
  }
  return new Response(null, { headers, status: 303 });
}
