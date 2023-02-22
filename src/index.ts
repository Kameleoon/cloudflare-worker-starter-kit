import { v4 } from "uuid";
import cookie from "cookie";
import { KameleoonClient } from "kameleoon-client-javascript";
import { getConfigDataFile } from "./helpers";

const KAMELEOON_USER_ID = "kameleoon_user_id";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event: FetchEvent) {
  const cookies = cookie.parse(event.request.headers.get("Cookie") || "");

  // Fetch user id from the cookie if available to make sure that results are sticky.
  const visitorCode = cookies[KAMELEOON_USER_ID] || v4();

  // Fetch config file from Kameleoon CDN and cache it using cloudflare for given number of seconds
  // Get the siteCode from Kameleoon Platform
  const configDataFile = await getConfigDataFile("YOUR_SITE_CODE", 600);
  const parsedConfigDataFile = JSON.parse(configDataFile);

  // Initialize the KameleoonClient
  const kameleoonClient = new KameleoonClient(
    // Get the siteCode from Kameleoon Platform
    "YOUR_SITE_CODE",
    // Add the necessary configurations. For example {environment: production}
    {},
    /***
     * @param configDataFile - Fetched and cached configDataFile from cdn
     */
    { configDataFile: parsedConfigDataFile }
  );

  // Use kameleoonClient instance to access SDK methods
  const variationKey = kameleoonClient.getFeatureVariationKey(
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
