// jogo.js - Fase 2
// Versão atualizada: adiciona lógica para usar o Desativador-neural no MegaCerebro

import { Sala } from './sala.js';
import { Jogador } from './jogador.js';
import { Item, ItemColetavel, Container, Documento, Terminal, Dispositivo, RoboAuxiliar, MegaCerebro } from './item.js';

export class Jogo {
  constructor() {
    this.salas = new Map();
    this.jogador = new Jogador({ nome: 'Aluno PUCRS' });
    this.salaAtual = null;
    this.rodando = false;

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

    // ids necessários para montagem
    this.componentesNecessarios = ['peca-mecanica', 'modulo-logico'];

    // flag para indicar se o Nexus (MegaCerebro) está desativado
    this.nexusDesativado = false;
  }

  iniciar() {
    const prot = new Sala({ id: 'prot', nome: 'Laboratório de Protótipos', descricao: 'Bancadas e projetos inacabados.' });
    const almox = new Sala({ id: 'almox', nome: 'Almoxarifado Técnico', descricao: 'Prateleiras com caixas e malas trancadas.' });
    const ele = new Sala({ id: 'ele', nome: 'Laboratório de Eletrônica', descricao: 'Protoboards e circuitos por toda parte.' });
    const ctrl = new Sala({ id: 'ctrl', nome: 'Sala de Controle', descricao: 'Terminais e o Mega Cérebro do NEXUS-9.' });

    prot.conectar('sul', almox);
    almox.conectar('sul', ele);
    ele.conectar('sul', ctrl);

    // itens (mesmos da fase 1, com adaptações no ID do dispositivo)
    const bilhete = new Documento({ id: 'bilhete-senha', nome: 'Bilhete com senha', texto: 'Senha: 0420' });
    const ferramenta = new Item({ id: 'ferramenta', nome: 'Chave de fenda', descricao: 'Uma ferramenta simples, útil para pequenos reparos.' });
    const caixaTrancada = new Item({ id: 'caixa-trancada', nome: 'Caixa trancada', descricao: 'Uma caixa com fecho reforçado. Parece vazia por fora.' });

    const pecaMecanica = new ItemColetavel({ id: 'peca-mecanica', nome: 'Peça Mecânica', descricao: 'Parte mecânica essencial para montar o Desativador Neural.' });
    const mala = new Container({ id: 'mala-pecas', nome: 'Mala com Peças', descricao: 'Mala trancada. Precisa de senha.', conteudo: [pecaMecanica], bloqueado: true, senha: '0420' });

    const docProf = new Documento({ id: 'doc-prof', nome: 'Documento do Professor', texto: 'Instruções de acesso: NEXUS-UNLOCK. Use esse token no terminal de controle.' });
    const lousa = new Documento({ id: 'lousa', nome: 'Lousa', texto: 'Componentes para o Desativador Neural: peca-mecanica, modulo-logico' });

    const modulo = new ItemColetavel({ id: 'modulo-logico', nome: 'Módulo Lógico', descricao: 'Módulo lógico retirável do robô auxiliar.' });
    const robo = new RoboAuxiliar({ id: 'robo-aux', nome: 'Robô Auxiliar Danificado', descricao: 'Um robô auxiliar com partes expostas.', modulo });

    const bancadaEle = new Item({ id: 'bancada-ele', nome: 'Bancada de eletrônica', descricao: 'Protoboards e ferramentas.' });
    const protoboard = new Item({ id: 'protoboard', nome: 'Protoboard', descricao: 'Placas para testes.' });
    const bancadaTeste = new Item({ id: 'bancada-teste', nome: 'Bancada de teste', descricao: 'Ferramentas e instruções.' });
    const bancadaMec = new Item({ id: 'bancada-mec', nome: 'Bancada de mecânica', descricao: 'Ferramentas pesadas e peças.' });

    const terminal = new Terminal({ id: 'terminal-controle', nome: 'Terminal de Controle', descricao: 'Terminal central; precisa de token para desbloquear.', bloqueado: true, instrucoes: 'NEXUS-UNLOCK' });

    // novo: MegaCerebro
    const mega = new MegaCerebro({ id: 'mega-cerebro', nome: 'Mega Cérebro NEXUS-9', descricao: 'Supercomputador central. Aqui será conectado o desativador.' });

    const tela = new Item({ id: 'tela-nexus', nome: 'Tela do NEXUS-9', descricao: 'Mensagens enigmáticas aparecem aqui.' });
    const portaSaida = new Item({ id: 'porta-saida', nome: 'Porta de Saída', descricao: 'Porta trancada. Só abrirá após desativação.' });

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

    this.salas.set(prot.id, prot);
    this.salas.set(almox.id, almox);
    this.salas.set(ele.id, ele);
    this.salas.set(ctrl.id, ctrl);

    this.salaAtual = prot;
    this.rodando = true;

    return `Jogo iniciado. Você está em ${this.salaAtual.nome}. Digite 'ajuda' para comandos.`;
  }

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

