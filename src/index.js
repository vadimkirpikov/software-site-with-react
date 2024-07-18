import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Sections from "./Content.js";
import Tutorials from "./Tutorials";
import Article from "./Article";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <div>Hello World</div>
        <Routes>
            <Route path="/" element={<Sections/>}></Route>
            <Route path="tutorials/:section" element={<Tutorials/>}></Route>
            <Route path="tutorials/:section/:tutorial/:article" element={<Article />}></Route>
        </Routes>
    </Router>
);

