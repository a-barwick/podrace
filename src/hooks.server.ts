import { sequence } from "@sveltejs/kit/hooks";
import { handleErrorWithSentry, sentryHandle } from "@sentry/sveltekit";
import * as Sentry from "@sentry/sveltekit";

Sentry.init({
    dsn: "https://39bee89cff832873b47903318c209b2d@o4507087334670336.ingest.us.sentry.io/4507087335587840",
    tracesSampleRate: 1.0,
    enabled: process.env.ENV === "production" || process.env.ENV === "staging",
    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: import.meta.env.DEV,
});

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle());

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
