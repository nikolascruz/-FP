import React from "react";
import SerieList from "../componentes/SerieList";

function Listar({ series, onEditar, onDeletar }) {
    return (
        <main>
            <h1>Lista de séries</h1>
            <SerieList
                series={series}
                onEditar={onEditar}
                onDeletar={onDeletar}
            />
        </main>
    );
}

export default Listar;
