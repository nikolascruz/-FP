import React from "react";

function SerieList({ series, onEditar, onDeletar }) {
    // Se não tem séries, mostra uma mensagem
    if (series.length === 0) {
        return <p>Nenhuma série cadastrada ainda.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Temporadas</th>
                    <th>Data de lançamento</th>
                    <th>Diretor</th>
                    <th>Produtora</th>
                    <th>Categoria</th>
                    <th>Data que assistiu</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {series.map((serie) => (
                    <tr key={serie.id}>
                        <td>{serie.title}</td>
                        <td>{serie.seasons}</td>
                        <td>{serie.launch_date}</td>
                        <td>{serie.director}</td>
                        <td>{serie.studio}</td>
                        <td>{serie.category}</td>
                        <td>{serie.date_watched}</td>
                        <td>
                            <button onClick={() => onEditar(serie)}>
                                Editar
                            </button>
                            <button onClick={() => onDeletar(serie.id)}>
                                Remover
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SerieList;