/**
 * EXERCÍCIO INICIANTE 3 - OPERAÇÕES BÁSICAS
 * 
 * Crie uma classe que implemente operações matemáticas básicas em listas:
 * - Somar todos os elementos
 * - Calcular a média aritmética
 * - Encontrar o produto de todos os elementos
 * - Calcular a diferença entre elementos consecutivos
 * - Duplicar todos os elementos
 * - Aplicar operações aritméticas a todos os elementos
 */

class OperacoesBasicas {
    private numeros: number[];

    constructor(numeros: number[]) {
        this.numeros = [];
        for (let i = 0; i < numeros.length; i++) {
            this.numeros[i] = numeros[i];
        }
    }

    /**
     * Construtor que gera sequência aritmética
     */
    public static sequenciaAritmetica(inicio: number, razao: number, quantidade: number): OperacoesBasicas {
        const numeros: number[] = [];
        for (let i = 0; i < quantidade; i++) {
            numeros[i] = inicio + (i * razao);
        }
        return new OperacoesBasicas(numeros);
    }

    /**
     * Construtor que gera números pequenos para evitar overflow no produto
     */
    public static numerosParaProduto(quantidade: number): OperacoesBasicas {
        const numeros: number[] = [];
        for (let i = 0; i < quantidade; i++) {
            // Números pequenos entre 1 e 3 para evitar overflow
            numeros[i] = Math.floor(Math.random() * 3) + 1;
        }
        return new OperacoesBasicas(numeros);
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
     * Soma todos os elementos da lista
     */
    public somar(): number {
        let soma = 0;
        for (let i = 0; i < this.numeros.length; i++) {
            soma += this.numeros[i];
        }
        return soma;
    }

    /**
     * Calcula a média aritmética dos elementos
     */
    public media(): number {
        if (this.numeros.length === 0) {
            return 0;
        }
        return this.somar() / this.numeros.length;
    }

    /**
     * Calcula o produto de todos os elementos
     */
    public produto(): number {
        if (this.numeros.length === 0) {
            return 0;
        }
        
        let produto = 1;
        for (let i = 0; i < this.numeros.length; i++) {
            produto *= this.numeros[i];
        }
        return produto;
    }

    /**
     * Calcula as diferenças entre elementos consecutivos
     */
    public diferencasConsecutivas(): number[] {
        const diferencas: number[] = [];
        
        for (let i = 1; i < this.numeros.length; i++) {
            const diferenca = this.numeros[i] - this.numeros[i - 1];
            diferencas[diferencas.length] = diferenca;
        }
        
        return diferencas;
    }

    /**
     * Duplica todos os elementos (multiplica por 2)
     */
    public duplicar(): void {
        for (let i = 0; i < this.numeros.length; i++) {
            this.numeros[i] = this.numeros[i] * 2;
        }
    }

    /**
     * Soma um valor a todos os elementos
     */
    public somarValor(valor: number): void {
        for (let i = 0; i < this.numeros.length; i++) {
            this.numeros[i] = this.numeros[i] + valor;
        }
    }

    /**
     * Multiplica todos os elementos por um valor
     */
    public multiplicarPor(valor: number): void {
        for (let i = 0; i < this.numeros.length; i++) {
            this.numeros[i] = this.numeros[i] * valor;
        }
    }

    /**
     * Subtrai um valor de todos os elementos
     */
    public subtrairValor(valor: number): void {
        for (let i = 0; i < this.numeros.length; i++) {
            this.numeros[i] = this.numeros[i] - valor;
        }
    }

    /**
     * Divide todos os elementos por um valor (evita divisão por zero)
     */
    public dividirPor(valor: number): void {
        if (valor === 0) {
            throw new Error("Não é possível dividir por zero");
        }
        
        for (let i = 0; i < this.numeros.length; i++) {
            this.numeros[i] = this.numeros[i] / valor;
        }
    }

    /**
     * Calcula estatísticas básicas
     */
    public estatisticas(): string {
        if (this.numeros.length === 0) {
            return "Lista vazia - sem estatísticas";
        }

        const soma = this.somar();
        const media = this.media();
        const produto = this.produto();
        const tamanho = this.numeros.length;

        return `Tamanho: ${tamanho} | Soma: ${soma} | Média: ${media.toFixed(2)} | Produto: ${produto}`;
    }

    /**
     * Verifica se a lista forma uma progressão aritmética
     */
    public eProgressaoAritmetica(): boolean {
        if (this.numeros.length <= 2) {
            return true; // 0, 1 ou 2 elementos sempre formam PA
        }

        const diferencas = this.diferencasConsecutivas();
        const primeiraRazao = diferencas[0];

        // Verifica se todas as diferenças são iguais
        for (let i = 1; i < diferencas.length; i++) {
            if (diferencas[i] !== primeiraRazao) {
                return false;
            }
        }

        return true;
    }

    /**
     * Retorna a razão da PA (se for uma progressão aritmética)
     */
    public razaoPA(): number {
        if (this.numeros.length <= 1) {
            return 0;
        }
        return this.numeros[1] - this.numeros[0];
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
console.log("=== EXERCÍCIO INICIANTE 3 - OPERAÇÕES BÁSICAS ===");

// Teste 1: Operações básicas
const lista1 = new OperacoesBasicas([1, 2, 3, 4, 5]);
console.log("Lista original:", lista1.toString());
console.log("Estatísticas:", lista1.estatisticas());
console.log("Diferenças consecutivas:", lista1.diferencasConsecutivas());
console.log("É PA?", lista1.eProgressaoAritmetica(), "- Razão:", lista1.razaoPA());

// Teste 2: Modificações na lista
const lista2 = new OperacoesBasicas([10, 20, 30]);
console.log("\nLista antes das modificações:", lista2.toString());

lista2.duplicar();
console.log("Após duplicar:", lista2.toString());

lista2.somarValor(5);
console.log("Após somar 5:", lista2.toString());

lista2.dividirPor(2);
console.log("Após dividir por 2:", lista2.toString());

// Teste 3: Progressão aritmética
const lista3 = OperacoesBasicas.sequenciaAritmetica(5, 3, 6); // 5, 8, 11, 14, 17, 20
console.log("\nPA gerada:", lista3.toString());
console.log("É PA?", lista3.eProgressaoAritmetica(), "- Razão:", lista3.razaoPA());
console.log("Estatísticas:", lista3.estatisticas());

// Teste 4: Produto com números pequenos
const lista4 = OperacoesBasicas.numerosParaProduto(5);
console.log("\nLista para produto:", lista4.toString());
console.log("Estatísticas:", lista4.estatisticas());

// Teste 5: Lista com zeros
const lista5 = new OperacoesBasicas([0, 1, 0, 2, 0]);
console.log("\nLista com zeros:", lista5.toString());
console.log("Estatísticas:", lista5.estatisticas());

// Teste 6: Operações em cadeia
const lista6 = new OperacoesBasicas([1, 2, 3, 4]);
console.log("\nOperações em cadeia:");
console.log("Original:", lista6.toString());

lista6.multiplicarPor(3);
console.log("× 3:", lista6.toString());

lista6.subtrairValor(2);
console.log("- 2:", lista6.toString());

lista6.somarValor(10);
console.log("+ 10:", lista6.toString());

export { OperacoesBasicas };
