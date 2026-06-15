import React from "react";

function SerieForm({ onSalvar, serieEditando, onCancelar }) {
    // Estado local do formulário
    const [title, setTitle] = React.useState("");
    const [seasons, setSeasons] = React.useState("");
    const [launch_date, setLaunchDate] = React.useState("");
    const [director, setDirector] = React.useState("");
    const [studio, setStudio] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [date_watched, setDateWatched] = React.useState("");

    // Quando serieEditando muda, preenche o formulário com os dados dela
    React.useEffect(() => {
        if (serieEditando) {
            setTitle(serieEditando.title);
            setSeasons(serieEditando.seasons);
            setLaunchDate(serieEditando.launch_date);
            setDirector(serieEditando.director);
            setStudio(serieEditando.studio);
            setCategory(serieEditando.category);
            setDateWatched(serieEditando.date_watched);
        } else {
            limparFormulario();
        }
    }, [serieEditando]);

    function limparFormulario() {
        setTitle("");
        setSeasons("");
        setLaunchDate("");
        setDirector("");
        setStudio("");
        setCategory("");
        setDateWatched("");
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Validação simples: título é obrigatório
        if (!title.trim()) {
            alert("O título é obrigatório!");
            return;
        }

        const serie = {
            id: serieEditando ? serieEditando.id : null,
            title,
            seasons,
            launch_date,
            director,
            studio,
            category,
            date_watched,
        };

        onSalvar(serie);
        limparFormulario();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Titulo</label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="seasons">Temporadas</label>
            <input
                type="text"
                id="seasons"
                name="seasons"
                value={seasons}
                onChange={(e) => setSeasons(e.target.value)}
            />

            <label htmlFor="launch_date">Data de lançamento</label>
            <input
                type="text"
                id="launch_date"
                name="launch_date"
                value={launch_date}
                onChange={(e) => setLaunchDate(e.target.value)}
            />

            <label htmlFor="director">Diretor</label>
            <input
                type="text"
                id="director"
                name="director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
            />

            <label htmlFor="studio">Produtora</label>
            <input
                type="text"
                id="studio"
                name="studio"
                value={studio}
                onChange={(e) => setStudio(e.target.value)}
            />

            <label htmlFor="category">Categoria</label>
            <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <label htmlFor="date_watched">Data que assistiu</label>
            <input
                type="text"
                id="date_watched"
                name="date_watched"
                value={date_watched}
                onChange={(e) => setDateWatched(e.target.value)}
            />

            <button type="submit">
                {serieEditando ? "Atualizar" : "Cadastrar"}
            </button>

            {serieEditando && (
                <button type="button" onClick={onCancelar}>
                    Cancelar
                </button>
            )}
        </form>
    );
}

export default SerieForm;