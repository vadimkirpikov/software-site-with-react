import React, {useEffect} from "react";
import {Routes, Route, Link} from "react-router-dom";
import Menu from "./Menu";
import "./index";
import {loadTheme} from "./WorkFunctions";
import ThemeToggler from "./ThemeToggler";

const Header = (props) => {
    useEffect(() => loadTheme(), []);
    return (
        <header>
            <div className="header-container">
                    <Routes>
                        <Route path="/:section/:tutorial/:article" element={<Menu/>}></Route>
                        <Route path="/"></Route>
                        <Route path="/section:"></Route>
                    </Routes>
                <Link to="/" className="header">PROGVIBE</Link>
            </div>
            <ThemeToggler />
        </header>

    )
}
export default Header;