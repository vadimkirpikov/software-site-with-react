import React from "react";
import SectionCard from "./SectionCard";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const Tutorials = () => {
    const {section} = useParams();
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
        <div>
            {tutorials.map((tutorial, index) => (
                <SectionCard key={index} title={tutorial.title} description={tutorial.description} url={tutorial.url}></SectionCard>
            ))}
        </div>
    )
}
export default Tutorials;