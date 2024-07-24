import React from "react";
import {Link} from "react-router-dom";

const NavLink = (props) => {
    if (props.url === "no-url") return (<></>);
    return <Link to={props.url}>{props.text}</Link>;
}
const PageNav = (props) => {
    return (
        <nav className="navigation-panel">
            <NavLink url={props.backLink} text={"НАЗАД"} />
            <nav className="sub-navigation-panel">
                <Link to="/">ГЛАВНАЯ</Link>
                <Link to={props.sectionUrl}>РАЗДЕЛ</Link>
            </nav>
            <NavLink url={props.forwardLink} text={"ДАЛЕЕ"} />
        </nav>
    )
}
export default PageNav;