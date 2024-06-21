import {
  RequestType,
  IExternalRequester,
  KameleoonResponseType,
  SendRequestParametersType,
  KameleoonUtils,
} from "@kameleoon/nodejs-sdk";

// -- Custom Implementation of Kameleoon Requester
//    for CloudFlare Worker
export class WorkerRequester implements IExternalRequester {
  private ttl: number;

  constructor(ttl: number) {
    this.ttl = ttl;
  }

  // - Send the request to the Kameleoon API
  //   If the request type is `Configuration`, cache the response for the specified TTL
  public async sendRequest({
    url,
    requestType,
    parameters,
  }: SendRequestParametersType<RequestType>): Promise<KameleoonResponseType> {
    if (requestType === RequestType.Configuration) {
      const response = await fetch(url, {
        ...parameters,
        cf: { cacheTtl: this.ttl },
      });

      const config = await response.text();

      return KameleoonUtils.simulateSuccessRequest(
        requestType,
        JSON.parse(config)
      );
    }

    return (await fetch(url, parameters)) as KameleoonResponseType;
  }
}
