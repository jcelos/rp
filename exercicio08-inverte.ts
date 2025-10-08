/**
 * EXERCÍCIO 8 - INVERTE
 * 
 * Na mesma classe do exercício anterior, implemente um método que inverta a lista. Com
 * isso, o primeiro elemento se tornará o último, o segundo será o penúltimo e, assim, sucessivamente.
 * Não use métodos predefinidos como reverse().
 */

class ListaComInversao {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    /**
     * Construtor alternativo que aceita elementos específicos
     */
    public static comElementos(elementos: number[]): ListaComInversao {
        const lista = new ListaComInversao(0);
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
     * Inverte a ordem dos elementos na lista
     * O primeiro elemento se torna o último, o segundo se torna o penúltimo, etc.
     * Implementação usando troca de elementos das extremidades para o centro
     */
    public inverte(): void {
        const tamanho = this.elementos.length;
        
        // Percorre até a metade da lista, trocando elementos simétricos
        for (let i = 0; i < tamanho / 2; i++) {
            // Calcula o índice do elemento correspondente do final
            const indiceFinal = tamanho - 1 - i;
            
            // Troca os elementos usando uma variável temporária
            const temp = this.elementos[i];
            this.elementos[i] = this.elementos[indiceFinal];
            this.elementos[indiceFinal] = temp;
        }
    }

    /**
     * Implementação alternativa da inversão usando um array auxiliar
     * (para demonstrar uma abordagem diferente)
     */
    public inverteComArrayAuxiliar(): void {
        const elementosInvertidos: number[] = [];
        
        // Copia elementos na ordem inversa
        for (let i = this.elementos.length - 1; i >= 0; i--) {
            elementosInvertidos[elementosInvertidos.length] = this.elementos[i];
        }
        
        // Substitui o array original
        this.elementos = elementosInvertidos;
    }

    /**
     * Inverte apenas uma parte específica da lista (entre dois índices)
     * @param inicio Índice inicial da seção a ser invertida
     * @param fim Índice final da seção a ser invertida
     */
    public inverteParcial(inicio: number, fim: number): void {
        // Validação dos índices
        if (inicio < 0) inicio = 0;
        if (fim >= this.elementos.length) fim = this.elementos.length - 1;
        if (inicio >= fim) return;

        // Inverte apenas a seção especificada
        while (inicio < fim) {
            const temp = this.elementos[inicio];
            this.elementos[inicio] = this.elementos[fim];
            this.elementos[fim] = temp;
            
            inicio++;
            fim--;
        }
    }

    /**
     * Verifica se a lista está em ordem crescente
     * @returns true se estiver em ordem crescente
     */
    public estaEmOrdemCrescente(): boolean {
        for (let i = 1; i < this.elementos.length; i++) {
            if (this.elementos[i] < this.elementos[i - 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Verifica se a lista está em ordem decrescente
     * @returns true se estiver em ordem decrescente
     */
    public estaEmOrdemDecrescente(): boolean {
        for (let i = 1; i < this.elementos.length; i++) {
            if (this.elementos[i] > this.elementos[i - 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Cria uma cópia da lista atual
     * @returns Nova instância com os mesmos elementos
     */
    public clonar(): ListaComInversao {
        return ListaComInversao.comElementos(this.elementos);
    }

    // Métodos dos exercícios anteriores
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
console.log("=== EXERCÍCIO 8 - INVERTE ===");

// Teste 1: Inversão básica
const lista1 = ListaComInversao.comElementos([1, 2, 3, 4, 5]);
console.log("Lista original:", lista1.toString());

lista1.inverte();
console.log("Lista invertida:", lista1.toString());

// Teste 2: Lista com números diferentes
const lista2 = ListaComInversao.comElementos([10, 20, 30, 40, 50, 60]);
console.log("\nLista original:", lista2.toString());

lista2.inverte();
console.log("Lista invertida:", lista2.toString());

// Teste 3: Lista com um único elemento
const lista3 = ListaComInversao.comElementos([42]);
console.log("\nLista com um elemento:", lista3.toString());

lista3.inverte();
console.log("Após inversão:", lista3.toString());

// Teste 4: Lista com dois elementos
const lista4 = ListaComInversao.comElementos([7, 14]);
console.log("\nLista com dois elementos:", lista4.toString());

lista4.inverte();
console.log("Após inversão:", lista4.toString());

// Teste 5: Lista vazia
const lista5 = ListaComInversao.comElementos([]);
console.log("\nLista vazia:", lista5.toString());

lista5.inverte();
console.log("Após inversão:", lista5.toString());

// Teste 6: Dupla inversão (deve voltar ao original)
const lista6 = ListaComInversao.comElementos([1, 3, 5, 7, 9]);
console.log("\nLista original:", lista6.toString());

lista6.inverte();
console.log("Primeira inversão:", lista6.toString());

lista6.inverte();
console.log("Segunda inversão (volta ao original):", lista6.toString());

// Teste 7: Inversão parcial
const lista7 = ListaComInversao.comElementos([1, 2, 3, 4, 5, 6, 7, 8]);
console.log("\nLista original:", lista7.toString());

lista7.inverteParcial(2, 5); // Inverte elementos dos índices 2 a 5
console.log("Inversão parcial (índices 2-5):", lista7.toString());

// Teste 8: Comparando implementações
const lista8a = ListaComInversao.comElementos([10, 20, 30, 40, 50]);
const lista8b = lista8a.clonar();

console.log("\nListas originais idênticas:");
console.log("Lista A:", lista8a.toString());
console.log("Lista B:", lista8b.toString());

lista8a.inverte(); // Usando método principal
lista8b.inverteComArrayAuxiliar(); // Usando método alternativo

console.log("Após inversão (ambos métodos):");
console.log("Lista A (método principal):", lista8a.toString());
console.log("Lista B (método auxiliar):", lista8b.toString());

// Teste 9: Verificação de ordem
const lista9 = ListaComInversao.comElementos([1, 2, 3, 4, 5]);
console.log("\nLista crescente:", lista9.toString());
console.log("Está em ordem crescente?", lista9.estaEmOrdemCrescente());
console.log("Está em ordem decrescente?", lista9.estaEmOrdemDecrescente());

lista9.inverte();
console.log("Lista após inversão:", lista9.toString());
console.log("Está em ordem crescente?", lista9.estaEmOrdemCrescente());
console.log("Está em ordem decrescente?", lista9.estaEmOrdemDecrescente());

// Teste 10: Lista aleatória
const lista10 = new ListaComInversao(8);
console.log("\nLista aleatória:", lista10.toString());

lista10.inverte();
console.log("Lista aleatória invertida:", lista10.toString());

export { ListaComInversao };
