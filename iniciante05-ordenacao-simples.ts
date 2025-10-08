/**
 * EXERCÍCIO INICIANTE 5 - ORDENAÇÃO SIMPLES
 * 
 * Crie uma classe que implemente algoritmos simples de ordenação:
 * - Bubble Sort (ordenação por bolha)
 * - Selection Sort (ordenação por seleção)
 * - Insertion Sort (ordenação por inserção)
 * - Verificar se uma lista está ordenada
 * - Ordenar apenas uma parte da lista
 */

class OrdenacaoSimples {
    private numeros: number[];

    constructor(numeros: number[]) {
        this.numeros = [];
        for (let i = 0; i < numeros.length; i++) {
            this.numeros[i] = numeros[i];
        }
    }

    /**
     * Construtor que gera lista embaralhada
     */
    public static listaEmbaralhada(tamanho: number): OrdenacaoSimples {
        const numeros: number[] = [];
        
        // Cria uma sequência ordenada primeiro
        for (let i = 0; i < tamanho; i++) {
            numeros[i] = i + 1;
        }
        
        // Embaralha usando algoritmo Fisher-Yates simplificado
        for (let i = numeros.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Troca elementos
            const temp = numeros[i];
            numeros[i] = numeros[j];
            numeros[j] = temp;
        }
        
        return new OrdenacaoSimples(numeros);
    }

    public toString(): string {
        let resultado = "[";
        for (let i = 0; i < this.numeros.length; i++) {
            resultado += this.numeros[i];
            if (i < this.numeros.length - 1) {
                resultado += ", ";
            }
        }
        resultado += "]";
        return resultado;
    }

