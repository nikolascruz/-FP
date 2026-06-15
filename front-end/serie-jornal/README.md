## Nome: `Nikolas Cruz`

Para executar este projeto:

1. Entre pasta serie-jornal no terminal:
```
cd serie-jornal
```

2. Rode npm install para instalar as dependências do projeto:


```
npm install
```

3. E em seguida, npm start, para iniciar a execução do projeto.

```
npm start
```

## Introdução

Este projeto é uma aplicação web CRUD que permite o gerenciamento de séries assistidas

## Componentes

Os componentes estão no diretório `./src/components` e eles possuem as seguintes características:
- SerieForm:
  - `props`
    - onSalvar: callback que é chamado quando o botão "Salvar" é clicado;
    - serieEditando: objeto com os dados da série que está sendo editada;
    - onCancelar: callback que é chamado quando o botão "Cancelar" é clicado;
  - Descrição: este componente é um formulário para cadastro e edição de séries.

- SerieList:
  - `props`
    - series: um array com uma lista de séries;
    - onEditar: callback que é chamado quando o botão "Editar" é clicado;
    - onDeletar: callback que é chamado quando o botão "Remover" é clicado;
  - Descrição: este componente renderiza a lista de séries.

- NavBar:
  - `props`
    - paginaAtual: string com o nome da página atual;
    - onMudarPagina: callback que é chamado quando o botão "Mudar página" é clicado;

- InfoMain:
  - `props`
    - title: string com o título da página;
    - subtitle: string com o subtítulo da página;
    - description: string com a descrição da página;
  - Descrição: este componente renderiza o título, subtítulo e descrição da página

- FootBar:
  - Descrição: este componente renderiza o rodapé da página

Páginas:
    - Home:
    - Descrição: página inicial do projeto
    tela: (./public/home.html)

    - Cadastrar:
    - Descrição: página de cadastro de séries
    tela: (./public/register_series.html)

    - Listar:
    - Descrição: página de listagem de séries
    tela: (./public/list_serie.html)

    - Sobre:
    - Descrição: página sobre o projeto   
    tela: (./public/about.html)

## Conclusão

Este projeto é apenas para fins acadêmicos, com o objetivo de desenvolver as habilidade em reactjs.