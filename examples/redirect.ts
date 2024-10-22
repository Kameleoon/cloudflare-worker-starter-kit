import { KameleoonClient } from "@kameleoon/nodejs-sdk";
import { WorkerRequester } from "./requester";
import { WorkerVisitorCodeManager } from "./visitorCodeManager";
import { WorkerEventSource } from "./eventSource";

// -- Define constant values
const SITE_CODE = "my_site_code";
const CLIENT_ID = "my_client_id";
const CLIENT_SECRET = "my_client_secret";
const FEATURE_KEY = "my_feature_key";

// -- Handle incoming requests
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});

// -- Cache the Kameleoon client between requests
let client: KameleoonClient;
let isInitialized = false;

async function handleRequest(event: FetchEvent) {
  // -- Create and initialize the Kameleoon client
  if (!client) {
    client = new KameleoonClient({
      siteCode: SITE_CODE,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      externals: {
        // - Setting the SDK configuration cache TTL to 60 minutes (3600 seconds)
        requester: new WorkerRequester(3600),
        eventSource: new WorkerEventSource(),
        visitorCodeManager: new WorkerVisitorCodeManager(),
      },
    });
  }

  if (!isInitialized) {
    isInitialized = await client.initialize();
  }

  const headers = new Headers();
  headers.set("Content-Type", "text/plain");

  // -- Get the visitor code using the custom visitor code manager
  const visitorCode = client.getVisitorCode({
    input: event.request.headers,
    output: headers,
  });

  // -- Get the feature flag variation key
  const variationKey = client.getFeatureFlagVariationKey(
    visitorCode,
    FEATURE_KEY
  );

  // -- Redirect the visitor to a specific URL if the variation key is "off"
  if (variationKey === "off") {
    const destinationURL = "https://example.com";
    const statusCode = 301;

    return Response.redirect(destinationURL, statusCode);
  }

  return new Response(
    "Welcome to Kameleoon Starter Kit!\n" +
      `My visitor code is: ${visitorCode}\n` +
      `My variation is: ${variationKey}`,
    { status: 200, headers }
  );
}
