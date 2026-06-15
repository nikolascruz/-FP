import React from "react";

function InfoMain(props) {
    return (
        <main>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
            <p>{props.description}</p>
        </main>
    );
}

export default InfoMain;

