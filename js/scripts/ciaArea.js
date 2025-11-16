class Passagem {
    #data;
    #numeroVoo;
    #custoBase;
    #prioridade;
    #mala;
    #custoOperacional;

    constructor(data, numeroVoo, custoBase) {
        if (typeof numeroVoo !== "number" || typeof custoBase !== "number") {
            console.log("Os valores devem ser números!");
            return; // Termina a execução se os dados estiverem incorretos
        }

        this.#data = data;
        this.#numeroVoo = numeroVoo;
        this.#custoBase = custoBase;
        this.#prioridade = "Não";
        this.#mala = 0;
        this.#custoOperacional = 1;
    }

    // Getters e Setters
    get numeroVoo() { return this.#numeroVoo; }
    get custoBase() { return this.#custoBase; }
    get prioridade() { return this.#prioridade; }
    set prioridade(valor) { this.#prioridade = valor; }

    get mala() { return this.#mala; }
    set mala(valor) { this.#mala = valor; }

    get custoOperacional() { return this.#custoOperacional; }
    set custoOperacional(valor) { this.#custoOperacional = valor; }

    // Cálculo do custo total
    custoTotal() {
        return this.#custoBase * this.#custoOperacional;
    }

    // Método para apresentar a passagem em formato de string
    toString() {
        return `Voo nº ${this.#numeroVoo} | Data: ${this.#data} | Custo Base: R$ ${this.#custoBase.toFixed(2)} | Custo Operacional: R$ ${(this.#custoBase * this.#custoOperacional).toFixed(2)} | Mala(s): ${this.#mala} | Prioridade: ${this.#prioridade}`;
    }
}

// Classe Passagem Econômica
class PassagemEconomica extends Passagem {
    constructor(data, numeroVoo, custoBase) {
        super(data, numeroVoo, custoBase);
        this.prioridade = "Não"; // Usando setter
        this.mala = 0; // Usando setter
        this.custoOperacional = 1.1; // 10% de custo operacional
    }
}

// Classe Passagem Executiva
class PassagemExecutiva extends Passagem {
    constructor(data, numeroVoo, custoBase) {
        super(data, numeroVoo, custoBase);
        this.prioridade = "Não"; // Usando setter
        this.mala = 1; // Usando setter
        this.custoOperacional = 1.3; // 30% de custo operacional
    }
}

// Classe Passagem Primeira Classe
class PassagemPrimeira extends Passagem {
    constructor(data, numeroVoo, custoBase) {
        super(data, numeroVoo, custoBase);
        this.prioridade = "Sim"; // Usando setter
        this.mala = 3; // Usando setter
        this.custoOperacional = 1.5; // 50% de custo operacional a mais que a executiva
    }
}

function passagemIdeal(data, numb, custoBase, vip, bagagem) {

    // Não existe passagem com VIP mas sem mala
    if (vip === true && bagagem === false) {
        console.log("Não existe passagem que ofereça VIP sem direito a bagagem.");
        return null;
    }

    // ECONÔMICA → sem VIP e sem bagagem
    if (!vip && !bagagem) {
        return new PassagemEconomica(data, numb, custoBase);
    }

    // EXECUTIVA → sem VIP mas com bagagem
    if (!vip && bagagem) {
        return new PassagemExecutiva(data, numb, custoBase);
    }

    // PRIMEIRA CLASSE → VIP e bagagem
    if (vip && bagagem) {
        return new PassagemPrimeira(data, numb, custoBase);
    }

    return null; // fallback seguro
}

function bagagem(voo) {

  let malas = 0
  for(let mala of voo){
    if(mala instanceof Passagem)
    malas += mala.mala;
      
  }
  return malas
}

function caracteristica(voo) {
    let malas = 0;
    let vips = 0;

    for (let p of voo) {
        if (p instanceof Passagem) {
            malas += p.mala;
            if (p.prioridade === "Sim") {
                vips++;
            }
        }
    }

    return {
        malas: malas,
        vips: vips
    };
}
let voo1 = [];
voo1.push( new PassagemEconomica("22/10/25", 101, 500));
voo1.push( new PassagemExecutiva("22/10/25", 102, 500));
voo1.push( new PassagemPrimeira("22/10/25", 103, 500));

