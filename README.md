# Teoo Shop

Teoo Shop is a React + Vite storefront built with Feature-Sliced Design ideas.

## Stack

- React 18
- React Router
- Styled Components
- Vite
- ESLint

## Run locally

```sh
npm i
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Commands

```sh
npm run dev      # start dev server
npm run lint     # static checks
npm test         # unit tests (node:test)
npm run build    # production build
npm run preview  # preview production build
```

## Current project structure

```text
src/
├── App/
├── Pages/
├── Widgets/
├── Features/
├── Entities/
└── Shared/
```

## What was improved

- Added i18n with `i18next`/`react-i18next` (UA/EN), including language switch in footer flags and localized UI labels.
- Added a dedicated Search page with query param support (`/search?q=`), sorting, category filters, and price range filters.
- Refactored cart/favorites modal items into shared UI building blocks and improved cart item controls.
- Reorganized config: theme tokens moved to `Shared/config/styles.js`, with clean package-style exports from `Shared/config/index.js`.
- Improved dev architecture for Fast Refresh by separating component modules (`.jsx`) from non-React modules (`.js`).
- Updated header Instagram action to open the official page: [https://www.instagram.com/teoo.shop](https://www.instagram.com/teoo.shop).
- Polished active icon button borders for cleaner visual states.

## TODO

- Build full checkout flow with stepper (Cart -> Contacts -> Delivery -> Payment -> Confirm).
- Add auth flow (email/social) and profile modal integration.
- Move i18n resources to split JSON namespaces for easier scaling.
- Add e2e tests for cart, favorites, search filters, and checkout happy path.
