import nReadlines from "n-readlines";
import { validate } from "bycontract";

let words = new Map();

function carregaDados(narq) {
    validate(narq, "string");
    
    const arq = new nReadlines(narq);

    // Pula a primeira linha
    arq.next();

    let buf;

    while (buf = arq.next()) {
        let line = buf.toString("utf8").trim();

        // Se não existir, começa com 1
        if (!words.has(line)) {
            words.set(line, 1);
        } else {
            // Se já existir, soma +1
            words.set(line, words.get(line) + 1);
        }
    }
}

// Carrega o arquivo
carregaDados("palavras.txt");

// ---------- AQUI ENTRA A ORDENAÇÃO ----------

// Transforma o Map em array e ordena pelo valor
const wordsOrdenado = [...words.entries()].sort((a, b) => b[1] - a[1]);

// Exibe o resultado
console.log("Palavras ordenadas por frequência (maior para menor):\n");

for (const [palavra, quantidade] of wordsOrdenado) {
    console.log(palavra, "→", quantidade);
}
