import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

import { Main, Wrapper } from "@shared/styles";
import { BottomNav } from "@widgets/BottomNav";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";

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

export default Layout;
