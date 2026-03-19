import { IExternalEventSource } from "@kameleoon/nodejs-sdk";

// Cloudflare Workers do not support EventSource, so real-time configuration
// updates are unavailable in this environment.
export class WorkerEventSource implements IExternalEventSource {
  public open(): void {
    throw new Error("Real-time updates are not supported in Cloudflare Workers");
  }

  public close(): void {}
}