    /**
     * Verifica se a lista está ordenada crescente
     */
    public estaOrdenadaCrescente(): boolean {
        for (let i = 1; i < this.numeros.length; i++) {
            if (this.numeros[i] < this.numeros[i - 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Verifica se a lista está ordenada decrescente
     */
    public estaOrdenadaDecrescente(): boolean {
        for (let i = 1; i < this.numeros.length; i++) {
            if (this.numeros[i] > this.numeros[i - 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Bubble Sort - Ordenação por bolha
     * Compara elementos adjacentes e os troca se estiverem na ordem errada
     */
    public bubbleSort(): number {
        let trocas = 0;
        const n = this.numeros.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.numeros[j] > this.numeros[j + 1]) {
                    // Troca os elementos
                    const temp = this.numeros[j];
                    this.numeros[j] = this.numeros[j + 1];
                    this.numeros[j + 1] = temp;
                    trocas++;
                }
            }
        }
        
        return trocas; // Retorna número de trocas realizadas
    }

    /**
     * Selection Sort - Ordenação por seleção
     * Encontra o menor elemento e o coloca na posição correta
     */
    public selectionSort(): number {
        let trocas = 0;
        const n = this.numeros.length;
        
        for (let i = 0; i < n - 1; i++) {
            let indiceMenor = i;
            
            // Encontra o menor elemento no restante do array
            for (let j = i + 1; j < n; j++) {
                if (this.numeros[j] < this.numeros[indiceMenor]) {
                    indiceMenor = j;
                }
            }
            
            // Troca se necessário
            if (indiceMenor !== i) {
                const temp = this.numeros[i];
                this.numeros[i] = this.numeros[indiceMenor];
                this.numeros[indiceMenor] = temp;
                trocas++;
            }
        }
        
        return trocas;
    }

    /**
     * Insertion Sort - Ordenação por inserção
     * Insere cada elemento na posição correta do subarray já ordenado
     */
    public insertionSort(): number {
        let movimentos = 0;
        const n = this.numeros.length;
        
        for (let i = 1; i < n; i++) {
            const elementoAtual = this.numeros[i];
            let j = i - 1;
            
            // Move elementos maiores para a direita
            while (j >= 0 && this.numeros[j] > elementoAtual) {
                this.numeros[j + 1] = this.numeros[j];
                j--;
                movimentos++;
            }
            
            // Insere o elemento na posição correta
            this.numeros[j + 1] = elementoAtual;
        }
        
        return movimentos;
    }

    /**
     * Ordena apenas uma parte da lista usando bubble sort
     */
    public ordenarParcial(inicio: number, fim: number): number {
        if (inicio < 0) inicio = 0;
        if (fim >= this.numeros.length) fim = this.numeros.length - 1;
        if (inicio >= fim) return 0;
        
        let trocas = 0;
        
        for (let i = inicio; i < fim; i++) {
            for (let j = inicio; j < fim - (i - inicio); j++) {
                if (this.numeros[j] > this.numeros[j + 1]) {
                    const temp = this.numeros[j];
                    this.numeros[j] = this.numeros[j + 1];
                    this.numeros[j + 1] = temp;
                    trocas++;
                }
            }
        }
        
        return trocas;
    }

    /**
     * Encontra a posição onde um elemento deveria estar se a lista fosse ordenada
     */
    public posicaoOrdenada(elemento: number): number {
        let posicao = 0;
        
        for (let i = 0; i < this.numeros.length; i++) {
            if (this.numeros[i] < elemento) {
                posicao++;
            }
        }
        
        return posicao;
    }

    /**
     * Conta quantos elementos estão fora de ordem
     */
    public elementosForaDeOrdem(): number {
        let contador = 0;
        
        for (let i = 0; i < this.numeros.length; i++) {
            const posicaoCorreta = this.posicaoOrdenada(this.numeros[i]);
            if (posicaoCorreta !== i) {
                contador++;
            }
        }
        
        return contador;
    }

    /**
     * Cria uma cópia da lista atual
     */
    public clonar(): OrdenacaoSimples {
        return new OrdenacaoSimples(this.numeros);
    }

    /**
     * Testa todos os algoritmos de ordenação
     */
    public testarAlgoritmos(): string {
        let resultado = "=== TESTE DE ALGORITMOS DE ORDENAÇÃO ===\n";
        resultado += `Lista original: ${this.toString()}\n`;
        resultado += `Está ordenada (crescente): ${this.estaOrdenadaCrescente()}\n`;
        resultado += `Elementos fora de ordem: ${this.elementosForaDeOrdem()}\n\n`;
        
        // Testa Bubble Sort
        const lista1 = this.clonar();
        const trocasBubble = lista1.bubbleSort();
        resultado += `Bubble Sort: ${trocasBubble} trocas -> ${lista1.toString()}\n`;
        
        // Testa Selection Sort
        const lista2 = this.clonar();
        const trocasSelection = lista2.selectionSort();
        resultado += `Selection Sort: ${trocasSelection} trocas -> ${lista2.toString()}\n`;
        
        // Testa Insertion Sort
        const lista3 = this.clonar();
        const movimentosInsertion = lista3.insertionSort();
        resultado += `Insertion Sort: ${movimentosInsertion} movimentos -> ${lista3.toString()}\n`;
        
        return resultado;
    }

    public getNumeros(): number[] {
        const copia: number[] = [];
        for (let i = 0; i < this.numeros.length; i++) {
            copia[i] = this.numeros[i];
        }
        return copia;
    }

    public getTamanho(): number {
        return this.numeros.length;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO INICIANTE 5 - ORDENAÇÃO SIMPLES ===");

// Teste 1: Lista pequena desordenada
const lista1 = new OrdenacaoSimples([64, 34, 25, 12, 22, 11, 90]);
console.log("Teste 1 - Lista pequena:");
console.log(lista1.testarAlgoritmos());

// Teste 2: Lista já ordenada
const lista2 = new OrdenacaoSimples([1, 2, 3, 4, 5]);
console.log("\nTeste 2 - Lista já ordenada:");
console.log(lista2.testarAlgoritmos());

// Teste 3: Lista em ordem decrescente
const lista3 = new OrdenacaoSimples([5, 4, 3, 2, 1]);
console.log("\nTeste 3 - Lista decrescente:");
console.log(`Está ordenada decrescente: ${lista3.estaOrdenadaDecrescente()}`);
console.log(lista3.testarAlgoritmos());

// Teste 4: Ordenação parcial
const lista4 = new OrdenacaoSimples([1, 5, 3, 7, 2, 9, 4, 8]);
console.log("\nTeste 4 - Ordenação parcial:");
console.log("Original:", lista4.toString());

const trocasParcial = lista4.ordenarParcial(2, 5); // Ordena do índice 2 ao 5
console.log(`Após ordenar índices 2-5 (${trocasParcial} trocas):`, lista4.toString());

// Teste 5: Lista embaralhada
const lista5 = OrdenacaoSimples.listaEmbaralhada(8);
console.log("\nTeste 5 - Lista embaralhada:");
console.log(lista5.testarAlgoritmos());

// Teste 6: Lista com elementos repetidos
const lista6 = new OrdenacaoSimples([3, 1, 4, 1, 5, 9, 2, 6, 5]);
console.log("\nTeste 6 - Lista com repetições:");
console.log(lista6.testarAlgoritmos());

export { OrdenacaoSimples };
