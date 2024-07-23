import React from "react";
import {Link} from "react-router-dom";
const SectionCard = (props) => {
    return (
        <div className="card">
            <h1 className="card-title">{props.title}</h1>
            <div className="card-description">{props.description}</div>
            <Link className="card-button" to={props.url}>НАЧАТЬ ИЗУЧЕНИЕ</Link>
        </div>
    );
}
export default SectionCard;