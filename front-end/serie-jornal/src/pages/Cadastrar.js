import React from "react";
import SerieForm from "../componentes/SerieForm";

function Cadastrar({ onSalvar, serieEditando, onCancelar }) {
    return (
        <main>
            <h1>{serieEditando ? "Editar série" : "Cadastro de séries"}</h1>
            <SerieForm
                onSalvar={onSalvar}
                serieEditando={serieEditando}
                onCancelar={onCancelar}
            />
        </main>
    );
}

export default Cadastrar;
