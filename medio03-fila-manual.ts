/**
 * EXERCÍCIO MÉDIO 3 - FILA (QUEUE) MANUAL
 * 
 * Implemente uma estrutura de dados Fila (Queue) usando apenas arrays básicos.
 * A fila segue o princípio FIFO (First In, First Out).
 * Implemente operações fundamentais e aplicações práticas.
 */

class FilaManual<T> {
    private elementos: T[];
    private inicio: number;
    private fim: number;
    private tamanhoAtual: number;
    private capacidadeMaxima: number;

    constructor(capacidade: number = 100) {
        this.elementos = [];
        this.inicio = 0;
        this.fim = 0;
        this.tamanhoAtual = 0;
        this.capacidadeMaxima = capacidade;
    }

    /**
     * Adiciona um elemento no final da fila (ENQUEUE)
     */
    public enfileirar(elemento: T): boolean {
        if (this.estaCheia()) {
            return false; // Fila cheia
        }
        
        this.elementos[this.fim] = elemento;
        this.fim = (this.fim + 1) % this.capacidadeMaxima; // Fila circular
        this.tamanhoAtual++;
        return true;
    }

    /**
     * Remove e retorna o primeiro elemento da fila (DEQUEUE)
     */
    public desenfileirar(): T | null {
        if (this.estaVazia()) {
            return null; // Fila vazia
        }
        
        const elemento = this.elementos[this.inicio];
        this.inicio = (this.inicio + 1) % this.capacidadeMaxima; // Fila circular
        this.tamanhoAtual--;
        return elemento;
    }

    /**
     * Retorna o primeiro elemento sem removê-lo (FRONT/PEEK)
     */
    public obterPrimeiro(): T | null {
        if (this.estaVazia()) {
            return null;
        }
        return this.elementos[this.inicio];
    }

    /**
     * Retorna o último elemento sem removê-lo (REAR)
     */
    public obterUltimo(): T | null {
        if (this.estaVazia()) {
            return null;
        }
        const ultimaPosicao = (this.fim - 1 + this.capacidadeMaxima) % this.capacidadeMaxima;
        return this.elementos[ultimaPosicao];
    }

    /**
     * Verifica se a fila está vazia
     */
    public estaVazia(): boolean {
        return this.tamanhoAtual === 0;
    }

    /**
     * Verifica se a fila está cheia
     */
    public estaCheia(): boolean {
        return this.tamanhoAtual === this.capacidadeMaxima;
    }

    /**
     * Retorna o número de elementos na fila
     */
    public tamanho(): number {
        return this.tamanhoAtual;
    }

    /**
     * Esvazia a fila
     */
    public limpar(): void {
        this.inicio = 0;
        this.fim = 0;
        this.tamanhoAtual = 0;
    }

    /**
     * Retorna uma representação em string da fila
     */
    public toString(): string {
        if (this.estaVazia()) {
            return "Fila: []";
        }
        
        let resultado = "Fila: [";
        let atual = this.inicio;
        
        for (let i = 0; i < this.tamanhoAtual; i++) {
            resultado += this.elementos[atual];
            if (i < this.tamanhoAtual - 1) {
                resultado += ", ";
            }
            atual = (atual + 1) % this.capacidadeMaxima;
        }
        
        resultado += "] ← fim";
        return resultado + " (início → fim)";
    }

    /**
     * Busca um elemento na fila (retorna posição a partir do início)
     */
    public buscar(elemento: T): number {
        let atual = this.inicio;
        
        for (let i = 0; i < this.tamanhoAtual; i++) {
            if (this.elementos[atual] === elemento) {
                return i; // Posição a partir do início
            }
            atual = (atual + 1) % this.capacidadeMaxima;
        }
        
        return -1; // Não encontrado
    }

    /**
     * Retorna uma cópia dos elementos como array
     */
    public paraArray(): T[] {
        const copia: T[] = [];
        let atual = this.inicio;
        
        for (let i = 0; i < this.tamanhoAtual; i++) {
            copia[i] = this.elementos[atual];
            atual = (atual + 1) % this.capacidadeMaxima;
        }
        
        return copia;
    }

    public getCapacidade(): number {
        return this.capacidadeMaxima;
    }

    public espacoDisponivel(): number {
        return this.capacidadeMaxima - this.tamanhoAtual;
    }

    /**
     * Mostra informações internas da fila (debug)
     */
    public debug(): string {
        return `Fila Debug: início=${this.inicio}, fim=${this.fim}, tamanho=${this.tamanhoAtual}, capacidade=${this.capacidadeMaxima}`;
    }
}

/**
 * Classe para simulação de filas de prioridade simples
 */
class FilaPrioridade<T> {
    private filas: FilaManual<T>[];
    private prioridades: number[];

