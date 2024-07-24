import React, {useEffect} from "react";
import {switchTheme} from "./WorkFunctions";
import "./ThemeToggler.css";
import {ReactComponent as Sun} from "./sun-8780.svg";
import {ReactComponent as Moon} from "./dark-mode-6682.svg";

const ThemeToggler = () => {
    useEffect(() => {
        document.getElementById('toggleSwitch').addEventListener('click', function () {
            switchTheme();
        });
    })
    return (
        <div>
            <svg id="toggleSwitch" className="toggle-switch" viewBox="0 0 60 30" width="60" height="50"
                 xmlns="http://www.w3.org/2000/svg">
                <rect className="background" x="0" y="0" width="60" height="30" rx="15"/>
                <circle className="circle" cx="15" cy="15" r="12.5"/>
                <Sun x="32" y="2" width="26" height="26" className="sun" />
                <Moon x="2" y="2" width="26" height="26" className="moon" />
            </svg>
        </div>
    )
}
export default ThemeToggler;