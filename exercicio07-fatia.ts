/**
 * EXERCÍCIO 7 - FATIA
 * 
 * Na mesma classe do exercício anterior, implemente um método que receba dois inteiros,
 * inicio e fim. Altere a lista de forma que ela se resuma a uma fatia que vá de inicio a fim. 
 * Não use métodos predefinidos como slice().
 */

class ListaComFatia {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    /**
     * Construtor alternativo que aceita elementos específicos
     */
    public static comElementos(elementos: number[]): ListaComFatia {
        const lista = new ListaComFatia(0);
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
     * Cria uma fatia da lista do índice inicio ao índice fim (inclusive)
     * Os índices são 0-indexados (primeiro elemento está no índice 0)
     * @param inicio Índice inicial da fatia (inclusive)
     * @param fim Índice final da fatia (inclusive)
     */
    public fatia(inicio: number, fim: number): void {
        // Validação dos parâmetros
        if (inicio < 0) inicio = 0;
        if (fim >= this.elementos.length) fim = this.elementos.length - 1;
        
        // Se início for maior que fim, a lista fica vazia
        if (inicio > fim) {
            this.elementos = [];
            return;
        }

        const novosElementos: number[] = [];
        
        // Copia elementos do índice inicio ao fim (inclusive)
        for (let i = inicio; i <= fim; i++) {
            novosElementos[novosElementos.length] = this.elementos[i];
        }

        this.elementos = novosElementos;
    }

    /**
     * Versão alternativa que usa posições 1-indexadas (como mencionado no exercício)
     * @param posicaoInicio Posição inicial (1-indexada)
     * @param posicaoFim Posição final (1-indexada)
     */
    public fatiaPorPosicao(posicaoInicio: number, posicaoFim: number): void {
        // Converte posições 1-indexadas para índices 0-indexados
        const inicio = posicaoInicio - 1;
        const fim = posicaoFim - 1;
        
        this.fatia(inicio, fim);
    }

    /**
     * Cria uma fatia a partir de um índice até o final da lista
     * @param inicio Índice inicial da fatia
     */
    public fatiaAPartirDe(inicio: number): void {
        this.fatia(inicio, this.elementos.length - 1);
    }

    /**
     * Cria uma fatia do início da lista até um índice específico
     * @param fim Índice final da fatia
     */
    public fatiaAte(fim: number): void {
        this.fatia(0, fim);
    }

    /**
     * Retorna uma visualização dos índices para facilitar o entendimento
     * @returns String com os índices correspondentes aos elementos
     */
    public mostrarIndices(): string {
        let resultado = "[";
        for (let i = 0; i < this.elementos.length; i++) {
            resultado += i;
            if (i < this.elementos.length - 1) {
                resultado += ", ";
            }
        }
        resultado += "]";
        return resultado;
    }

    /**
     * Retorna uma visualização das posições (1-indexadas)
     * @returns String com as posições correspondentes aos elementos
     */
    public mostrarPosicoes(): string {
        let resultado = "[";
        for (let i = 0; i < this.elementos.length; i++) {
            resultado += (i + 1);
            if (i < this.elementos.length - 1) {
                resultado += ", ";
            }
        }
        resultado += "]";
        return resultado;
    }

    // Métodos dos exercícios anteriores
    public calcularMedia(): number {
        if (this.elementos.length === 0) return 0;
        
        let soma = 0;
        for (let i = 0; i < this.elementos.length; i++) {
            soma += this.elementos[i];
        }
        return soma / this.elementos.length;
    }

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

    public reduz(n: number): void {
        if (n <= 0) {
            this.elementos = [];
            return;
        }
        if (n >= this.elementos.length) return;

        const novosElementos: number[] = [];
        for (let i = 0; i < n; i++) {
            novosElementos[i] = this.elementos[i];
        }
        this.elementos = novosElementos;
    }

    public removeAbaixoDeCorte(valorCorte: number): void {
        const novosElementos: number[] = [];
        
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] >= valorCorte) {
                novosElementos[novosElementos.length] = this.elementos[i];
            }
        }
        
        this.elementos = novosElementos;
    }

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
console.log("=== EXERCÍCIO 7 - FATIA ===");

// Teste 1: Fatia básica do meio da lista
const lista1 = ListaComFatia.comElementos([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
console.log("Lista original:", lista1.toString());
console.log("Índices:       ", lista1.mostrarIndices());
console.log("Posições:      ", lista1.mostrarPosicoes());

lista1.fatia(2, 5); // Índices 2 a 5 (elementos 30, 40, 50, 60)
console.log("Fatia índices 2-5:", lista1.toString());

// Teste 2: Fatia usando posições 1-indexadas
const lista2 = ListaComFatia.comElementos([1, 2, 3, 4, 5, 6, 7, 8]);
console.log("\nLista original:", lista2.toString());
console.log("Posições:      ", lista2.mostrarPosicoes());

lista2.fatiaPorPosicao(3, 6); // Posições 3 a 6 (elementos 3, 4, 5, 6)
console.log("Fatia posições 3-6:", lista2.toString());

// Teste 3: Fatia do início até meio
const lista3 = ListaComFatia.comElementos([100, 200, 300, 400, 500]);
console.log("\nLista original:", lista3.toString());

lista3.fatiaAte(2); // Do início até índice 2
console.log("Fatia do início até índice 2:", lista3.toString());

// Teste 4: Fatia do meio até o final
const lista4 = ListaComFatia.comElementos([5, 10, 15, 20, 25, 30]);
console.log("\nLista original:", lista4.toString());

lista4.fatiaAPartirDe(3); // Do índice 3 até o final
console.log("Fatia do índice 3 até o final:", lista4.toString());

// Teste 5: Fatia com índices fora dos limites
const lista5 = ListaComFatia.comElementos([1, 2, 3, 4, 5]);
console.log("\nLista original:", lista5.toString());

lista5.fatia(-2, 10); // Índices fora dos limites
console.log("Fatia -2 a 10 (ajustada para 0 a 4):", lista5.toString());

// Teste 6: Fatia com início maior que fim
const lista6 = ListaComFatia.comElementos([10, 20, 30, 40]);
console.log("\nLista original:", lista6.toString());

lista6.fatia(3, 1); // Início maior que fim
console.log("Fatia 3 a 1 (lista vazia):", lista6.toString());

// Teste 7: Fatia de um único elemento
const lista7 = ListaComFatia.comElementos([7, 14, 21, 28, 35, 42]);
console.log("\nLista original:", lista7.toString());

lista7.fatia(2, 2); // Apenas o elemento no índice 2
console.log("Fatia índice 2 a 2:", lista7.toString());

// Teste 8: Fatia da lista inteira
const lista8 = ListaComFatia.comElementos([1, 3, 5, 7, 9]);
console.log("\nLista original:", lista8.toString());

lista8.fatia(0, 4); // Lista inteira
console.log("Fatia da lista inteira:", lista8.toString());

// Teste 9: Lista aleatória com fatia
const lista9 = new ListaComFatia(10);
console.log("\nLista aleatória:", lista9.toString());

lista9.fatia(2, 7);
console.log("Fatia dos índices 2 a 7:", lista9.toString());

export { ListaComFatia };
