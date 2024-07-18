// Sections.js
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
        <div>
            {sections.map((section, index) => (
                <SectionCard
                    key={index}
                    title={section.title}
                    description={section.description}
                    url={section.url}
                />
            ))}
        </div>
    );
};

export default Sections;
