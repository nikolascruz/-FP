class ContaComum {
  #numero;
  #saldo;

  constructor(numb, saldo) {
    if (typeof numb !== "number" || typeof saldo !== "number") {
      console.log("Os valores devem ser números!");
    }
    this.#numero = numb;
    this.#saldo = saldo;
  }

  get numero() { return this.#numero; }
  get saldo() { return this.#saldo; }

  // método protegido
  _alterarSaldo(valor) {
    this.#saldo = valor;
  }

  deposito(valor) {
    if (typeof valor !== "number" || valor <= 0) return false;
    this.#saldo += valor;
    return true;
  }

  retirada(valor) {
    if (typeof valor !== "number" || valor <= 0 || valor > this.#saldo) return false;
    this.#saldo -= valor;
    return true;
  }

  toString() {
    return `Conta nº ${this.#numero} | Saldo: R$ ${this.#saldo.toFixed(2)}`;
  }
}

class ContaPoupanca extends ContaComum {
  deposito(valor) {
    if (typeof valor !== "number" || valor <= 0) return false;
    const comJuros = valor * 1.2; // 20% de bônus
    return super.deposito(comJuros);
  }
}

class ContaLimite extends ContaComum {
  retirada(valor) {
    if (typeof valor !== "number" || valor <= 0) return false;
    const limite = this.saldo * 1.5;
    if (valor > limite) return false;

    const novoSaldo = this.saldo - valor;
    this._alterarSaldo(novoSaldo);
    return true;
  }
}


// Criando contas
const comum = new ContaComum(101, 500);
const poupanca = new ContaPoupanca(102, 1000);
const limite = new ContaLimite(103, 200);

// Operações
comum.deposito(200);
comum.retirada(100);

poupanca.deposito(500); // recebe juros
poupanca.retirada(200);

limite.retirada(250); // pode ficar negativo até 50%

// Exibindo resultados
console.log(comum.toString());
console.log(poupanca.toString());
console.log(limite.toString());
