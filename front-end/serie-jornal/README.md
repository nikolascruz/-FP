## Nome: `Nikolas Cruz`


### 1. Como iniciar a API (Back-end)


1. Pelo terminal, entre na pasta do backend:
```bash
cd serieJournal-api
```
2. Instale as dependências da API:
```bash
npm install
```
3. Inicie o servidor. Ele rodará na porta `5000`:
```bash
npm start
```

### 2. Como iniciar o Front-end (React)

1. Abra uma **nova aba** (ou janela) do terminal, e entre na pasta do front-end:
```bash
cd serie-jornal
```

2. Rode para instalar as dependências do projeto (que incluem Axios, Material-UI, React-Router, etc):
```bash
npm install
```

3. Em seguida, inicie a execução do projeto:
```bash
npm start
```

### 3. Como rodar os Testes Unitários

Os testes unitários focados em componentes e interação simulada com a API usando a lib Jest estão contidos no diretório `src/tests/`.

Para executar a bateria de testes, digite no terminal da série-jornal:

```bash
npm test
```

---

## Introdução

Este projeto é uma aplicação web CRUD que permite o gerenciamento de séries assistidas, com layout em estilo cinema e comunicação direta via chamadas de API.

## Componentes

Os componentes estão no diretório `./src/componentes` e eles possuem as seguintes características:

- **SerieForm**:
  - `props`
    - `onSalvar`: callback que é chamado quando o botão "Salvar" ou "Atualizar" é clicado (aciona as requisições API POST ou PUT correspondentes);
    - `serieEditando`: objeto com os dados da série que está sendo editada;
    - `onCancelar`: callback que é chamado quando o botão "Cancelar" é clicado;
  - Descrição: este componente é um formulário visual feito em Material-UI (TextFields) para cadastro e edição de séries (envia campos com as chaves corretas para a nossa REST API: `releaseDate`, `production` e `watchedAt`).

- **SerieList**:
  - `props`
    - `series`: um array com uma lista de séries trazida da API via HTTP GET;
    - `onEditar`: callback que é chamado quando o botão "Editar" é clicado (acusa navegação via React Router);
    - `onDeletar`: callback que é chamado quando o botão "Remover" é clicado (aciona requisição API DELETE);
  - Descrição: este componente renderiza a lista de séries exibidas no back-end.

- **NavBar**:
  - Descrição: este componente renderiza o cabeçalho usando Navbar de modo dinâmico se baseando nas rotas através do Hook do _React Router_ (não utilizando mais `props` de navegação manuais). 

- **InfoMain**:
  - `props`
    - `title`: string com o título da página;
    - `subtitle`: string com o subtítulo da página;
    - `description`: string com a descrição da página;
  - Descrição: este componente renderiza o título, subtítulo e descrição central da página.

- **FootBar**:
  - Descrição: este componente renderiza o rodapé da página.

Páginas:
  - **Home**:
    - Descrição: página inicial em destaque das séries, funcionando como Landing Page.
    - tela: (./public/home.html)

  - **Cadastrar**:
    - Descrição: página de cadastro e alteração das séries mapeadas na rota `/cadastrar`.
    - tela: (./public/register_series.html)

  - **Listar**:
    - Descrição: página de listagem formatada em Tabela para as séries na rota `/listar`.
    - tela: (./public/list_serie.html)

  - **Sobre**:
    - Descrição: página sobre as funcionalidades e estrutura projeto.
    - tela: (./public/about.html)

## Conclusão

Este projeto é construído para praticar e desenvolver as habilidades em ecossistema Reactjs, envolvendo a criação de interfaces responsivas com Material-UI (MUI), persistência de dados em ambiente backend com Axios, sistema de roteamento prático e testes unitários.