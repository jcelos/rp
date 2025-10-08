/**
 * EXERCÍCIO MÉDIO 5 - ALGORITMOS DE ORDENAÇÃO AVANÇADOS
 * 
 * Implementa algoritmos de ordenação mais sofisticados como Merge Sort,
 * Quick Sort, e Heap Sort usando apenas lógica manual sem métodos nativos.
 * Foca em divide-and-conquer e otimização de performance.
 */

class AlgoritmosOrdenacao {
    
    /**
     * MERGE SORT - Ordenação por divisão e conquista
     * Complexidade: O(n log n) no melhor, médio e pior caso
     */
    public static mergeSort(array: number[]): number[] {
        // Cria uma cópia do array para não modificar o original
        const copia: number[] = [];
        for (let i = 0; i < array.length; i++) {
            copia[i] = array[i];
        }
        
        this.mergeSortRecursivo(copia, 0, copia.length - 1);
        return copia;
    }
    
    private static mergeSortRecursivo(array: number[], inicio: number, fim: number): void {
        if (inicio >= fim) {
            return; // Caso base: array com 1 elemento ou inválido
        }
        
        const meio = Math.floor((inicio + fim) / 2);
        
        // Divide
        this.mergeSortRecursivo(array, inicio, meio);
        this.mergeSortRecursivo(array, meio + 1, fim);
        
        // Conquista (merge)
        this.merge(array, inicio, meio, fim);
    }
    
    private static merge(array: number[], inicio: number, meio: number, fim: number): void {
        // Cria arrays temporários
        const esquerda: number[] = [];
        const direita: number[] = [];
        
        // Copia dados para arrays temporários
        const tamanhoEsquerda = meio - inicio + 1;
        const tamanhoDireita = fim - meio;
        
        for (let i = 0; i < tamanhoEsquerda; i++) {
            esquerda[i] = array[inicio + i];
        }
        for (let i = 0; i < tamanhoDireita; i++) {
            direita[i] = array[meio + 1 + i];
        }
        
        // Merge dos arrays temporários de volta ao array original
        let i = 0; // Índice inicial do subarray esquerda
        let j = 0; // Índice inicial do subarray direita
        let k = inicio; // Índice inicial do subarray merged
        
        while (i < tamanhoEsquerda && j < tamanhoDireita) {
            if (esquerda[i] <= direita[j]) {
                array[k] = esquerda[i];
                i++;
            } else {
                array[k] = direita[j];
                j++;
            }
            k++;
        }
        
        // Copia elementos restantes da esquerda
        while (i < tamanhoEsquerda) {
            array[k] = esquerda[i];
            i++;
            k++;
        }
        
        // Copia elementos restantes da direita
        while (j < tamanhoDireita) {
            array[k] = direita[j];
            j++;
            k++;
        }
    }
    
    /**
     * QUICK SORT - Ordenação por particionamento
     * Complexidade: O(n log n) médio, O(n²) pior caso
     */
    public static quickSort(array: number[]): number[] {
        const copia: number[] = [];
        for (let i = 0; i < array.length; i++) {
            copia[i] = array[i];
        }
        
        this.quickSortRecursivo(copia, 0, copia.length - 1);
        return copia;
    }
    
    private static quickSortRecursivo(array: number[], baixo: number, alto: number): void {
        if (baixo < alto) {
            // Particiona o array e obtém o índice do pivot
            const indicePivot = this.particionar(array, baixo, alto);
            
            // Recursivamente ordena elementos antes e depois da partição
            this.quickSortRecursivo(array, baixo, indicePivot - 1);
            this.quickSortRecursivo(array, indicePivot + 1, alto);
        }
    }
    
    private static particionar(array: number[], baixo: number, alto: number): number {
        // Escolhe o último elemento como pivot
        const pivot = array[alto];
        let i = baixo - 1; // Índice do menor elemento
        
        for (let j = baixo; j < alto; j++) {
            // Se o elemento atual é menor ou igual ao pivot
            if (array[j] <= pivot) {
                i++;
                this.trocar(array, i, j);
            }
        }
        
        this.trocar(array, i + 1, alto);
        return i + 1;
    }
    
