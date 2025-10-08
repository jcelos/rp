/**
 * EXERCÍCIO BÁSICO 14 - ÁRVORE BINÁRIA DE BUSCA
 * 
 * Implementa uma árvore binária de busca (BST) com operações
 * fundamentais de inserção, busca, remoção e percursos.
 */

/**
 * Nó da árvore binária
 */
class NoArvore<T> {
    public valor: T;
    public esquerda: NoArvore<T> | null;
    public direita: NoArvore<T> | null;
    
    constructor(valor: T) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

/**
 * Árvore Binária de Busca
 */
class ArvoreBinariaBusca<T> {
    private raiz: NoArvore<T> | null;
    private tamanho: number;
    private compararFuncao: (a: T, b: T) => number;
    
    constructor(compararFuncao?: (a: T, b: T) => number) {
        this.raiz = null;
        this.tamanho = 0;
        
        // Função de comparação padrão
        this.compararFuncao = compararFuncao || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }
    
    /**
     * Insere um valor na árvore
     */
    public inserir(valor: T): void {
        this.raiz = this.inserirRecursivo(this.raiz, valor);
        this.tamanho++;
    }
    
    private inserirRecursivo(no: NoArvore<T> | null, valor: T): NoArvore<T> {
        if (no === null) {
            return new NoArvore(valor);
        }
        
        const comparacao = this.compararFuncao(valor, no.valor);
        
        if (comparacao < 0) {
            no.esquerda = this.inserirRecursivo(no.esquerda, valor);
        } else if (comparacao > 0) {
            no.direita = this.inserirRecursivo(no.direita, valor);
        }
        // Se comparacao === 0, não insere (valor já existe)
        
        return no;
    }
    
    /**
     * Busca um valor na árvore
     */
    public buscar(valor: T): boolean {
        return this.buscarRecursivo(this.raiz, valor) !== null;
    }
    
    private buscarRecursivo(no: NoArvore<T> | null, valor: T): NoArvore<T> | null {
        if (no === null) {
            return null;
        }
        
        const comparacao = this.compararFuncao(valor, no.valor);
        
        if (comparacao === 0) {
            return no;
        } else if (comparacao < 0) {
            return this.buscarRecursivo(no.esquerda, valor);
        } else {
            return this.buscarRecursivo(no.direita, valor);
        }
    }
    
    /**
     * Remove um valor da árvore
     */
    public remover(valor: T): boolean {
        const tamanhoAnterior = this.tamanho;
        this.raiz = this.removerRecursivo(this.raiz, valor);
        
        if (this.tamanho < tamanhoAnterior) {
            return true;
        }
        return false;
    }
    
    private removerRecursivo(no: NoArvore<T> | null, valor: T): NoArvore<T> | null {
        if (no === null) {
            return null;
        }
        
        const comparacao = this.compararFuncao(valor, no.valor);
        
        if (comparacao < 0) {
            no.esquerda = this.removerRecursivo(no.esquerda, valor);
        } else if (comparacao > 0) {
            no.direita = this.removerRecursivo(no.direita, valor);
        } else {
            // Nó encontrado - remover
            this.tamanho--;
            
            // Caso 1: Nó folha
            if (no.esquerda === null && no.direita === null) {
                return null;
            }
            
            // Caso 2: Nó com um filho
            if (no.esquerda === null) {
                return no.direita;
            }
            if (no.direita === null) {
                return no.esquerda;
            }
            
            // Caso 3: Nó com dois filhos
            const sucessor = this.encontrarMinimoNo(no.direita);
            no.valor = sucessor.valor;
            no.direita = this.removerRecursivo(no.direita, sucessor.valor);
            this.tamanho++; // Compensa a decrementação na chamada recursiva
        }
        
        return no;
    }
    
    /**
     * Encontra o valor mínimo na árvore
     */
    public encontrarMinimo(): T | null {
        if (this.raiz === null) {
            return null;
        }
        
        return this.encontrarMinimoNo(this.raiz).valor;
    }
    
