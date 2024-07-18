import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Article = () => {
    const { section, tutorial, article } = useParams();
    const [text, setText] = useState("");

    useEffect(() => {
        fetch(`/content/${section}/${tutorial}/${article}.md`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(data => {
                setText(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, [section, tutorial, article]);

    return (
        <div>
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );
};

export default Article;
