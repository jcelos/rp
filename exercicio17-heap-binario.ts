/**
 * EXERCÍCIO BÁSICO 17 - HEAP BINÁRIO (MIN E MAX)
 * 
 * Implementa estruturas heap (min e max) com operações fundamentais
 * de inserção, remoção e manutenção da propriedade heap.
 */

/**
 * Heap Mínimo - menor elemento sempre na raiz
 */
class HeapMinimo<T> {
    private elementos: T[];
    private tamanho: number;
    private compararFuncao: (a: T, b: T) => number;
    
    constructor(compararFuncao?: (a: T, b: T) => number) {
        this.elementos = [];
        this.tamanho = 0;
        
        // Função de comparação padrão
        this.compararFuncao = compararFuncao || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }
    
    /**
     * Obtém índice do pai
     */
    private indicePai(indice: number): number {
        return Math.floor((indice - 1) / 2);
    }
    
    /**
     * Obtém índice do filho esquerdo
     */
    private indiceFilhoEsquerdo(indice: number): number {
        return 2 * indice + 1;
    }
    
    /**
     * Obtém índice do filho direito
     */
    private indiceFilhoDireito(indice: number): number {
        return 2 * indice + 2;
    }
    
    /**
     * Troca dois elementos no array
     */
    private trocar(indice1: number, indice2: number): void {
        const temp = this.elementos[indice1];
        this.elementos[indice1] = this.elementos[indice2];
        this.elementos[indice2] = temp;
    }
    
    /**
     * Insere elemento no heap
     */
    public inserir(elemento: T): void {
        this.elementos[this.tamanho] = elemento;
        this.subirElemento(this.tamanho);
        this.tamanho++;
    }
    
    /**
     * Sobe elemento para manter propriedade heap
     */
    private subirElemento(indice: number): void {
        while (indice > 0) {
            const indicePai = this.indicePai(indice);
            
            if (this.compararFuncao(this.elementos[indice], this.elementos[indicePai]) >= 0) {
                break;
            }
            
            this.trocar(indice, indicePai);
            indice = indicePai;
        }
    }
    
    /**
     * Remove e retorna o menor elemento (raiz)
     */
    public extrairMinimo(): T | null {
        if (this.tamanho === 0) {
            return null;
        }
        
        const minimo = this.elementos[0];
        
        // Move último elemento para raiz
        this.elementos[0] = this.elementos[this.tamanho - 1];
        this.tamanho--;
        
        // Restaura propriedade heap
        if (this.tamanho > 0) {
            this.descerElemento(0);
        }
        
        return minimo;
    }
    
    /**
     * Desce elemento para manter propriedade heap
     */
    private descerElemento(indice: number): void {
        while (this.indiceFilhoEsquerdo(indice) < this.tamanho) {
            const filhoEsquerdo = this.indiceFilhoEsquerdo(indice);
            const filhoDireito = this.indiceFilhoDireito(indice);
            
            let menorFilho = filhoEsquerdo;
            
            // Encontra o menor filho
            if (filhoDireito < this.tamanho && 
                this.compararFuncao(this.elementos[filhoDireito], this.elementos[filhoEsquerdo]) < 0) {
                menorFilho = filhoDireito;
            }
            
            // Se pai é menor que menor filho, heap está correto
            if (this.compararFuncao(this.elementos[indice], this.elementos[menorFilho]) <= 0) {
                break;
            }
            
            this.trocar(indice, menorFilho);
            indice = menorFilho;
        }
    }
    
    /**
     * Retorna menor elemento sem remover
     */
    public verMinimo(): T | null {
        return this.tamanho > 0 ? this.elementos[0] : null;
    }
    
    /**
     * Verifica se heap está vazio
     */
    public estaVazio(): boolean {
        return this.tamanho === 0;
    }
    
    /**
     * Retorna tamanho do heap
     */
    public obterTamanho(): number {
        return this.tamanho;
    }
    
    /**
     * Limpa o heap
     */
    public limpar(): void {
        this.elementos = [];
        this.tamanho = 0;
    }
    
    /**
     * Constrói heap a partir de array existente
     */
    public construirHeap(array: T[]): void {
        this.elementos = [...array];
        this.tamanho = array.length;
        
        // Heapify a partir do último nó interno
        for (let i = this.indicePai(this.tamanho - 1); i >= 0; i--) {
            this.descerElemento(i);
        }
    }
    