    private encontrarMinimoNo(no: NoArvore<T>): NoArvore<T> {
        while (no.esquerda !== null) {
            no = no.esquerda;
        }
        return no;
    }
    
    /**
     * Encontra o valor máximo na árvore
     */
    public encontrarMaximo(): T | null {
        if (this.raiz === null) {
            return null;
        }
        
        let no = this.raiz;
        while (no.direita !== null) {
            no = no.direita;
        }
        
        return no.valor;
    }
    
    /**
     * Percurso em ordem (in-order) - valores em ordem crescente
     */
    public percursoEmOrdem(): T[] {
        const resultado: T[] = [];
        this.percursoEmOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }
    
    private percursoEmOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            this.percursoEmOrdemRecursivo(no.esquerda, resultado);
            resultado[resultado.length] = no.valor;
            this.percursoEmOrdemRecursivo(no.direita, resultado);
        }
    }
    
    /**
     * Percurso pré-ordem (pre-order)
     */
    public percursoPreOrdem(): T[] {
        const resultado: T[] = [];
        this.percursoPreOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }
    
    private percursoPreOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            resultado[resultado.length] = no.valor;
            this.percursoPreOrdemRecursivo(no.esquerda, resultado);
            this.percursoPreOrdemRecursivo(no.direita, resultado);
        }
    }
    
    /**
     * Percurso pós-ordem (post-order)
     */
    public percursoPosOrdem(): T[] {
        const resultado: T[] = [];
        this.percursoPosOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }
    
    private percursoPosOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            this.percursoPosOrdemRecursivo(no.esquerda, resultado);
            this.percursoPosOrdemRecursivo(no.direita, resultado);
            resultado[resultado.length] = no.valor;
        }
    }
    
    /**
     * Calcula altura da árvore
     */
    public altura(): number {
        return this.alturaRecursiva(this.raiz);
    }
    
    private alturaRecursiva(no: NoArvore<T> | null): number {
        if (no === null) {
            return -1;
        }
        
        const alturaEsquerda = this.alturaRecursiva(no.esquerda);
        const alturaDireita = this.alturaRecursiva(no.direita);
        
        return Math.max(alturaEsquerda, alturaDireita) + 1;
    }
    
    /**
     * Conta número de nós
     */
    public obterTamanho(): number {
        return this.tamanho;
    }
    
    /**
     * Verifica se árvore está vazia
     */
    public estaVazia(): boolean {
        return this.raiz === null;
    }
    
    /**
     * Limpa toda a árvore
     */
    public limpar(): void {
        this.raiz = null;
        this.tamanho = 0;
    }
    
    /**
     * Conta nós folha (sem filhos)
     */
    public contarFolhas(): number {
        return this.contarFolhasRecursivo(this.raiz);
    }
    
    private contarFolhasRecursivo(no: NoArvore<T> | null): number {
        if (no === null) {
            return 0;
        }
        
        if (no.esquerda === null && no.direita === null) {
            return 1;
        }
        
        return this.contarFolhasRecursivo(no.esquerda) + 
               this.contarFolhasRecursivo(no.direita);
    }
    
    /**
     * Verifica se árvore é balanceada
     */
    public estaBalanceada(): boolean {
        return this.verificarBalanceamento(this.raiz) !== -1;
    }
    
    private verificarBalanceamento(no: NoArvore<T> | null): number {
        if (no === null) {
            return 0;
        }
        
        const alturaEsquerda = this.verificarBalanceamento(no.esquerda);
        if (alturaEsquerda === -1) return -1;
        
        const alturaDireita = this.verificarBalanceamento(no.direita);
        if (alturaDireita === -1) return -1;
        
        // Se diferença de altura > 1, não está balanceada
        if (Math.abs(alturaEsquerda - alturaDireita) > 1) {
            return -1;
        }
        
        return Math.max(alturaEsquerda, alturaDireita) + 1;
    }
    
    /**
     * Representação visual simples da árvore
     */
    public visualizar(): string {
        if (this.raiz === null) {
            return "Árvore vazia";
        }
        
        return this.visualizarRecursivo(this.raiz, "", true);
    }
    
    private visualizarRecursivo(no: NoArvore<T> | null, prefixo: string, isUltimo: boolean): string {
        if (no === null) return "";
        
        let resultado = prefixo + (isUltimo ? "└── " : "├── ") + no.valor + "\n";
        
        const novoPrefix = prefixo + (isUltimo ? "    " : "│   ");
        
        if (no.esquerda !== null || no.direita !== null) {
            if (no.direita !== null) {
                resultado += this.visualizarRecursivo(no.direita, novoPrefix, no.esquerda === null);
            }
            if (no.esquerda !== null) {
                resultado += this.visualizarRecursivo(no.esquerda, novoPrefix, true);
            }
        }
        
        return resultado;
    }
}

