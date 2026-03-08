# Teoo shop

Welcome to **Teoo Shop**, an online store built using modern front-end technologies and following the Feature-Sliced Design (FSD) architecture. This project aims to provide a scalable and maintainable e-commerce solution with React as the core framework.

## 🌟 Features
- **Modern UI**: Responsive and user-friendly design for seamless shopping experiences.
- **Feature-Sliced Design**: Clean project structure for better scalability and maintainability.
- **State Management**: Utilizes popular state management libraries for predictable application behavior.
- **Dynamic Routing**: Efficient navigation using React Router.

## 🏗️ Project Structure (FSD)
```
src/
├── App/                # Composition root: app bootstrap, router, layout, app-level theme wiring
├── Pages/              # Route-level screens (Home, Search, Product, Collection, NotFound)
├── Widgets/            # Large page blocks (Header, Footer, BottomNav, ImageViewer)
├── Features/           # User actions/use-cases (cart modal, favorites modal, filters, breadcrumbs)
├── Entities/           # Business entities and their UI/data (ProductCard, CartItem)
└── Shared/             # Shared ui/config/styles/lib/assets used across all layers
```

Project-specific note:
- Context providers and shared state hooks are located in `src/Shared/lib` (`CartProvider`, `FavoritesProvider`, `ThemeContextProvider`, hooks).
- `src/App` does not own all providers; it composes providers from `Shared/lib`, applies `AppThemeProvider`, and mounts the router.

## 💻 Installation

Install dependencies and start the development server.

```sh
git clone https://github.com/iamlittleboring/teoo-shop.git
cd teoo-shop
npm i
npm run dev
```

Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## Commands

```sh
npm run dev      # start dev server
npm run lint     # static checks
npm test         # unit tests (node:test)
npm run build    # production build
npm run preview  # preview production build
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
