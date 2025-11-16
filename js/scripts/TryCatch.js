import { validate } from "bycontract";

class contaCorrente {
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

try {
  let c = new contaCorrente(1000);
  c.deposito(100);
  c.retirada(100);
  //c.deposito(-10); // Vai gerar erro
  c.retirada(1100); // Vai gerar erro
  console.log("sucesso " + c.saldo);
} catch (erro) {
  console.log(erro.message);
} finally {
  console.log("fim da execução");
}
