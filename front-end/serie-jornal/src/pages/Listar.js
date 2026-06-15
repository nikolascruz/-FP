import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SerieList from "../componentes/SerieList";

function Listar({ series, onEditar, onDeletar }) {
    return (
        <Container maxWidth="lg">
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
                    📋 Lista de Séries
                </Typography>
                <SerieList
                    series={series}
                    onEditar={onEditar}
                    onDeletar={onDeletar}
                />
            </Paper>
        </Container>
    );
}

export default Listar;
