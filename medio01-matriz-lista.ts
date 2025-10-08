/**
 * EXERCÍCIO MÉDIO 1 - MATRIZ COMO LISTA DE LISTAS
 * 
 * Crie uma classe que represente uma matriz usando uma lista de listas e implemente:
 * - Criação de matriz com dimensões específicas
 * - Preenchimento com valores
 * - Soma de elementos por linha e por coluna
 * - Transposição da matriz
 * - Busca de elementos
 * - Operações matemáticas entre matrizes
 */

class MatrizLista {
    private matriz: number[][];
    private linhas: number;
    private colunas: number;

    constructor(linhas: number, colunas: number) {
        this.linhas = linhas;
        this.colunas = colunas;
        this.matriz = [];
        
        // Inicializa matriz com zeros
        for (let i = 0; i < linhas; i++) {
            this.matriz[i] = [];
            for (let j = 0; j < colunas; j++) {
                this.matriz[i][j] = 0;
            }
        }
    }

    /**
     * Construtor que cria matriz a partir de array bidimensional
     */
    public static deArray(array: number[][]): MatrizLista {
        if (array.length === 0) {
            return new MatrizLista(0, 0);
        }
        
        const linhas = array.length;
        const colunas = array[0].length;
        const matriz = new MatrizLista(linhas, colunas);
        
        for (let i = 0; i < linhas; i++) {
            for (let j = 0; j < colunas; j++) {
                if (j < array[i].length) {
                    matriz.definirElemento(i, j, array[i][j]);
                }
            }
        }
        
        return matriz;
    }

    /**
     * Construtor que gera matriz com números aleatórios
     */
    public static aleatoria(linhas: number, colunas: number, min: number = 1, max: number = 10): MatrizLista {
        const matriz = new MatrizLista(linhas, colunas);
        
        for (let i = 0; i < linhas; i++) {
            for (let j = 0; j < colunas; j++) {
                const valor = Math.floor(Math.random() * (max - min + 1)) + min;
                matriz.definirElemento(i, j, valor);
            }
        }
        
        return matriz;
    }

    /**
     * Define o valor de um elemento específico
     */
    public definirElemento(linha: number, coluna: number, valor: number): void {
        if (linha < 0 || linha >= this.linhas || coluna < 0 || coluna >= this.colunas) {
            throw new Error(`Posição inválida: (${linha}, ${coluna})`);
        }
        this.matriz[linha][coluna] = valor;
    }

    /**
     * Obtém o valor de um elemento específico
     */
    public obterElemento(linha: number, coluna: number): number {
        if (linha < 0 || linha >= this.linhas || coluna < 0 || coluna >= this.colunas) {
            throw new Error(`Posição inválida: (${linha}, ${coluna})`);
        }
        return this.matriz[linha][coluna];
    }

    public toString(): string {
        let resultado = "";
        for (let i = 0; i < this.linhas; i++) {
            resultado += "[";
            for (let j = 0; j < this.colunas; j++) {
                resultado += this.matriz[i][j].toString().padStart(3);
                if (j < this.colunas - 1) {
                    resultado += ", ";
                }
            }
            resultado += "]";
            if (i < this.linhas - 1) {
                resultado += "\n";
            }
        }
        return resultado;
    }

    /**
     * Calcula a soma dos elementos de uma linha
     */
    public somaLinha(linha: number): number {
        if (linha < 0 || linha >= this.linhas) {
            throw new Error(`Linha inválida: ${linha}`);
        }
        
        let soma = 0;
        for (let j = 0; j < this.colunas; j++) {
            soma += this.matriz[linha][j];
        }
        return soma;
    }

    /**
     * Calcula a soma dos elementos de uma coluna
     */
    public somaColuna(coluna: number): number {
        if (coluna < 0 || coluna >= this.colunas) {
            throw new Error(`Coluna inválida: ${coluna}`);
        }
        
        let soma = 0;
        for (let i = 0; i < this.linhas; i++) {
            soma += this.matriz[i][coluna];
        }
        return soma;
    }

    /**
     * Calcula a soma de todos os elementos
     */
    public somaTotal(): number {
        let soma = 0;
        for (let i = 0; i < this.linhas; i++) {
            soma += this.somaLinha(i);
        }
        return soma;
    }

    /**
     * Retorna a matriz transposta
     */
    public transposta(): MatrizLista {
        const transposta = new MatrizLista(this.colunas, this.linhas);
        
        for (let i = 0; i < this.linhas; i++) {
            for (let j = 0; j < this.colunas; j++) {
                transposta.definirElemento(j, i, this.matriz[i][j]);
            }
        }
        
        return transposta;
    }

    /**
     * Busca a posição de um elemento
     */
    public buscarElemento(valor: number): { linha: number; coluna: number } | null {
        for (let i = 0; i < this.linhas; i++) {
            for (let j = 0; j < this.colunas; j++) {
                if (this.matriz[i][j] === valor) {
                    return { linha: i, coluna: j };
                }
            }
        }
        return null;
    }

    /**
     * Encontra todas as posições de um elemento
     */
    public buscarTodasPosicoes(valor: number): { linha: number; coluna: number }[] {
        const posicoes: { linha: number; coluna: number }[] = [];
        
        for (let i = 0; i < this.linhas; i++) {
            for (let j = 0; j < this.colunas; j++) {
                if (this.matriz[i][j] === valor) {
                    posicoes[posicoes.length] = { linha: i, coluna: j };
                }
            }
        }
        
        return posicoes;
    }

