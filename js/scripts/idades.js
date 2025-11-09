// Importa o módulo para ler entrada do usuário
const prompt = require('prompt-sync')({ sigint: true });

// Vetor que armazenará as idades
let years = [];
let year;

// Loop para coletar idades
do {
  year = Number(prompt("Digite quantos anos você tem (0 < para parar): "));

  if (year > 0) {
    console.log("Ano valido!");
    years.push(year);
  }

} while (year > 0);


// Define a idade padrão
const pattern = Number(prompt("Digite a idade padrão para comparar: "));

let maior = 0;
let igual = 0;
const total = years.length;

for (const idade of years) {
  if (idade > pattern) {
    maior++;
  } else if (idade === pattern) {   
    igual++;
  }
}

console.log("\n📊 Resultado:");
console.log(`Total de pessoas na turma: ${total}`);
console.log(`Maiores que ${pattern}: ${maior}`);
console.log(`Iguais a ${pattern}: ${igual}`);
console.log(`Menores que ${pattern}: ${total - maior - igual}`);
