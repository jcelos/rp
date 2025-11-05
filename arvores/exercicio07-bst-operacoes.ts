// João Celos

/**
 * EXERCÍCIO 7 - ÁRVORE DE BUSCA BINÁRIA COM OPERAÇÕES
 * Implementa: inserção, listagem em ordem crescente, menor e maior elemento.
 */

class NodoBST {
    public valor: number;
    public esquerdo: NodoBST | null;
    public direito: NodoBST | null;

    constructor(valor: number) {
        this.valor = valor;
        this.esquerdo = null;
        this.direito = null;
    }
}

class BST {
    private raiz: NodoBST | null;

    constructor() {
        this.raiz = null;
    }

    public inserir(valor: number): void {
        this.raiz = this.inserirRec(this.raiz, valor);
    }

    private inserirRec(no: NodoBST | null, valor: number): NodoBST {
        if (no === null) return new NodoBST(valor);
        if (valor < no.valor) {
            no.esquerdo = this.inserirRec(no.esquerdo, valor);
        } else if (valor > no.valor) {
            no.direito = this.inserirRec(no.direito, valor);
        } else {
            // valor igual: não insere duplicata (convenção)
        }
        return no;
    }

    public listarCrescente(): number[] {
        const resultado: number[] = [];
        this.inOrder(this.raiz, resultado);
        return resultado;
    }

    private inOrder(no: NodoBST | null, arr: number[]): void {
        if (no === null) return;
        this.inOrder(no.esquerdo, arr);
        arr[arr.length] = no.valor;
        this.inOrder(no.direito, arr);
    }

    public menor(): number | null {
        if (this.raiz === null) return null;
        let atual = this.raiz;
        while (atual.esquerdo !== null) atual = atual.esquerdo;
        return atual.valor;
    }

    public maior(): number | null {
        if (this.raiz === null) return null;
        let atual = this.raiz;
        while (atual.direito !== null) atual = atual.direito;
        return atual.valor;
    }
}

// Testes
const arv = new BST();
const seq = [50,126,28,77,12,429,39,84,256,31];
for (let i = 0; i < seq.length; i++) arv.inserir(seq[i]);

console.log('Lista crescente (in-order):', arv.listarCrescente());
console.log('Menor elemento:', arv.menor());
console.log('Maior elemento:', arv.maior());

export { BST, NodoBST };