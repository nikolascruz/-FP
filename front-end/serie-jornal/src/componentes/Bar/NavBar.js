import React from "react";

// NavBar recebe a página atual e uma função para mudar de página
function NavBar({ paginaAtual, onMudarPagina }) {
    return (
        <nav>
            <ul>
                <li>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onMudarPagina("home"); }}
                        style={{ fontWeight: paginaAtual === "home" ? "bold" : "normal" }}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onMudarPagina("cadastrar"); }}
                        style={{ fontWeight: paginaAtual === "cadastrar" ? "bold" : "normal" }}
                    >
                        Cadastrar série
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onMudarPagina("listar"); }}
                        style={{ fontWeight: paginaAtual === "listar" ? "bold" : "normal" }}
                    >
                        Listar séries
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onMudarPagina("sobre"); }}
                        style={{ fontWeight: paginaAtual === "sobre" ? "bold" : "normal" }}
                    >
                        Sobre
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;