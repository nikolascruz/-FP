import { validate } from "bycontract";

// Importa o módulo para ler entrada do usuário
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });

class ContaCorrente {
  #saldo;

  constructor(saldoInicial) {
    validate(saldoInicial, "number");
    this.#saldo = saldoInicial;
  }

  get saldo() {
    return this.#saldo;
  }

  deposito(valor) {
    validate(valor, "number");
    if (valor <= 0) {
      throw new Error(`O valor de deposito ${valor} está incorreto`);
    }
    this.#saldo += valor;
  }

  retirada(valor) {
    validate(valor, "number");
    if (valor <= 0 || valor > this.#saldo) {
      throw new Error(`O valor de retirada ${valor} está incorreto`);
    }
    this.#saldo -= valor;
  }
}

// Função para exibir o menu
function exibirMenu() {
  console.log("\nEscolha uma opção:");
  console.log("1 - Consultar saldo");
  console.log("2 - Depositar");
  console.log("3 - Retirar");
  console.log("4 - Sair");
}

// Função principal que gerencia a interação com o usuário
function iniciar() {
  let conta = new ContaCorrente(1000);  // Criando uma conta com saldo inicial de 1000
  let sair = false;

  while (!sair) {
    exibirMenu();

    // Obtemos a opção do usuário
    let opcao = prompt("Digite o número da opção desejada:");  // Usando prompt para obter a entrada do usuário

    switch (opcao) {
      case "1":
        // Consultar saldo
        console.log(`Saldo atual: R$ ${conta.saldo.toFixed(2)}`);
        break;

      case "2":
        // Depositar
        let valorDeposito = parseFloat(prompt("Digite o valor a ser depositado:"));
        try {
          conta.deposito(valorDeposito);
          console.log(`Depósito de R$ ${valorDeposito} realizado com sucesso.`);
        } catch (erro) {
          console.log(erro.message);
        }
        break;

      case "3":
        // Retirar
        let valorRetirada = parseFloat(prompt("Digite o valor a ser retirado:"));
        try {
          conta.retirada(valorRetirada);
          console.log(`Retirada de R$ ${valorRetirada} realizada com sucesso.`);
        } catch (erro) {
          console.log(erro.message);
        }
        break;

      case "4":
        // Sair
        sair = true;
        console.log("Obrigado por usar o sistema!");
        break;

      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

// Chama a função iniciar para começar o programa
iniciar();
