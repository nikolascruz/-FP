// jogador.js
// Classe Jogador — versão didática, consistente com o diagrama, simples para fase 1.
// Controla inventário e ações básicas do jogador.

import { Item } from './item.js';

export class Jogador {
  constructor({ nome = 'Jogador', maxItens = 6 } = {}) {
    this.nome = nome;
    this.maxItens = maxItens;

    /**
     * Inventário é um array de itens (Item ou subclasses).
     * A regra: apenas itens coletáveis entram aqui.
     */
    this.inventario = [];
  }

  /**
   * Lista os itens no inventário.
   */
  listarInventario() {
    if (this.inventario.length === 0) {
      return 'Seu inventário está vazio.';
    }
    const nomes = this.inventario.map((i) => i.nome).join(', ');
    return `Inventário: ${nomes}`;
  }

  /**
   * Verifica rapidamente se o jogador possui um item pelo id.
   */
  temItem(itemId) {
    return this.inventario.some((i) => i.id === itemId);
  }

  /**
   * Examina item que está no inventário.
   */
  examinar(itemId) {
    const item = this.inventario.find((i) => i.id === itemId);
    if (!item) return `Você não possui o item '${itemId}'.`;
    if (!item.examinavel) return `${item.nome} não pode ser examinado.`;
    return item.examinar();
  }

  /**
   * Pegar item de uma sala.
   * A sala será responsável por remover o item antes de chamar este método.
   */
  pegar(item) {
    if (!(item instanceof Item)) {
      return { sucesso: false, mensagem: 'Objeto inválido.' };
    }
    if (!item.coletavel) {
      return { sucesso: false, mensagem: `${item.nome} não pode ser coletado.` };
    }
    if (this.inventario.length >= this.maxItens) {
      return { sucesso: false, mensagem: 'Inventário cheio.' };
    }

    this.inventario.push(item);
    return { sucesso: true, mensagem: `${item.nome} adicionado ao inventário.` };
  }

  /**
   * Larga um item de volta para a sala.
   * Quem chamar este método deve inserir o item retornado na sala de destino.
   */
  largar(itemId) {
    const idx = this.inventario.findIndex((i) => i.id === itemId);
    if (idx === -1) {
      return { sucesso: false, mensagem: `Você não possui '${itemId}'.` };
    }

    const item = this.inventario.splice(idx, 1)[0];
    return { sucesso: true, mensagem: `${item.nome} removido do inventário.`, item };
  }
}
