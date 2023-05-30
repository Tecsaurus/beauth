"use client"

import { Auth0Provider } from "@auth0/auth0-react";
// export const environment = {
//   production: true,
//   environment: 'legacy-test',
//   apiBaseUrl: 'https://test.app.bedc.ai/api',
//   auth0Domain: 'test-buildingestimates.au.auth0.com',
//   auth0ClientId: 'oTG0p8Q2jRdH506sI6bzlJCP40BejhAH',
//   googleAnalyticsId: 'G-FLC2KQSF5H',
//   fullstoryId: 'XHNWA',
//   sentryDsn: 'https://2496b1e499394824958b1aa820ca52b9@o437004.ingest.sentry.io/5398926',
// };
// }
import { App } from "./App";

export default function Home() {

  return (
    <Auth0Provider
    domain="test.app.bedc.ai"
    clientId="oTG0p8Q2jRdH506sI6bzlJCP40BejhAH"
    authorizationParams={{
      redirect_uri: window.location.origin + '/' + window.location.search
    }}
  >
    <App />
  </Auth0Provider>
  )
}