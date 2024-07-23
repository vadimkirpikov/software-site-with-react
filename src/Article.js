import React, {useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import {ClearFullCode, makeMark, RemoveClipBoardButtons, setClipboardButton} from "./WorkFunctions";
import PageNav from "./PagesNav";


const Article = () => {
    const {section, tutorial, article} = useParams();
    const [text, setText] = useState("");
    const [fUrl, setFUrl] = useState("no-url");
    const [bUrl, setBUrl] = useState("no-url");
    const [id, setId] = useState();

    useEffect(() => {
        fetch(`/content/${section}/${tutorial}/articles.json`)
            .then(response => response.json())
            .then(articles => {
                let index = articles.findIndex(art => art.url === article);
                if (index > 0) {
                    setBUrl(`/${section}/${tutorial}/${articles[index-1].url}`);
                }
                if (index < articles.length - 1) {
                    setFUrl(`/${section}/${tutorial}/${articles[index+1].url}`);
                }
                setId(index+1);
            })
    })
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
    useEffect(() => {
        ClearFullCode();
        hljs.highlightAll();
    })
    useEffect(()=> {
        RemoveClipBoardButtons();
        setClipboardButton();
    })

    return (
        <div>
            <PageNav forwardLink={fUrl} backLink={bUrl} sectionUrl={`/${section}`} />
            <ReactMarkdown>{text}</ReactMarkdown>
            <PageNav forwardLink={fUrl} backLink={bUrl} sectionUrl={`/${section}`} />
        </div>
    );
};

export default Article;
