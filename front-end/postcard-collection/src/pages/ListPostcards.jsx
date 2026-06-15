import React from 'react';
import usePostcards from '../hooks/usePostcards';

function ListPostcards() {
    const { postcards, loading, error } = usePostcards();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar cartões postais: {error.message}</div>;
    }

    return (
        <div>
            <h2>Listagem de cartões postais</h2>
            {postcards.map((postcard) => (
                <div key={postcard.id}>
                    <h3>{postcard.title}</h3>
                    <img src={postcard.image} alt={postcard.title} />
                </div>
            ))}

        </div>
    );
}

export default ListPostcards;