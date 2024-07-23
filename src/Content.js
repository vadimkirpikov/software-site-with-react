
import React, { useState, useEffect } from "react";
import SectionCard from "./SectionCard";

const Sections = () => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        fetch("content/sections.json")
            .then(response => response.json())
            .then((data) => {
                setSections(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <><link rel="stylesheet" href="/main.css"/>
        <section id="hero">
            <h2>Туториалы по программированию</h2>
            <p>Изучайте программирование с нашими удобными и информативными туториалами.</p>
        </section>
    <section id="tutorials">
        {sections.map((section, index) => (
            <SectionCard
                key={index}
                title={section.title}
                    description={section.description}
                    url={section.url}
                />
            ))}
        </section>
            </>
    );
};

export default Sections;
