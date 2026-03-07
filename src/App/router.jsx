import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";

import { Main, Wrapper } from "@shared/styles";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";

import NotFound from "@pages/NotFound";
import { BottomNav } from "@widgets/BottomNav";

const Home = lazy(() => import("@pages/Home"));
const Product = lazy(() => import("@pages/Product"));
const Search = lazy(() => import("@pages/Search"));

const Layout = () => {
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [location.pathname]);

    return (
        <Wrapper>
            <Header />
            <Main>
                <Suspense fallback={<div>{t("common.loading")}</div>}>
                    <Outlet />
                </Suspense>
            </Main>
            <BottomNav />
            <Footer />
        </Wrapper>
    );
};

const Router = createBrowserRouter([
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

export { Router };
