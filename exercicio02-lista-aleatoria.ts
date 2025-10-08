/**
 * EXERCÍCIO 2 - LISTA ALEATÓRIA
 * 
 * Modele uma classe cujo construtor gere uma lista de n elementos inteiros
 * aleatórios. Sobrescreva o método toString() para que retorne a representação dessa lista em
 * texto.
 */

class ListaAleatoria {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    /**
     * Gera n elementos aleatórios e armazena no array
     * @param n Quantidade de elementos a serem gerados
     */
    private gerarElementosAleatorios(n: number): void {
        for (let i = 0; i < n; i++) {
            // Gera número aleatório entre 1 e 100
            const numeroAleatorio = this.gerarNumeroAleatorio(1, 100);
            this.elementos[i] = numeroAleatorio;
        }
    }

    /**
     * Gera um número aleatório entre min e max (inclusive)
     * @param min Valor mínimo
     * @param max Valor máximo
     * @returns Número aleatório no intervalo especificado
     */
    private gerarNumeroAleatorio(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Sobrescreve o método toString para retornar representação da lista em texto
     * @returns String representando a lista
     */
    public toString(): string {
        let resultado = "[";
        
        for (let i = 0; i < this.elementos.length; i++) {
            resultado += this.elementos[i];
            
            // Adiciona vírgula e espaço, exceto no último elemento
            if (i < this.elementos.length - 1) {
                resultado += ", ";
            }
        }
        
        resultado += "]";
        return resultado;
    }

    /**
     * Getter para os elementos (útil para testes)
     * @returns Array com os elementos
     */
    public getElementos(): number[] {
        // Retorna uma cópia para manter encapsulamento
        const copia: number[] = [];
        for (let i = 0; i < this.elementos.length; i++) {
            copia[i] = this.elementos[i];
        }
        return copia;
    }

    /**
     * Getter para o tamanho da lista
     * @returns Quantidade de elementos na lista
     */
    public getTamanho(): number {
        return this.elementos.length;
    }

    /**
     * Getter para um elemento específico
     * @param indice Índice do elemento desejado
     * @returns Elemento no índice especificado
     */
    public getElemento(indice: number): number {
        if (indice < 0 || indice >= this.elementos.length) {
            throw new Error("Índice fora dos limites da lista");
        }
        return this.elementos[indice];
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 2 - LISTA ALEATÓRIA ===");

// Criando listas de diferentes tamanhos
const lista1 = new ListaAleatoria(5);
console.log("Lista com 5 elementos:", lista1.toString());

const lista2 = new ListaAleatoria(10);
console.log("Lista com 10 elementos:", lista2.toString());

const lista3 = new ListaAleatoria(0);
console.log("Lista vazia:", lista3.toString());

const lista4 = new ListaAleatoria(1);
console.log("Lista com 1 elemento:", lista4.toString());

// Testando outros métodos
console.log("Tamanho da lista1:", lista1.getTamanho());
console.log("Primeiro elemento da lista2:", lista2.getElemento(0));
console.log("Último elemento da lista2:", lista2.getElemento(lista2.getTamanho() - 1));

export { ListaAleatoria };
