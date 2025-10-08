/**
 * EXERCÍCIO AVANÇADO 2 - PROGRAMAÇÃO DINÂMICA
 * 
 * Implementa algoritmos clássicos de programação dinâmica para otimização.
 * Foca em problemas de subsequências, caminhos e otimização combinatória.
 * Demonstra técnicas de memoização e bottom-up sem métodos nativos.
 */

class ProgramacaoDinamica {
    
    /**
     * FIBONACCI com memoização - O(n)
     * Clássico exemplo de programação dinâmica
     */
    public static fibonacci(n: number): number {
        if (n < 0) return 0;
        if (n <= 1) return n;
        
        const memo: number[] = [];
        memo[0] = 0;
        memo[1] = 1;
        
        for (let i = 2; i <= n; i++) {
            memo[i] = memo[i - 1] + memo[i - 2];
        }
        
        return memo[n];
    }
    
    /**
     * FIBONACCI com memoização recursiva
     */
    public static fibonacciMemo(n: number, memo: number[] = []): number {
        if (n < 0) return 0;
        if (n <= 1) return n;
        
        if (memo[n] !== undefined) {
            return memo[n];
        }
        
        memo[n] = this.fibonacciMemo(n - 1, memo) + this.fibonacciMemo(n - 2, memo);
        return memo[n];
    }
    
