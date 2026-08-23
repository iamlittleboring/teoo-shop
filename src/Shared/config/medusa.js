// Same variable names, different values per environment — Vite reads
// whichever `.env` applies locally, and Cloudflare Pages injects its own
// dashboard-configured values at build time for production.
const MEDUSA_BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://127.0.0.1:9000";
const MEDUSA_PUBLISHABLE_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "";
const MEDUSA_REGION_ID = import.meta.env.VITE_MEDUSA_REGION_ID || "";

export { MEDUSA_BACKEND_URL, MEDUSA_PUBLISHABLE_KEY, MEDUSA_REGION_ID };