// Exemplos de uso
console.log("=== EXERCÍCIO 14 - ÁRVORE BINÁRIA DE BUSCA ===");

const arvore = new ArvoreBinariaBusca<number>();

console.log("Árvore vazia:", arvore.estaVazia());

// Inserindo valores
const valores = [50, 30, 70, 20, 40, 60, 80];
console.log("Inserindo valores:", valores);

for (let i = 0; i < valores.length; i++) {
    arvore.inserir(valores[i]);
}

console.log("Tamanho da árvore:", arvore.obterTamanho());
console.log("Altura da árvore:", arvore.altura());

// Percursos
console.log("\n--- PERCURSOS ---");
console.log("Em ordem (crescente):", arvore.percursoEmOrdem());
console.log("Pré-ordem:", arvore.percursoPreOrdem());
console.log("Pós-ordem:", arvore.percursoPosOrdem());

// Busca
console.log("\n--- BUSCA ---");
console.log("Buscar 40:", arvore.buscar(40));
console.log("Buscar 90:", arvore.buscar(90));

// Valores extremos
console.log("Valor mínimo:", arvore.encontrarMinimo());
console.log("Valor máximo:", arvore.encontrarMaximo());

// Estatísticas
console.log("\n--- ESTATÍSTICAS ---");
console.log("Número de folhas:", arvore.contarFolhas());
console.log("Árvore balanceada:", arvore.estaBalanceada());

// Visualização
console.log("\n--- VISUALIZAÇÃO ---");
console.log(arvore.visualizar());

// Remoção
console.log("--- REMOÇÃO ---");
console.log("Removendo 30:", arvore.remover(30));
console.log("Árvore após remoção:", arvore.percursoEmOrdem());

console.log("Removendo 50 (raiz):", arvore.remover(50));
console.log("Árvore após remoção da raiz:", arvore.percursoEmOrdem());

// Teste com strings
console.log("\n--- ÁRVORE DE STRINGS ---");
const arvoreStrings = new ArvoreBinariaBusca<string>();

const palavras = ["banana", "apple", "cherry", "date", "elderberry"];
for (let i = 0; i < palavras.length; i++) {
    arvoreStrings.inserir(palavras[i]);
}

console.log("Palavras em ordem alfabética:", arvoreStrings.percursoEmOrdem());
console.log("Buscar 'cherry':", arvoreStrings.buscar("cherry"));

// Teste de balanceamento
console.log("\n--- TESTE DE BALANCEAMENTO ---");
const arvoreDesbalanceada = new ArvoreBinariaBusca<number>();

// Insere valores em ordem crescente (pior caso)
for (let i = 1; i <= 5; i++) {
    arvoreDesbalanceada.inserir(i);
}

console.log("Árvore desbalanceada:", arvoreDesbalanceada.percursoEmOrdem());
console.log("Altura:", arvoreDesbalanceada.altura());
console.log("Balanceada:", arvoreDesbalanceada.estaBalanceada());
console.log("Visualização:");
console.log(arvoreDesbalanceada.visualizar());

export { NoArvore, ArvoreBinariaBusca };
