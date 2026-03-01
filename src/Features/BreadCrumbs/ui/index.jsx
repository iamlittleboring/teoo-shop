import { Link, useLocation } from "react-router-dom";

import { getProductName } from "../api";
import { capitalize } from "../lib";

import Styled from "./styled";

const BreadCrumbs = () => {
    const location = useLocation();
    let currentLink = "";

    const crumbs = location.pathname
        .split("/")
        .filter((crumb) => crumb !== "")
        .map((crumb, index, array) => {
            currentLink += `/${crumb}`;

            if (crumb === "product") {
                return null;
            }

            if (index === array.length - 1 && !Number.isNaN(Number(crumb))) {
                return (
                    <Styled.Item key={crumb}>{getProductName(crumb)}</Styled.Item>
                );
            }

            if (index === array.length - 1) {
                return <Styled.Item key={crumb}>{capitalize(crumb)}</Styled.Item>;
            }

            return (
                <Styled.Item key={crumb}>
                    <Link to={currentLink}>{capitalize(crumb)}</Link>
                </Styled.Item>
            );
        })
        .filter(Boolean);

    return (
        <Styled.Box>
            <Styled.Item>
                <Link to="/">Home</Link>
            </Styled.Item>
            {crumbs}
        </Styled.Box>
    );
};

export default BreadCrumbs;
