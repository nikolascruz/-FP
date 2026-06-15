import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

function SerieForm({ onSalvar, serieEditando, onCancelar }) {
    // Estado local do formulário
    const [title, setTitle] = React.useState("");
    const [seasons, setSeasons] = React.useState("");
    const [releaseDate, setReleaseDate] = React.useState("");
    const [director, setDirector] = React.useState("");
    const [production, setProduction] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [watchedAt, setWatchedAt] = React.useState("");

    // Quando serieEditando muda, preenche o formulário com os dados dela
    React.useEffect(() => {
        if (serieEditando) {
            setTitle(serieEditando.title);
            setSeasons(serieEditando.seasons);
            setReleaseDate(serieEditando.releaseDate);
            setDirector(serieEditando.director);
            setProduction(serieEditando.production);
            setCategory(serieEditando.category);
            setWatchedAt(serieEditando.watchedAt);
        } else {
            limparFormulario();
        }
    }, [serieEditando]);

    function limparFormulario() {
        setTitle("");
        setSeasons("");
        setReleaseDate("");
        setDirector("");
        setProduction("");
        setCategory("");
        setWatchedAt("");
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
            releaseDate,
            director,
            production,
            category,
            watchedAt,
        };

        onSalvar(serie);
        limparFormulario();
    }

    // Estilo compartilhado para os TextFields
    const textFieldSx = {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&:hover fieldset": {
                borderColor: "rgba(211, 47, 47, 0.5)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "primary.main",
            },
        },
        "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.6)",
        },
        "& .MuiInputBase-input": {
            color: "#FFFFFF",
        },
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
                <TextField
                    label="Título"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Temporadas"
                    id="seasons"
                    name="seasons"
                    value={seasons}
                    onChange={(e) => setSeasons(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Data de lançamento"
                    id="releaseDate"
                    name="releaseDate"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Diretor"
                    id="director"
                    name="director"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Produtora"
                    id="production"
                    name="production"
                    value={production}
                    onChange={(e) => setProduction(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Categoria"
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Data que assistiu"
                    id="watchedAt"
                    name="watchedAt"
                    value={watchedAt}
                    onChange={(e) => setWatchedAt(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />

                <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{
                            borderRadius: "24px",
                            px: 4,
                            py: 1.2,
                            flexGrow: 1,
                        }}
                    >
                        {serieEditando ? "Atualizar" : "Cadastrar"}
                    </Button>

                    {serieEditando && (
                        <Button
                            type="button"
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={onCancelar}
                            sx={{
                                borderRadius: "24px",
                                px: 4,
                                py: 1.2,
                                borderColor: "rgba(255, 255, 255, 0.3)",
                                color: "#FFFFFF",
                                "&:hover": {
                                    borderColor: "primary.main",
                                    backgroundColor: "rgba(211, 47, 47, 0.1)",
                                },
                            }}
                        >
                            Cancelar
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
}

export default SerieForm;