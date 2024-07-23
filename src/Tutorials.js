import React, {useEffect, useState} from "react";
import SectionCard from "./SectionCard";
import {useParams} from "react-router-dom";
import "./sections.css"

const Tutorials = () => {
    const {section} = useParams();
    console.log(section);
    const [tutorials, setTutorials] = useState([]);
    useEffect(() => {
        fetch(`content/${section}/${section}.json`)
            .then(response => response.json())
            .then(data => {
                setTutorials(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })
    }, [section]);
    return (
        <section id="tutorials">
            {tutorials.map((tutorial, index) => (
                <SectionCard key={index} title={tutorial.title} description={tutorial.description}
                             url={tutorial.url}></SectionCard>
            ))}
        </section>
    )
}
export default Tutorials;