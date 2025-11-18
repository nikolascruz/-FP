// item.js
// Classes base para itens do jogo "Colapso na Poli" (Fase 1)

//Classe base Item
//Representa qualquer objeto que existi na sala
export class Item {
  constructor({ id, nome, descricao = '', coletavel = false, examinavel = true }) {
    if (!id) throw new Error('Item precisa de um id único');
    this.id = id;
    this.nome = nome || id;
    this.descricao = descricao;
    this.coletavel = Boolean(coletavel);
    this.examinavel = Boolean(examinavel);
  }

  examinar() {
    return `${this.nome}: ${this.descricao}`;
  }

   //Usar o item contra um alvo ****subclasses podem sobrescrever
  usar(target) {
    return { sucesso: false, mensagem: `Nada acontece ao usar ${this.nome}.` };
  }
}

// Item coletável adicionado ao inventário 
export class ItemColetavel extends Item {
  constructor(opts = {}) {
    super({ ...opts, coletavel: true });
    // propriedades a mais para itens coletáveis
  }

  coletar() {
    // retorno padrão:jogador decide oque fazer com o objeto
    return { sucesso: true, mensagem: `${this.nome} coletado.` };
  }
}

// Container: objeto que vai guarda os outros itens e pode ser bloqueado por senha
export class Container extends Item {
  constructor({ conteudo = [], bloqueado = false, senha = null, ...rest } = {}) {
    super({ ...rest, examinavel: true });
    this.conteudo = Array.isArray(conteudo) ? conteudo : [];
    this.bloqueado = Boolean(bloqueado);
    this.senha = senha; // string ou null
  }

  examinar() {
    if (this.bloqueado) {
      return `${this.nome}: Está trancado.`;
    }
    const lista = this.conteudo.map((i) => i.nome || i.id).join(', ') || 'vazio';
    return `${this.nome}: contém ${lista}.`;
  }

  abrir(codigo) {
    if (!this.bloqueado) {
      return { sucesso: true, mensagem: 'Container já estava aberto.', itens: this.conteudo };
    }
    if (this.senha && codigo === this.senha) {
      this.bloqueado = false;
      const itens = this.conteudo.slice();
      this.conteudo = []; // basicamente conteúdo removido
      return { sucesso: true, mensagem: 'Senha correta. Container aberto.', itens };
    }
    return { sucesso: false, mensagem: 'Senha incorreta.' };
  }
}

// Documento simples que retorna um texto ao examinar
export class Documento extends Item {
  constructor({ texto = '', ...rest } = {}) {
    super({ ...rest, examinavel: true, coletavel: false });
    this.texto = texto;
  }

  examinar() {
    return `${this.nome}: ${this.texto}`;
  }
}

//Terminal pode ou não estar bloqueado e conter infos
export class Terminal extends Item {
  constructor({ bloqueado = true, instrucoes = '', ...rest } = {}) {
    super({ ...rest, examinavel: true, coletavel: false });
    this.bloqueado = bloqueado;
    this.instrucoes = instrucoes;
  }

  examinar() {
    if (this.bloqueado) return `${this.nome}: Terminal bloqueado. Tela exibe mensagem de erro.`;
    return `${this.nome}: Terminal desbloqueado. Pronto para montagem.`;
  }

  desbloquear(chaveTexto) {
    // chaveTexto deve conter a instrução ou token
    if (!this.bloqueado) return { sucesso: true, mensagem: 'Terminal já está desbloqueado.' };
    if (!chaveTexto) return { sucesso: false, mensagem: 'Nada fornecido para desbloquear.' };
    const ok = this.instrucoes && chaveTexto.includes(this.instrucoes);
    if (ok) {
      this.bloqueado = false;
      return { sucesso: true, mensagem: 'Terminal desbloqueado.' };
    }
    return { sucesso: false, mensagem: 'Falha ao desbloquear: instruções insuficientes.' };
  }

  montarDispositivo(componentesIds = []) {
    // validação simples
    return { sucesso: true, mensagem: 'Montagem solicitada.', componentes: componentesIds };
  }
}

// Desativador Neural
export class Dispositivo extends Item {
  constructor({ componentes = [], montado = false, ...rest } = {}) {
    super({ ...rest, coletavel: true });
    this.componentes = componentes; // array de ids/referências
    this.montado = Boolean(montado);
  }

  montar(listaItens = []) {
    // considera que a lista de ids/itens correta já foi validada externamente
    if (this.montado) return { sucesso: false, mensagem: 'Dispositivo já montado.' };
    if (!Array.isArray(listaItens) || listaItens.length === 0) {
      return { sucesso: false, mensagem: 'Componentes insuficientes.' };
    }
    this.componentes = listaItens.slice();
    this.montado = true;
    return { sucesso: true, mensagem: 'Dispositivo montado com sucesso.' };
  }

  usar(megaCerebro) {
    if (!this.montado) return { sucesso: false, mensagem: 'Dispositivo não está montado.' };
    if (!megaCerebro) return { sucesso: false, mensagem: 'Alvo inválido.' };
    // efeito será tratado pelo obj alvo
    return { sucesso: true, mensagem: 'Dispositivo ativado.' };
  }
}


//obj que vai fornecer um módulo quando inspecionar
export class RoboAuxiliar extends Item {
  constructor({ modulo = null, status = 'danificado', ...rest } = {}) {
    super({ ...rest, examinavel: true, coletavel: false });
    this.modulo = modulo; // ItemColetavel/null
    this.status = status;
    this.peçaRetirada = false;
  }

  examinar() {
    const base = `${this.nome}: ${this.descricao} (status: ${this.status}).`;
    if (this.modulo && !this.peçaRetirada) return base + ' Há um módulo parcialmente exposto.';
    if (this.peçaRetirada) return base + ' O módulo foi removido.';
    return base;
  }

  retirarPeca() {
    if (!this.modulo) return { sucesso: false, mensagem: 'Nenhum módulo disponível.' };
    if (this.peçaRetirada) return { sucesso: false, mensagem: 'Módulo já foi retirado.' };
    this.peçaRetirada = true;
    return { sucesso: true, mensagem: 'Módulo extraído.', item: this.modulo };
  }
}
