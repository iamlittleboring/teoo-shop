import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import NotFound from "@pages/NotFound";
import Layout from "./layout";

const Home = lazy(() => import("@pages/Home"));
const Product = lazy(() => import("@pages/Product"));
const Search = lazy(() => import("@pages/Search"));
const Collection = lazy(() => import("@pages/Collection"));
const Checkout = lazy(() => import("@pages/Checkout"));
const OrderConfirmation = lazy(() => import("@pages/OrderConfirmation"));
const Terms = lazy(() => import("@pages/Terms"));
const Privacy = lazy(() => import("@pages/Privacy"));
const Returns = lazy(() => import("@pages/Returns"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/collection/:slug",
                element: <Collection />,
            },
            {
                path: "/product/:id",
                element: <Product />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/order-confirmation",
                element: <OrderConfirmation />,
            },
            {
                path: "/terms",
                element: <Terms />,
            },
            {
                path: "/privacy",
                element: <Privacy />,
            },
            {
                path: "/returns",
                element: <Returns />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
