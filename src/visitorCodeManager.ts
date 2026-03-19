import {
  KameleoonUtils,
  GetDataCustomParametersType,
  SetDataCustomParametersType,
  IExternalCustomVisitorCodeManager,
} from "@kameleoon/nodejs-sdk";

// Persist the visitor code in cookies so the worker can read it on later
// requests without relying on browser-specific storage.
export class WorkerVisitorCodeManager
  implements IExternalCustomVisitorCodeManager
{
  // Read the visitor code from the request cookies.
  getData(params: GetDataCustomParametersType): string | null {
    const { key, input } = params;

    const headers = input as Headers;
    const cookieStr = headers.get("Cookie");

    if (!cookieStr) {
      return null;
    }

    return KameleoonUtils.getCookieValue(cookieStr, key);
  }

  // Store the visitor code in the response cookies for future requests.
  setData(params: SetDataCustomParametersType): void {
    const { key, visitorCode, domain, maxAge, path, output } = params;

    const headers = output as Headers;

    let cookieStr = `${key}=${visitorCode}; Max-Age=${maxAge}; Path=${path}`;

    if (domain) {
      cookieStr += `; Domain=${domain}`;
    }

    headers.set("Set-Cookie", cookieStr);
  }
}
