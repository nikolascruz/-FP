// jogo.js
// Classe Jogo — versão B (estruturada, modular e didática)
// Integra Sala, Jogador e Items, processa comandos básicos.

import { Sala } from './sala.js';
import { Jogador } from './jogador.js';
import { Item, ItemColetavel, Container, Documento, Terminal, Dispositivo, RoboAuxiliar } from './item.js';

export class Jogo {
  constructor() {
    this.salas = new Map();
    this.jogador = new Jogador({ nome: 'Aluno PUCRS' });
    this.salaAtual = null;
    this.rodando = false;

    // Lista simples de comandos e handlers (mapeamento)
    this.handlers = {
      olhar: this.handlerOlhar.bind(this),
      examinar: this.handlerExaminar.bind(this),
      ir: this.handlerIr.bind(this),
      mover: this.handlerIr.bind(this),
      pegar: this.handlerPegar.bind(this),
      largar: this.handlerLargar.bind(this),
      abrir: this.handlerAbrir.bind(this),
      retirar: this.handlerRetirar.bind(this),
      usar: this.handlerUsar.bind(this),
      montar: this.handlerMontar.bind(this),
      inventario: this.handlerInventario.bind(this),
      ajuda: this.handlerAjuda.bind(this),
      help: this.handlerAjuda.bind(this),
      sair: this.handlerSair.bind(this),
    };

    // lista de componentes necessários (ids)
    this.componentesNecessarios = ['peca-mecanica', 'modulo-logico'];
  }

  iniciar() {
    // criar salas
    const prot = new Sala({ id: 'prot', nome: 'Laboratório de Protótipos', descricao: 'Bancadas e projetos inacabados.' });
    const almox = new Sala({ id: 'almox', nome: 'Almoxarifado Técnico', descricao: 'Prateleiras com caixas e malas trancadas.' });
    const ele = new Sala({ id: 'ele', nome: 'Laboratório de Eletrônica', descricao: 'Protoboards e circuitos por toda parte.' });
    const ctrl = new Sala({ id: 'ctrl', nome: 'Sala de Controle', descricao: 'Terminais e o Mega Cérebro do NEXUS-9.' });

    // conectar (linha única: sul)
    prot.conectar('sul', almox);
    almox.conectar('sul', ele);
    ele.conectar('sul', ctrl);

    // criar itens
    const bilhete = new Documento({ id: 'bilhete-senha', nome: 'Bilhete com senha', texto: 'Senha: 0420' });
    const ferramenta = new Item({ id: 'ferramenta', nome: 'Chave de fenda', descricao: 'Uma ferramenta simples, útil para pequenos reparos.' });
    const caixaTrancada = new Item({ id: 'caixa-trancada', nome: 'Caixa trancada', descricao: 'Uma caixa com fecho reforçado. Parece vazia por fora.' });

    // mala com peça mecânica (container)
    const pecaMecanica = new ItemColetavel({ id: 'peca-mecanica', nome: 'Peça Mecânica', descricao: 'Parte mecânica essencial para montar o Desativador Neural.' });
    const mala = new Container({ id: 'mala-pecas', nome: 'Mala com Peças', descricao: 'Mala trancada. Precisa de senha.', conteudo: [pecaMecanica], bloqueado: true, senha: '0420' });

    // documento do professor com instruções para desbloquear
    const docProf = new Documento({ id: 'doc-prof', nome: 'Documento do Professor', texto: 'Instruções de acesso: NEXUS-UNLOCK. Use esse token no terminal de controle.' });

    // lousa com componentes
    const lousa = new Documento({ id: 'lousa', nome: 'Lousa', texto: 'Componentes para o Desativador Neural: peca-mecanica, modulo-logico' });

    // robo auxiliar com modulo
    const modulo = new ItemColetavel({ id: 'modulo-logico', nome: 'Módulo Lógico', descricao: 'Módulo lógico retirável do robô auxiliar.' });
    const robo = new RoboAuxiliar({ id: 'robo-aux', nome: 'Robô Auxiliar Danificado', descricao: 'Um robô auxiliar com partes expostas.', modulo });

    // protoboards e bancadas (apenas examináveis)
    const bancadaEle = new Item({ id: 'bancada-ele', nome: 'Bancada de eletrônica', descricao: 'Protoboards e ferramentas.' });
    const protoboard = new Item({ id: 'protoboard', nome: 'Protoboard', descricao: 'Placas para testes.' });
    const bancadaTeste = new Item({ id: 'bancada-teste', nome: 'Bancada de teste', descricao: 'Ferramentas e instruções.' });
    const bancadaMec = new Item({ id: 'bancada-mec', nome: 'Bancada de mecânica', descricao: 'Ferramentas pesadas e peças.' });

    // terminal no controle
    const terminal = new Terminal({ id: 'terminal-controle', nome: 'Terminal de Controle', descricao: 'Terminal central; precisa de token para desbloquear.', bloqueado: true, instrucoes: 'NEXUS-UNLOCK' });
    const mega = new Item({ id: 'mega-cerebro', nome: 'Mega Cérebro NEXUS-9', descricao: 'Supercomputador central. Aqui será conectado o desativador.' });
    const tela = new Item({ id: 'tela-nexus', nome: 'Tela do NEXUS-9', descricao: 'Mensagens enigmáticas aparecem aqui.' });
    const portaSaida = new Item({ id: 'porta-saida', nome: 'Porta de Saída', descricao: 'Porta trancada. Só abrirá após desativação.' });

    // registrar itens nas salas
    prot.adicionarItem(bilhete);
    prot.adicionarItem(ferramenta);
    prot.adicionarItem(caixaTrancada);

    almox.adicionarItem(mala);
    almox.adicionarItem(docProf);
    almox.adicionarItem(bancadaTeste);
    almox.adicionarItem(bancadaMec);

    ele.adicionarItem(lousa);
    ele.adicionarItem(robo);
    ele.adicionarItem(bancadaEle);
    ele.adicionarItem(protoboard);

    ctrl.adicionarItem(terminal);
    ctrl.adicionarItem(mega);
    ctrl.adicionarItem(tela);
    ctrl.adicionarItem(portaSaida);

    // salvar salas
    this.salas.set(prot.id, prot);
    this.salas.set(almox.id, almox);
    this.salas.set(ele.id, ele);
    this.salas.set(ctrl.id, ctrl);

    // definir sala atual
    this.salaAtual = prot;
    this.rodando = true;

    return `Jogo iniciado. Você está em ${this.salaAtual.nome}. Digite 'ajuda' para comandos.`;
  }

