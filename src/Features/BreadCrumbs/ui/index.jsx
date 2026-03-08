import { Link } from "react-router-dom";

import Styled from "./styled";

const BreadCrumbs = ({ items = [] }) => {
    return (
        <Styled.Box>
            <Styled.Item>
                <Link to="/">Home</Link>
            </Styled.Item>
            {items.map((item) => (
                <Styled.Item key={`${item.label}-${item.to || "current"}`}>
                    {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
                </Styled.Item>
            ))}
        </Styled.Box>
    );
};

export default BreadCrumbs;
