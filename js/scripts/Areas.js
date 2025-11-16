export function quadrado(lado) {
    if (typeof lado !== "number") {
            console.log("Os valores devem ser números para ID e preço, e uma string para descrição!");
            return;
       }   
       return (lado * lado);
}

export function retangulo(base, altura) {
    if (typeof base !== "number"|| typeof altura!== "number") {
            console.log("Os valores devem ser números");
            return;
       }   
       return (base * altura);
}

export function triangulo(base, altura) {
    if (typeof base !== "number"|| typeof altura!== "number") {
            console.log("Os valores devem ser números");
            return;
       }   
       return ((base * altura)/2);
}

export function circculo(raio) {
    if (typeof raio !== "number") {
            console.log("Os valores devem ser números ");
            return;
       }   
       return ( Math.pow(raio, 2) * Math.PI);
}