    constructor(numeroPrioridades: number = 3, capacidadePorFila: number = 50) {
        this.filas = [];
        this.prioridades = [];
        
        for (let i = 0; i < numeroPrioridades; i++) {
            this.filas[i] = new FilaManual<T>(capacidadePorFila);
            this.prioridades[i] = i; // 0 = mais alta prioridade
        }
    }

    /**
     * Adiciona elemento com prioridade específica
     */
    public enfileirarComPrioridade(elemento: T, prioridade: number): boolean {
        if (prioridade < 0 || prioridade >= this.filas.length) {
            return false; // Prioridade inválida
        }
        
        return this.filas[prioridade].enfileirar(elemento);
    }

    /**
     * Remove elemento da fila de maior prioridade
     */
    public desenfileirar(): T | null {
        // Procura na ordem de prioridade (0 = mais alta)
        for (let i = 0; i < this.filas.length; i++) {
            if (!this.filas[i].estaVazia()) {
                return this.filas[i].desenfileirar();
            }
        }
        return null; // Todas as filas estão vazias
    }

    public estaVazia(): boolean {
        for (let i = 0; i < this.filas.length; i++) {
            if (!this.filas[i].estaVazia()) {
                return false;
            }
        }
        return true;
    }

    public toString(): string {
        let resultado = "Fila de Prioridade:\n";
        for (let i = 0; i < this.filas.length; i++) {
            resultado += `Prioridade ${i}: ${this.filas[i].toString()}\n`;
        }
        return resultado;
    }
}

/**
 * Classe com aplicações práticas da fila
 */
class AplicacoesFila {
    
    /**
     * Simulação de fila de atendimento
     */
    public static simularAtendimento(clientes: string[], tempoAtendimento: number[]): void {
        const fila = new FilaManual<string>(clientes.length);
        
        console.log("=== SIMULAÇÃO DE ATENDIMENTO ===");
        
        // Adiciona todos os clientes na fila
        for (let i = 0; i < clientes.length; i++) {
            fila.enfileirar(clientes[i]);
            console.log(`Cliente ${clientes[i]} entrou na fila`);
        }
        
        console.log(`\nFila inicial: ${fila.toString()}`);
        
        // Simula atendimento
        let tempo = 0;
        while (!fila.estaVazia()) {
            const cliente = fila.desenfileirar()!;
            const tempoGasto = tempoAtendimento[clientes.indexOf(cliente)];
            tempo += tempoGasto;
            
            console.log(`Tempo ${tempo}min: Atendendo ${cliente} (${tempoGasto}min)`);
            console.log(`Fila restante: ${fila.toString()}`);
        }
        
        console.log(`\nAtendimento concluído em ${tempo} minutos`);
    }
    
    /**
     * Gerador de números usando fila circular
     */
    public static geradorCircular(numeros: number[], ciclos: number): number[] {
        const fila = new FilaManual<number>(numeros.length);
        const resultado: number[] = [];
        
        // Inicializa a fila
        for (let i = 0; i < numeros.length; i++) {
            fila.enfileirar(numeros[i]);
        }
        
        // Gera números em ciclos
        for (let ciclo = 0; ciclo < ciclos; ciclo++) {
            for (let i = 0; i < numeros.length; i++) {
                const numero = fila.desenfileirar()!;
                resultado[resultado.length] = numero;
                fila.enfileirar(numero); // Recoloca no final
            }
        }
        
        return resultado;
    }
    
