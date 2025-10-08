/**
 * EXERCÍCIO 6 - REDUZ
 * 
 * Na mesma classe do exercício anterior, implemente um método que receba um inteiro n e
 * que reduza a lista a essa quantidade de elementos.
 */

class ListaComReducao {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    /**
     * Construtor alternativo que aceita elementos específicos
     */
    public static comElementos(elementos: number[]): ListaComReducao {
        const lista = new ListaComReducao(0);
        lista.elementos = [];
        for (let i = 0; i < elementos.length; i++) {
            lista.elementos[i] = elementos[i];
        }
        return lista;
    }

    private gerarElementosAleatorios(n: number): void {
        for (let i = 0; i < n; i++) {
            const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
            this.elementos[i] = numeroAleatorio;
        }
    }

    public toString(): string {
        let resultado = "[";
        for (let i = 0; i < this.elementos.length; i++) {
            resultado += this.elementos[i];
            if (i < this.elementos.length - 1) {
                resultado += ", ";
            }
        }
        resultado += "]";
        return resultado;
    }

    /**
     * Reduz a lista para conter apenas os primeiros n elementos
     * Se n for maior ou igual ao tamanho atual, a lista permanece inalterada
     * Se n for menor ou igual a zero, a lista fica vazia
     * @param n Quantidade de elementos que a lista deve ter
     */
    public reduz(n: number): void {
        // Se n for menor ou igual a zero, esvazia a lista
        if (n <= 0) {
            this.elementos = [];
            return;
        }

        // Se n for maior ou igual ao tamanho atual, não faz nada
        if (n >= this.elementos.length) {
            return;
        }

        // Cria nova lista com apenas os primeiros n elementos
        const novosElementos: number[] = [];
        for (let i = 0; i < n; i++) {
            novosElementos[i] = this.elementos[i];
        }

        this.elementos = novosElementos;
    }

    /**
     * Versão alternativa que reduz mantendo elementos específicos por critério
     * Mantém os n primeiros elementos que atendem a um critério
     * @param n Quantidade de elementos a manter
     * @param criterio Função que define se um elemento deve ser mantido
     */
    public reduzComCriterio(n: number, criterio: (elemento: number) => boolean): void {
        if (n <= 0) {
            this.elementos = [];
            return;
        }

        const elementosFiltrados: number[] = [];
        
        for (let i = 0; i < this.elementos.length && elementosFiltrados.length < n; i++) {
            if (criterio(this.elementos[i])) {
                elementosFiltrados[elementosFiltrados.length] = this.elementos[i];
            }
        }

        this.elementos = elementosFiltrados;
    }

    /**
     * Reduz a lista mantendo elementos em posições específicas
     * @param posicoes Array com as posições (1-indexadas) que devem ser mantidas
     */
    public reduzPorPosicoes(posicoes: number[]): void {
        const novosElementos: number[] = [];

        for (let i = 0; i < posicoes.length; i++) {
            const posicao = posicoes[i];
            const indice = posicao - 1; // Converte para 0-indexado

            // Verifica se a posição é válida
            if (indice >= 0 && indice < this.elementos.length) {
                novosElementos[novosElementos.length] = this.elementos[indice];
            }
        }

        this.elementos = novosElementos;
    }

    /**
     * Calcula a média dos elementos (método auxiliar dos exercícios anteriores)
     */
    public calcularMedia(): number {
        if (this.elementos.length === 0) return 0;
        
        let soma = 0;
        for (let i = 0; i < this.elementos.length; i++) {
            soma += this.elementos[i];
        }
        return soma / this.elementos.length;
    }

    /**
     * Encontra o elemento mais próximo da média
     */
    public maisProximoDaMedia(): number {
        if (this.elementos.length === 0) {
            throw new Error("Lista vazia");
        }

        const media = this.calcularMedia();
        let maisProximo = this.elementos[0];
        let menorDistancia = this.valorAbsoluto(this.elementos[0] - media);

        for (let i = 1; i < this.elementos.length; i++) {
            const distancia = this.valorAbsoluto(this.elementos[i] - media);
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                maisProximo = this.elementos[i];
            }
        }

