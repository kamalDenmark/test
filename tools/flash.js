import { encodeBase64Url, decodeBase64Url } from "@std/encoding";
import { setCookie } from "@std/http/cookie";
import { deleteCookie, getCookies } from "@std/http";
export function setFlash(headers, message) {
  setCookie(headers, {
    name: "flash",
    value: encodeBase64Url(message),
    path: "/",
  });
}

export function getFlash(requestHeaders, responseHeaders) {
  const { flash } = getCookies(requestHeaders);
  if (flash) {
    deleteCookie(responseHeaders, "flash", { path: "/" });
  }
  /* console.log("getFlash");
  console.log(flash); */
  const decodedMsg = new TextDecoder().decode(decodeBase64Url(flash));
  return decodedMsg;
}
