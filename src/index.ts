import { v4 } from "uuid";
import cookie from "cookie";
import { KameleoonClient } from "@kameleoon/nodejs-sdk";
import { getConfigDataFile } from "./helpers";

const KAMELEOON_USER_ID = "kameleoon_user_id";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event: FetchEvent) {
  const cookies = cookie.parse(event.request.headers.get("Cookie") || "");

  // Fetch user id from the cookie if available to make sure that results are sticky.
  // If you have your own unique user identifier, please replace v4() with it.
  const visitorCode = cookies[KAMELEOON_USER_ID] || v4();
  // Get the siteCode from Kameleoon Platform
  const siteCode = "YOUR_SITE_CODE";

  // Fetch config file from Kameleoon CDN and cache it using cloudflare for given number of seconds
  const configDataFile = await getConfigDataFile(siteCode, 600);
  const parsedConfigDataFile = JSON.parse(configDataFile);

  // Initialize the KameleoonClient
  const kameleoonClient = new KameleoonClient({
    siteCode,
    /***
     * @param {GetClientConfigurationResultType} externalClientConfiguration - Fetched and cached client configuration from cdn
     */
    integrations: {
      externalClientConfiguration: parsedConfigDataFile,
    },
  });

  // Run initialize before using the methods
  await kameleoonClient.initialize();

  // Use kameleoonClient instance to access SDK methods
  // You can refer to our developers documentation to find out more about methods
  const variationKey = kameleoonClient.getFeatureFlagVariationKey(
    visitorCode,
    "YOUR_FEATURE_KEY"
  );
  console.log(`The variationKey is ${variationKey}`);

  let headers = new Headers();
  headers.set("Content-Type", "text/plain");
  headers.set("Set-Cookie", cookie.serialize(KAMELEOON_USER_ID, visitorCode));

  return new Response(
    "Welcome to Kameleoon Starter Kit! Check logs for results",
    { status: 200, headers }
  );
}
