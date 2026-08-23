import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import "@shared/config/i18n";

import App from "./App";

// No-ops until VITE_SENTRY_DSN is set — same graceful-degradation pattern as
// the backend. Create a free React project at sentry.io and paste its DSN
// into .env to turn on error monitoring for the storefront.
if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: import.meta.env.MODE,
        tracesSampleRate: 0.1,
    });
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Sentry.ErrorBoundary fallback={<p>Щось пішло не так. Оновіть сторінку.</p>}>
            <App />
        </Sentry.ErrorBoundary>
    </StrictMode>
);
