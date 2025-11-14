class Funcionario {
    #nome;
    #salarioBase;

    constructor(nome, salarioBase) {
        if (typeof salarioBase !== "number") {
            throw new Error("O salário deve ser um número!");
        }
        this.#nome = nome;
        this.#salarioBase = salarioBase;
    }

    get nome() { return this.#nome; }
    get salarioBase() { return this.#salarioBase; }

    getSalarioLiquido() {
        return this.#salarioBase;
    }

    toString() {
        return `Nome: ${this.#nome} | Salário Base: R$ ${this.#salarioBase.toFixed(2)}`;
    }
}


class Professor extends Funcionario {
    #cargaHorariaMensal;

    constructor(nome, salarioBase, cargaHorariaMensal) {
        super(nome, salarioBase);
        this.#cargaHorariaMensal = cargaHorariaMensal;
    }

     get cargaHorariaMensal() {return this.#cargaHorariaMensal}

    getSalarioLiquido() {
        return super.getSalarioLiquido() + this.#cargaHorariaMensal * 20;  
    }

    toString() {
        return super.toString() + ` | Carga Mensal: ${this.#cargaHorariaMensal}`;
    }
}

class Tecnico extends Funcionario {
    #categoria;

    constructor(nome, salarioBase, categoria) {
        super(nome, salarioBase);
        this.#categoria = categoria;
    }

    getSalarioLiquido() {
        return super.getSalarioLiquido() + this.#categoria * 100;
    }

    toString() {
        return super.toString() + ` | Categoria: ${this.#categoria}`;
    }
}

class Pesquisador extends Professor {
    #cargaHorariaPesquisa;

    constructor(nome, salarioBase, cargaHorariaMensal, cargaHorariaPesquisa) {
        super(nome, salarioBase, cargaHorariaMensal);
        this.#cargaHorariaPesquisa = cargaHorariaPesquisa;
    }
    get cargaHorariaPesquisa() {return this.#cargaHorariaPesquisa}

    getSalarioLiquido() {
        return super.getSalarioLiquido() + this.#cargaHorariaPesquisa * 30;
    }

    toString() {
        return super.toString() + ` | Carga Pesquisa: ${this.#cargaHorariaPesquisa}`;
    }
}

function extra(func) {
    if (!(func instanceof Funcionario)) {
        throw new Error("O parâmetro deve ser um Funcionario");
    }

    if (func instanceof Pesquisador) {
        console.log("Pesquisador: adicionando 3 horas de pesquisa...");
        const novo = func.cargaHorariaPesquisa + 3;
        console.log("Nova carga de pesquisa:", novo);

    } else if (func instanceof Professor) {
        console.log("Professor: adicionando 5 horas de aula...");
        const novo = func.cargaHorariaMensal + 5;
        console.log("Nova carga horária:", novo);

    } else {
        console.log("Funcionário comum: nada a acrescentar.");
    }
}


let f = new Funcionario("Mario", 3000);
let p = new Professor("Ana", 3000, 40);
let t = new Tecnico("Carlos", 3000, 3);
let pesq = new Pesquisador("João", 3000, 40, 20);

console.log(f.toString());
console.log(p.toString());
console.log(t.toString());
console.log(pesq.toString());
console.log("Salário líquido:", pesq.getSalarioLiquido());



console.log("=== Caso 1: Pesquisador ===");
extra(pesq);

console.log("\n=== Caso 2: Professor ===");
extra(p);