    private static trocar(array: number[], i: number, j: number): void {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    /**
     * HEAP SORT - Ordenação usando estrutura de heap
     * Complexidade: O(n log n) em todos os casos
     */
    public static heapSort(array: number[]): number[] {
        const copia: number[] = [];
        for (let i = 0; i < array.length; i++) {
            copia[i] = array[i];
        }
        
        const n = copia.length;
        
        // Constrói heap (rearranja array)
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(copia, n, i);
        }
        
        // Extrai elementos do heap um por um
        for (let i = n - 1; i > 0; i--) {
            // Move raiz atual para o final
            this.trocar(copia, 0, i);
            
            // Chama heapify na heap reduzida
            this.heapify(copia, i, 0);
        }
        
        return copia;
    }
    
    private static heapify(array: number[], n: number, i: number): void {
        let maior = i; // Inicializa maior como raiz
        const esquerda = 2 * i + 1; // Filho esquerdo
        const direita = 2 * i + 2; // Filho direito
        
        // Se filho esquerdo é maior que a raiz
        if (esquerda < n && array[esquerda] > array[maior]) {
            maior = esquerda;
        }
        
        // Se filho direito é maior que o maior até agora
        if (direita < n && array[direita] > array[maior]) {
            maior = direita;
        }
        
        // Se maior não é raiz
        if (maior !== i) {
            this.trocar(array, i, maior);
            
            // Recursivamente heapify o subárvore afetada
            this.heapify(array, n, maior);
        }
    }
    
    /**
     * COUNTING SORT - Ordenação por contagem (para números inteiros)
     * Complexidade: O(n + k) onde k é o range dos números
     */
    public static countingSort(array: number[]): number[] {
        if (array.length === 0) {
            return [];
        }
        
        // Encontra valor máximo e mínimo
        let max = array[0];
        let min = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] > max) max = array[i];
            if (array[i] < min) min = array[i];
        }
        
        const range = max - min + 1;
        const count: number[] = [];
        const output: number[] = [];
        
        // Inicializa arrays
        for (let i = 0; i < range; i++) {
            count[i] = 0;
        }
        for (let i = 0; i < array.length; i++) {
            output[i] = 0;
        }
        
        // Conta ocorrências
        for (let i = 0; i < array.length; i++) {
            count[array[i] - min]++;
        }
        
        // Modifica count[i] para conter posição atual
        for (let i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
        }
        
        // Constrói array resultado
        for (let i = array.length - 1; i >= 0; i--) {
            output[count[array[i] - min] - 1] = array[i];
            count[array[i] - min]--;
        }
        
        return output;
    }
    
    /**
     * RADIX SORT - Ordenação por dígitos
     * Complexidade: O(d * (n + k)) onde d é o número de dígitos
     */
    public static radixSort(array: number[]): number[] {
        if (array.length === 0) {
            return [];
        }
        
        const copia: number[] = [];
        for (let i = 0; i < array.length; i++) {
            copia[i] = array[i];
        }
        
        // Encontra o número máximo para saber o número de dígitos
        let max = copia[0];
        for (let i = 1; i < copia.length; i++) {
            if (copia[i] > max) {
                max = copia[i];
            }
        }
        
        // Faz counting sort para cada dígito
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            this.countingSortPorDigito(copia, exp);
        }
        
        return copia;
    }
    
    private static countingSortPorDigito(array: number[], exp: number): void {
        const output: number[] = [];
        const count: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Para dígitos 0-9
        
        // Inicializa output
        for (let i = 0; i < array.length; i++) {
            output[i] = 0;
        }
        
        // Conta ocorrências dos dígitos
        for (let i = 0; i < array.length; i++) {
            count[Math.floor(array[i] / exp) % 10]++;
        }
        
        // Modifica count para conter posições atuais
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        // Constrói array resultado
        for (let i = array.length - 1; i >= 0; i--) {
            const digito = Math.floor(array[i] / exp) % 10;
            output[count[digito] - 1] = array[i];
            count[digito]--;
        }
        
        // Copia resultado de volta para array original
        for (let i = 0; i < array.length; i++) {
            array[i] = output[i];
        }
    }
}