  handlerAjuda() {
    return `Comandos disponíveis:\n- olhar (ver sala)\n- examinar <id>\n- ir/mover <direcao>\n- pegar <itemId>\n- largar <itemId>\n- abrir <containerId> <codigo>\n- retirar <roboId> (extrai módulo)\n- usar <itemId> <alvoId> (ex: usar doc-prof terminal-controle)\n- usar desativador-neural mega-cerebro\n- montar (monta dispositivo no terminal desbloqueado)\n- inventario\n- ajuda/help\n- sair`;
  }

  handlerOlhar() {
    return this.salaAtual.examinarAmbiente();
  }

  handlerExaminar(args) {
    if (args.length === 0) return 'Use: examinar <itemId>'; 
    const id = args[0];
    if (this.jogador.temItem(id)) return this.jogador.examinar(id);
    return this.salaAtual.examinar(id);
  }

  handlerIr(args) {
    if (args.length === 0) return 'Use: ir <direcao>';
    const dir = args[0];
    const destino = this.salaAtual.adj[dir];
    if (!destino) return `Não é possível ir para '${dir}' a partir daqui.`;
    this.salaAtual = destino;
    return `Você vai para ${this.salaAtual.nome}.\n${this.salaAtual.examinarAmbiente()}`;
  }

  handlerPegar(args) {
    if (args.length === 0) return 'Use: pegar <itemId>';
    const id = args[0];
    const item = this.salaAtual.obterItem(id);
    if (!item) return `Não existe '${id}' aqui.`;

    const removido = this.salaAtual.removerItem(id);
    const resultado = this.jogador.pegar(removido);
    if (!resultado.sucesso) {
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
    if (res.item) this.salaAtual.adicionarItem(res.item);
    return res.mensagem;
  }

  handlerUsar(args) {
    if (args.length < 1) return 'Use: usar <itemId> <alvoId>';
    // suportar tanto: usar item alvo  OR usar desativador-neural mega-cerebro
    const itemId = args[0];
    const alvoId = args[1] || null;

    // localizar item (inventário primeiro)
    let item = this.jogador.inventario.find((i) => i.id === itemId) || this.salaAtual.obterItem(itemId);
    if (!item) return `Item '${itemId}' não encontrado nem no inventário nem na sala.`;

    // caso especial: usar desativador-neural no mega-cerebro
    if (item.id === 'desativador-neural' && alvoId === 'mega-cerebro') {
      const mega = this.salaAtual.obterItem('mega-cerebro');
      if (!mega) return 'Mega Cérebro não está acessível aqui.';
      const res = mega.receberSinal(item);
      if (res.sucesso) {
        this.nexusDesativado = true;
        return res.mensagem;
      }
      return res.mensagem;
    }

    // usar porta-saida sem alvo: 'usar porta-saida'
    if (itemId === 'porta-saida') {
      const porta = this.salaAtual.obterItem('porta-saida');
      if (!porta) return 'Não há porta aqui.';
      if (!this.nexusDesativado) return 'A porta não abre. O sistema de segurança ainda está ativo.';
      // final do jogo
      this.rodando = false;
      return 'Você escapa da Poli enquanto os sistemas de emergência desligam. FIM DO JOGO.';
    }

    // caso geral: tentar usar item num alvo (fallback)
    if (!alvoId) return 'Use: usar <itemId> <alvoId>';
    const alvo = this.salaAtual.obterItem(alvoId) || (this.jogador.temItem(alvoId) ? this.jogador.inventario.find(i=>i.id===alvoId) : null);
    if (!alvo) return `Alvo '${alvoId}' não encontrado nesta sala.`;

    // caso: usar documento (texto) no terminal
    if (alvo instanceof Terminal) {
      const texto = item.texto || item.descricao || '';
      const res = alvo.desbloquear(texto);
      return res.mensagem;
    }

    const res = item.usar(alvo);
    return res && res.mensagem ? res.mensagem : 'Nada aconteceu.';
  }

  handlerMontar() {
    const terminal = this.salaAtual.obterItem('terminal-controle');
    if (!terminal) return 'Não há um terminal aqui para montar o dispositivo.';
    if (terminal.bloqueado) return 'O terminal ainda está bloqueado.';

    const temTodos = this.componentesNecessarios.every((cid) => this.jogador.temItem(cid));
    if (!temTodos) return 'Você ainda não possui todos os componentes necessários.';

    const componentes = [];
    this.componentesNecessarios.forEach((cid) => {
      const res = this.jogador.largar(cid);
      if (res.sucesso && res.item) {
        componentes.push(res.item);
      }
    });

    const dispositivo = new Dispositivo({ id: 'desativador-neural', nome: 'Desativador-neural', descricao: 'Dispositivo capaz de interromper os processos do NEXUS-9.' });
    dispositivo.montar(componentes.map(c => c.id));

    const pegou = this.jogador.pegar(dispositivo);
    if (!pegou.sucesso) {
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
