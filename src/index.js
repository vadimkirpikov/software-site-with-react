import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Sections from "./Content.js";
import Tutorials from "./Tutorials";
import Article from "./Article";
import Header from "./Header";
import './index.css';
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <link rel="stylesheet" href="/light.css" id="light-theme"/>
        <link rel="stylesheet" href="/dark.css" id="dark-theme" />
        <Router>
            <Header url={"/"}/>
            <main className="main-content">
                <aside className="adv-side">
                </aside>
                <article className="main-content-text">
                    <Routes>
                        <Route path="/:section/:tutorial/:article" element={<Article/>}></Route>
                        <Route path="/:section" element={<Tutorials/>}></Route>
                        <Route path="/" element={<Sections/>}></Route>
                    </Routes>
                </article>
                <aside className="adv-side">
                </aside>
            </main>
        </Router>
        <footer>
            <p>
                <a href="https://t.me/+qce_aMn5dRk1NGIy">Телеграм</a>
            </p>
            <p>&copy; 2024 PROGVIBE.RU Все права защищены</p>
        </footer>
    </>
);