    /**
     * MAIOR SUBSEQUÊNCIA COMUM (LCS) - O(m*n)
     * Encontra a maior subsequência comum entre duas strings
     */
    public static lcs(str1: string, str2: string): {
        tamanho: number;
        subsequencia: string;
        tabela: number[][];
    } {
        const m = str1.length;
        const n = str2.length;
        const dp: number[][] = [];
        
        // Inicializa tabela DP
        for (let i = 0; i <= m; i++) {
            dp[i] = [];
            for (let j = 0; j <= n; j++) {
                dp[i][j] = 0;
            }
        }
        
        // Preenche tabela
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
                }
            }
        }
        
        // Reconstrói LCS
        const lcsStr = this.reconstruirLCS(str1, str2, dp);
        
        return {
            tamanho: dp[m][n],
            subsequencia: lcsStr,
            tabela: dp
        };
    }
    
    private static reconstruirLCS(str1: string, str2: string, dp: number[][]): string {
        let i = str1.length;
        let j = str2.length;
        const resultado: string[] = [];
        
        while (i > 0 && j > 0) {
            if (str1[i - 1] === str2[j - 1]) {
                resultado[resultado.length] = str1[i - 1];
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        
        // Inverte resultado
        let lcs = "";
        for (let k = resultado.length - 1; k >= 0; k--) {
            lcs += resultado[k];
        }
        
        return lcs;
    }
    
    /**
     * PROBLEMA DA MOCHILA 0/1 - O(n*W)
     * Maximiza valor em mochila com capacidade limitada
     */
    public static mochila01(pesos: number[], valores: number[], capacidade: number): {
        valorMaximo: number;
        itensEscolhidos: boolean[];
        tabela: number[][];
    } {
        const n = pesos.length;
        const dp: number[][] = [];
        
        // Inicializa tabela DP
        for (let i = 0; i <= n; i++) {
            dp[i] = [];
            for (let w = 0; w <= capacidade; w++) {
                dp[i][w] = 0;
            }
        }
        
        // Preenche tabela
        for (let i = 1; i <= n; i++) {
            for (let w = 1; w <= capacidade; w++) {
                if (pesos[i - 1] <= w) {
                    const incluir = valores[i - 1] + dp[i - 1][w - pesos[i - 1]];
                    const naoIncluir = dp[i - 1][w];
                    dp[i][w] = incluir > naoIncluir ? incluir : naoIncluir;
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        
        // Reconstrói solução
        const itens = this.reconstruirMochila(dp, pesos, capacidade);
        
        return {
            valorMaximo: dp[n][capacidade],
            itensEscolhidos: itens,
            tabela: dp
        };
    }
    
    private static reconstruirMochila(dp: number[][], pesos: number[], capacidade: number): boolean[] {
        const n = pesos.length;
        const escolhidos: boolean[] = [];
        
        // Inicializa array
        for (let i = 0; i < n; i++) {
            escolhidos[i] = false;
        }
        
        let i = n;
        let w = capacidade;
        
        while (i > 0 && w > 0) {
            if (dp[i][w] !== dp[i - 1][w]) {
                escolhidos[i - 1] = true;
                w -= pesos[i - 1];
            }
            i--;
        }
        
        return escolhidos;
    }
    
    /**
     * DISTÂNCIA DE EDIÇÃO (Levenshtein) - O(m*n)
     * Calcula número mínimo de operações para transformar uma string em outra
     */
    public static distanciaEdicao(str1: string, str2: string): {
        distancia: number;
        operacoes: string[];
        tabela: number[][];
    } {
        const m = str1.length;
        const n = str2.length;
        const dp: number[][] = [];
        
        // Inicializa tabela
        for (let i = 0; i <= m; i++) {
            dp[i] = [];
            for (let j = 0; j <= n; j++) {
                if (i === 0) {
                    dp[i][j] = j; // Inserir j caracteres
                } else if (j === 0) {
                    dp[i][j] = i; // Deletar i caracteres
                } else {
                    dp[i][j] = 0;
                }
            }
        }
        
        // Preenche tabela
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1]; // Nenhuma operação
                } else {
                    const substituir = dp[i - 1][j - 1] + 1;
                    const deletar = dp[i - 1][j] + 1;
                    const inserir = dp[i][j - 1] + 1;
                    
                    dp[i][j] = Math.min(substituir, Math.min(deletar, inserir));
                }
            }
        }
        
        const operacoes = this.reconstruirEdicao(str1, str2, dp);
        
        return {
            distancia: dp[m][n],
            operacoes: operacoes,
            tabela: dp
        };
    }
    
    private static reconstruirEdicao(str1: string, str2: string, dp: number[][]): string[] {
        const operacoes: string[] = [];
        let i = str1.length;
        let j = str2.length;
        
        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && str1[i - 1] === str2[j - 1]) {
                i--;
                j--;
            } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
                operacoes[operacoes.length] = `Substituir '${str1[i - 1]}' por '${str2[j - 1]}' na posição ${i - 1}`;
                i--;
                j--;
            } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
                operacoes[operacoes.length] = `Deletar '${str1[i - 1]}' na posição ${i - 1}`;
                i--;
            } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
                operacoes[operacoes.length] = `Inserir '${str2[j - 1]}' na posição ${i}`;
                j--;
            }
        }
        
        // Inverte para ordem correta
        const operacoesCorretas: string[] = [];
        for (let k = operacoes.length - 1; k >= 0; k--) {
            operacoesCorretas[operacoesCorretas.length] = operacoes[k];
        }
        
        return operacoesCorretas;
    }
    
    /**
     * MAIOR SUBSEQUÊNCIA CRESCENTE (LIS) - O(n²)
     * Encontra a maior subsequência estritamente crescente
     */
    public static lis(array: number[]): {
        tamanho: number;
        subsequencia: number[];
        indices: number[];
    } {
        const n = array.length;
        if (n === 0) {
            return { tamanho: 0, subsequencia: [], indices: [] };
        }
        
        const dp: number[] = [];
        const anterior: number[] = [];
        
        // Inicializa arrays
        for (let i = 0; i < n; i++) {
            dp[i] = 1;
            anterior[i] = -1;
        }
        
        // Calcula LIS
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (array[j] < array[i] && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    anterior[i] = j;
                }
            }
        }
        
        // Encontra índice com maior LIS
        let maxIndex = 0;
        for (let i = 1; i < n; i++) {
            if (dp[i] > dp[maxIndex]) {
                maxIndex = i;
            }
        }
        
        // Reconstrói subsequência
        const subsequencia: number[] = [];
        const indices: number[] = [];
        let atual = maxIndex;
        
        while (atual !== -1) {
            subsequencia[subsequencia.length] = array[atual];
            indices[indices.length] = atual;
            atual = anterior[atual];
        }
        
        // Inverte para ordem correta
        const subseqCorreta: number[] = [];
        const indicesCorretos: number[] = [];
        
        for (let i = subsequencia.length - 1; i >= 0; i--) {
            subseqCorreta[subseqCorreta.length] = subsequencia[i];
            indicesCorretos[indicesCorretos.length] = indices[i];
        }
        
        return {
            tamanho: dp[maxIndex],
            subsequencia: subseqCorreta,
            indices: indicesCorretos
        };
    }
    
    /**
     * NÚMERO DE CAMINHOS EM MATRIZ - O(m*n)
     * Conta caminhos de (0,0) para (m-1,n-1) movendo apenas direita/baixo
     */
    public static contarCaminhos(m: number, n: number, obstaculos?: boolean[][]): number {
        const dp: number[][] = [];
        
        // Inicializa tabela
        for (let i = 0; i < m; i++) {
            dp[i] = [];
            for (let j = 0; j < n; j++) {
                dp[i][j] = 0;
            }
        }
        
        // Caso base
        dp[0][0] = (obstaculos && obstaculos[0][0]) ? 0 : 1;
        
        // Preenche primeira linha
        for (let j = 1; j < n; j++) {
            if (obstaculos && obstaculos[0][j]) {
                dp[0][j] = 0;
            } else {
                dp[0][j] = dp[0][j - 1];
            }
        }
        
        // Preenche primeira coluna
        for (let i = 1; i < m; i++) {
            if (obstaculos && obstaculos[i][0]) {
                dp[i][0] = 0;
            } else {
                dp[i][0] = dp[i - 1][0];
            }
        }
        
        // Preenche resto da tabela
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                if (obstaculos && obstaculos[i][j]) {
                    dp[i][j] = 0;
                } else {
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
        }
        
        return dp[m - 1][n - 1];
    }
    
    /**
     * SOMA MÁXIMA DE SUBARRAY (Kadane's Algorithm) - O(n)
     * Versão DP do algoritmo de Kadane
     */
    public static somaMaximaSubarray(array: number[]): {
        somaMaxima: number;
        inicio: number;
        fim: number;
        subarray: number[];
    } {
        if (array.length === 0) {
            return { somaMaxima: 0, inicio: 0, fim: 0, subarray: [] };
        }
        
        let somaMaxima = array[0];
        let somaAtual = array[0];
        let inicio = 0;
        let fim = 0;
        let inicioTemp = 0;
        
        for (let i = 1; i < array.length; i++) {
            if (somaAtual < 0) {
                somaAtual = array[i];
                inicioTemp = i;
            } else {
                somaAtual += array[i];
            }
            
            if (somaAtual > somaMaxima) {
                somaMaxima = somaAtual;
                inicio = inicioTemp;
                fim = i;
            }
        }
        
        // Constrói subarray resultado
        const subarray: number[] = [];
        for (let i = inicio; i <= fim; i++) {
            subarray[subarray.length] = array[i];
        }
        
        return {
            somaMaxima: somaMaxima,
            inicio: inicio,
            fim: fim,
            subarray: subarray
        };
    }
}

