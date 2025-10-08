/**
 * EXERCÍCIO AVANÇADO 4 - ALGORITMOS DE OTIMIZAÇÃO E BUSCA
 * 
 * Implementa algoritmos avançados de otimização como backtracking,
 * branch and bound, e heurísticas. Resolve problemas clássicos como
 * N-Queens, Sudoku, Traveling Salesman e outros problemas NP.
 */

/**
 * Classe para resolver o problema das N-Rainhas usando backtracking
 */
class NRainhas {
    private tamanhoTabuleiro: number;
    private solucoes: number[][];

    constructor(n: number) {
        this.tamanhoTabuleiro = n;
        this.solucoes = [];
    }

    /**
     * Encontra todas as soluções possíveis
     */
    public resolverTodas(): number[][] {
        this.solucoes = [];
        const tabuleiro: number[] = [];
        
        // Inicializa tabuleiro
        for (let i = 0; i < this.tamanhoTabuleiro; i++) {
            tabuleiro[i] = -1;
        }
        
        this.backtrackTodas(tabuleiro, 0);
        return this.solucoes;
    }

    /**
     * Encontra uma solução
     */
    public resolverUma(): number[] | null {
        const tabuleiro: number[] = [];
        
        for (let i = 0; i < this.tamanhoTabuleiro; i++) {
            tabuleiro[i] = -1;
        }
        
        if (this.backtrackUma(tabuleiro, 0)) {
            return tabuleiro;
        }
        
        return null;
    }

    private backtrackTodas(tabuleiro: number[], linha: number): void {
        if (linha === this.tamanhoTabuleiro) {
            // Solução encontrada - adiciona cópia
            const solucao: number[] = [];
            for (let i = 0; i < this.tamanhoTabuleiro; i++) {
                solucao[i] = tabuleiro[i];
            }
            this.solucoes[this.solucoes.length] = solucao;
            return;
        }

        for (let coluna = 0; coluna < this.tamanhoTabuleiro; coluna++) {
            if (this.ehSeguro(tabuleiro, linha, coluna)) {
                tabuleiro[linha] = coluna;
                this.backtrackTodas(tabuleiro, linha + 1);
                tabuleiro[linha] = -1; // Backtrack
            }
        }
    }

    private backtrackUma(tabuleiro: number[], linha: number): boolean {
        if (linha === this.tamanhoTabuleiro) {
            return true; // Solução encontrada
        }

        for (let coluna = 0; coluna < this.tamanhoTabuleiro; coluna++) {
            if (this.ehSeguro(tabuleiro, linha, coluna)) {
                tabuleiro[linha] = coluna;
                
                if (this.backtrackUma(tabuleiro, linha + 1)) {
                    return true;
                }
                
                tabuleiro[linha] = -1; // Backtrack
            }
        }

        return false;
    }

