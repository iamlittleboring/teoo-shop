import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

import { Main, Wrapper } from "@shared/styles";
import LoadingState from "@shared/ui/LoadingState";
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
                <Suspense fallback={<LoadingState message={t("common.loading")} fullPage />}>
                    <Outlet />
                </Suspense>
            </Main>
            <Footer />
        </Wrapper>
    );
};

export default Layout;
