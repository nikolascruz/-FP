import React from "react";
import { Link, useLocation } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

function NavBar() {
    const location = useLocation();

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Cadastrar", path: "/cadastrar" },
        { label: "Listar", path: "/listar" },
        { label: "Sobre", path: "/sobre" },
    ];

    return (
        <AppBar
            position="sticky"
            sx={{
                background: "rgba(10, 10, 10, 0.80)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(211, 47, 47, 0.25)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Logo / Ícone de cinema à esquerda */}
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    <MovieFilterIcon
                        sx={{
                            fontSize: 36,
                            color: "primary.main",
                            filter: "drop-shadow(0 0 8px rgba(211, 47, 47, 0.5))",
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: 1,
                            color: "#FFFFFF",
                        }}
                    >
                        SérieJornal
                    </Typography>
                </Box>

                {/* Botões de navegação à direita */}
                <Box sx={{ display: "flex", gap: 1 }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                variant={isActive ? "contained" : "outlined"}
                                sx={{
                                    borderRadius: "24px",
                                    px: 2.5,
                                    py: 0.8,
                                    fontSize: "0.875rem",
                                    borderColor: isActive
                                        ? "primary.main"
                                        : "rgba(255, 255, 255, 0.3)",
                                    color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.85)",
                                    backgroundColor: isActive
                                        ? "primary.main"
                                        : "transparent",
                                    "&:hover": {
                                        backgroundColor: isActive
                                            ? "primary.dark"
                                            : "rgba(211, 47, 47, 0.15)",
                                        borderColor: "primary.main",
                                        color: "#FFFFFF",
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {item.label}
                            </Button>
                        );
                    })}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;