import React from "react";
import { useParams } from "react-router-dom";

function Postcard() {
    const { id } = useParams();
    return (
        <h1>Cartão postal {id}</h1>
    );
}

export default Postcard;