    /**
     * Converte heap para array (não ordenado)
     */
    public paraArray(): T[] {
        const resultado: T[] = [];
        for (let i = 0; i < this.tamanho; i++) {
            resultado[i] = this.elementos[i];
        }
        return resultado;
    }
    
    /**
     * Heap sort - retorna elementos ordenados
     */
    public heapSort(): T[] {
        const resultado: T[] = [];
        const elementosOriginais = [...this.elementos];
        const tamanhoOriginal = this.tamanho;
        
        while (!this.estaVazio()) {
            const minimo = this.extrairMinimo();
            if (minimo !== null) {
                resultado[resultado.length] = minimo;
            }
        }
        
        // Restaura heap original
        this.elementos = elementosOriginais;
        this.tamanho = tamanhoOriginal;
        
        return resultado;
    }
    
    /**
     * Verifica se estrutura mantém propriedade heap
     */
    public verificarPropriedadeHeap(): boolean {
        for (let i = 0; i < this.tamanho; i++) {
            const filhoEsquerdo = this.indiceFilhoEsquerdo(i);
            const filhoDireito = this.indiceFilhoDireito(i);
            
            if (filhoEsquerdo < this.tamanho && 
                this.compararFuncao(this.elementos[i], this.elementos[filhoEsquerdo]) > 0) {
                return false;
            }
            
            if (filhoDireito < this.tamanho && 
                this.compararFuncao(this.elementos[i], this.elementos[filhoDireito]) > 0) {
                return false;
            }
        }
        
        return true;
    }
}

/**
 * Heap Máximo - maior elemento sempre na raiz
 */
class HeapMaximo<T> {
    private heapMinimo: HeapMinimo<T>;
    
    constructor(compararFuncao?: (a: T, b: T) => number) {
        // Inverte a comparação para simular heap máximo
        const compararInvertido = compararFuncao ? 
            (a: T, b: T) => -compararFuncao(a, b) :
            (a: T, b: T) => {
                if (a > b) return -1;
                if (a < b) return 1;
                return 0;
            };
        
        this.heapMinimo = new HeapMinimo<T>(compararInvertido);
    }
    
    /**
     * Insere elemento no heap
     */
    public inserir(elemento: T): void {
        this.heapMinimo.inserir(elemento);
    }
    
    /**
     * Remove e retorna o maior elemento
     */
    public extrairMaximo(): T | null {
        return this.heapMinimo.extrairMinimo();
    }
    
    /**
     * Retorna maior elemento sem remover
     */
    public verMaximo(): T | null {
        return this.heapMinimo.verMinimo();
    }
    
    /**
     * Verifica se heap está vazio
     */
    public estaVazio(): boolean {
        return this.heapMinimo.estaVazio();
    }
    
    /**
     * Retorna tamanho do heap
     */
    public obterTamanho(): number {
        return this.heapMinimo.obterTamanho();
    }
    
    /**
     * Limpa o heap
     */
    public limpar(): void {
        this.heapMinimo.limpar();
    }
    
    /**
     * Constrói heap a partir de array
     */
    public construirHeap(array: T[]): void {
        this.heapMinimo.construirHeap(array);
    }
    
    /**
     * Converte para array
     */
    public paraArray(): T[] {
        return this.heapMinimo.paraArray();
    }
    
    /**
     * Heap sort em ordem decrescente
     */
    public heapSort(): T[] {
        return this.heapMinimo.heapSort();
    }
    
    /**
     * Verifica propriedade heap
     */
    public verificarPropriedadeHeap(): boolean {
        return this.heapMinimo.verificarPropriedadeHeap();
    }
}

/**
 * Fila de prioridade usando heap
 */
class FilaPrioridade<T> {
    private heap: HeapMinimo<{ elemento: T; prioridade: number }>;
    
    constructor() {
        this.heap = new HeapMinimo<{ elemento: T; prioridade: number }>(
            (a, b) => a.prioridade - b.prioridade
        );
    }
    
    /**
     * Adiciona elemento com prioridade
     */
    public enfileirar(elemento: T, prioridade: number): void {
        this.heap.inserir({ elemento, prioridade });
    }
    
    /**
     * Remove elemento com maior prioridade (menor número)
     */
    public desenfileirar(): T | null {
        const item = this.heap.extrairMinimo();
        return item ? item.elemento : null;
    }
    