  /**
   * Parse e dispatch de comandos básicos.
   * Retorna string resposta.
   */
  async processar(input = '') {
    if (!input || typeof input !== 'string') return 'Comando inválido.';
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const handler = this.handlers[cmd];
    if (!handler) return `Comando desconhecido: ${cmd}. Digite 'ajuda'.`;

    try {
      return await handler(args);
    } catch (e) {
      return `Erro ao executar comando: ${e.message}`;
    }
  }

  // -------------------- Handlers --------------------
  handlerAjuda() {
    return `Comandos disponíveis:\n- olhar (ver sala)\n- examinar <id>\n- ir/mover <direcao>\n- pegar <itemId>\n- largar <itemId>\n- abrir <containerId> <codigo>\n- retirar <roboId> (extrai módulo)\n- usar <itemId> <alvoId> (ex: usar doc-prof terminal-controle)\n- montar (monta dispositivo no terminal desbloqueado)\n- inventario\n- ajuda/help\n- sair`;
  }

  handlerOlhar() {
    return this.salaAtual.examinarAmbiente();
  }

  handlerExaminar(args) {
    if (args.length === 0) return 'Use: examinar <itemId>'; 
    const id = args[0];
    // procurar no inventário primeiro
    if (this.jogador.temItem(id)) return this.jogador.examinar(id);
    return this.salaAtual.examinar(id);
  }

  handlerIr(args) {
    if (args.length === 0) return 'Use: ir <direcao>';
    const dir = args[0];
    const destino = this.salaAtual.adj[dir];
    if (!destino) return `Não é possível ir para '${dir}' a partir daqui.`;
    // se a adj contém referência a objeto Sala
    this.salaAtual = destino;
    return `Você vai para ${this.salaAtual.nome}.\n${this.salaAtual.examinarAmbiente()}`;
  }

  handlerPegar(args) {
    if (args.length === 0) return 'Use: pegar <itemId>';
    const id = args[0];
    const item = this.salaAtual.obterItem(id);
    if (!item) return `Não existe '${id}' aqui.`;

    // remover da sala antes
    const removido = this.salaAtual.removerItem(id);
    const resultado = this.jogador.pegar(removido);
    if (!resultado.sucesso) {
      // recoloca na sala
      this.salaAtual.adicionarItem(removido);
      return resultado.mensagem;
    }
    return resultado.mensagem;
  }

