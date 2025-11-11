class contaComum {
    #numero;
    #saldo;

    constructor(numb, saldo) {
        if (typeof(numb) != "number" || typeof(saldo) != "number") {
            throw new Error("NAN");
        }
        this.#numero = numb;
        this.#saldo = saldo;
    }

    // get para acessar os dados da classe
    get numero(){return this.#numero;}
    get saldo(){return this.#saldo;}
    
    deposito(numb) {
        if(typeof(numb) != "number" || numb < 0 ){
            return false;
        }
        else{
            this.#saldo += numb; 
            return true;           
        }
    }

    retirada(numb) {
        if(typeof(numb) != "number" || numb < 0 || numb > this.#saldo ){
            return false;
        }
        else{
            this.#saldo -= numb; 
            return true;           
        }
    }



    toString() {
        return `Número: ${this.#numero}, Saldo: ${this.#saldo}`;
    }
}


class contaPoupanca extends contaComum {

    constructor(numb, saldo) {
        super(numb, saldo);
    }

    deposito(numb) {
        if(typeof(numb) != "number" || numb < 0 ){
            return false;
        }
        else{
            numb = numb*0.8
            this.saldo() += numb; 
            return true;           
        }
    }

}

class contalimite extends contaComum {

    constructor(numb, saldo) {
        super(numb, saldo);
    }

    retirada(numb) {
        if(typeof(numb) != ""number"" || numb < 0 || numb > 1.5*this.saldo() ){
            return false;
        }
        else{
            this.saldo() -= numb; 
            return true;           
        }
    }

}

// O banco ACME trabalha com três tipos de contas correntes identificadas apenas pelo número
// As contas comuns que aceitam depósitos de qualquer valor e retiradas até o limite do saldo
// As contas limite, nas quais o cliente tem um limite até o qual pode ficar com o saldo negativo 
// As contas poupança que são equivalentes as contas comuns mas recebem juros sobre o valor depositado.
//Implemente a hierarquia de classes e escreva um pequeno exemplo de uso.