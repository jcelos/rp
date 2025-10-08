/**
 * DESAFIO BÁSICO 2 - MANIPULAÇÃO DE ARRAYS
 * 
 * Exercícios focados na manipulação manual de arrays sem métodos nativos.
 * Explora conceitos de iteração, busca, modificação e criação de novos arrays.
 * Ideal para consolidar fundamentos de estruturas de dados lineares.
 */

/**
 * Classe para operações básicas com arrays
 */
class ArrayManipulador {
    
    /**
     * Adiciona elemento no final do array (implementação manual de push)
     */
    public static adicionar<T>(array: T[], elemento: T): T[] {
        const novoArray: T[] = [];
        
        // Copia elementos existentes
        for (let i = 0; i < array.length; i++) {
            novoArray[i] = array[i];
        }
        
        // Adiciona novo elemento
        novoArray[array.length] = elemento;
        
        return novoArray;
    }
    
    /**
     * Remove último elemento do array (implementação manual de pop)
     */
    public static removerUltimo<T>(array: T[]): { array: T[]; elemento: T | null } {
        if (array.length === 0) {
            return { array: [], elemento: null };
        }
        
        const novoArray: T[] = [];
        const elementoRemovido = array[array.length - 1];
        
        // Copia todos menos o último
        for (let i = 0; i < array.length - 1; i++) {
            novoArray[i] = array[i];
        }
        
        return { array: novoArray, elemento: elementoRemovido };
    }
    
    /**
     * Insere elemento em posição específica
     */
    public static inserirEm<T>(array: T[], indice: number, elemento: T): T[] {
        if (indice < 0 || indice > array.length) {
            throw new Error("Índice inválido");
        }
        
        const novoArray: T[] = [];
        
        // Copia elementos antes do índice
        for (let i = 0; i < indice; i++) {
            novoArray[i] = array[i];
        }
        
        // Insere novo elemento
        novoArray[indice] = elemento;
        
        // Copia elementos após o índice
        for (let i = indice; i < array.length; i++) {
            novoArray[i + 1] = array[i];
        }
        
        return novoArray;
    }
    
    /**
     * Remove elemento de posição específica
     */
    public static removerDe<T>(array: T[], indice: number): { array: T[]; elemento: T | null } {
        if (indice < 0 || indice >= array.length) {
            return { array: [...array], elemento: null };
        }
        
        const novoArray: T[] = [];
        const elementoRemovido = array[indice];
        
        // Copia elementos antes do índice
        for (let i = 0; i < indice; i++) {
            novoArray[i] = array[i];
        }
        
        // Copia elementos após o índice
        for (let i = indice + 1; i < array.length; i++) {
            novoArray[i - 1] = array[i];
        }
        
        return { array: novoArray, elemento: elementoRemovido };
    }
    
    /**
     * Inverte array (implementação manual de reverse)
     */
    public static inverter<T>(array: T[]): T[] {
        const novoArray: T[] = [];
        
        for (let i = array.length - 1; i >= 0; i--) {
            novoArray[array.length - 1 - i] = array[i];
        }
        
        return novoArray;
    }
    
    /**
     * Concatena dois arrays (implementação manual de concat)
     */
    public static concatenar<T>(array1: T[], array2: T[]): T[] {
        const novoArray: T[] = [];
        
        // Copia primeiro array
        for (let i = 0; i < array1.length; i++) {
            novoArray[i] = array1[i];
        }
        
        // Copia segundo array
        for (let i = 0; i < array2.length; i++) {
            novoArray[array1.length + i] = array2[i];
        }
        
        return novoArray;
    }
    
    /**
     * Cria subarray de um índice até outro (implementação manual de slice)
     */
    public static fatiar<T>(array: T[], inicio: number, fim?: number): T[] {
        const finalFim = fim !== undefined ? fim : array.length;
        
        if (inicio < 0) inicio = 0;
        if (finalFim > array.length) fim = array.length;
        if (inicio >= finalFim) return [];
        
        const novoArray: T[] = [];
        
        for (let i = inicio; i < finalFim; i++) {
            novoArray[i - inicio] = array[i];
        }
        
        return novoArray;
    }
}

/**
 * Classe para busca e filtragem em arrays
 */
class ArrayBuscador {
    
