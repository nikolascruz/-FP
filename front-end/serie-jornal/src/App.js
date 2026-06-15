import React from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import NavBar from './componentes/Bar/NavBar';
import FootBar from './componentes/Bar/FootBar';
import Home from './pages/Home';
import Cadastrar from './pages/Cadastrar';
import Listar from './pages/Listar';
import Sobre from './pages/Sobre';

import axios from 'axios';

// Tema customizado: vermelho e branco, estilo cinema
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#B71C1C',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(20, 20, 20, 0.85)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

const API_URL = 'http://localhost:5000/series';

function App() {
  const navigate = useNavigate();

  // Estado: lista de séries
  const [series, setSeries] = React.useState([]);

  // Estado: série sendo editada (null = cadastrando)
  const [serieEditando, setSerieEditando] = React.useState(null);

  // Busca inicial das séries
  React.useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setSeries(response.data);
      })
      .catch(error => console.error("Erro ao carregar séries:", error));
  }, []);

  // CREATE / UPDATE
  function salvarSerie(serie) {
    if (serieEditando) {
      axios.put(API_URL, serie)
        .then(response => {
          setSeries(series.map(s => s.id === serie.id ? response.data : s));
          setSerieEditando(null);
          navigate('/listar');
        })
        .catch(error => console.error("Erro ao atualizar série:", error));
    } else {
      axios.post(API_URL, serie)
        .then(response => {
          setSeries([...series, response.data]);
          navigate('/listar');
        })
        .catch(error => console.error("Erro ao cadastrar série:", error));
    }
  }

  // DELETE
  function deletarSerie(id) {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setSeries(series.filter(s => s.id !== id));
      })
      .catch(error => console.error("Erro ao deletar série:", error));
  }

  // Inicia edição: preenche o form e navega para a página de cadastro
  function editarSerie(serie) {
    setSerieEditando(serie);
    navigate('/cadastrar');
  }

  // Cancela edição
  function cancelarEdicao() {
    setSerieEditando(null);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundImage: `url(${process.env.PUBLIC_URL}/cinema-bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.55)',
            zIndex: 0,
          },
          '& > *': {
            position: 'relative',
            zIndex: 1,
          },
        }}
      >
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cadastrar"
              element={
                <Cadastrar
                  onSalvar={salvarSerie}
                  serieEditando={serieEditando}
                  onCancelar={cancelarEdicao}
                />
              }
            />
            <Route
              path="/listar"
              element={
                <Listar
                  series={series}
                  onEditar={editarSerie}
                  onDeletar={deletarSerie}
                />
              }
            />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </Box>
        <FootBar />
      </Box>
    </ThemeProvider>
  );
}

export default App;
