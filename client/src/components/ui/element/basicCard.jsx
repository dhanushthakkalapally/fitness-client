import React from "react";
import '../styles/basicCard.css'

function BasicCard(props) {
    return (
        <div className="basicCard rounded">{props.children}</div>
    )
}

export default BasicCard;