    /**
     * Verifica se sequência é palíndromo usando fila e pilha
     */
    public static ehPalindromo(sequencia: string): boolean {
        const fila = new FilaManual<string>(sequencia.length);
        const pilha: string[] = []; // Usando array como pilha simples
        let topoPilha = -1;
        
        // Adiciona caracteres na fila e pilha
        for (let i = 0; i < sequencia.length; i++) {
            const char = sequencia[i].toLowerCase();
            if (char !== ' ') { // Ignora espaços
                fila.enfileirar(char);
                topoPilha++;
                pilha[topoPilha] = char;
            }
        }
        
        // Compara elemento por elemento
        while (!fila.estaVazia() && topoPilha >= 0) {
            const daFila = fila.desenfileirar()!;
            const daPilha = pilha[topoPilha];
            topoPilha--;
            
            if (daFila !== daPilha) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Intercala duas filas ordenadas
     */
    public static intercalarFilas(fila1: FilaManual<number>, fila2: FilaManual<number>): FilaManual<number> {
        const resultado = new FilaManual<number>(fila1.tamanho() + fila2.tamanho());
        
        // Cria cópias para não modificar as originais
        const copia1 = new FilaManual<number>(fila1.tamanho());
        const copia2 = new FilaManual<number>(fila2.tamanho());
        
        const array1 = fila1.paraArray();
        const array2 = fila2.paraArray();
        
        for (let i = 0; i < array1.length; i++) {
            copia1.enfileirar(array1[i]);
        }
        for (let i = 0; i < array2.length; i++) {
            copia2.enfileirar(array2[i]);
        }
        
        // Intercala mantendo ordem
        while (!copia1.estaVazia() && !copia2.estaVazia()) {
            const val1 = copia1.obterPrimeiro()!;
            const val2 = copia2.obterPrimeiro()!;
            
            if (val1 <= val2) {
                resultado.enfileirar(copia1.desenfileirar()!);
            } else {
                resultado.enfileirar(copia2.desenfileirar()!);
            }
        }
        
        // Adiciona elementos restantes
        while (!copia1.estaVazia()) {
            resultado.enfileirar(copia1.desenfileirar()!);
        }
        while (!copia2.estaVazia()) {
            resultado.enfileirar(copia2.desenfileirar()!);
        }
        
        return resultado;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO MÉDIO 3 - FILA (QUEUE) MANUAL ===");

// Teste 1: Operações básicas da fila
const fila = new FilaManual<string>(5);
console.log("Fila criada com capacidade 5:");
console.log(fila.toString());
console.log("Está vazia:", fila.estaVazia());

// Enfileira elementos
console.log("\nEnfileirando: A, B, C");
fila.enfileirar("A");
fila.enfileirar("B");
fila.enfileirar("C");
console.log(fila.toString());
console.log("Primeiro:", fila.obterPrimeiro());
console.log("Último:", fila.obterUltimo());

// Teste 2: Desenfileirar
console.log("\nDesenfileirando elementos:");
console.log("Removido:", fila.desenfileirar());
console.log("Removido:", fila.desenfileirar());
console.log(fila.toString());

// Teste 3: Fila circular (enche e esvazia)
console.log("\n--- TESTE FILA CIRCULAR ---");
const filaCircular = new FilaManual<number>(3);
console.log("Enchendo fila (capacidade 3):");
filaCircular.enfileirar(1);
filaCircular.enfileirar(2);
filaCircular.enfileirar(3);
console.log(filaCircular.toString());
console.log(filaCircular.debug());

console.log("\nRemovendo e adicionando novos elementos:");
filaCircular.desenfileirar();
filaCircular.desenfileirar();
filaCircular.enfileirar(4);
filaCircular.enfileirar(5);
console.log(filaCircular.toString());
console.log(filaCircular.debug());

// Teste 4: Fila de prioridade
console.log("\n--- FILA DE PRIORIDADE ---");
const filaPrioridade = new FilaPrioridade<string>(3, 10);
filaPrioridade.enfileirarComPrioridade("Urgente 1", 0);
filaPrioridade.enfileirarComPrioridade("Normal 1", 1);
filaPrioridade.enfileirarComPrioridade("Baixa 1", 2);
filaPrioridade.enfileirarComPrioridade("Urgente 2", 0);
filaPrioridade.enfileirarComPrioridade("Normal 2", 1);

console.log(filaPrioridade.toString());

console.log("Desenfileirando por prioridade:");
while (!filaPrioridade.estaVazia()) {
    console.log("Processando:", filaPrioridade.desenfileirar());
}

// Teste 5: Aplicação - Simulação de atendimento
console.log("\n--- APLICAÇÃO: SIMULAÇÃO DE ATENDIMENTO ---");
const clientes = ["João", "Maria", "Pedro", "Ana"];
const tempos = [5, 3, 7, 4];

AplicacoesFila.simularAtendimento(clientes, tempos);

// Teste 6: Aplicação - Gerador circular
console.log("\n--- APLICAÇÃO: GERADOR CIRCULAR ---");
const numerosBase = [1, 2, 3];
const sequencia = AplicacoesFila.geradorCircular(numerosBase, 3);
console.log("Base:", numerosBase);
console.log("3 ciclos:", sequencia);

// Teste 7: Aplicação - Verificar palíndromo
console.log("\n--- APLICAÇÃO: VERIFICAR PALÍNDROMO ---");
const palavras = ["radar", "hello", "level", "TypeScript", "arara"];
for (let i = 0; i < palavras.length; i++) {
    const palavra = palavras[i];
    const ehPalin = AplicacoesFila.ehPalindromo(palavra);
    console.log(`"${palavra}": ${ehPalin ? "✓ É palíndromo" : "✗ Não é palíndromo"}`);
}

// Teste 8: Aplicação - Intercalar filas ordenadas
console.log("\n--- APLICAÇÃO: INTERCALAR FILAS ORDENADAS ---");
const fila1 = new FilaManual<number>(5);
const fila2 = new FilaManual<number>(5);

fila1.enfileirar(1); fila1.enfileirar(3); fila1.enfileirar(5);
fila2.enfileirar(2); fila2.enfileirar(4); fila2.enfileirar(6); fila2.enfileirar(7);

console.log("Fila 1:", fila1.toString());
console.log("Fila 2:", fila2.toString());

const filaIntercalada = AplicacoesFila.intercalarFilas(fila1, fila2);
console.log("Intercalada:", filaIntercalada.toString());

export { FilaManual, FilaPrioridade, AplicacoesFila };
