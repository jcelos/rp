// João Celos

/**
 * EXERCÍCIO 2 - PILHA ENCADEADA
 * Implementação de pilha usando nós encadeados (Orientação a Objetos)
 */

class NodeStack {
    public value: number;
    public next: NodeStack | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}

class StackLinked {
    private top: NodeStack | null;
    private _size: number;

    constructor() {
        this.top = null;
        this._size = 0;
    }

    public push(value: number): void {
        const node = new NodeStack(value);
        if (this.top === null) {
            this.top = node;
        } else {
            node.next = this.top;
            this.top = node;
        }
        this._size = this._size + 1;
    }

    public pop(): number | null {
        if (this.top === null) return null;
        const val = this.top.value;
        this.top = this.top.next;
        this._size = this._size - 1;
        return val;
    }

    public peek(): number | null {
        return this.top ? this.top.value : null;
    }

    public isEmpty(): boolean {
        return this.top === null;
    }

    public size(): number {
        return this._size;
    }
}

// Testes simples
const pilha = new StackLinked();
pilha.push(10);
pilha.push(20);
pilha.push(30);
console.log('Topo:', pilha.peek());
console.log('Tamanho:', pilha.size());
console.log('Pop:', pilha.pop());
console.log('Pop:', pilha.pop());
console.log('Pop:', pilha.pop());
console.log('Vazia?', pilha.isEmpty());
export { NodeStack, StackLinked };