// Importa o módulo para ler entrada do usuário
const prompt = require('prompt-sync')({ sigint: true });

class carta {
    #num;
    #naipe;

    constructor(numb,naipe) {
        if (numb > 13 || numb < 1 || (naipe !== "copas" && naipe !== "ouros" && naipe !== "paus" && naipe !== "espadas")) {
            numb = 3333333333
        }
        this.#num = numb
        this.#naipe = naipe        
    }    

    toString() {
        return `Número: ${this.#num}, Naipe: ${this.#naipe}`;
    }
}

class baralho {
    baralhoCopas;
    baralhoOuro;
    baralhoespadas;
    baralhoPaus;

    constructor(copas,ouro,espadas,paus) {
        this.baralhoCopas = copas;
        this.baralhoOuro = ouro;
        this.baralhoEspadas = espadas;
        this.baralhoPaus = paus;
    }

    embaralhar(){
        baralhocompleto;

    }

    cartaTopo(){
        pegarcarta;

    }

    cartaBaixo(){
        pegarcarta;

    }


    toString(){
        let str = console.log(`Copas= ${this.baralhoCopas}`);
        console.log(`Copas= ${this.baralhoOuro}`);
        console.log(`Copas= ${this.baralhoPaus}`);
        console.log(`Copas= ${this.baralhoEspadas}`);
        return str;
    }
}

//lista de naipes
let copas = [13];
let ouros = [13];
let paus = [13];
let espadas = [13];

//loops para criar as cartas de cada naipe
for (let i = 1; i < 13; i++) {
    copas.push(new carta( i,"copas")); 
    ouros.push(new carta( i,"ouros"));
    paus.push(new carta( i,"paus"));  
    espadas.push(new carta( i,"espadas")); 
}

let baralhos = new baralho(copas,ouros,espadas,paus);

// Função para visualizar o baralho
console.log(baralhos.toString)