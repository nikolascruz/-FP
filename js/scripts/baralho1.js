// Importa o módulo para ler entrada do usuário
const prompt = require('prompt-sync')({ sigint: true });

class Carta {
    #num;
    #naipe;

    constructor(numb, naipe) {
        if (numb < 1 || numb > 13 || (naipe !== "copas" && naipe !== "ouros" && naipe !== "paus" && naipe !== "espadas")) {
            throw new Error("Número ou naipe inválido");
        }
        this.#num = numb;
        this.#naipe = naipe;
    }

    toString() {
        return `Número: ${this.#num}, Naipe: ${this.#naipe}`;
    }
}

class Baralho {
    baralhoCopas;
    baralhoOuro;
    baralhoEspadas;
    baralhoPaus;

    constructor(copas, ouro, espadas, paus) {
        this.baralhoCopas = copas;
        this.baralhoOuro = ouro;
        this.baralhoEspadas = espadas;
        this.baralhoPaus = paus;
    }

    // Método para unir todos os baralhos
    getBaralhoCompleto() {
        return [
            ...this.baralhoCopas,
            ...this.baralhoOuro,
            ...this.baralhoEspadas,
            ...this.baralhoPaus
        ];
    }

    // Método para embaralhar o baralho completo
    embaralhar() {
        const baralhoCompleto = this.getBaralhoCompleto();
        // Algoritmo de Fisher-Yates para embaralhar
        for (let i = baralhoCompleto.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [baralhoCompleto[i], baralhoCompleto[j]] = [baralhoCompleto[j], baralhoCompleto[i]];
        }
        return baralhoCompleto;
    }

    // Pega a carta do topo
    cartaTopo() {
        const baralhoCompleto = this.getBaralhoCompleto();
        return baralhoCompleto[0];  // Primeira carta
    }

    // Pega a carta do fundo
    cartaBaixo() {
        const baralhoCompleto = this.getBaralhoCompleto();
        return baralhoCompleto[baralhoCompleto.length - 1];  // Última carta
    }

    // Método para visualizar o baralho
    toString() {
        let str = '';
        str += 'Copas:\n' + this.baralhoCopas.map(c => c.toString()).join('\n') + '\n';
        str += 'Ouros:\n' + this.baralhoOuro.map(c => c.toString()).join('\n') + '\n';
        str += 'Espadas:\n' + this.baralhoEspadas.map(c => c.toString()).join('\n') + '\n';
        str += 'Paus:\n' + this.baralhoPaus.map(c => c.toString()).join('\n') + '\n';
        return str;
    }
}

// Criando as cartas de cada naipe
let copas = [];
let ouros = [];
let paus = [];
let espadas = [];

// Criando as cartas de cada naipe
for (let i = 1; i <= 13; i++) {
    copas.push(new Carta(i, "copas"));
    ouros.push(new Carta(i, "ouros"));
    paus.push(new Carta(i, "paus"));
    espadas.push(new Carta(i, "espadas"));
}

// Criando o baralho
let baralhos = new Baralho(copas, ouros, espadas, paus);

// Testando a visualização do baralho
console.log("Baralho antes de embaralhar:\n" + baralhos.toString());

// Testando o embaralhamento
let baralhoEmbaralhado = baralhos.embaralhar();
console.log("\nBaralho embaralhado:");
baralhoEmbaralhado.forEach(carta => console.log(carta.toString()));

// Pegando a carta do topo
console.log("\nCarta do topo: " + baralhos.cartaTopo().toString());

// Pegando a carta do fundo
console.log("\nCarta do fundo: " + baralhos.cartaBaixo().toString());
