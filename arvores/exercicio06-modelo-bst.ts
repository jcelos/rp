// João Celos

/**
 * EXERCÍCIO 6 - MODELO DE ÁRVORE BINÁRIA DE BUSCA (ENCADADA)
 *
 * Implementação estrutural (nó e classe BST) sem operações por enquanto.
 */

class Nodo {
    public valor: number;
    public esquerdo: Nodo | null;
    public direito: Nodo | null;

    constructor(valor: number) {
        this.valor = valor;
        this.esquerdo = null;
        this.direito = null;
    }
}

class ArvoreBusca {
    public raiz: Nodo | null;

    constructor() {
        this.raiz = null;
    }

    // operações serão implementadas no exercício 7
}

console.log('Modelo de BST (estrutural) pronto.');
export { Nodo, ArvoreBusca };