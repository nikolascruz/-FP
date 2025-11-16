export class List {
    #base; // Define um campo privado (não acessível fora da classe)
    constructor() {
        this.#base = [] // Inicializa o campo #base como um array vazio
    }

    // Getter para o tamanho da lista
    get size() {
        return this.#base.length; // Retorna o número de elementos no array #base
    }

    // Método para adicionar um elemento no final da lista
    push(element) {
        this.#base.push(element); // Adiciona o elemento ao final do array #base
    }

    // Método para inserir um elemento em uma posição específica
    ins(pos, element) {
        // Verifica se a posição é válida (entre 0 e o tamanho da lista)
        if (pos < 0 || pos >= this.size) {
            throw new Error("Posição Invalida"); // Se não for válida, lança um erro
        }
        // Insere o elemento na posição indicada
        this.#base.splice(pos, 0, element);
    }

    // Método para acessar um elemento em uma posição específica
    at(pos) {
        // Verifica se a posição é válida
        if (pos < 0 || pos >= this.size) {
            throw new Error("Posição Invalida"); // Se não for válida, lança um erro
        }
        return this.#base[pos]; // Retorna o elemento na posição indicada
    }

    // Método para substituir um elemento em uma posição específica
    change(pos, element) {
        // Verifica se a posição é válida
        if (pos < 0 || pos >= this.size) {
            throw new Error("Posição Invalida"); // Se não for válida, lança um erro
        }
        // Substitui o elemento na posição indicada
        this.#base[pos] = element;
    }

    // Método para remover um elemento de uma posição específica
    remove(pos) {
        // Verifica se a posição é válida
        if (pos < 0 || pos >= this.size) {
            throw new Error("Posição Invalida"); // Se não for válida, lança um erro
        }
        // Remove o elemento na posição indicada
        this.#base.splice(pos, 1);
    }

    // Método para verificar se a lista está vazia
    isEmpty() {
        return this.size === 0; // Retorna true se o tamanho for 0, indicando que a lista está vazia
    }
}

export class Stack {
    #base; 
    constructor() {
        this.#base = [] 
    }

    get size() { return this.#base.length; }

    // Método para adicionar um elemento no topo da lista (final do array)
    push(element) {this.#base.push( element);   }

    
   // Método para remover o elemento do topo da pilha (último elemento do array)
    pop() {
        return this.#base.pop();  // O pop remove o último elemento
    }
    // Método para acessar o topo da lista
    top() { return this.#base[this.size - 1];}


    // Método para verificar se a lista está vazia
    isEmpty() {
        return this.size === 0; // Retorna true se o tamanho for 0, indicando que a lista está vazia
    }
}

export class Queue {
    #base; 
    constructor() {
        this.#base = [] 
    }

    get size() { return this.#base.length; }

    // Método para adicionar um elemento no final
    enqueue(element) {this.#base.push( element);   }
    

    
   // Método para remover o primeiro elemento
    dequeue() {
        return this.#base.shift(); //O shift() remove o primeiro elemento e retorna ele mesmo, não um array.
    }

    // Método para acessar o primeiro da lista
    first() { return this.#base[0];}

    // Método para acessar o ultimo da lista
    last() { return this.#base[this.size - 1];}

    // Método para verificar se a lista está vazia
    isEmpty() {
        return this.size === 0; // Retorna true se o tamanho for 0, indicando que a lista está vazia
    }
}

export class Deque {
    #base; 
    constructor() {
        this.#base = [] 
    }

    get size() { return this.#base.length; }

    // Método para adicionar um elemento no final
    enqueue(element) {this.#base.push( element);   }

     // Método para adicionar um elemento no inicio
    firstEnqueue(element) {this.#base.unshift(element); } //unshift() é feito exatamente para isso: adicionar elementos no início do array.

    
   // Método para remover o primeiro elemento
    dequeue() {
        return this.#base.shift(); //O shift() remove o primeiro elemento e retorna ele mesmo, não um array.
    // tbm poderiamos usar splice porem menos eficiente "splice(0, 0, element);"
    }
    
    // Método para remover o ultimi elemento
    lastDequeue() {
        return this.#base.pop();
    }
    

    // Método para acessar o primeiro da lista
    first() { return this.#base[0];}

    // Método para acessar o ultimo da lista
    last() { return this.#base[this.size - 1];}

    // Método para verificar se a lista está vazia
    isEmpty() {
        return this.size === 0; // Retorna true se o tamanho for 0, indicando que a lista está vazia
    }
}