    /**
     * Encontra o maior elemento da matriz
     */
    public maiorElemento(): number {
        if (this.linhas === 0 || this.colunas === 0) {
            throw new Error("Matriz vazia");
        }
        
        let maior = this.matriz[0][0];
        for (let i = 0; i < this.linhas; i++) {
            for (let j = 0; j < this.colunas; j++) {
                if (this.matriz[i][j] > maior) {
                    maior = this.matriz[i][j];
                }
            }
        }
        return maior;
    }

    /**
     * Encontra o menor elemento da matriz
     */
    public menorElemento(): number {
        if (this.linhas === 0 || this.colunas === 0) {
            throw new Error("Matriz vazia");
        }
        
        let menor = this.matriz[0][0];
        for (let i = 0; i < this.linhas; i++) {
            for (let j = 0; j < this.colunas; j++) {
                if (this.matriz[i][j] < menor) {
                    menor = this.matriz[i][j];
                }
            }
        }
        return menor;
    }

    /**
     * Soma duas matrizes (devem ter as mesmas dimensões)
     */
    public somar(outraMatriz: MatrizLista): MatrizLista {
        if (this.linhas !== outraMatriz.linhas || this.colunas !== outraMatriz.colunas) {
            throw new Error("Matrizes devem ter as mesmas dimensões para soma");
        }
        
        const resultado = new MatrizLista(this.linhas, this.colunas);
        
        for (let i = 0; i < this.linhas; i++) {
            for (let j = 0; j < this.colunas; j++) {
                const soma = this.matriz[i][j] + outraMatriz.obterElemento(i, j);
                resultado.definirElemento(i, j, soma);
            }
        }
        
        return resultado;
    }

    /**
     * Multiplica todos os elementos por um escalar
     */
    public multiplicarPorEscalar(escalar: number): MatrizLista {
        const resultado = new MatrizLista(this.linhas, this.colunas);
        
        for (let i = 0; i < this.linhas; i++) {
            for (let j = 0; j < this.colunas; j++) {
                resultado.definirElemento(i, j, this.matriz[i][j] * escalar);
            }
        }
        
        return resultado;
    }

    /**
     * Verifica se é uma matriz quadrada
     */
    public eQuadrada(): boolean {
        return this.linhas === this.colunas;
    }

    /**
     * Calcula a diagonal principal (apenas para matrizes quadradas)
     */
    public diagonalPrincipal(): number[] {
        if (!this.eQuadrada()) {
            throw new Error("Matriz deve ser quadrada para calcular diagonal principal");
        }
        
        const diagonal: number[] = [];
        for (let i = 0; i < this.linhas; i++) {
            diagonal[i] = this.matriz[i][i];
        }
        return diagonal;
    }

    public getLinhas(): number {
        return this.linhas;
    }

    public getColunas(): number {
        return this.colunas;
    }

    public getDimensoes(): string {
        return `${this.linhas}x${this.colunas}`;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO MÉDIO 1 - MATRIZ COMO LISTA DE LISTAS ===");

// Teste 1: Criação e preenchimento manual
const matriz1 = new MatrizLista(3, 3);
console.log("Matriz 3x3 inicial (zeros):");
console.log(matriz1.toString());

// Preenchendo manualmente
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        matriz1.definirElemento(i, j, (i + 1) * (j + 1));
    }
}
console.log("\nApós preenchimento:");
console.log(matriz1.toString());

// Teste 2: Operações básicas
console.log(`\nSoma da linha 0: ${matriz1.somaLinha(0)}`);
console.log(`Soma da coluna 1: ${matriz1.somaColuna(1)}`);
console.log(`Soma total: ${matriz1.somaTotal()}`);
console.log(`Maior elemento: ${matriz1.maiorElemento()}`);
console.log(`Menor elemento: ${matriz1.menorElemento()}`);

// Teste 3: Transposição
console.log("\nMatriz transposta:");
const transposta = matriz1.transposta();
console.log(transposta.toString());

// Teste 4: Matriz a partir de array
const matriz2 = MatrizLista.deArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);
console.log("\nMatriz criada de array:");
console.log(matriz2.toString());

if (matriz2.eQuadrada()) {
    console.log("Diagonal principal:", matriz2.diagonalPrincipal());
}

// Teste 5: Busca de elementos
const posicao5 = matriz2.buscarElemento(5);
console.log(`Posição do elemento 5: linha ${posicao5?.linha}, coluna ${posicao5?.coluna}`);

// Teste 6: Operações entre matrizes
console.log("\nSoma de matrizes:");
console.log("Matriz A:");
console.log(matriz1.toString());
console.log("Matriz B:");
console.log(matriz2.toString());
console.log("A + B:");
const soma = matriz1.somar(matriz2);
console.log(soma.toString());

// Teste 7: Multiplicação por escalar
console.log("\nMultiplicação por escalar (2):");
const multiplicada = matriz2.multiplicarPorEscalar(2);
console.log(multiplicada.toString());

// Teste 8: Matriz aleatória
const matrizAleatoria = MatrizLista.aleatoria(2, 4, 1, 9);
console.log("\nMatriz 2x4 aleatória:");
console.log(matrizAleatoria.toString());
console.log(`Dimensões: ${matrizAleatoria.getDimensoes()}`);

export { MatrizLista };