    private ehSeguro(tabuleiro: number[], linha: number, coluna: number): boolean {
        for (let i = 0; i < linha; i++) {
            // Verifica mesma coluna ou diagonal
            if (tabuleiro[i] === coluna || 
                Math.abs(tabuleiro[i] - coluna) === Math.abs(i - linha)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Visualiza solução como tabuleiro
     */
    public visualizarSolucao(solucao: number[]): string {
        let resultado = "";
        
        for (let linha = 0; linha < this.tamanhoTabuleiro; linha++) {
            for (let coluna = 0; coluna < this.tamanhoTabuleiro; coluna++) {
                if (solucao[linha] === coluna) {
                    resultado += "♛ ";
                } else {
                    resultado += ". ";
                }
            }
            resultado += "\n";
        }
        
        return resultado;
    }
}

/**
 * Classe para resolver Sudoku usando backtracking
 */
class SudokuSolver {
    private tabuleiro: number[][];
    private tamanho: number;

    constructor(tabuleiro: number[][]) {
        this.tamanho = 9;
        this.tabuleiro = [];
        
        // Copia tabuleiro
        for (let i = 0; i < this.tamanho; i++) {
            this.tabuleiro[i] = [];
            for (let j = 0; j < this.tamanho; j++) {
                this.tabuleiro[i][j] = tabuleiro[i][j];
            }
        }
    }

    /**
     * Resolve o Sudoku
     */
    public resolver(): boolean {
        return this.backtrackSudoku();
    }

    private backtrackSudoku(): boolean {
        const posicaoVazia = this.encontrarVazia();
        
        if (posicaoVazia === null) {
            return true; // Sudoku resolvido
        }

        const linha = posicaoVazia.linha;
        const coluna = posicaoVazia.coluna;

        for (let num = 1; num <= 9; num++) {
            if (this.ehValidoSudoku(linha, coluna, num)) {
                this.tabuleiro[linha][coluna] = num;

                if (this.backtrackSudoku()) {
                    return true;
                }

                this.tabuleiro[linha][coluna] = 0; // Backtrack
            }
        }

        return false;
    }

    private encontrarVazia(): { linha: number; coluna: number } | null {
        for (let linha = 0; linha < this.tamanho; linha++) {
            for (let coluna = 0; coluna < this.tamanho; coluna++) {
                if (this.tabuleiro[linha][coluna] === 0) {
                    return { linha: linha, coluna: coluna };
                }
            }
        }
        return null;
    }

    private ehValidoSudoku(linha: number, coluna: number, num: number): boolean {
        // Verifica linha
        for (let j = 0; j < this.tamanho; j++) {
            if (this.tabuleiro[linha][j] === num) {
                return false;
            }
        }

        // Verifica coluna
        for (let i = 0; i < this.tamanho; i++) {
            if (this.tabuleiro[i][coluna] === num) {
                return false;
            }
        }

        // Verifica caixa 3x3
        const startRow = Math.floor(linha / 3) * 3;
        const startCol = Math.floor(coluna / 3) * 3;

        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (this.tabuleiro[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    public getTabuleiro(): number[][] {
        const copia: number[][] = [];
        for (let i = 0; i < this.tamanho; i++) {
            copia[i] = [];
            for (let j = 0; j < this.tamanho; j++) {
                copia[i][j] = this.tabuleiro[i][j];
            }
        }
        return copia;
    }

    /**
     * Visualiza o tabuleiro
     */
    public visualizar(): string {
        let resultado = "";
        
        for (let i = 0; i < this.tamanho; i++) {
            if (i % 3 === 0 && i !== 0) {
                resultado += "------+-------+------\n";
            }
            
            for (let j = 0; j < this.tamanho; j++) {
                if (j % 3 === 0 && j !== 0) {
                    resultado += "| ";
                }
                
                if (this.tabuleiro[i][j] === 0) {
                    resultado += ". ";
                } else {
                    resultado += this.tabuleiro[i][j] + " ";
                }
            }
            resultado += "\n";
        }
        
        return resultado;
    }
}

/**
 * Classe para resolver o Problema do Caixeiro Viajante (TSP)
 * usando diferentes abordagens
 */
class CaixeiroViajante {
    private distancias: number[][];
    private numCidades: number;

    constructor(distancias: number[][]) {
        this.numCidades = distancias.length;
        this.distancias = [];
        
        // Copia matriz de distâncias
        for (let i = 0; i < this.numCidades; i++) {
            this.distancias[i] = [];
            for (let j = 0; j < this.numCidades; j++) {
                this.distancias[i][j] = distancias[i][j];
            }
        }
    }

    /**
     * Solução por força bruta (apenas para pequenos n)
     */
    public forcaBruta(): { caminho: number[]; distancia: number } {
        const cidades: number[] = [];
        for (let i = 1; i < this.numCidades; i++) {
            cidades[i - 1] = i;
        }

        let melhorCaminho: number[] = [];
        let melhorDistancia = Number.MAX_SAFE_INTEGER;

        this.gerarPermutacoes(cidades, 0, (permutacao: number[]) => {
            const caminho = [0, ...permutacao, 0];
            const distancia = this.calcularDistancia(caminho);
            
            if (distancia < melhorDistancia) {
                melhorDistancia = distancia;
                melhorCaminho = [...caminho];
            }
        });

        return { caminho: melhorCaminho, distancia: melhorDistancia };
    }

    /**
     * Algoritmo guloso (heurística do vizinho mais próximo)
     */
    public vizinhoMaisProximo(cidadeInicial: number = 0): { caminho: number[]; distancia: number } {
        const visitadas: boolean[] = [];
        const caminho: number[] = [];
        
        for (let i = 0; i < this.numCidades; i++) {
            visitadas[i] = false;
        }

        let cidadeAtual = cidadeInicial;
        visitadas[cidadeAtual] = true;
        caminho[caminho.length] = cidadeAtual;

        for (let i = 0; i < this.numCidades - 1; i++) {
            let proximaCidade = -1;
            let menorDistancia = Number.MAX_SAFE_INTEGER;

            for (let j = 0; j < this.numCidades; j++) {
                if (!visitadas[j] && this.distancias[cidadeAtual][j] < menorDistancia) {
                    menorDistancia = this.distancias[cidadeAtual][j];
                    proximaCidade = j;
                }
            }

            visitadas[proximaCidade] = true;
            caminho[caminho.length] = proximaCidade;
            cidadeAtual = proximaCidade;
        }

        // Volta para cidade inicial
        caminho[caminho.length] = cidadeInicial;

        return {
            caminho: caminho,
            distancia: this.calcularDistancia(caminho)
        };
    }

    /**
     * Otimização 2-opt
     */
    public melhorar2Opt(caminhoInicial: number[]): { caminho: number[]; distancia: number } {
        let caminho = [...caminhoInicial];
        let melhorou = true;

        while (melhorou) {
            melhorou = false;
            
            for (let i = 1; i < caminho.length - 2; i++) {
                for (let j = i + 1; j < caminho.length - 1; j++) {
                    const novoCaminho = this.swap2Opt(caminho, i, j);
                    const novaDistancia = this.calcularDistancia(novoCaminho);
                    const distanciaAtual = this.calcularDistancia(caminho);
                    
                    if (novaDistancia < distanciaAtual) {
                        caminho = novoCaminho;
                        melhorou = true;
                    }
                }
            }
        }

        return {
            caminho: caminho,
            distancia: this.calcularDistancia(caminho)
        };
    }

    private swap2Opt(caminho: number[], i: number, j: number): number[] {
        const novoCaminho = [...caminho];
        
        // Inverte segmento entre i e j
        while (i < j) {
            const temp = novoCaminho[i];
            novoCaminho[i] = novoCaminho[j];
            novoCaminho[j] = temp;
            i++;
            j--;
        }
        
        return novoCaminho;
    }

    private calcularDistancia(caminho: number[]): number {
        let distanciaTotal = 0;
        
        for (let i = 0; i < caminho.length - 1; i++) {
            distanciaTotal += this.distancias[caminho[i]][caminho[i + 1]];
        }
        
        return distanciaTotal;
    }

    private gerarPermutacoes(array: number[], inicio: number, callback: (permutacao: number[]) => void): void {
        if (inicio === array.length) {
            callback([...array]);
            return;
        }

        for (let i = inicio; i < array.length; i++) {
            // Swap
            const temp = array[inicio];
            array[inicio] = array[i];
            array[i] = temp;

            this.gerarPermutacoes(array, inicio + 1, callback);

            // Swap back (backtrack)
            array[i] = array[inicio];
            array[inicio] = temp;
        }
    }
}

/**
 * Classe para resolver o problema da Mochila com Branch and Bound
 */
class MochilaBranchBound {
    private pesos: number[];
    private valores: number[];
    private capacidade: number;
    private numItens: number;

    constructor(pesos: number[], valores: number[], capacidade: number) {
        this.pesos = pesos;
        this.valores = valores;
        this.capacidade = capacidade;
        this.numItens = pesos.length;
    }

    /**
     * Resolve usando Branch and Bound
     */
    public resolver(): { valorMaximo: number; itensEscolhidos: boolean[] } {
        // Ordena itens por valor/peso (ratio)
        const indices = this.ordenarPorRatio();
        
        let melhorValor = 0;
        let melhorSolucao: boolean[] = [];
        
        for (let i = 0; i < this.numItens; i++) {
            melhorSolucao[i] = false;
        }

        const solucaoAtual: boolean[] = [];
        for (let i = 0; i < this.numItens; i++) {
            solucaoAtual[i] = false;
        }

        this.branchAndBound(indices, 0, 0, 0, solucaoAtual, melhorSolucao, { valor: melhorValor });

        return {
            valorMaximo: melhorSolucao.reduce((total, escolhido, i) => 
                total + (escolhido ? this.valores[i] : 0), 0),
            itensEscolhidos: melhorSolucao
        };
    }

    private branchAndBound(
        indices: number[], 
        nivel: number, 
        pesoAtual: number, 
        valorAtual: number,
        solucaoAtual: boolean[],
        melhorSolucao: boolean[],
        melhorValor: { valor: number }
    ): void {
        if (nivel === this.numItens) {
            if (valorAtual > melhorValor.valor) {
                melhorValor.valor = valorAtual;
                for (let i = 0; i < this.numItens; i++) {
                    melhorSolucao[i] = solucaoAtual[i];
                }
            }
            return;
        }

        const item = indices[nivel];
        
        // Calcula upper bound
        const upperBound = this.calcularUpperBound(indices, nivel, pesoAtual, valorAtual);
        
        if (upperBound <= melhorValor.valor) {
            return; // Poda (bound)
        }

        // Inclui item se cabe
        if (pesoAtual + this.pesos[item] <= this.capacidade) {
            solucaoAtual[item] = true;
            this.branchAndBound(
                indices, 
                nivel + 1, 
                pesoAtual + this.pesos[item], 
                valorAtual + this.valores[item],
                solucaoAtual,
                melhorSolucao,
                melhorValor
            );
            solucaoAtual[item] = false;
        }

        // Não inclui item
        this.branchAndBound(
            indices, 
            nivel + 1, 
            pesoAtual, 
            valorAtual,
            solucaoAtual,
            melhorSolucao,
            melhorValor
        );
    }

    private calcularUpperBound(indices: number[], nivel: number, pesoAtual: number, valorAtual: number): number {
        let peso = pesoAtual;
        let valor = valorAtual;

        for (let i = nivel; i < this.numItens; i++) {
            const item = indices[i];
            
            if (peso + this.pesos[item] <= this.capacidade) {
                peso += this.pesos[item];
                valor += this.valores[item];
            } else {
                // Fração do item restante
                const fracao = (this.capacidade - peso) / this.pesos[item];
                valor += fracao * this.valores[item];
                break;
            }
        }

        return valor;
    }

    private ordenarPorRatio(): number[] {
        const indices: number[] = [];
        const ratios: number[] = [];

        for (let i = 0; i < this.numItens; i++) {
            indices[i] = i;
            ratios[i] = this.valores[i] / this.pesos[i];
        }

        // Ordenação por inserção baseada no ratio
        for (let i = 1; i < this.numItens; i++) {
            const chaveIndice = indices[i];
            const chaveRatio = ratios[i];
            let j = i - 1;

            while (j >= 0 && ratios[j] < chaveRatio) {
                indices[j + 1] = indices[j];
                ratios[j + 1] = ratios[j];
                j--;
            }

            indices[j + 1] = chaveIndice;
            ratios[j + 1] = chaveRatio;
        }

        return indices;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO AVANÇADO 4 - ALGORITMOS DE OTIMIZAÇÃO E BUSCA ===");

// Teste 1: N-Rainhas
console.log("--- PROBLEMA DAS N-RAINHAS ---");
const nRainhas = new NRainhas(4);
const solucao4Rainhas = nRainhas.resolverUma();

if (solucao4Rainhas) {
    console.log("Solução para 4-Rainhas:");
    console.log("Posições:", solucao4Rainhas);
    console.log("Tabuleiro:");
    console.log(nRainhas.visualizarSolucao(solucao4Rainhas));
}

console.log("Número de soluções para 4-Rainhas:", nRainhas.resolverTodas().length);

// Teste com 8-Rainhas (apenas primeira solução)
const nRainhas8 = new NRainhas(8);
const solucao8 = nRainhas8.resolverUma();
if (solucao8) {
    console.log("Primeira solução para 8-Rainhas encontrada!");
    console.log("Posições:", solucao8);
}

// Teste 2: Sudoku
console.log("\n--- SUDOKU ---");
const sudokuPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const sudokuSolver = new SudokuSolver(sudokuPuzzle);
console.log("Sudoku inicial:");
console.log(sudokuSolver.visualizar());

const resolvido = sudokuSolver.resolver();
console.log("Sudoku resolvido:", resolvido);

if (resolvido) {
    console.log("Solução:");
    console.log(sudokuSolver.visualizar());
}

// Teste 3: Caixeiro Viajante
console.log("\n--- CAIXEIRO VIAJANTE ---");
const distanciasTSP = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
];

const tsp = new CaixeiroViajante(distanciasTSP);

// Heurística do vizinho mais próximo
const resultadoGuloso = tsp.vizinhoMaisProximo(0);
console.log("Vizinho mais próximo:");
console.log("Caminho:", resultadoGuloso.caminho);
console.log("Distância:", resultadoGuloso.distancia);

// Melhoria com 2-opt
const resultadoMelhorado = tsp.melhorar2Opt(resultadoGuloso.caminho);
console.log("Após 2-opt:");
console.log("Caminho:", resultadoMelhorado.caminho);
console.log("Distância:", resultadoMelhorado.distancia);

// Força bruta (apenas para 4 cidades)
console.log("Força bruta:");
const resultadoOtimo = tsp.forcaBruta();
console.log("Caminho ótimo:", resultadoOtimo.caminho);
console.log("Distância ótima:", resultadoOtimo.distancia);

// Teste 4: Mochila com Branch and Bound
console.log("\n--- MOCHILA BRANCH AND BOUND ---");
const pesosMochila = [2, 3, 4, 5];
const valoresMochila = [3, 4, 5, 6];
const capacidadeMochila = 8;

const mochilaBB = new MochilaBranchBound(pesosMochila, valoresMochila, capacidadeMochila);
const resultadoMochila = mochilaBB.resolver();

console.log("Pesos:", pesosMochila);
console.log("Valores:", valoresMochila);
console.log("Capacidade:", capacidadeMochila);
console.log("Valor máximo:", resultadoMochila.valorMaximo);
console.log("Itens escolhidos:");
for (let i = 0; i < resultadoMochila.itensEscolhidos.length; i++) {
    if (resultadoMochila.itensEscolhidos[i]) {
        console.log(`  Item ${i}: peso=${pesosMochila[i]}, valor=${valoresMochila[i]}`);
    }
}

// Teste 5: Comparação de complexidades
console.log("\n--- ANÁLISE DE COMPLEXIDADE ---");
console.log("N-Rainhas: O(N!) - Backtracking");
console.log("Sudoku: O(9^(células_vazias)) - Backtracking");
console.log("TSP Força Bruta: O(N!) - Exponencial");
console.log("TSP Vizinho Próximo: O(N²) - Heurística");
console.log("TSP 2-opt: O(N²) por iteração - Melhoria local");
console.log("Mochila Branch&Bound: O(2^N) pior caso, mas com podas eficientes");

export { NRainhas, SudokuSolver, CaixeiroViajante, MochilaBranchBound };
