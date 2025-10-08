/**
 * EXERCÍCIO 5 - MAIS PRÓXIMO DA MÉDIA
 * 
 * Na mesma classe do exercício anterior, implemente um método que
 * retorne o número mais próximo da média dos elementos. Caso haja números igualmente próximos da
 * média, retorne o primeiro encontrado.
 */

class ListaComMedia {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    /**
     * Construtor alternativo que aceita elementos específicos
     */
    public static comElementos(elementos: number[]): ListaComMedia {
        const lista = new ListaComMedia(0);
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
     * Calcula a média aritmética dos elementos da lista
     * @returns A média dos elementos
     */
    public calcularMedia(): number {
        if (this.elementos.length === 0) {
            return 0;
        }

        let soma = 0;
        for (let i = 0; i < this.elementos.length; i++) {
            soma += this.elementos[i];
        }

        return soma / this.elementos.length;
    }

    /**
     * Calcula o valor absoluto de um número (sem usar Math.abs)
     * @param numero Número para calcular o valor absoluto
     * @returns Valor absoluto do número
     */
    private valorAbsoluto(numero: number): number {
        return numero < 0 ? -numero : numero;
    }

    /**
     * Encontra o elemento mais próximo da média dos elementos
     * Caso haja elementos igualmente próximos, retorna o primeiro encontrado
     * @returns O elemento mais próximo da média
     */
    public maisProximoDaMedia(): number {
        if (this.elementos.length === 0) {
            throw new Error("Lista vazia - não é possível calcular");
        }

        const media = this.calcularMedia();
        let elementoMaisProximo = this.elementos[0];
        let menorDistancia = this.valorAbsoluto(this.elementos[0] - media);

        // Percorre todos os elementos procurando o mais próximo da média
        for (let i = 1; i < this.elementos.length; i++) {
            const distanciaAtual = this.valorAbsoluto(this.elementos[i] - media);
            
            // Se encontrou uma distância menor, atualiza o elemento mais próximo
            if (distanciaAtual < menorDistancia) {
                menorDistancia = distanciaAtual;
                elementoMaisProximo = this.elementos[i];
            }
            // Se a distância é igual, mantém o primeiro encontrado (não atualiza)
        }

        return elementoMaisProximo;
    }

    /**
     * Retorna todos os elementos que estão à mesma distância mínima da média
     * @returns Array com todos os elementos mais próximos da média
     */
    public todosOsMaisProximosDaMedia(): number[] {
        if (this.elementos.length === 0) {
            return [];
        }

        const media = this.calcularMedia();
        let menorDistancia = this.valorAbsoluto(this.elementos[0] - media);

        // Primeira passada: encontra a menor distância
        for (let i = 1; i < this.elementos.length; i++) {
            const distanciaAtual = this.valorAbsoluto(this.elementos[i] - media);
            if (distanciaAtual < menorDistancia) {
                menorDistancia = distanciaAtual;
            }
        }

        // Segunda passada: coleta todos os elementos com a menor distância
        const elementosMaisProximos: number[] = [];
        for (let i = 0; i < this.elementos.length; i++) {
            const distanciaAtual = this.valorAbsoluto(this.elementos[i] - media);
            if (distanciaAtual === menorDistancia) {
                elementosMaisProximos[elementosMaisProximos.length] = this.elementos[i];
            }
        }

        return elementosMaisProximos;
    }

    /**
     * Retorna a distância do elemento mais próximo até a média
     * @returns A menor distância encontrada
     */
    public menorDistanciaDaMedia(): number {
        if (this.elementos.length === 0) {
            return 0;
        }

        const media = this.calcularMedia();
        let menorDistancia = this.valorAbsoluto(this.elementos[0] - media);

        for (let i = 1; i < this.elementos.length; i++) {
            const distanciaAtual = this.valorAbsoluto(this.elementos[i] - media);
            if (distanciaAtual < menorDistancia) {
                menorDistancia = distanciaAtual;
            }
        }

        return menorDistancia;
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
     * Remove elementos em posições múltiplas de um número
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
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 5 - MAIS PRÓXIMO DA MÉDIA ===");

// Teste 1: Lista com elementos conhecidos
const lista1 = ListaComMedia.comElementos([10, 20, 30, 40, 50]);
console.log("Lista:", lista1.toString());
console.log("Média:", lista1.calcularMedia().toFixed(2));
console.log("Mais próximo da média:", lista1.maisProximoDaMedia());
console.log("Menor distância da média:", lista1.menorDistanciaDaMedia().toFixed(2));
console.log("Todos os mais próximos:", lista1.todosOsMaisProximosDaMedia());

// Teste 2: Lista com elementos que têm a mesma distância da média
const lista2 = ListaComMedia.comElementos([1, 3, 7, 9]); // média = 5, distâncias: 4, 2, 2, 4
console.log("\nLista:", lista2.toString());
console.log("Média:", lista2.calcularMedia().toFixed(2));
console.log("Mais próximo da média:", lista2.maisProximoDaMedia());
console.log("Todos os mais próximos:", lista2.todosOsMaisProximosDaMedia());

// Teste 3: Lista com um único elemento
const lista3 = ListaComMedia.comElementos([42]);
console.log("\nLista:", lista3.toString());
console.log("Média:", lista3.calcularMedia().toFixed(2));
console.log("Mais próximo da média:", lista3.maisProximoDaMedia());

// Teste 4: Lista com elementos iguais
const lista4 = ListaComMedia.comElementos([5, 5, 5, 5]);
console.log("\nLista:", lista4.toString());
console.log("Média:", lista4.calcularMedia().toFixed(2));
console.log("Mais próximo da média:", lista4.maisProximoDaMedia());

// Teste 5: Lista com números negativos e positivos
const lista5 = ListaComMedia.comElementos([-10, -5, 0, 5, 10]);
console.log("\nLista:", lista5.toString());
console.log("Média:", lista5.calcularMedia().toFixed(2));
console.log("Mais próximo da média:", lista5.maisProximoDaMedia());

// Teste 6: Lista aleatória
const lista6 = new ListaComMedia(8);
console.log("\nLista aleatória:", lista6.toString());
console.log("Média:", lista6.calcularMedia().toFixed(2));
console.log("Mais próximo da média:", lista6.maisProximoDaMedia());

// Teste 7: Casos com empate - primeiro encontrado deve ser retornado
const lista7 = ListaComMedia.comElementos([10, 30, 20, 40]); // média = 25, elementos 20 e 30 estão a distância 5
console.log("\nLista:", lista7.toString());
console.log("Média:", lista7.calcularMedia().toFixed(2));
console.log("Mais próximo da média (primeiro encontrado):", lista7.maisProximoDaMedia());
console.log("Todos os mais próximos:", lista7.todosOsMaisProximosDaMedia());

/**
 * PROBLEMA CLÁSSICO DE JOSEPHUS
 * 
 * Implementação eficiente do problema de Josephus que funciona para números grandes.
 * O problema: n pessoas em círculo, elimina-se cada k-ésima pessoa até restar apenas uma.
 */
class JosephusClassico {
    
    /**
     * Resolve o problema de Josephus usando a fórmula matemática recursiva
     * Mais eficiente que simulação para números grandes
     * @param n Número de pessoas no círculo
     * @param k Passo de eliminação (elimina cada k-ésima pessoa)
     * @returns Posição do sobrevivente (1-indexado)
     */
    public static josephus(n: number, k: number): number {
        if (n < 1 || k < 1) {
            throw new Error("n e k devem ser maiores ou iguais a 1");
        }
        
        // Caso base: se há apenas 1 pessoa, ela é a sobrevivente (posição 0 em 0-indexado)
        if (n === 1) {
            return 1; // Retorna 1-indexado
        }
        
        // Fórmula recursiva: J(n,k) = (J(n-1,k) + k) % n
        // Mas implementamos iterativamente para eficiência
        let resultado = 0; // Começamos com 0-indexado
        
        for (let i = 2; i <= n; i++) {
            resultado = (resultado + k) % i;
        }
        
        return resultado + 1; // Converte para 1-indexado
    }
    
    /**
     * Versão com simulação para números pequenos (demonstração educativa)
     * @param n Número de pessoas
     * @param k Passo de eliminação
     * @returns Posição do sobrevivente (1-indexado)
     */
    public static josephusSimulacao(n: number, k: number): number {
        if (n < 1 || k < 1) {
            throw new Error("n e k devem ser maiores ou iguais a 1");
        }
        
        // Cria array representando as pessoas (1 a n)
        const people: number[] = [];
        for (let i = 1; i <= n; i++) {
            people[people.length] = i;
        }
        
        let position = 0; // Posição atual no círculo
        
        console.log(`\n=== SIMULAÇÃO JOSEPHUS (n=${n}, k=${k}) ===`);
        console.log("Círculo inicial:", people);
        
        // Continua eliminando até restar apenas 1 pessoa
        while (people.length > 1) {
            // Calcula a posição da próxima pessoa a ser eliminada
            position = (position + k - 1) % people.length;
            
            const eliminated = people[position];
            console.log(`Eliminando pessoa ${eliminated} da posição ${position + 1}`);
            
            // Remove a pessoa eliminada
            const newPeople: number[] = [];
            for (let i = 0; i < people.length; i++) {
                if (i !== position) {
                    newPeople[newPeople.length] = people[i];
                }
            }
            
            // Atualiza o array
            for (let i = 0; i < newPeople.length; i++) {
                people[i] = newPeople[i];
            }
            people.length = newPeople.length;
            
            // Ajusta a posição se necessário
            if (position >= people.length) {
                position = 0;
            }
            
            console.log("Círculo atual:", people);
        }
        
        const survivor = people[0];
        console.log(`🏆 SOBREVIVENTE: ${survivor}`);
        return survivor;
    }
    
    /**
     * Versão recursiva da solução matemática (para demonstração)
     * @param n Número de pessoas
     * @param k Passo de eliminação
     * @returns Posição do sobrevivente (0-indexado)
     */
    private static josephusRecursivo(n: number, k: number): number {
        if (n === 1) {
            return 0; // 0-indexado
        }
        return (this.josephusRecursivo(n - 1, k) + k) % n;
    }
    
    /**
     * Compara as diferentes implementações para verificar consistência
     * @param n Número de pessoas
     * @param k Passo de eliminação
     */
    public static testarImplementacoes(n: number, k: number): void {
        console.log(`\n=== TESTE DE IMPLEMENTAÇÕES (n=${n}, k=${k}) ===`);
        
        const resultadoIterativo = this.josephus(n, k);
        const resultadoRecursivo = this.josephusRecursivo(n, k) + 1; // Converte para 1-indexado
        
        console.log(`Resultado iterativo: ${resultadoIterativo}`);
        console.log(`Resultado recursivo: ${resultadoRecursivo}`);
        
        if (n <= 10) { // Só simula para números pequenos
            const resultadoSimulacao = this.josephusSimulacao(n, k);
            console.log(`Resultado simulação: ${resultadoSimulacao}`);
            
            const todosIguais = resultadoIterativo === resultadoRecursivo && 
                               resultadoRecursivo === resultadoSimulacao;
            console.log(`✅ Todas implementações consistentes: ${todosIguais}`);
        } else {
            const todosIguais = resultadoIterativo === resultadoRecursivo;
            console.log(`✅ Implementações matemáticas consistentes: ${todosIguais}`);
        }
    }
}

// Exemplos e testes do problema de Josephus
console.log("\n" + "=".repeat(60));
console.log("=== PROBLEMA CLÁSSICO DE JOSEPHUS ===");

// Teste 1: Exemplo do kata (n=7, k=3)
console.log("\n--- Teste 1: Exemplo do kata ---");
const resultado1 = JosephusClassico.josephus(7, 3);
console.log(`Josephus(7, 3) = ${resultado1}`); // Deve ser 4

// Teste 2: Simulação para verificar
JosephusClassico.josephusSimulacao(7, 3);

// Teste 3: Casos pequenos
console.log("\n--- Teste 3: Casos pequenos ---");
console.log(`Josephus(1, 1) = ${JosephusClassico.josephus(1, 1)}`); // 1
console.log(`Josephus(2, 1) = ${JosephusClassico.josephus(2, 1)}`); // 2
console.log(`Josephus(3, 2) = ${JosephusClassico.josephus(3, 2)}`); // 3

// Teste 4: Casos médios
console.log("\n--- Teste 4: Casos médios ---");
console.log(`Josephus(5, 2) = ${JosephusClassico.josephus(5, 2)}`);
console.log(`Josephus(10, 3) = ${JosephusClassico.josephus(10, 3)}`);

// Teste 5: Números grandes (onde simulação seria lenta)
console.log("\n--- Teste 5: Números grandes ---");
console.log(`Josephus(1000, 3) = ${JosephusClassico.josephus(1000, 3)}`);
console.log(`Josephus(10000, 7) = ${JosephusClassico.josephus(10000, 7)}`);
console.log(`Josephus(1000000, 2) = ${JosephusClassico.josephus(1000000, 2)}`);

// Teste 6: Comparação de implementações
JosephusClassico.testarImplementacoes(5, 2);
JosephusClassico.testarImplementacoes(8, 3);

// Teste 7: Casos extremos
console.log("\n--- Teste 7: Casos extremos ---");
console.log(`Josephus(100, 1) = ${JosephusClassico.josephus(100, 1)}`); // k=1 sempre elimina em sequência
console.log(`Josephus(10, 10) = ${JosephusClassico.josephus(10, 10)}`); // k=n

export { ListaComMedia, JosephusClassico };
