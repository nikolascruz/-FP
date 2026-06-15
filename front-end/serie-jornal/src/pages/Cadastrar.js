import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SerieForm from "../componentes/SerieForm";

function Cadastrar({ onSalvar, serieEditando, onCancelar }) {
    return (
        <Container maxWidth="sm">
            <Paper
                elevation={8}
                sx={{
                    p: 4,
                    background: "rgba(20, 20, 20, 0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(211, 47, 47, 0.2)",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                        textAlign: "center",
                        color: "#FFFFFF",
                    }}
                >
                    {serieEditando ? "✏️ Editar Série" : "🎬 Cadastro de Séries"}
                </Typography>
                <SerieForm
                    onSalvar={onSalvar}
                    serieEditando={serieEditando}
                    onCancelar={onCancelar}
                />
            </Paper>
        </Container>
    );
}

export default Cadastrar;
