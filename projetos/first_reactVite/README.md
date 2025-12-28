# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### Rodando o projeto

npm run dev
npm run build
npm run preview

### 1. O que é **Vite**?

O **Vite** é uma ferramenta de desenvolvimento que ajuda a criar projetos web de forma rápida e eficiente, usando o **React** (no seu caso, ou qualquer outro framework que você tenha escolhido). Ele cuida de várias coisas no processo de desenvolvimento, como a compilação do código e a atualização rápida da página, sem você precisar ficar recarregando tudo manualmente.

Quando você cria um projeto com o **Vite**, ele já cria a estrutura básica do seu projeto, que inclui arquivos e pastas para você começar a programar. O Vite também tem um comando para **buildar** o projeto (ou seja, criar uma versão "final" que pode ser colocada no ar).

### 2. O que é **"build"**?

Quando você roda o comando `npm run build` (ou `yarn build`, dependendo de como está configurado), o **Vite** pega todo o código que você escreveu, otimiza ele para produção (deixa o código mais leve e rápido), e cria a pasta **`dist/`**.

Essa pasta **`dist/`** é onde fica a versão "pronta" do seu site ou aplicação, que pode ser usada para ser hospedada na web.

### 3. A pasta **dist**:

O diretório **`dist/`** é a pasta onde o Vite coloca os arquivos "otimizados" do seu projeto, prontos para produção. Aqui vão os arquivos "compilados" (geralmente minificados, ou seja, com o código mais leve), que são aqueles que você vai enviar para servidores de hospedagem, como o **Vercel**, para colocar seu site no ar.

O **Vercel** é uma plataforma de hospedagem muito popular para sites feitos com frameworks como **React**. A ideia do tutorial é que, depois de rodar o `npm run build`, você pega esses arquivos de dentro do `dist/` e sobe para o Vercel, que vai servir esses arquivos para qualquer pessoa acessar seu site.

### 4. A estrutura de arquivos que o Vite cria

Agora, sobre a estrutura do projeto, vou te explicar os arquivos e pastas que o Vite gera quando você cria um projeto com o React.

Aqui estão os principais arquivos e pastas:

#### **1. `public/`** (Pasta Pública)

* **O que é?** Essa pasta contém arquivos estáticos, ou seja, arquivos que não vão ser "mexidos" ou "processados" pelo Vite. Normalmente, você coloca imagens, fontes, ou o **`index.html`** aqui.
* **Por que é importante?** O Vite vai pegar o `index.html` dessa pasta e usá-lo como a base do seu aplicativo. Esse é o ponto de entrada da aplicação. Quando alguém acessa o seu site, o HTML carregado é o que está aqui.

#### **2. `src/`** (Fonte do Projeto)

* **O que é?** Aqui é onde o código do seu aplicativo vai ficar. Dentro dessa pasta você vai ter os arquivos **.js** ou **.jsx** (no caso do React), que contêm o código da sua aplicação.
* **Arquivos principais:**

  * **`main.jsx` ou `index.jsx`**: Esse arquivo é o ponto de entrada do seu código JavaScript. Ele vai ser o primeiro arquivo que o navegador vai rodar quando acessar a aplicação.
  * **`App.jsx`**: Esse é o componente principal do seu projeto, onde você coloca a estrutura básica da sua interface (UI) com React.
  * **Pasta `components/`**: Você pode criar essa pasta dentro de `src/` para colocar os componentes do React que você for criando. São pedaços do seu aplicativo, como botões, formulários, etc.

#### **3. `index.html`** (HTML Base)

* **O que é?** Esse arquivo é o HTML que vai ser carregado quando alguém acessar seu site. Ele tem uma tag `div` com o id `app` (ou outro nome que você escolher), e o Vite vai "injetar" o conteúdo da sua aplicação React nesse `div` quando o JavaScript for carregado.

#### **4. `vite.config.js`** (Configuração do Vite)

* **O que é?** Esse arquivo serve para você configurar o comportamento do Vite. Geralmente você não vai mexer muito nele, mas ele permite customizar coisas como como o Vite deve rodar, como ele lida com a importação de arquivos, entre outras coisas.

#### **5. `node_modules/`** (Módulos)

* **O que é?** Essa pasta é onde ficam as dependências do seu projeto. Quando você instala bibliotecas externas (como o React, por exemplo), elas vão parar aqui. Você não precisa se preocupar com ela, o **npm** (ou **yarn**) cuida disso para você.

#### **6. `package.json`**

* **O que é?** Esse é o arquivo onde o **npm** ou **yarn** mantém o controle das dependências do projeto e os scripts (como o `npm run build`, que você usou). Ele lista todas as bibliotecas que seu projeto usa e tem informações básicas sobre o seu projeto.

#### **7. `.gitignore`**

* **O que é?** Esse arquivo diz ao Git (caso você esteja usando para controle de versão) para não rastrear certas pastas e arquivos. Geralmente ele ignora a pasta `node_modules/` e a pasta `dist/` porque esses arquivos podem ser gerados novamente e não precisam ser versionados.

### 5. Vercel e a pasta **`dist/`**

Como mencionei, a pasta **`dist/`** contém a versão otimizada e "final" do seu projeto, que você vai enviar para plataformas como o **Vercel**.

Quando você cria um projeto no **Vercel**, ele vai automaticamente detectar seu repositório (caso tenha configurado um git, como GitHub ou GitLab) e, se o seu projeto for um app React com o Vite, ele sabe que o comando para gerar a versão final é o `npm run build`, e vai procurar pela pasta **`dist/`**.

### Em resumo

* **Vite** ajuda a desenvolver e otimizar projetos com frameworks como o React.
* O comando **`npm run build`** cria a pasta **`dist/`** com a versão pronta para ser colocada no ar.
* Arquivos e pastas criados pelo Vite ajudam a estruturar seu código, otimizar o processo e integrar com o controle de versão.