  handlerLargar(args) {
    if (args.length === 0) return 'Use: largar <itemId>';
    const id = args[0];
    const res = this.jogador.largar(id);
    if (!res.sucesso) return res.mensagem;
    this.salaAtual.adicionarItem(res.item);
    return res.mensagem;
  }

  handlerAbrir(args) {
    if (args.length < 2) return 'Use: abrir <containerId> <codigo>';
    const [id, codigo] = args;
    const item = this.salaAtual.obterItem(id);
    if (!item) return `Não existe '${id}' aqui.`;
    if (!(item instanceof Container)) return `${item.nome} não é um container.`;

    const res = item.abrir(codigo);
    if (!res.sucesso) return res.mensagem;

    // adicionar itens liberados à sala
    if (Array.isArray(res.itens)) {
      res.itens.forEach((it) => this.salaAtual.adicionarItem(it));
    }
    return res.mensagem;
  }

  handlerRetirar(args) {
    if (args.length === 0) return 'Use: retirar <roboId>';
    const id = args[0];
    const item = this.salaAtual.obterItem(id);
    if (!item) return `Não existe '${id}' aqui.`;
    if (!(item instanceof RoboAuxiliar)) return `${item.nome} não permite retirada de peça.`;

    const res = item.retirarPeca();
    if (!res.sucesso) return res.mensagem;
    // res.item -> adicionar à sala
    if (res.item) this.salaAtual.adicionarItem(res.item);
    return res.mensagem;
  }

  handlerUsar(args) {
    if (args.length < 2) return 'Use: usar <itemId> <alvoId>';
    const [itemId, alvoId] = args;

    // encontrar item (inventário ou sala)
    let item = this.jogador.inventario.find((i) => i.id === itemId) || this.salaAtual.obterItem(itemId);
    if (!item) return `Item '${itemId}' não encontrado nem no inventário nem na sala.`;

    const alvo = this.salaAtual.obterItem(alvoId) || (this.jogador.temItem(alvoId) ? this.jogador.inventario.find(i=>i.id===alvoId) : null);
    if (!alvo) return `Alvo '${alvoId}' não encontrado nesta sala.`;

    // caso especial: usar documento (ou texto) no terminal -> desbloquear
    if (alvo instanceof Terminal) {
      const texto = item.texto || item.descricao || '';
      const res = alvo.desbloquear(texto);
      return res.mensagem;
    }

    // fallback genérico
    const res = item.usar(alvo);
    return res && res.mensagem ? res.mensagem : 'Nada aconteceu.';
  }

  handlerMontar() {
    // só funciona na sala com terminal desbloqueado
    const terminal = this.salaAtual.obterItem('terminal-controle');
    if (!terminal) return 'Não há um terminal aqui para montar o dispositivo.';
    if (terminal.bloqueado) return 'O terminal ainda está bloqueado.';

    // verificar componentes no inventário
    const temTodos = this.componentesNecessarios.every((cid) => this.jogador.temItem(cid));
    if (!temTodos) return 'Você ainda não possui todos os componentes necessários.';

    // remover componentes do inventário
    const componentes = [];
    this.componentesNecessarios.forEach((cid) => {
      const res = this.jogador.largar(cid); // reutiliza largar para extrair item
      if (res.sucesso && res.item) {
        componentes.push(res.item);
      }
    });

    // criar dispositivo
    const dispositivo = new Dispositivo({ id: 'desativador', nome: 'Desativador Neural', descricao: 'Dispositivo capaz de interromper os processos do NEXUS-9.' });
    dispositivo.montar(componentes.map(c => c.id));

    // adicionar dispositivo ao inventário
    const pegou = this.jogador.pegar(dispositivo);
    if (!pegou.sucesso) {
      // se falhar, coloca na sala
      this.salaAtual.adicionarItem(dispositivo);
      return 'Dispositivo montado, mas não foi possível carregá-lo no inventário.';
    }

    return 'Dispositivo montado com sucesso e adicionado ao inventário.';
  }

  handlerInventario() {
    return this.jogador.listarInventario();
  }

  handlerSair() {
    this.rodando = false;
    return 'Sessão encerrada.';
  }
}

/*
Exemplo de uso (executar com Node + bundler/ESM):

import readline from 'readline';
import { Jogo } from './jogo.js';

const jogo = new Jogo();
console.log(jogo.iniciar());

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.setPrompt('> ');
rl.prompt();
rl.on('line', async (line) => {
  const res = await jogo.processar(line);
  console.log(res);
  if (!jogo.rodando) rl.close();
  else rl.prompt();
});
*/
