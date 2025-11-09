// Importa o módulo para ler entrada do usuário
const prompt = require('prompt-sync')({ sigint: true });


class carro {

    #Placa;
    #capacidade;
    #consumo;
    tanque;
    cor;


    constructor(cor,Placa,capacidade,tanqueIncial,consumo ){
        this.cor = cor;
        this.#Placa = Placa;
        this.#capacidade = capacidade;
        this.tanque =tanqueIncial;
        this.#consumo = consumo
        
    }
    // Funções para atualizar as variáveis

    get Placa(){return this.#Placa;}
    set Placa(numb){
        if(numb > 999999 || numb < 100000){
            this.#Placa= 0;   
        }
        else{
            this.#Placa=numb;         
        }
    }


    get capacidade(){return this.#capacidade;}
    set capacidade(numb){
        if(numb < 0 ){
            this.#capacidade=0;
        }
        else{
            this.#capacidade= numb;            
        }
    }

    get consumo(){return this.#consumo;}
    set consumo(numb){
        if(numb < 0 || numb > this.#capacidade ){
            this.#consumo=0;
        }
        else{
            this.#consumo= numb;            
        }
    }
    

    // Função para atualizar o tanque positivamente, 
    abastecer(litros){
        if(litros > this.#capacidade || litros+this.tanque > this.#capacidade){
            console.log("Não é possivel abastecer essa quantidade: "+ this.#capacidade)
        }
        
        this.tanque += litros;
        return console.log("Carro abastecido com sucesso; litros: "+ this.tanque);

    }

    // função que atualiza o tanque negativamente
    gastar(distancia){
        let max = this.#consumo * this.tanque;

        if(distancia > max){
            answer = Number(prompt("A distancia é maior sobre a quantidade de combustivel, deseja continuar? S ou N "));
            if(answer == "N"){
                console.log("vc n pode")
                //parar o programa
            }
            // disconta até tanque=0 e roda abastecer() e roda gastar() novamente                   

            
        }

        this.tanque =  this.tanque -(distancia / this.#consumo);
        console.log("Viajem concluida, agora vc possui no tanque : "+ this.tanque)


    }
   

    toString(){
        let str = `Placa= ${this.#Placa};\n cor= ${this.cor}\n`;
        str += `abastecimento= ${this.tanque}; \n capacidade = ${this.#capacidade} `;
        return str;
    }
}

// var para add na classe
placa = Number(prompt("Digite a placa: "));
cor = prompt("Digite a cor: ");
capaci = Number(prompt("Digite a capacidade do tanque: "));
consumo = Number(prompt("Digite quantos km o carro faz por litro: "));
inic = Number(prompt("Digite a quantidade do tanque atual: "));

let car1 = new carro(cor,placa,capaci,inic,consumo);

console.log(car1.toString());

viagem = Number(prompt("Digite quantos km é a sua viagem "));
posto = Number(prompt(`Digite a quantidade que vc deseja abastecer, essa é a quantidade disponível para abastecer ${car1.capacidade- car1.tanque} : `));

car1.abastecer(posto);
car1.gastar(viagem);

console.log(car1.toString());