import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";

import { Main, Wrapper } from "@shared/styles";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";
import { Titles } from "@widgets/Titles";

import NotFound from "@pages/NotFound";
import { BottomNav } from "@widgets/BottomNav";

const Home = lazy(() => import("@pages/Home"));
const Product = lazy(() => import("@pages/Product"));

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            const scrollToHeader = () => {
                const header = document.getElementById("site-header");

                if (!header) {
                    return;
                }

                const headerTop =
                    header.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({ top: headerTop, left: 0, behavior: "auto" });
            };

            window.requestAnimationFrame(scrollToHeader);
            window.setTimeout(scrollToHeader, 0);

            return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [location.pathname]);

    return (
        <Wrapper>
            <Titles />
            <Header />
            <Main>
                <Suspense fallback={<div>Loading...</div>}>
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
