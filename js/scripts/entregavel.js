import { typedef, validate} from "bycontract"

typedef("Transportavel", {
    fragil: 'boolean',
    valorFrete: 'number',
});

typedef("Taxavel", {
    valorImposto: 'number',
});

function isTransportavel(obj) {
    return ('fragil' in obj && 'valorFrete' in obj);
}

function isTaxavel(obj) {
    return ('valorImposto' in obj);
}

class Entregavel {
    id;
    desc;

    constructor(id, descricao) {
        if (typeof id !== "number" || typeof descricao !== "string") {
            console.log("Os valores devem ser números para ID e uma string para descrição!");
            return;
        }
        this.id = id;
        this.desc = descricao;
    }

    toString() {
        return `Identificador nº ${this.id} | descrição: ${this.desc}`;
    }
}

class Produto extends Entregavel {
    preco;

    constructor(id, descricao, preco) {
        if (typeof id !== "number" || typeof descricao !== "string" || typeof preco !== "number") {
            console.log("Os valores devem ser números para ID e preço, e uma string para descrição!");
            return;
        }
        super(id, descricao);
        this.preco = preco;
    }

    get valorImposto() {
        return (this.preco * 0.15);
    }

    get fragil() {
        return false;
    }

    get valorFrete() {
        // Vamos definir um valor fixo de CEP para teste
        const cep = '90000'; // Exemplo de CEP fixo
        if (cep === '90000') {
            return (this.preco * 0.5);
        }
        return (this.preco * 0.15);
    }
}

class ServicoVoluntario extends Entregavel {
    nomeVoluntario;

    constructor(id, descricao, nome) {
        if (typeof id !== "number" || typeof descricao !== "string" || typeof nome !== "string") {
            console.log("Os valores devem ser números para ID e uma string para descrição e nome!");
            return;
        }
        super(id, descricao);
        this.nomeVoluntario = nome;
    }
}

class Servico extends Entregavel {
    valorHora;

    constructor(id, descricao, valorHora) {
        if (typeof id !== "number" || typeof descricao !== "string" || typeof valorHora !== "number") {
            console.log("Os valores devem ser números para ID e preço da hora, e uma string para descrição!");
            return;
        }
        super(id, descricao);
        this.valorHora = valorHora;
    }

    get valorImposto() {
        return (this.valorHora * 0.15);
    }
}

class Veiculo {
    placa;
    ano;
    valor;

    constructor(placa, ano, valor) {
        if (typeof placa !== "string" || typeof ano !== "number" || typeof valor !== "number") {
            console.log("Os valores devem ser uma string para a placa e números para ano e valor!");
            return;
        }
        this.placa = placa;
        this.ano = ano;
        this.valor = valor;
    }

    get valorImposto() {
        return (this.valor * 0.15);
    }
}