/**
 * Classe com problemas avançados de programação dinâmica
 */
class ProblemasAvancados {
    
    /**
     * Problema das moedas - menor número de moedas para fazer troco
     */
    public static problemaMoedas(moedas: number[], valor: number): {
        numMoedas: number;
        moedas: number[];
    } {
        const dp: number[] = [];
        const escolha: number[] = [];
        
        // Inicializa arrays
        for (let i = 0; i <= valor; i++) {
            dp[i] = Number.MAX_SAFE_INTEGER;
            escolha[i] = -1;
        }
        
        dp[0] = 0;
        
        // Calcula mínimo de moedas
        for (let i = 1; i <= valor; i++) {
            for (let j = 0; j < moedas.length; j++) {
                const moeda = moedas[j];
                if (moeda <= i && dp[i - moeda] + 1 < dp[i]) {
                    dp[i] = dp[i - moeda] + 1;
                    escolha[i] = j;
                }
            }
        }
        
        // Reconstrói solução
        const moedasUsadas: number[] = [];
        let valorAtual = valor;
        
        while (valorAtual > 0 && escolha[valorAtual] !== -1) {
            const indiceMoeda = escolha[valorAtual];
            const moeda = moedas[indiceMoeda];
            moedasUsadas[moedasUsadas.length] = moeda;
            valorAtual -= moeda;
        }
        
        return {
            numMoedas: dp[valor] === Number.MAX_SAFE_INTEGER ? -1 : dp[valor],
            moedas: moedasUsadas
        };
    }
    
