// sala.js
// Classe Sala para o jogo "Colapso na Poli"
// Responsável por armazenar itens, conexões e comportamento básico.

import { Item } from './item.js';

export class Sala {
  constructor({ id, nome, descricao = '', itens = [], adj = {} }) {
    if (!id) throw new Error('Sala precisa de um id.');

    this.id = id;
    this.nome = nome || id;
    this.descricao = descricao;

    // array de itens (objetos Item ou subclasses)
    this.itens = Array.isArray(itens) ? itens : [];

    // mapa de direções -> ids de salas ou referências
    this.adj = adj; // ex.: { norte: "labEletronica" }
  }

  /**
   * Conecta esta sala a outra em uma direção específica.
   * @param {string} direcao
   * @param {Sala} salaDestino
   */
  conectar(direcao, salaDestino) {
    if (!direcao || !salaDestino) return;
    this.adj[direcao] = salaDestino;
  }

  /**
   * Retorna texto básico da sala.
   */
  examinarAmbiente() {
    const itensNomes = this.itens.map((i) => i.nome).join(', ') || 'Nenhum objeto relevante aqui.';
    return `Você está em ${this.nome}. ${this.descricao}\nObjetos visíveis: ${itensNomes}`;
  }

  /**
   * Adiciona um item à sala.
   */
  adicionarItem(item) {
    if (!(item instanceof Item)) {
      throw new Error('Somente objetos do tipo Item podem ser adicionados à sala.');
    }
    this.itens.push(item);
  }

  /**
   * Remove item da sala pelo id.
   * @returns o item removido ou null
   */
  removerItem(itemId) {
    const idx = this.itens.findIndex((it) => it.id === itemId);
    if (idx === -1) return null;
    return this.itens.splice(idx, 1)[0];
  }

  /**
   * Retorna um item pelo id sem removê-lo.
   */
  obterItem(itemId) {
    return this.itens.find((i) => i.id === itemId) || null;
  }

  /**
   * Examina um item dentro da sala.
   */
  examinar(itemId) {
    const item = this.obterItem(itemId);
    if (!item) return `Não há nenhum objeto chamado '${itemId}' aqui.`;
    if (!item.examinavel) return `${item.nome} não pode ser examinado.`;
    return item.examinar();
  }
}
