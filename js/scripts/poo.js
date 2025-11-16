// Importa o módulo para ler entrada do usuário
const prompt = require('prompt-sync')({ sigint: true });

class Retangulo {

    ladoA;
    ladoB;

    area(){
        return(this.ladoA * this.ladoB)

    }
    perimetro() {
        return((this.ladoA*2) + (this.ladoB*2))        
    }

    toString(){
        let str = `Alt= ${this.ladoA};\n Comp= ${this.ladoB}\n`;
        str += `Area= ${this.area()}; \n Perimetro= ${this.perimetro()} `;
        return str;
    }
}

let ret1 = new Retangulo;

ret1.ladoA = Number(prompt("Digite a altura: "));
ret1.ladoB = Number(prompt("Digite o comprimento: "));

console.log("A área é: " + ret1.area());
console.log("O perimetro é: "+ ret1.perimetro());

let tmp = ret1.toString();
console.log(tmp);

