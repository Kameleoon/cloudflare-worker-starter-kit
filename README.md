# Kameleoon + Cloudflare Worker Template

> Template to run Kameleoon Experimentation and Feature Flags on [Cloudflare Workers](https://workers.cloudflare.com).

This Kameleoon Template for Cloudflare Workers uses and extends our [Kameleoon NodeJS SDK](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk) to provide experimentation and feature flagging on the edge. Without this template, the NodeJS SDK cannot be used with Cloudflare. For more information on how to run Feature Flags and Experiments with our platform follow the steps outlined in our documentation [here](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk).

### Configuration Data File

The `externalClientConfiguration` is a JSON representation of feature flags and experiments. It contains all the data needed to deliver and track your flag deliveries and experiments. Template uses Cloudflare cache API to provide caching for `externalClientConfiguration` with custom `ttl`.

## How to use

### Before Get started

These steps should be completed before you get started:

1. Have an account in Cloudflare. If you don't have it, please go to [cloudflare registration page](https://dash.cloudflare.com/sign-up) and register. For additional information go Cloudflare Workers [documentation](https://developers.cloudflare.com/workers).
2. Install [Workers CLI](https://developers.cloudflare.com/workers/#installing-the-workers-cli).
3. Have an account in Kameleoon.

### Get started

1. Generate Cloudflare Worker project

```sh
wrangler generate projectName https://github.com/Kameleoon/cloudflare-worker-starter-kit
```

2. Add `account_id` in `wrangler.toml`. If you don't know account ID, get it from Cloudflare Workers Dashboard

3. Install modules

```sh
npm install
```

4. Update `siteCode` and `featureKey` in `index.ts`. They are available at Kameleoon Platform

5. Test and debug the worker locally

```sh
wrangler dev
```

6. Deploy the worker on Cloudflare

```sh
wrangler publish
```

5. Monitor logs:

```sh
wrangler tail
```

## Additional resources

- [Cloudflare Workers](https://workers.cloudflare.com)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
- [Cloudflare Workers Tutorials](https://developers.cloudflare.com/workers/tutorials)
- [Kameleoon NodeJS SDK Documentation](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk)
