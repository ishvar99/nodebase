// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://693104af1015373a74ad7bea70787fce@o4510248975466496.ingest.us.sentry.io/4510291285049344",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  sendDefaultPii: true,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  integrations: [
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true
    }),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ]
});
