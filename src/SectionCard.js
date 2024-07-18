import React from "react";
const SectionCard = (props) => {
    return (
        <div className="card">
            <h1 className="card-title">{props.title}</h1>
            <div className="card-description">{props.description}</div>
            <a className="card-description" href={props.url}>НАЧАТЬ ИЗУЧЕНИЕ</a>
        </div>
    );
}
export default SectionCard;