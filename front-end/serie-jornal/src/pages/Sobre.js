import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import EditIcon from "@mui/icons-material/Edit";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Sobre() {
    const funcionalidades = [
        { icon: <AddCircleIcon />, texto: "Cadastro de séries" },
        { icon: <ListAltIcon />, texto: "Listagem de séries" },
        { icon: <EditIcon />, texto: "Edição de séries" },
        { icon: <DeleteIcon />, texto: "Remoção de séries" },
    ];

    return (
        <Container maxWidth="sm">
            <Paper
                elevation={8}
                sx={{
                    p: 4,
                    background: "rgba(20, 20, 20, 0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(211, 47, 47, 0.2)",
                    textAlign: "center",
                }}
            >
                <InfoIcon
                    sx={{
                        fontSize: 48,
                        color: "primary.main",
                        mb: 2,
                    }}
                />
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 700, mb: 1, color: "#FFFFFF" }}
                >
                    Sobre
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}
                >
                    Principais funcionalidades implementadas
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignItems: "center" }}>
                    {funcionalidades.map((f, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                p: 1.5,
                                px: 3,
                                borderRadius: "12px",
                                background: "rgba(211, 47, 47, 0.1)",
                                border: "1px solid rgba(211, 47, 47, 0.2)",
                                width: "fit-content",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    background: "rgba(211, 47, 47, 0.2)",
                                    transform: "translateX(4px)",
                                },
                            }}
                        >
                            <Box sx={{ color: "primary.main" }}>{f.icon}</Box>
                            <Typography sx={{ color: "#FFFFFF" }}>{f.texto}</Typography>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <MovieFilterIcon sx={{ color: "primary.main", fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                            Projeto da disciplina de desenvolvimento Front-end
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Sobre;