    /**
     * Vê próximo elemento sem remover
     */
    public verProximo(): { elemento: T; prioridade: number } | null {
        return this.heap.verMinimo();
    }
    
    /**
     * Verifica se fila está vazia
     */
    public estaVazia(): boolean {
        return this.heap.estaVazio();
    }
    
    /**
     * Retorna tamanho da fila
     */
    public tamanho(): number {
        return this.heap.obterTamanho();
    }
    
    /**
     * Lista todos os elementos com prioridades
     */
    public listarElementos(): { elemento: T; prioridade: number }[] {
        return this.heap.paraArray();
    }
}

/**
 * Utilitários para demonstrar conceitos de heap
 */
class UtilsHeap {
    
    /**
     * Encontra K menores elementos em array
     */
    public static kMenoresElementos<T>(array: T[], k: number): T[] {
        if (k <= 0 || array.length === 0) {
            return [];
        }
        
        const heapMax = new HeapMaximo<T>();
        
        // Adiciona primeiros k elementos
        for (let i = 0; i < Math.min(k, array.length); i++) {
            heapMax.inserir(array[i]);
        }
        
        // Para elementos restantes, substitui se for menor que o máximo
        for (let i = k; i < array.length; i++) {
            const maximo = heapMax.verMaximo();
            
            if (maximo !== null && maximo !== undefined && array[i] < maximo) {
                heapMax.extrairMaximo();
                heapMax.inserir(array[i]);
            }
        }
        
        return heapMax.heapSort();
    }
    
    /**
     * Mescla K arrays ordenados
     */
    public static mesclarArraysOrdenados<T>(arrays: T[][]): T[] {
        const resultado: T[] = [];
        const heap = new HeapMinimo<{ valor: T; arrayIndex: number; elementIndex: number }>(
            (a, b) => {
                if (a.valor < b.valor) return -1;
                if (a.valor > b.valor) return 1;
                return 0;
            }
        );
        
        // Adiciona primeiro elemento de cada array
        for (let i = 0; i < arrays.length; i++) {
            if (arrays[i].length > 0) {
                heap.inserir({
                    valor: arrays[i][0],
                    arrayIndex: i,
                    elementIndex: 0
                });
            }
        }
        
        // Extrai elementos em ordem
        while (!heap.estaVazio()) {
            const menor = heap.extrairMinimo()!;
            resultado[resultado.length] = menor.valor;
            
            // Adiciona próximo elemento do mesmo array
            const proximoIndex = menor.elementIndex + 1;
            if (proximoIndex < arrays[menor.arrayIndex].length) {
                heap.inserir({
                    valor: arrays[menor.arrayIndex][proximoIndex],
                    arrayIndex: menor.arrayIndex,
                    elementIndex: proximoIndex
                });
            }
        }
        
        return resultado;
    }
    
    /**
     * Simulação de sistema operacional com prioridades
     */
    public static simularProcessos(): void {
        const fila = new FilaPrioridade<string>();
        
        console.log("=== SIMULAÇÃO DE PROCESSOS ===");
        
        // Adiciona processos com diferentes prioridades
        fila.enfileirar("Processo Sistema", 1);
        fila.enfileirar("Processo Usuário A", 5);
        fila.enfileirar("Processo Crítico", 2);
        fila.enfileirar("Processo Usuário B", 7);
        fila.enfileirar("Processo Tempo Real", 0);
        
        console.log("Processos na fila:", fila.tamanho());
        
        console.log("\nExecutando processos por prioridade:");
        while (!fila.estaVazia()) {
            const proximo = fila.verProximo();
            const processo = fila.desenfileirar();
            
            console.log(`Executando: ${processo} (prioridade: ${proximo?.prioridade})`);
        }
    }
}

// Exemplos de uso
console.log("=== EXERCÍCIO 17 - HEAP BINÁRIO ===");

// Teste Heap Mínimo
console.log("--- HEAP MÍNIMO ---");
const heapMin = new HeapMinimo<number>();

const numeros = [15, 10, 20, 8, 25, 3, 12];
console.log("Inserindo números:", numeros);

for (let i = 0; i < numeros.length; i++) {
    heapMin.inserir(numeros[i]);
}