        return maisProximo;
    }

    private valorAbsoluto(numero: number): number {
        return numero < 0 ? -numero : numero;
    }

    /**
     * Remove elementos abaixo de um valor de corte
     */
    public removeAbaixoDeCorte(valorCorte: number): void {
        const novosElementos: number[] = [];
        
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] >= valorCorte) {
                novosElementos[novosElementos.length] = this.elementos[i];
            }
        }
        
        this.elementos = novosElementos;
    }

    /**
     * Remove elementos em posições múltiplas
     */
    public removeMultiplos(numero: number): void {
        if (numero === 0) return;

        const novosElementos: number[] = [];
        
        for (let i = 0; i < this.elementos.length; i++) {
            const posicao = i + 1;
            if (posicao % numero !== 0) {
                novosElementos[novosElementos.length] = this.elementos[i];
            }
        }
        
        this.elementos = novosElementos;
    }

    public getElementos(): number[] {
        const copia: number[] = [];
        for (let i = 0; i < this.elementos.length; i++) {
            copia[i] = this.elementos[i];
        }
        return copia;
    }

    public getTamanho(): number {
        return this.elementos.length;
    }

    public getElemento(indice: number): number {
        if (indice < 0 || indice >= this.elementos.length) {
            throw new Error("Índice fora dos limites");
        }
        return this.elementos[indice];
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 6 - REDUZ ===");

// Teste 1: Reduzindo uma lista maior para uma menor
const lista1 = ListaComReducao.comElementos([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
console.log("Lista original:", lista1.toString());
console.log("Tamanho original:", lista1.getTamanho());

lista1.reduz(5);
console.log("Após reduzir para 5 elementos:", lista1.toString());
console.log("Novo tamanho:", lista1.getTamanho());

// Teste 2: Tentando reduzir para um tamanho maior que o atual
const lista2 = ListaComReducao.comElementos([1, 2, 3]);
console.log("\nLista original:", lista2.toString());

lista2.reduz(10);
console.log("Após tentar reduzir para 10 elementos:", lista2.toString());

// Teste 3: Reduzindo para zero elementos
const lista3 = ListaComReducao.comElementos([1, 2, 3, 4, 5]);
console.log("\nLista original:", lista3.toString());

lista3.reduz(0);
console.log("Após reduzir para 0 elementos:", lista3.toString());

// Teste 4: Reduzindo para número negativo
const lista4 = ListaComReducao.comElementos([10, 20, 30]);
console.log("\nLista original:", lista4.toString());

lista4.reduz(-5);
console.log("Após reduzir para -5 elementos:", lista4.toString());

// Teste 5: Reduzindo para 1 elemento
const lista5 = ListaComReducao.comElementos([100, 200, 300, 400, 500]);
console.log("\nLista original:", lista5.toString());

lista5.reduz(1);
console.log("Após reduzir para 1 elemento:", lista5.toString());

// Teste 6: Redução com critério (manter apenas números pares)
const lista6 = ListaComReducao.comElementos([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log("\nLista original:", lista6.toString());

lista6.reduzComCriterio(3, (elemento) => elemento % 2 === 0);
console.log("Após reduzir para 3 números pares:", lista6.toString());

// Teste 7: Redução por posições específicas
const lista7 = ListaComReducao.comElementos([10, 20, 30, 40, 50, 60, 70, 80]);
console.log("\nLista original:", lista7.toString());
console.log("Posições:     1   2   3   4   5   6   7   8");

lista7.reduzPorPosicoes([1, 3, 5, 7]); // Mantém elementos nas posições ímpares
console.log("Mantendo posições 1, 3, 5, 7:", lista7.toString());

// Teste 8: Lista aleatória
const lista8 = new ListaComReducao(12);
console.log("\nLista aleatória:", lista8.toString());

lista8.reduz(6);
console.log("Após reduzir pela metade:", lista8.toString());

export { ListaComReducao };
