// Importa o módulo para ler entrada do usuário
const prompt = require('prompt-sync')({ sigint: true });

function randomInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

let numbs = [];

 do{
    numbs.push(randomInt(-100,100));
 } while(numbs.length != 100);

let position = [];
let min = 100;
let numbers;

for(let i = 0; i < numbs.length; i++){
    if(numbs[i] < 0 ){
        position = i * -2;
    }

    if(min > numbs[i]){
        min = numbs[i];
    }

    numbers = numbers + `[`+numbs[i]+`]` ;

}

console.log("\n📊 Resultado:");
console.log(`Posições dos números negativos multiplicados por -2: ${position}`);
console.log(`Valor do menor da lista: ${min}`);
console.log(`String com todos os valores: ${numbers}`);

