import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

function FootBar() {
    return (
        <Box
            component="footer"
            sx={{
                background: "rgba(10, 10, 10, 0.80)",
                backdropFilter: "blur(12px)",
                py: 2.5,
                px: 3,
                textAlign: "center",
                borderTop: "1px solid rgba(211, 47, 47, 0.3)",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <MovieFilterIcon sx={{ fontSize: 18, color: "primary.main" }} />
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Feito e mantido por Nikolas Cruz
                </Typography>
                <MovieFilterIcon sx={{ fontSize: 18, color: "primary.main" }} />
            </Box>
        </Box>
    );
}

export default FootBar;