/**
 * EXERCÍCIO INICIANTE 1 - CONTADOR DE ELEMENTOS
 * 
 * Crie uma classe que armazene uma lista de números inteiros e implemente métodos para:
 * - Contar quantos elementos são positivos
 * - Contar quantos elementos são negativos
 * - Contar quantos elementos são zero
 * - Contar quantos elementos são pares
 * - Contar quantos elementos são ímpares
 */

class ContadorElementos {
    private numeros: number[];

    constructor(numeros: number[]) {
        this.numeros = [];
        // Copia os números manualmente
        for (let i = 0; i < numeros.length; i++) {
            this.numeros[i] = numeros[i];
        }
    }

    /**
     * Construtor que gera números aleatórios
     */
    public static comNumerosAleatorios(quantidade: number): ContadorElementos {
        const numeros: number[] = [];
        for (let i = 0; i < quantidade; i++) {
            // Gera números entre -50 e 50
            const numero = Math.floor(Math.random() * 101) - 50;
            numeros[i] = numero;
        }
        return new ContadorElementos(numeros);
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
     * Conta quantos elementos são positivos (> 0)
     */
    public contarPositivos(): number {
        let contador = 0;
        for (let i = 0; i < this.numeros.length; i++) {
            if (this.numeros[i] > 0) {
                contador++;
            }
        }
        return contador;
    }

    /**
     * Conta quantos elementos são negativos (< 0)
     */
    public contarNegativos(): number {
        let contador = 0;
        for (let i = 0; i < this.numeros.length; i++) {
            if (this.numeros[i] < 0) {
                contador++;
            }
        }
        return contador;
    }

    /**
     * Conta quantos elementos são zero
     */
    public contarZeros(): number {
        let contador = 0;
        for (let i = 0; i < this.numeros.length; i++) {
            if (this.numeros[i] === 0) {
                contador++;
            }
        }
        return contador;
    }

    /**
     * Conta quantos elementos são pares
     */
    public contarPares(): number {
        let contador = 0;
        for (let i = 0; i < this.numeros.length; i++) {
            if (this.numeros[i] % 2 === 0) {
                contador++;
            }
        }
        return contador;
    }

    /**
     * Conta quantos elementos são ímpares
     */
    public contarImpares(): number {
        let contador = 0;
        for (let i = 0; i < this.numeros.length; i++) {
            if (this.numeros[i] % 2 !== 0) {
                contador++;
            }
        }
        return contador;
    }

    /**
     * Retorna um resumo completo das contagens
     */
    public resumoContagens(): string {
        const total = this.numeros.length;
        const positivos = this.contarPositivos();
        const negativos = this.contarNegativos();
        const zeros = this.contarZeros();
        const pares = this.contarPares();
        const impares = this.contarImpares();

        return `Total: ${total} | Positivos: ${positivos} | Negativos: ${negativos} | Zeros: ${zeros} | Pares: ${pares} | Ímpares: ${impares}`;
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
console.log("=== EXERCÍCIO INICIANTE 1 - CONTADOR DE ELEMENTOS ===");

// Teste 1: Lista com números conhecidos
const lista1 = new ContadorElementos([-5, -2, -1, 0, 0, 1, 2, 3, 4, 5]);
console.log("Lista:", lista1.toString());
console.log("Positivos:", lista1.contarPositivos());
console.log("Negativos:", lista1.contarNegativos());
console.log("Zeros:", lista1.contarZeros());
console.log("Pares:", lista1.contarPares());
console.log("Ímpares:", lista1.contarImpares());
console.log("Resumo:", lista1.resumoContagens());

// Teste 2: Lista apenas com positivos
const lista2 = new ContadorElementos([1, 3, 5, 7, 9]);
console.log("\nLista só positivos:", lista2.toString());
console.log("Resumo:", lista2.resumoContagens());

// Teste 3: Lista apenas com negativos
const lista3 = new ContadorElementos([-10, -8, -6, -4, -2]);
console.log("\nLista só negativos:", lista3.toString());
console.log("Resumo:", lista3.resumoContagens());

// Teste 4: Lista com números aleatórios
const lista4 = ContadorElementos.comNumerosAleatorios(15);
console.log("\nLista aleatória:", lista4.toString());
console.log("Resumo:", lista4.resumoContagens());

// Teste 5: Lista vazia
const lista5 = new ContadorElementos([]);
console.log("\nLista vazia:", lista5.toString());
console.log("Resumo:", lista5.resumoContagens());

export { ContadorElementos };