    /**
     * Encontra índice da primeira ocorrência (implementação manual de indexOf)
     */
    public static indiceDe<T>(array: T[], elemento: T): number {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === elemento) {
                return i;
            }
        }
        return -1;
    }
    
    /**
     * Encontra índice da última ocorrência (implementação manual de lastIndexOf)
     */
    public static ultimoIndiceDe<T>(array: T[], elemento: T): number {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] === elemento) {
                return i;
            }
        }
        return -1;
    }
    
    /**
     * Verifica se array contém elemento (implementação manual de includes)
     */
    public static contem<T>(array: T[], elemento: T): boolean {
        return this.indiceDe(array, elemento) !== -1;
    }
    
    /**
     * Filtra elementos que atendem condição (implementação manual de filter)
     */
    public static filtrar<T>(array: T[], condicao: (elemento: T) => boolean): T[] {
        const resultado: T[] = [];
        
        for (let i = 0; i < array.length; i++) {
            if (condicao(array[i])) {
                resultado[resultado.length] = array[i];
            }
        }
        
        return resultado;
    }
    
    /**
     * Encontra primeiro elemento que atende condição (implementação manual de find)
     */
    public static encontrar<T>(array: T[], condicao: (elemento: T) => boolean): T | undefined {
        for (let i = 0; i < array.length; i++) {
            if (condicao(array[i])) {
                return array[i];
            }
        }
        return undefined;
    }
    
    /**
     * Verifica se algum elemento atende condição (implementação manual de some)
     */
    public static algum<T>(array: T[], condicao: (elemento: T) => boolean): boolean {
        for (let i = 0; i < array.length; i++) {
            if (condicao(array[i])) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Verifica se todos elementos atendem condição (implementação manual de every)
     */
    public static todos<T>(array: T[], condicao: (elemento: T) => boolean): boolean {
        for (let i = 0; i < array.length; i++) {
            if (!condicao(array[i])) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Classe para transformações de arrays
 */
class ArrayTransformador {
    
    /**
     * Transforma cada elemento do array (implementação manual de map)
     */
    public static mapear<T, U>(array: T[], transformacao: (elemento: T) => U): U[] {
        const resultado: U[] = [];
        
        for (let i = 0; i < array.length; i++) {
            resultado[i] = transformacao(array[i]);
        }
        
        return resultado;
    }
    
    /**
     * Reduz array a um único valor (implementação manual de reduce)
     */
    public static reduzir<T, U>(
        array: T[], 
        funcaoReducao: (acumulador: U, elemento: T, indice: number) => U, 
        valorInicial: U
    ): U {
        let acumulador = valorInicial;
        
        for (let i = 0; i < array.length; i++) {
            acumulador = funcaoReducao(acumulador, array[i], i);
        }
        
        return acumulador;
    }
    
    /**
     * Remove elementos duplicados
     */
    public static removerDuplicados<T>(array: T[]): T[] {
        const resultado: T[] = [];
        
        for (let i = 0; i < array.length; i++) {
            let jaExiste = false;
            
            // Verifica se elemento já foi adicionado
            for (let j = 0; j < resultado.length; j++) {
                if (array[i] === resultado[j]) {
                    jaExiste = true;
                    break;
                }
            }
            
            if (!jaExiste) {
                resultado[resultado.length] = array[i];
            }
        }
        
        return resultado;
    }
    
    /**
     * Achata array de arrays em um nível (implementação manual de flat)
     */
    public static achatar<T>(array: (T | T[])[]): T[] {
        const resultado: T[] = [];
        
        for (let i = 0; i < array.length; i++) {
            const elemento = array[i];
            
            // Verifica se é array (simplificação: assume que arrays têm propriedade length)
            if (typeof elemento === 'object' && elemento !== null && 'length' in elemento) {
                const subArray = elemento as T[];
                for (let j = 0; j < subArray.length; j++) {
                    resultado[resultado.length] = subArray[j];
                }
            } else {
                resultado[resultado.length] = elemento as T;
            }
        }
        
        return resultado;
    }
    
    /**
     * Agrupa elementos por uma função de agrupamento
     */
    public static agruparPor<T, K extends string | number>(
        array: T[], 
        obterChave: (elemento: T) => K
    ): { [key in K]?: T[] } {
        const grupos: { [key in K]?: T[] } = {};
        
        for (let i = 0; i < array.length; i++) {
            const elemento = array[i];
            const chave = obterChave(elemento);
            
            if (!grupos[chave]) {
                grupos[chave] = [];
            }
            
            grupos[chave]![grupos[chave]!.length] = elemento;
        }
        
        return grupos;
    }
}

/**
 * Classe para operações matemáticas com arrays
 */
class ArrayMatematico {
    
    /**
     * Calcula soma de todos os elementos
     */
    public static soma(numeros: number[]): number {
        let total = 0;
        
        for (let i = 0; i < numeros.length; i++) {
            total += numeros[i];
        }
        
        return total;
    }
    
    /**
     * Calcula média dos elementos
     */
    public static media(numeros: number[]): number {
        if (numeros.length === 0) return 0;
        
        return this.soma(numeros) / numeros.length;
    }
    
    /**
     * Encontra valor mínimo
     */
    public static minimo(numeros: number[]): number {
        if (numeros.length === 0) {
            throw new Error("Array vazio");
        }
        
        let min = numeros[0];
        
        for (let i = 1; i < numeros.length; i++) {
            if (numeros[i] < min) {
                min = numeros[i];
            }
        }
        
        return min;
    }
    
    /**
     * Encontra valor máximo
     */
    public static maximo(numeros: number[]): number {
        if (numeros.length === 0) {
            throw new Error("Array vazio");
        }
        
        let max = numeros[0];
        
        for (let i = 1; i < numeros.length; i++) {
            if (numeros[i] > max) {
                max = numeros[i];
            }
        }
        
        return max;
    }
    
    /**
     * Calcula mediana (valor central)
     */
    public static mediana(numeros: number[]): number {
        if (numeros.length === 0) {
            throw new Error("Array vazio");
        }
        
        // Primeiro ordena o array (implementação simples)
        const numerosOrdenados = this.ordenarNumeros(numeros);
        const meio = Math.floor(numerosOrdenados.length / 2);
        
        if (numerosOrdenados.length % 2 === 0) {
            // Par: média dos dois valores centrais
            return (numerosOrdenados[meio - 1] + numerosOrdenados[meio]) / 2;
        } else {
            // Ímpar: valor central
            return numerosOrdenados[meio];
        }
    }
    
    /**
     * Ordena números usando bubble sort simples
     */
    private static ordenarNumeros(numeros: number[]): number[] {
        const copia: number[] = [];
        
        // Cria cópia
        for (let i = 0; i < numeros.length; i++) {
            copia[i] = numeros[i];
        }
        
        // Bubble sort
        for (let i = 0; i < copia.length - 1; i++) {
            for (let j = 0; j < copia.length - 1 - i; j++) {
                if (copia[j] > copia[j + 1]) {
                    const temp = copia[j];
                    copia[j] = copia[j + 1];
                    copia[j + 1] = temp;
                }
            }
        }
        
        return copia;
    }
    
    /**
     * Calcula produto de todos os elementos
     */
    public static produto(numeros: number[]): number {
        let resultado = 1;
        
        for (let i = 0; i < numeros.length; i++) {
            resultado *= numeros[i];
        }
        
        return resultado;
    }
}

// Exemplos de uso e testes
console.log("=== DESAFIO BÁSICO 2 - MANIPULAÇÃO DE ARRAYS ===");

// Teste 1: Manipulação Básica
console.log("--- MANIPULAÇÃO BÁSICA ---");
let array = [1, 2, 3];
console.log("Array inicial:", array);

array = ArrayManipulador.adicionar(array, 4);
console.log("Após adicionar 4:", array);

const remocao = ArrayManipulador.removerUltimo(array);
console.log("Após remover último:", remocao.array, "- Removido:", remocao.elemento);

array = ArrayManipulador.inserirEm(array, 1, 10);
console.log("Após inserir 10 na posição 1:", array);

const remocaoIndice = ArrayManipulador.removerDe(array, 2);
console.log("Após remover posição 2:", remocaoIndice.array, "- Removido:", remocaoIndice.elemento);

console.log("Array invertido:", ArrayManipulador.inverter(array));

const array2 = [7, 8, 9];
console.log("Concatenar com [7,8,9]:", ArrayManipulador.concatenar(array, array2));

console.log("Fatiar posições 1-3:", ArrayManipulador.fatiar(array, 1, 3));

// Teste 2: Busca e Filtragem
console.log("\n--- BUSCA E FILTRAGEM ---");
const numeros = [1, 5, 3, 5, 8, 5, 2];
console.log("Array:", numeros);
console.log("Primeiro índice de 5:", ArrayBuscador.indiceDe(numeros, 5));
console.log("Último índice de 5:", ArrayBuscador.ultimoIndiceDe(numeros, 5));
console.log("Contém 8:", ArrayBuscador.contem(numeros, 8));
console.log("Contém 10:", ArrayBuscador.contem(numeros, 10));

const pares = ArrayBuscador.filtrar(numeros, (n) => n % 2 === 0);
console.log("Números pares:", pares);

const maiorQue4 = ArrayBuscador.encontrar(numeros, (n) => n > 4);
console.log("Primeiro maior que 4:", maiorQue4);

console.log("Algum maior que 7:", ArrayBuscador.algum(numeros, (n) => n > 7));
console.log("Todos menores que 10:", ArrayBuscador.todos(numeros, (n) => n < 10));

// Teste 3: Transformações
console.log("\n--- TRANSFORMAÇÕES ---");
const originais = [1, 2, 3, 4];
console.log("Array original:", originais);

const dobrados = ArrayTransformador.mapear(originais, (n) => n * 2);
console.log("Dobrados:", dobrados);

const soma = ArrayTransformador.reduzir(originais, (acc, curr) => acc + curr, 0);
console.log("Soma usando reduce:", soma);

const comDuplicados = [1, 2, 2, 3, 3, 3, 4];
console.log("Com duplicados:", comDuplicados);
const semDuplicados = ArrayTransformador.removerDuplicados(comDuplicados);
console.log("Sem duplicados:", semDuplicados);

const aninhado = [1, [2, 3], 4, [5, 6]];
console.log("Array aninhado:", aninhado);
const achatado = ArrayTransformador.achatar(aninhado);
console.log("Achatado:", achatado);

// Agrupamento por paridade
const agrupados = ArrayTransformador.agruparPor(originais, (n) => n % 2 === 0 ? 'par' : 'impar');
console.log("Agrupados por paridade:", agrupados);

// Teste 4: Operações Matemáticas
console.log("\n--- OPERAÇÕES MATEMÁTICAS ---");
const valores = [4, 2, 8, 1, 9, 3];
console.log("Valores:", valores);
console.log("Soma:", ArrayMatematico.soma(valores));
console.log("Média:", ArrayMatematico.media(valores));
console.log("Mínimo:", ArrayMatematico.minimo(valores));
console.log("Máximo:", ArrayMatematico.maximo(valores));
console.log("Mediana:", ArrayMatematico.mediana(valores));
console.log("Produto:", ArrayMatematico.produto([1, 2, 3, 4]));

// Teste 5: Casos Práticos
console.log("\n--- CASOS PRÁTICOS ---");

// Implementar função que encontra segundo maior número
function segundoMaior(numeros: number[]): number | null {
    if (numeros.length < 2) return null;
    
    let maior = numeros[0];
    let segundoMaior = -Infinity;
    
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > maior) {
            segundoMaior = maior;
            maior = numeros[i];
        } else if (numeros[i] > segundoMaior && numeros[i] < maior) {
            segundoMaior = numeros[i];
        }
    }
    
    return segundoMaior === -Infinity ? null : segundoMaior;
}

const testeMaior = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("Array:", testeMaior);
console.log("Segundo maior:", segundoMaior(testeMaior));

// Rotacionar array para a direita
function rotacionarDireita<T>(array: T[], posicoes: number): T[] {
    if (array.length === 0 || posicoes === 0) return [...array];
    
    const tamanho = array.length;
    const rotacao = posicoes % tamanho;
    
    const resultado: T[] = [];
    
    // Copia elementos da parte final
    for (let i = 0; i < rotacao; i++) {
        resultado[i] = array[tamanho - rotacao + i];
    }
    
    // Copia elementos do início
    for (let i = 0; i < tamanho - rotacao; i++) {
        resultado[rotacao + i] = array[i];
    }
    
    return resultado;
}

const paraRotacionar = [1, 2, 3, 4, 5];
console.log("Original:", paraRotacionar);
console.log("Rotacionado 2 posições à direita:", rotacionarDireita(paraRotacionar, 2));

export { ArrayManipulador, ArrayBuscador, ArrayTransformador, ArrayMatematico };
