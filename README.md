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

- Replaced placeholder API flow with a real in-app product catalog API.
- Added product details loading by route id.
- Added grouped collections on Home (t-shirts, hoodies, accessories).
- Implemented global cart state with `localStorage` persistence.
- Added global favorites state with `localStorage` persistence.
- Connected cart/favorites across product cards, product page, header and mobile bottom nav.
- Reworked cart modal with editable quantity and total price.
- Added favorites modal with quick remove/clear actions.
- Unified icon actions (cart/like/header) through shared `IconActionButton`.
- Moved core UI colors/gradients to central theme config (`theme.ui.*`).
- Improved accessibility in buttons/modals (labels, dialog semantics, Esc close).
- Reduced product image sizes for faster load.
- Added unit tests for cart business logic.
- Added GitHub Actions CI (`lint`, `test`, `build`).
