import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

function SerieList({ series, onEditar, onDeletar }) {
    // Se não tem séries, mostra uma mensagem
    if (series.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <MovieFilterIcon
                    sx={{
                        fontSize: 56,
                        color: "rgba(255,255,255,0.2)",
                        mb: 2,
                    }}
                />
                <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "1.1rem" }}>
                    Nenhuma série cadastrada ainda.
                </Typography>
            </Box>
        );
    }

    const headerSx = {
        color: "primary.main",
        fontWeight: 700,
        borderBottom: "2px solid rgba(211, 47, 47, 0.4)",
        fontSize: "0.875rem",
    };

    const cellSx = {
        color: "#FFFFFF",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={headerSx}>Título</TableCell>
                        <TableCell sx={headerSx}>Temporadas</TableCell>
                        <TableCell sx={headerSx}>Lançamento</TableCell>
                        <TableCell sx={headerSx}>Diretor</TableCell>
                        <TableCell sx={headerSx}>Produtora</TableCell>
                        <TableCell sx={headerSx}>Categoria</TableCell>
                        <TableCell sx={headerSx}>Assistido</TableCell>
                        <TableCell sx={headerSx} align="center">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {series.map((serie) => (
                        <TableRow
                            key={serie.id}
                            sx={{
                                transition: "background 0.2s ease",
                                "&:hover": {
                                    background: "rgba(211, 47, 47, 0.08)",
                                },
                            }}
                        >
                            <TableCell sx={{ ...cellSx, fontWeight: 600 }}>
                                {serie.title}
                            </TableCell>
                            <TableCell sx={cellSx}>{serie.seasons}</TableCell>
                            <TableCell sx={cellSx}>{serie.releaseDate}</TableCell>
                            <TableCell sx={cellSx}>{serie.director}</TableCell>
                            <TableCell sx={cellSx}>{serie.production}</TableCell>
                            <TableCell sx={cellSx}>{serie.category}</TableCell>
                            <TableCell sx={cellSx}>{serie.watchedAt}</TableCell>
                            <TableCell sx={cellSx} align="center">
                                <Tooltip title="Editar">
                                    <IconButton
                                        onClick={() => onEditar(serie)}
                                        sx={{
                                            color: "rgba(255,255,255,0.7)",
                                            "&:hover": { color: "primary.main" },
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Remover">
                                    <IconButton
                                        onClick={() => onDeletar(serie.id)}
                                        sx={{
                                            color: "rgba(255,255,255,0.7)",
                                            "&:hover": { color: "#EF5350" },
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SerieList;