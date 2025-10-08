/**
 * EXERCÍCIO 4 - REMOVE MÚLTIPLOS
 * 
 * Na mesma classe do exercício anterior, implemente um método que receba
 * um número inteiro e remova da lista todos os elementos que estiverem em posições múltiplas desse
 * valor. Por exemplo, caso o número fornecido seja 3, serão removidos os elementos das posições 3,
 * 6, 9 e, assim, sucessivamente (note que os índices são 2, 5, 8). Se o número fornecido for zero, a
 * lista permanece inalterada.
 */

class ListaComRemocaoMultiplos {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    /**
     * Construtor alternativo que aceita elementos específicos
     */
    public static comElementos(elementos: number[]): ListaComRemocaoMultiplos {
        const lista = new ListaComRemocaoMultiplos(0);
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
     * Remove todos os elementos que estão em posições múltiplas do número fornecido
     * @param numero Número para calcular os múltiplos (posições 1-indexadas)
     */
    public removeMultiplos(numero: number): void {
        // Se o número for zero, a lista permanece inalterada
        if (numero === 0) {
            return;
        }

        const novosElementos: number[] = [];
        
        // Percorre todos os elementos
        for (let i = 0; i < this.elementos.length; i++) {
            const posicao = i + 1; // Posição 1-indexada (primeira posição é 1)
            
            // Se a posição NÃO é múltipla do número, mantém o elemento
            if (posicao % numero !== 0) {
                novosElementos[novosElementos.length] = this.elementos[i];
            }
        }
        
        this.elementos = novosElementos;
    }

    /**
     * Retorna as posições que seriam removidas (para visualização)
     * @param numero Número para calcular os múltiplos
     * @returns Array com as posições que seriam removidas (1-indexadas)
     */
    public obterPosicoesASeremRemovidas(numero: number): number[] {
        if (numero === 0) {
            return [];
        }

        const posicoes: number[] = [];
        
        for (let i = 0; i < this.elementos.length; i++) {
            const posicao = i + 1;
            if (posicao % numero === 0) {
                posicoes[posicoes.length] = posicao;
            }
        }
        
        return posicoes;
    }

    /**
     * Retorna os elementos que seriam removidos (para visualização)
     * @param numero Número para calcular os múltiplos
     * @returns Array com os elementos que seriam removidos
     */
    public obterElementosASeremRemovidos(numero: number): number[] {
        if (numero === 0) {
            return [];
        }

        const elementosRemovidos: number[] = [];
        
        for (let i = 0; i < this.elementos.length; i++) {
            const posicao = i + 1;
            if (posicao % numero === 0) {
                elementosRemovidos[elementosRemovidos.length] = this.elementos[i];
            }
        }
        
        return elementosRemovidos;
    }

    /**
     * Remove elementos abaixo de um valor de corte (do exercício anterior)
     * @param valorCorte Valor limite
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

    /**
     * Retorna um elemento específico da lista
     * @param indice Índice do elemento (0-indexado)
     * @returns Elemento na posição especificada
     */
    public getElemento(indice: number): number {
        if (indice < 0 || indice >= this.elementos.length) {
            throw new Error("Índice fora dos limites da lista");
        }
        return this.elementos[indice];
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 4 - REMOVE MÚLTIPLOS ===");

// Teste 1: Lista com elementos conhecidos - removendo múltiplos de 3
const lista1 = ListaComRemocaoMultiplos.comElementos([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
console.log("Lista original:", lista1.toString());
console.log("Posições:", "1  2  3  4  5  6  7  8  9  10");

const posicoes3 = lista1.obterPosicoesASeremRemovidas(3);
const elementos3 = lista1.obterElementosASeremRemovidos(3);
console.log("Posições múltiplas de 3:", posicoes3);
console.log("Elementos a serem removidos:", elementos3);

lista1.removeMultiplos(3);
console.log("Após remover múltiplos de 3:", lista1.toString());

// Teste 2: Removendo múltiplos de 2 (posições pares)
const lista2 = ListaComRemocaoMultiplos.comElementos([1, 2, 3, 4, 5, 6, 7, 8]);
console.log("\nLista original:", lista2.toString());
console.log("Posições:", "1 2 3 4 5 6 7 8");

const posicoes2 = lista2.obterPosicoesASeremRemovidas(2);
const elementos2 = lista2.obterElementosASeremRemovidos(2);
console.log("Posições múltiplas de 2:", posicoes2);
console.log("Elementos a serem removidos:", elementos2);

lista2.removeMultiplos(2);
console.log("Após remover múltiplos de 2:", lista2.toString());

// Teste 3: Removendo múltiplos de 1 (todos os elementos)
const lista3 = ListaComRemocaoMultiplos.comElementos([5, 10, 15, 20, 25]);
console.log("\nLista original:", lista3.toString());

lista3.removeMultiplos(1);
console.log("Após remover múltiplos de 1:", lista3.toString());

// Teste 4: Número maior que o tamanho da lista
const lista4 = ListaComRemocaoMultiplos.comElementos([1, 2, 3]);
console.log("\nLista original:", lista4.toString());

lista4.removeMultiplos(5);
console.log("Após remover múltiplos de 5:", lista4.toString());

// Teste 5: Número zero (lista permanece inalterada)
const lista5 = ListaComRemocaoMultiplos.comElementos([1, 2, 3, 4, 5]);
console.log("\nLista original:", lista5.toString());

lista5.removeMultiplos(0);
console.log("Após remover múltiplos de 0:", lista5.toString());

// Teste 6: Lista gerada aleatoriamente
const lista6 = new ListaComRemocaoMultiplos(8);
console.log("\nLista aleatória:", lista6.toString());

lista6.removeMultiplos(4);
console.log("Após remover múltiplos de 4:", lista6.toString());

export { ListaComRemocaoMultiplos };
