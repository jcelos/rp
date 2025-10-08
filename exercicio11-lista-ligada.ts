/**
 * EXERCÍCIO BÁSICO 11 - LISTAS LIGADAS SIMPLES
 * 
 * Implementa uma lista ligada básica com operações fundamentais
 * para entender ponteiros, nós e navegação sequencial.
 */

/**
 * Nó de uma lista ligada simples
 */
class NoLista<T> {
    public valor: T;
    public proximo: NoLista<T> | null;
    
    constructor(valor: T) {
        this.valor = valor;
        this.proximo = null;
    }
}

/**
 * Lista ligada simples com operações básicas
 */
class ListaLigada<T> {
    private cabeca: NoLista<T> | null;
    private tamanho: number;
    
    constructor() {
        this.cabeca = null;
        this.tamanho = 0;
    }
    
    /**
     * Adiciona elemento no início da lista
     */
    public adicionarInicio(valor: T): void {
        const novoNo = new NoLista(valor);
        novoNo.proximo = this.cabeca;
        this.cabeca = novoNo;
        this.tamanho++;
    }
    
    /**
     * Adiciona elemento no final da lista
     */
    public adicionarFim(valor: T): void {
        const novoNo = new NoLista(valor);
        
        if (this.cabeca === null) {
            this.cabeca = novoNo;
        } else {
            let atual = this.cabeca;
            while (atual.proximo !== null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNo;
        }
        
        this.tamanho++;
    }
    
    /**
     * Remove o primeiro elemento
     */
    public removerInicio(): T | null {
        if (this.cabeca === null) {
            return null;
        }
        
        const valorRemovido = this.cabeca.valor;
        this.cabeca = this.cabeca.proximo;
        this.tamanho--;
        
        return valorRemovido;
    }
    
    /**
     * Remove o último elemento
     */
    public removerFim(): T | null {
        if (this.cabeca === null) {
            return null;
        }
        
        if (this.cabeca.proximo === null) {
            const valor = this.cabeca.valor;
            this.cabeca = null;
            this.tamanho--;
            return valor;
        }
        
        let atual = this.cabeca;
        while (atual.proximo && atual.proximo.proximo !== null) {
            atual = atual.proximo;
        }
        
        const valorRemovido = atual.proximo!.valor;
        atual.proximo = null;
        this.tamanho--;
        
        return valorRemovido;
    }
    
    /**
     * Busca um valor na lista
     */
    public buscar(valor: T): boolean {
        let atual = this.cabeca;
        
        while (atual !== null) {
            if (atual.valor === valor) {
                return true;
            }
            atual = atual.proximo;
        }
        
        return false;
    }
    
    /**
     * Obtém elemento em posição específica
     */
    public obterPosicao(posicao: number): T | null {
        if (posicao < 0 || posicao >= this.tamanho) {
            return null;
        }
        
        let atual = this.cabeca;
        for (let i = 0; i < posicao; i++) {
            atual = atual!.proximo;
        }
        
        return atual!.valor;
    }
    
    /**
     * Converte lista para array
     */
    public paraArray(): T[] {
        const resultado: T[] = [];
        let atual = this.cabeca;
        
        while (atual !== null) {
            resultado[resultado.length] = atual.valor;
            atual = atual.proximo;
        }
        
        return resultado;
    }
    
    /**
     * Obtém tamanho da lista
     */
    public obterTamanho(): number {
        return this.tamanho;
    }
    
    /**
     * Verifica se lista está vazia
     */
    public estaVazia(): boolean {
        return this.cabeca === null;
    }
    
    /**
     * Limpa toda a lista
     */
    public limpar(): void {
        this.cabeca = null;
        this.tamanho = 0;
    }
    
    /**
     * Inverte a ordem dos elementos
     */
    public inverter(): void {
        let anterior: NoLista<T> | null = null;
        let atual = this.cabeca;
        let proximo: NoLista<T> | null = null;
        
        while (atual !== null) {
            proximo = atual.proximo;
            atual.proximo = anterior;
            anterior = atual;
            atual = proximo;
        }
        
        this.cabeca = anterior;
    }
}

// Exemplos de uso
console.log("=== EXERCÍCIO 11 - LISTAS LIGADAS ===");

const lista = new ListaLigada<number>();

console.log("Lista vazia:", lista.estaVazia());

// Adicionando elementos
lista.adicionarInicio(10);
lista.adicionarInicio(20);
lista.adicionarFim(5);
lista.adicionarFim(15);

console.log("Lista atual:", lista.paraArray()); // [20, 10, 5, 15]
console.log("Tamanho:", lista.obterTamanho());

// Buscando elementos
console.log("Buscar 10:", lista.buscar(10));
console.log("Buscar 99:", lista.buscar(99));

// Obtendo por posição
console.log("Elemento na posição 0:", lista.obterPosicao(0));
console.log("Elemento na posição 2:", lista.obterPosicao(2));

// Removendo elementos
console.log("Remover início:", lista.removerInicio());
console.log("Lista após remoção:", lista.paraArray());

console.log("Remover fim:", lista.removerFim());
console.log("Lista após remoção:", lista.paraArray());

// Invertendo lista
lista.inverter();
console.log("Lista invertida:", lista.paraArray());

export { NoLista, ListaLigada };
