import React, { useEffect, useState } from "react";
import { showVerticalMenu } from "./WorkFunctions";
import { Link, useParams } from "react-router-dom";

const Menu = () => {
    const { section, tutorial, article } = useParams();
    const [articles, setArticles] = useState({});
    const [chapters, setChapters] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/content/${section}/${tutorial}/chapters.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(chptrs => {
                setChapters(chptrs);
            })
            .catch(error => {
                console.error('Error fetching chapters:', error);
                setError(error);
            });
    }, [section, tutorial]);

    useEffect(() => {
        fetch(`/content/${section}/${tutorial}/articles.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const groupedData = data.reduce((acc, article) => {
                    const key = article.chapter;
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(article);
                    return acc;
                }, {});
                setArticles(groupedData);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setError(error);
            });
    }, [section, tutorial, article]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <button id="menu-button" className="menu-button" onClick={showVerticalMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <aside className="vertical-menu-content" id="vertical-menu">
                {Object.keys(articles).map(chapter => (
                    <div key={chapter}>
                        <div className="chapter">
                            <b>{chapters[chapter]}</b>
                        </div>
                        {articles[chapter].map(article => (
                            <Link
                                id={article.id}
                                className="item"
                                to={`${section}/${tutorial}/${article.url}`}
                                key={article.id}
                            >
                                <b>{article.title}</b>
                            </Link>
                        ))}
                    </div>
                ))}
            </aside>
        </>
    );
};

export default Menu;