/**
 * Classe para análise de performance dos algoritmos
 */
class AnalisadorPerformance {
    
    /**
     * Mede tempo de execução de um algoritmo
     */
    public static medirTempo(algoritmo: (array: number[]) => number[], array: number[]): {
        resultado: number[];
        tempoMs: number;
    } {
        const inicio = Date.now();
        const resultado = algoritmo(array);
        const fim = Date.now();
        
        return {
            resultado: resultado,
            tempoMs: fim - inicio
        };
    }
    
    /**
     * Verifica se um array está ordenado
     */
    public static estaOrdenado(array: number[]): boolean {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Gera array aleatório para testes
     */
    public static gerarArrayAleatorio(tamanho: number, max: number = 1000): number[] {
        const array: number[] = [];
        for (let i = 0; i < tamanho; i++) {
            array[i] = Math.floor(Math.random() * max) + 1;
        }
        return array;
    }
    
    /**
     * Gera array parcialmente ordenado
     */
    public static gerarArrayParcialmenteOrdenado(tamanho: number): number[] {
        const array: number[] = [];
        
        // Primeira metade ordenada
        for (let i = 0; i < Math.floor(tamanho / 2); i++) {
            array[i] = i + 1;
        }
        
        // Segunda metade aleatória
        for (let i = Math.floor(tamanho / 2); i < tamanho; i++) {
            array[i] = Math.floor(Math.random() * tamanho) + 1;
        }
        
        return array;
    }
    
    /**
     * Compara performance de todos os algoritmos
     */
    public static compararAlgoritmos(array: number[]): void {
        console.log(`\n=== COMPARAÇÃO DE ALGORITMOS (${array.length} elementos) ===`);
        
        const algoritmos = [
            { nome: "Merge Sort", funcao: AlgoritmosOrdenacao.mergeSort },
            { nome: "Quick Sort", funcao: AlgoritmosOrdenacao.quickSort },
            { nome: "Heap Sort", funcao: AlgoritmosOrdenacao.heapSort },
            { nome: "Counting Sort", funcao: AlgoritmosOrdenacao.countingSort },
            { nome: "Radix Sort", funcao: AlgoritmosOrdenacao.radixSort }
        ];
        
        for (let i = 0; i < algoritmos.length; i++) {
            const alg = algoritmos[i];
            const medicao = this.medirTempo(alg.funcao, array);
            const ordenado = this.estaOrdenado(medicao.resultado);
            
            console.log(`${alg.nome}:`);
            console.log(`  - Tempo: ${medicao.tempoMs}ms`);
            console.log(`  - Correto: ${ordenado ? "✓" : "✗"}`);
            console.log(`  - Primeiros 5: [${medicao.resultado.slice(0, 5).join(", ")}]`);
        }
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO MÉDIO 5 - ALGORITMOS DE ORDENAÇÃO AVANÇADOS ===");

// Teste 1: Array pequeno para verificar correção
const arrayPequeno = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42];
console.log("Array original:", arrayPequeno);

console.log("\n--- TESTE DE CORREÇÃO ---");
console.log("Merge Sort:", AlgoritmosOrdenacao.mergeSort(arrayPequeno));
console.log("Quick Sort:", AlgoritmosOrdenacao.quickSort(arrayPequeno));
console.log("Heap Sort:", AlgoritmosOrdenacao.heapSort(arrayPequeno));
console.log("Counting Sort:", AlgoritmosOrdenacao.countingSort(arrayPequeno));
console.log("Radix Sort:", AlgoritmosOrdenacao.radixSort(arrayPequeno));

// Teste 2: Arrays especiais
console.log("\n--- CASOS ESPECIAIS ---");

// Array já ordenado
const arrayOrdenado = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Array já ordenado:", arrayOrdenado);
console.log("Quick Sort:", AlgoritmosOrdenacao.quickSort(arrayOrdenado));

// Array inversamente ordenado
const arrayInverso = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log("Array inverso:", arrayInverso);
console.log("Merge Sort:", AlgoritmosOrdenacao.mergeSort(arrayInverso));

// Array com duplicatas
const arrayDuplicatas = [5, 2, 8, 2, 9, 1, 5, 5, 9];
console.log("Array com duplicatas:", arrayDuplicatas);
console.log("Heap Sort:", AlgoritmosOrdenacao.heapSort(arrayDuplicatas));

// Teste 3: Análise de performance
console.log("\n--- ANÁLISE DE PERFORMANCE ---");

// Array pequeno (50 elementos)
const arrayPeq = AnalisadorPerformance.gerarArrayAleatorio(50, 100);
AnalisadorPerformance.compararAlgoritmos(arrayPeq);

// Array médio (200 elementos)
const arrayMed = AnalisadorPerformance.gerarArrayAleatorio(200, 500);
AnalisadorPerformance.compararAlgoritmos(arrayMed);

// Teste 4: Casos específicos de cada algoritmo
console.log("\n--- CARACTERÍSTICAS DOS ALGORITMOS ---");

// Merge Sort - estável, sempre O(n log n)
console.log("MERGE SORT - Sempre O(n log n), estável:");
const arrayMerge = [5, 2, 4, 6, 1, 3];
console.log("Original:", arrayMerge);
console.log("Ordenado:", AlgoritmosOrdenacao.mergeSort(arrayMerge));

// Quick Sort - in-place, pode ser O(n²) no pior caso
console.log("\nQUICK SORT - Médio O(n log n), in-place:");
const arrayQuick = [3, 6, 8, 10, 1, 2, 1];
console.log("Original:", arrayQuick);
console.log("Ordenado:", AlgoritmosOrdenacao.quickSort(arrayQuick));

// Counting Sort - para inteiros em range limitado
console.log("\nCOUNTING SORT - O(n + k), para inteiros:");
const arrayCounting = [4, 2, 2, 8, 3, 3, 1];
console.log("Original:", arrayCounting);
console.log("Ordenado:", AlgoritmosOrdenacao.countingSort(arrayCounting));

// Radix Sort - para inteiros, não baseado em comparação
console.log("\nRADIX SORT - O(d * (n + k)), por dígitos:");
const arrayRadix = [170, 45, 75, 90, 2, 802, 24, 66];
console.log("Original:", arrayRadix);
console.log("Ordenado:", AlgoritmosOrdenacao.radixSort(arrayRadix));

// Teste 5: Verificação de estabilidade (usando objetos)
console.log("\n--- TESTE DE CORREÇÃO FINAL ---");
const arrayTeste1 = AnalisadorPerformance.gerarArrayAleatorio(20, 50);
const arrayTeste2 = AnalisadorPerformance.gerarArrayParcialmenteOrdenado(15);

console.log("Teste array aleatório:");
console.log("Original:", arrayTeste1);
const resultadoTeste1 = AlgoritmosOrdenacao.mergeSort(arrayTeste1);
console.log("Merge Sort:", resultadoTeste1);
console.log("Está ordenado:", AnalisadorPerformance.estaOrdenado(resultadoTeste1));

console.log("\nTeste array parcialmente ordenado:");
console.log("Original:", arrayTeste2);
const resultadoTeste2 = AlgoritmosOrdenacao.quickSort(arrayTeste2);
console.log("Quick Sort:", resultadoTeste2);
console.log("Está ordenado:", AnalisadorPerformance.estaOrdenado(resultadoTeste2));

export { AlgoritmosOrdenacao, AnalisadorPerformance };