console.log("Heap após inserções:", heapMin.paraArray());
console.log("Menor elemento:", heapMin.verMinimo());
console.log("Propriedade heap válida:", heapMin.verificarPropriedadeHeap());

console.log("\nExtraindo elementos em ordem crescente:");
while (!heapMin.estaVazio()) {
    console.log("Extraído:", heapMin.extrairMinimo());
}

// Teste Heap Máximo
console.log("\n--- HEAP MÁXIMO ---");
const heapMax = new HeapMaximo<number>();

heapMax.construirHeap([5, 2, 8, 1, 9, 3]);
console.log("Heap construído:", heapMax.paraArray());
console.log("Maior elemento:", heapMax.verMaximo());

console.log("\nExtraindo 3 maiores:");
for (let i = 0; i < 3; i++) {
    console.log("Extraído:", heapMax.extrairMaximo());
}

// Heap Sort
console.log("\n--- HEAP SORT ---");
const heapSort = new HeapMinimo<number>();
const arrayDesordenado = [64, 34, 25, 12, 22, 11, 90];

heapSort.construirHeap(arrayDesordenado);
console.log("Array original:", arrayDesordenado);
console.log("Array ordenado:", heapSort.heapSort());

// Fila de Prioridade
console.log("\n--- FILA DE PRIORIDADE ---");
const fila = new FilaPrioridade<string>();

// Adiciona tarefas com prioridades
fila.enfileirar("Tarefa Urgente", 1);
fila.enfileirar("Tarefa Normal", 5);
fila.enfileirar("Tarefa Crítica", 0);
fila.enfileirar("Tarefa Baixa", 8);

console.log("Fila de tarefas criada");
console.log("Próxima tarefa:", fila.verProximo());

console.log("\nProcessando tarefas por prioridade:");
while (!fila.estaVazia()) {
    const tarefa = fila.desenfileirar();
    console.log("Processando:", tarefa);
}

// Teste K Menores Elementos
console.log("\n--- K MENORES ELEMENTOS ---");
const arrayTeste = [7, 10, 4, 3, 20, 15, 2, 1];
const k = 3;

const kMenores = UtilsHeap.kMenoresElementos(arrayTeste, k);
console.log(`Array: [${arrayTeste.join(", ")}]`);
console.log(`${k} menores elementos:`, kMenores);

// Mesclar Arrays Ordenados
console.log("\n--- MESCLAR ARRAYS ORDENADOS ---");
const arrays = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];

console.log("Arrays para mesclar:");
for (let i = 0; i < arrays.length; i++) {
    console.log(`Array ${i + 1}: [${arrays[i].join(", ")}]`);
}

const mesclado = UtilsHeap.mesclarArraysOrdenados(arrays);
console.log("Array mesclado:", mesclado);

// Simulação de processos
console.log("\n");
UtilsHeap.simularProcessos();

// Teste de performance
console.log("\n--- TESTE DE PERFORMANCE ---");
const heapPerf = new HeapMinimo<number>();

const inicio = Date.now();

// Insere 1000 elementos aleatórios
for (let i = 0; i < 1000; i++) {
    heapPerf.inserir(Math.floor(Math.random() * 10000));
}

// Extrai todos
let extraidos = 0;
while (!heapPerf.estaVazio()) {
    heapPerf.extrairMinimo();
    extraidos++;
}

const tempo = Date.now() - inicio;
console.log(`1000 inserções + ${extraidos} extrações: ${tempo}ms`);

// Comparação com ordenação de array
const arrayPerf: number[] = [];
for (let i = 0; i < 1000; i++) {
    arrayPerf[i] = Math.floor(Math.random() * 10000);
}

const inicioSort = Date.now();

// Bubble sort para comparação
for (let i = 0; i < arrayPerf.length - 1; i++) {
    for (let j = 0; j < arrayPerf.length - i - 1; j++) {
        if (arrayPerf[j] > arrayPerf[j + 1]) {
            const temp = arrayPerf[j];
            arrayPerf[j] = arrayPerf[j + 1];
            arrayPerf[j + 1] = temp;
        }
    }
}

const tempoSort = Date.now() - inicioSort;
console.log(`Bubble sort de 1000 elementos: ${tempoSort}ms`);
console.log(`Heap é ${Math.round(tempoSort / tempo)}x mais rápido`);

export { HeapMinimo, HeapMaximo, FilaPrioridade, UtilsHeap };
