import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import NotFound from "@pages/NotFound";
import Layout from "./layout";

const Home = lazy(() => import("@pages/Home"));
const Product = lazy(() => import("@pages/Product"));
const Search = lazy(() => import("@pages/Search"));
const Collection = lazy(() => import("@pages/Collection"));

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
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
