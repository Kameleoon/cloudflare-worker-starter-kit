import { IExternalEventSource } from "@kameleoon/nodejs-sdk";

// -- Custom Implementation of Kameleoon Event Source
//    for CloudFlare Worker
export class WorkerEventSource implements IExternalEventSource {
  // - The CloudFlare Worker does not support Real Time Updates
  public open(): void {
    throw new Error("Real Time Updates are not supported in Cloudflare Worker");
  }

  public close(): void {}
}
