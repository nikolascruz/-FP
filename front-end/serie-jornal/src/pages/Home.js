import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ListAltIcon from "@mui/icons-material/ListAlt";

function Home() {
    return (
        <Container maxWidth="md">
            <Paper
                elevation={8}
                sx={{
                    p: 5,
                    textAlign: "center",
                    background: "rgba(20, 20, 20, 0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(211, 47, 47, 0.2)",
                }}
            >
                <MovieFilterIcon
                    sx={{
                        fontSize: 64,
                        color: "primary.main",
                        mb: 2,
                        filter: "drop-shadow(0 0 16px rgba(211, 47, 47, 0.4))",
                    }}
                />
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        background: "linear-gradient(135deg, #FFFFFF 0%, #EF5350 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    SérieJornal
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ color: "rgba(255,255,255,0.8)", mb: 2, fontWeight: 400 }}
                >
                    Gerenciamento de Séries
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 4, maxWidth: 500, mx: "auto" }}
                >
                    Este projeto é uma aplicação web CRUD que permite o gerenciamento de séries.
                    Cadastre, liste, edite e remova suas séries favoritas.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                    <Button
                        component={Link}
                        to="/cadastrar"
                        variant="contained"
                        size="large"
                        startIcon={<LiveTvIcon />}
                        sx={{
                            borderRadius: "28px",
                            px: 4,
                            py: 1.2,
                            fontSize: "1rem",
                        }}
                    >
                        Cadastrar Série
                    </Button>
                    <Button
                        component={Link}
                        to="/listar"
                        variant="outlined"
                        size="large"
                        startIcon={<ListAltIcon />}
                        sx={{
                            borderRadius: "28px",
                            px: 4,
                            py: 1.2,
                            fontSize: "1rem",
                            borderColor: "rgba(255,255,255,0.3)",
                            color: "#FFFFFF",
                            "&:hover": {
                                borderColor: "primary.main",
                                backgroundColor: "rgba(211, 47, 47, 0.1)",
                            },
                        }}
                    >
                        Ver Séries
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Home;
