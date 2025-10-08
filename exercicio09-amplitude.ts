/**
 * EXERCÍCIO 9 - AMPLITUDE
 * 
 * Na mesma classe do exercício anterior, implemente um método que retorne a
 * diferença entre o maior e o menor elemento da lista.
 */

class ListaComAmplitude {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    /**
     * Construtor alternativo que aceita elementos específicos
     */
    public static comElementos(elementos: number[]): ListaComAmplitude {
        const lista = new ListaComAmplitude(0);
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
     * Calcula a amplitude da lista (diferença entre o maior e menor elemento)
     * @returns A diferença entre o maior e menor elemento, ou 0 se a lista estiver vazia
     */
    public amplitude(): number {
        if (this.elementos.length === 0) {
            return 0;
        }

        const maior = this.encontrarMaior();
        const menor = this.encontrarMenor();
        
        return maior - menor;
    }

    /**
     * Encontra o maior elemento da lista
     * @returns O maior elemento da lista
     */
    public encontrarMaior(): number {
        if (this.elementos.length === 0) {
            throw new Error("Lista vazia - não é possível encontrar o maior elemento");
        }

        let maior = this.elementos[0];
        
        for (let i = 1; i < this.elementos.length; i++) {
            if (this.elementos[i] > maior) {
                maior = this.elementos[i];
            }
        }

        return maior;
    }

    /**
     * Encontra o menor elemento da lista
     * @returns O menor elemento da lista
     */
    public encontrarMenor(): number {
        if (this.elementos.length === 0) {
            throw new Error("Lista vazia - não é possível encontrar o menor elemento");
        }

        let menor = this.elementos[0];
        
        for (let i = 1; i < this.elementos.length; i++) {
            if (this.elementos[i] < menor) {
                menor = this.elementos[i];
            }
        }

        return menor;
    }

    /**
     * Encontra tanto o maior quanto o menor elemento em uma única passada
     * @returns Objeto com os valores maior e menor
     */
    public encontrarMaiorEMenor(): { maior: number; menor: number } {
        if (this.elementos.length === 0) {
            throw new Error("Lista vazia");
        }

        let maior = this.elementos[0];
        let menor = this.elementos[0];

        for (let i = 1; i < this.elementos.length; i++) {
            if (this.elementos[i] > maior) {
                maior = this.elementos[i];
            }
            if (this.elementos[i] < menor) {
                menor = this.elementos[i];
            }
        }

        return { maior, menor };
    }

    /**
     * Encontra todos os índices onde aparece o maior elemento
     * @returns Array com os índices (0-indexados) onde o maior elemento aparece
     */
    public indicesDoMaior(): number[] {
        if (this.elementos.length === 0) {
            return [];
        }

        const maior = this.encontrarMaior();
        const indices: number[] = [];

        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] === maior) {
                indices[indices.length] = i;
            }
        }

        return indices;
    }

    /**
     * Encontra todos os índices onde aparece o menor elemento
     * @returns Array com os índices (0-indexados) onde o menor elemento aparece
     */
    public indicesDoMenor(): number[] {
        if (this.elementos.length === 0) {
            return [];
        }

        const menor = this.encontrarMenor();
        const indices: number[] = [];

        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] === menor) {
                indices[indices.length] = i;
            }
        }

        return indices;
    }

    /**
     * Verifica se todos os elementos da lista são iguais
     * @returns true se todos os elementos forem iguais (amplitude = 0)
     */
    public todosElementosIguais(): boolean {
        return this.amplitude() === 0;
    }

    /**
     * Calcula estatísticas básicas da lista
     * @returns Objeto com estatísticas: maior, menor, amplitude, média
     */
    public estatisticas(): { maior: number; menor: number; amplitude: number; media: number } {
        if (this.elementos.length === 0) {
            return { maior: 0, menor: 0, amplitude: 0, media: 0 };
        }

        const { maior, menor } = this.encontrarMaiorEMenor();
        const amplitude = maior - menor;
        const media = this.calcularMedia();

        return { maior, menor, amplitude, media };
    }

    // Métodos dos exercícios anteriores
    public inverte(): void {
        const tamanho = this.elementos.length;
        
        for (let i = 0; i < tamanho / 2; i++) {
            const indiceFinal = tamanho - 1 - i;
            const temp = this.elementos[i];
            this.elementos[i] = this.elementos[indiceFinal];
            this.elementos[indiceFinal] = temp;
        }
    }

    public fatia(inicio: number, fim: number): void {
        if (inicio < 0) inicio = 0;
        if (fim >= this.elementos.length) fim = this.elementos.length - 1;
        
        if (inicio > fim) {
            this.elementos = [];
            return;
        }

        const novosElementos: number[] = [];
        for (let i = inicio; i <= fim; i++) {
            novosElementos[novosElementos.length] = this.elementos[i];
        }
        this.elementos = novosElementos;
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
console.log("=== EXERCÍCIO 9 - AMPLITUDE ===");

// Teste 1: Lista com elementos diversos
const lista1 = ListaComAmplitude.comElementos([10, 5, 20, 15, 3, 25]);
console.log("Lista:", lista1.toString());
console.log("Maior elemento:", lista1.encontrarMaior());
console.log("Menor elemento:", lista1.encontrarMenor());
console.log("Amplitude:", lista1.amplitude());

// Teste 2: Lista com elementos iguais
const lista2 = ListaComAmplitude.comElementos([7, 7, 7, 7, 7]);
console.log("\nLista com elementos iguais:", lista2.toString());
console.log("Maior elemento:", lista2.encontrarMaior());
console.log("Menor elemento:", lista2.encontrarMenor());
console.log("Amplitude:", lista2.amplitude());
console.log("Todos elementos iguais?", lista2.todosElementosIguais());

// Teste 3: Lista com um único elemento
const lista3 = ListaComAmplitude.comElementos([42]);
console.log("\nLista com um elemento:", lista3.toString());
console.log("Amplitude:", lista3.amplitude());

// Teste 4: Lista com números negativos e positivos
const lista4 = ListaComAmplitude.comElementos([-10, -5, 0, 5, 10]);
console.log("\nLista com negativos e positivos:", lista4.toString());
console.log("Maior:", lista4.encontrarMaior());
console.log("Menor:", lista4.encontrarMenor());
console.log("Amplitude:", lista4.amplitude());

// Teste 5: Lista com elementos duplicados nos extremos
const lista5 = ListaComAmplitude.comElementos([1, 5, 1, 10, 3, 10, 1]);
console.log("\nLista com extremos duplicados:", lista5.toString());
console.log("Maior:", lista5.encontrarMaior());
console.log("Menor:", lista5.encontrarMenor());
console.log("Índices do maior:", lista5.indicesDoMaior());
console.log("Índices do menor:", lista5.indicesDoMenor());
console.log("Amplitude:", lista5.amplitude());

// Teste 6: Estatísticas completas
const lista6 = ListaComAmplitude.comElementos([2, 8, 4, 6, 10, 1, 9]);
console.log("\nLista para estatísticas:", lista6.toString());
const stats = lista6.estatisticas();
console.log("Estatísticas completas:");
console.log("- Maior:", stats.maior);
console.log("- Menor:", stats.menor);
console.log("- Amplitude:", stats.amplitude);
console.log("- Média:", stats.media.toFixed(2));

// Teste 7: Lista vazia
const lista7 = ListaComAmplitude.comElementos([]);
console.log("\nLista vazia:", lista7.toString());
console.log("Amplitude da lista vazia:", lista7.amplitude());

// Teste 8: Lista com grande amplitude
const lista8 = ListaComAmplitude.comElementos([1, 100]);
console.log("\nLista com grande amplitude:", lista8.toString());
console.log("Amplitude:", lista8.amplitude());

// Teste 9: Lista aleatória
const lista9 = new ListaComAmplitude(10);
console.log("\nLista aleatória:", lista9.toString());
console.log("Amplitude:", lista9.amplitude());

// Teste 10: Operações combinadas
const lista10 = ListaComAmplitude.comElementos([50, 20, 80, 10, 90, 30, 70, 40, 60]);
console.log("\nLista original:", lista10.toString());
console.log("Amplitude original:", lista10.amplitude());

lista10.removeAbaixoDeCorte(40);
console.log("Após remover < 40:", lista10.toString());
console.log("Nova amplitude:", lista10.amplitude());

lista10.inverte();
console.log("Após inverter:", lista10.toString());
console.log("Amplitude após inversão:", lista10.amplitude()); // Deve ser a mesma

export { ListaComAmplitude };
