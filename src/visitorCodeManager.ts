import {
  KameleoonUtils,
  GetDataCustomParametersType,
  SetDataCustomParametersType,
  IExternalCustomVisitorCodeManager,
} from "@kameleoon/nodejs-sdk";

// -- Custom Implementation of Kameleoon Visitor Code Manager
//    for CloudFlare Worker
export class WorkerVisitorCodeManager
  implements IExternalCustomVisitorCodeManager
{
  // - Get the visitor code from the CloudFlare event request headers
  getData(params: GetDataCustomParametersType): string | null {
    const { key, input } = params;

    const headers = input as Headers;
    const cookieStr = headers.get("Cookie");

    if (!cookieStr) {
      return null;
    }

    return KameleoonUtils.getCookieValue(cookieStr, key);
  }

  // - Set the visitor code in the CloudFlare response headers
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
