# Kameleoon + Cloudflare Worker Template

> Template to run Kameleoon Experimentation and Feature Flags on [Cloudflare Workers][1].

This Kameleoon Cloudflare Workers Template uses [Kameleoon NodeJS SDK][2] to provide out out-of-the-box experimentation and feature flagging on the edge.

## Contents

- [Pre-requisites](#pre-requisites)
- [Getting started](#getting-started)
- [Commands](#commands)
- [Technical details](#technical-details)
- [Additional resources](#additional-resources)

## Pre-requisites

- [Cloudflare account][3].
- [Kameleoon account][4].

## Getting started

1. Clone the github repository

```sh
git clone https://github.com/Kameleoon/cloudflare-worker-starter-kit.git
```

2. Install node modules

```sh
npm install
```

3. Add `account_id` in `wrangler.toml`. See: [How to find `account_id`][5]


4. Update the following values in `src/index.ts`:

- `SITE_CODE` - Site code that can be found on the [Kameleoon Platform][4].
- `CLIENT_ID` and `CLIENT_SECRET` - Client ID and Client Secret that can be found in your [Kameleoon Profile][6].
- `FEATURE_KEY` - Feature key that can be found on the [Kameleoon Feature Flag Dashboard][7].

5. Test and debug the worker locally

```sh
npm start
```

6. Deploy the worker to Cloudflare

```sh
npm run deploy
```

## Commands

- `npm start` - Start the worker locally.
- `npm run deploy` - Deploy the worker to Cloudflare.
- `npm run logs` - Display the logs of the worker.

## Technical details

The core integration logic is located in `src/index.ts` file. The worker uses the [Kameleoon NodeJS SDK][2] to fetch the feature flags and experiments from the Kameleoon platform, initialize the SDK and evaluate the flags and experiments.

There are also several additional files which implement external SDK dependency to make it compatible with Cloudflare Workers and grant some additional features:
- `src/eventSource.ts` - `EventSource` implementation for Cloudflare Workers. Unfortunately, Cloudflare Workers do not support `EventSource` out of the box, so the implementation will just give out a warning message in the console if you try to use the unsupported [Real Time Update] feature.
- `src/requester.ts` - `Requester` implementation adds an ability to cache SDK configuration providing the desired TTL.
> Note: by default SDK will poll the configuration every `60` minutes and the `ttl` value provided in `src/index.ts` is also `60` minutes, feel free to tweak both `ttl` and [`updateInterval`][8] values.
- `src/visitorCodeManager.ts` - `VisitorCodeManager` implementation for Cloudflare Workers allows for smooth `getVisitorCode` operations, it reads `kameleoonVisitorCode` from request headers and if it wasn't found it generates a new one and sets it in the response headers.

Error handling is omitted in the code for the sake of simplicity, however it's always a good idea to handle potential SDK errors gracefully, read more - [SDK Error Handling][9].



## Additional resources

- [Cloudflare Workers](https://workers.cloudflare.com)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
- [Cloudflare Workers Tutorials](https://developers.cloudflare.com/workers/tutorials)
- [Kameleoon NodeJS SDK Documentation](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk)

[1]: https://workers.cloudflare.com
[2]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk
[3]: https://dash.cloudflare.com/sign-up
[4]: https://app.kameleoon.com
[5]: https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/#find-account-id-workers-and-pages
[6]: https://app.kameleoon.com/users/dashboard
[7]: https://app.kameleoon.com/featureFlags/dashboard
[8]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk#:~:text=Default%20Value-,updateInterval,-(optional)
[9]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk#error-handling