    /**
     * Particionamento de array em subconjuntos com soma igual
     */
    public static particaoIgual(array: number[]): boolean {
        let soma = 0;
        for (let i = 0; i < array.length; i++) {
            soma += array[i];
        }
        
        if (soma % 2 !== 0) {
            return false; // Soma ímpar não pode ser particionada igualmente
        }
        
        const alvo = soma / 2;
        const dp: boolean[] = [];
        
        // Inicializa DP
        for (let i = 0; i <= alvo; i++) {
            dp[i] = false;
        }
        dp[0] = true;
        
        // Processa cada elemento
        for (let i = 0; i < array.length; i++) {
            const num = array[i];
            
            // Processa de trás para frente para evitar usar o mesmo elemento duas vezes
            for (let j = alvo; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        
        return dp[alvo];
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO AVANÇADO 2 - PROGRAMAÇÃO DINÂMICA ===");

// Teste 1: Fibonacci
console.log("--- FIBONACCI ---");
const fibN = 20;
console.log(`Fibonacci(${fibN}) iterativo:`, ProgramacaoDinamica.fibonacci(fibN));
console.log(`Fibonacci(${fibN}) memoização:`, ProgramacaoDinamica.fibonacciMemo(fibN));

// Teste 2: Maior Subsequência Comum (LCS)
console.log("\n--- MAIOR SUBSEQUÊNCIA COMUM (LCS) ---");
const str1 = "ABCDGH";
const str2 = "AEDFHR";
const lcsResult = ProgramacaoDinamica.lcs(str1, str2);
console.log(`LCS("${str1}", "${str2}"):`);
console.log("Tamanho:", lcsResult.tamanho);
console.log("Subsequência:", lcsResult.subsequencia);

// Teste 3: Problema da Mochila 0/1
console.log("\n--- PROBLEMA DA MOCHILA 0/1 ---");
const pesos = [1, 3, 4, 5];
const valores = [1, 4, 5, 7];
const capacidade = 7;
const mochilaResult = ProgramacaoDinamica.mochila01(pesos, valores, capacidade);
console.log(`Mochila - Capacidade: ${capacidade}`);
console.log("Pesos:", pesos);
console.log("Valores:", valores);
console.log("Valor máximo:", mochilaResult.valorMaximo);
console.log("Itens escolhidos:");
for (let i = 0; i < mochilaResult.itensEscolhidos.length; i++) {
    if (mochilaResult.itensEscolhidos[i]) {
        console.log(`  Item ${i}: peso=${pesos[i]}, valor=${valores[i]}`);
    }
}

// Teste 4: Distância de Edição
console.log("\n--- DISTÂNCIA DE EDIÇÃO ---");
const word1 = "kitten";
const word2 = "sitting";
const editResult = ProgramacaoDinamica.distanciaEdicao(word1, word2);
console.log(`Distância entre "${word1}" e "${word2}":`, editResult.distancia);
console.log("Operações necessárias:");
for (let i = 0; i < editResult.operacoes.length; i++) {
    console.log(`  ${i + 1}. ${editResult.operacoes[i]}`);
}

// Teste 5: Maior Subsequência Crescente (LIS)
console.log("\n--- MAIOR SUBSEQUÊNCIA CRESCENTE (LIS) ---");
const arrayLIS = [10, 9, 2, 5, 3, 7, 101, 18];
const lisResult = ProgramacaoDinamica.lis(arrayLIS);
console.log("Array:", arrayLIS);
console.log("LIS tamanho:", lisResult.tamanho);
console.log("LIS subsequência:", lisResult.subsequencia);
console.log("Índices:", lisResult.indices);

// Teste 6: Contar Caminhos
console.log("\n--- CONTAR CAMINHOS EM MATRIZ ---");
const matrizM = 3, matrizN = 4;
const caminhos = ProgramacaoDinamica.contarCaminhos(matrizM, matrizN);
console.log(`Caminhos em matriz ${matrizM}x${matrizN}:`, caminhos);

// Com obstáculos
const obstaculos = [
    [false, false, false, false],
    [false, true, false, false],
    [false, false, false, false]
];
const caminhosComObstaculos = ProgramacaoDinamica.contarCaminhos(matrizM, matrizN, obstaculos);
console.log("Com obstáculos:", caminhosComObstaculos);

// Teste 7: Soma Máxima de Subarray
console.log("\n--- SOMA MÁXIMA DE SUBARRAY ---");
const arrayKadane = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const kadaneResult = ProgramacaoDinamica.somaMaximaSubarray(arrayKadane);
console.log("Array:", arrayKadane);
console.log("Soma máxima:", kadaneResult.somaMaxima);
console.log("Subarray:", kadaneResult.subarray);
console.log(`Posições: ${kadaneResult.inicio} a ${kadaneResult.fim}`);

// Teste 8: Problemas Avançados
console.log("\n--- PROBLEMAS AVANÇADOS ---");

// Problema das moedas
const moedas = [1, 3, 4];
const valorTroco = 6;
const moedaResult = ProblemasAvancados.problemaMoedas(moedas, valorTroco);
console.log(`Menor troco para ${valorTroco} com moedas [${moedas.join(", ")}]:`);
console.log("Número de moedas:", moedaResult.numMoedas);
console.log("Moedas usadas:", moedaResult.moedas);

// Partição igual
const arrayParticao = [1, 5, 11, 5];
const podeParticionar = ProblemasAvancados.particaoIgual(arrayParticao);
console.log(`Array [${arrayParticao.join(", ")}] pode ser particionado igualmente:`, podeParticionar);

export { ProgramacaoDinamica, ProblemasAvancados };
