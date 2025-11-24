// item.js - Fase 2
// Versão atualizada com a classe MegaCerebro (POO clara)

export class Item {
  constructor({ id, nome, descricao = '', coletavel = false, examinavel = true } = {}) {
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

  usar(target) {
    return { sucesso: false, mensagem: `Nada acontece ao usar ${this.nome}.` };
  }
}

export class ItemColetavel extends Item {
  constructor(opts = {}) {
    super({ ...opts, coletavel: true });
  }

  coletar() {
    return { sucesso: true, mensagem: `${this.nome} coletado.` };
  }
}

export class Container extends Item {
  constructor({ conteudo = [], bloqueado = false, senha = null, ...rest } = {}) {
    super({ ...rest, examinavel: true });
    this.conteudo = Array.isArray(conteudo) ? conteudo : [];
    this.bloqueado = Boolean(bloqueado);
    this.senha = senha;
  }

  examinar() {
    if (this.bloqueado) return `${this.nome}: Está trancado.`;
    const lista = this.conteudo.map((i) => i.nome || i.id).join(', ') || 'vazio';
    return `${this.nome}: contém ${lista}.`;
  }

  abrir(codigo) {
    if (!this.bloqueado) return { sucesso: true, mensagem: 'Container já estava aberto.', itens: this.conteudo };
    if (this.senha && codigo === this.senha) {
      this.bloqueado = false;
      const itens = this.conteudo.slice();
      this.conteudo = [];
      return { sucesso: true, mensagem: 'Senha correta. Container aberto.', itens };
    }
    return { sucesso: false, mensagem: 'Senha incorreta.' };
  }
}

// Documento permite ser coletável (útil para bilhetes e instruções)
export class Documento extends Item {
  constructor({ texto = '', coletavel = true, ...rest } = {}) {
    super({ ...rest, examinavel: true, coletavel: Boolean(coletavel) });
    this.texto = texto;
  }

  examinar() {
    return `${this.nome}: ${this.texto}`;
  }
}

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
    return { sucesso: true, mensagem: 'Montagem solicitada.', componentes: componentesIds };
  }
}

export class Dispositivo extends Item {
  constructor({ componentes = [], montado = false, ...rest } = {}) {
    super({ ...rest, coletavel: true });
    this.componentes = componentes;
    this.montado = Boolean(montado);
  }

  montar(listaItens = []) {
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
    return { sucesso: true, mensagem: 'Dispositivo ativado.' };
  }
}

export class RoboAuxiliar extends Item {
  constructor({ modulo = null, status = 'danificado', ...rest } = {}) {
    super({ ...rest, examinavel: true, coletavel: false });
    this.modulo = modulo;
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

// ----------------- Classe nova: MegaCerebro -----------------
export class MegaCerebro extends Item {
  constructor({ ativo = true, ...rest } = {}) {
    super({ ...rest, examinavel: true, coletavel: false });
    this.ativo = Boolean(ativo);
  }

  estaAtivo() {
    return this.ativo;
  }

  desativar() {
    if (!this.ativo) return { sucesso: false, mensagem: 'Mega Cérebro já está desativado.' };
    this.ativo = false;
    return { sucesso: true, mensagem: 'O Mega Cérebro NEXUS-9 solta faíscas e se desliga. Sistema comprometido.' };
  }

  receberSinal(item) {
    if (!item) return { sucesso: false, mensagem: 'Nenhum sinal recebido.' };
    const nomeId = item.id || item.nome || '';
    // aceita 'desativador-neural' como id oficial
    if (nomeId === 'desativador-neural' || nomeId === 'Desativador-neural') {
      return this.desativar();
    }
    return { sucesso: false, mensagem: 'Esse item não tem efeito sobre o Mega Cérebro.' };
  }
}
