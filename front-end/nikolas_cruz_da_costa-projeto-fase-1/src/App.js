import React from 'react';
import NavBar from './componentes/Bar/NavBar';
import FootBar from './componentes/Bar/FootBar';
import Home from './pages/Home';
import Cadastrar from './pages/Cadastrar';
import Listar from './pages/Listar';
import Sobre from './pages/Sobre';

function App() {
  // Estado: qual página está ativa
  const [paginaAtual, setPaginaAtual] = React.useState("home");

  // Estado: lista de séries
  const [series, setSeries] = React.useState([]);

  // Estado: série sendo editada (null = cadastrando)
  const [serieEditando, setSerieEditando] = React.useState(null);

  // CREATE / UPDATE
  function salvarSerie(serie) {
    if (serieEditando) {
      setSeries(series.map(s => s.id === serie.id ? serie : s));
      setSerieEditando(null);
    } else {
      const novaSerie = { ...serie, id: Date.now() };
      setSeries([...series, novaSerie]);
    }
    // Após salvar, vai para a lista para ver o resultado
    setPaginaAtual("listar");
  }

  // DELETE
  function deletarSerie(id) {
    setSeries(series.filter(s => s.id !== id));
  }

  // Inicia edição: preenche o form e navega para a página de cadastro
  function editarSerie(serie) {
    setSerieEditando(serie);
    setPaginaAtual("cadastrar");
  }

  // Cancela edição
  function cancelarEdicao() {
    setSerieEditando(null);
  }

  // Renderização condicional: mostra a página certa baseado no estado
  function renderizarPagina() {
    switch (paginaAtual) {
      case "home":
        return <Home />;
      case "cadastrar":
        return (
          <Cadastrar
            onSalvar={salvarSerie}
            serieEditando={serieEditando}
            onCancelar={cancelarEdicao}
          />
        );
      case "listar":
        return (
          <Listar
            series={series}
            onEditar={editarSerie}
            onDeletar={deletarSerie}
          />
        );
      case "sobre":
        return <Sobre />;
      default:
        return <Home />;
    }
  }

  return (
    <div className="App">
      <NavBar paginaAtual={paginaAtual} onMudarPagina={setPaginaAtual} />
      {renderizarPagina()}
      <FootBar />
    </div>
  );
}

export default App;
