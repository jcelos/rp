/**
 * EXERCÍCIO BÁSICO 13 - FILA COM ARRAY CIRCULAR
 * 
 * Implementa uma fila (queue) usando array circular,
 * demonstrando o conceito FIFO (First In, First Out).
 */

/**
 * Fila implementada com array circular
 */
class FilaCircular<T> {
    private elementos: T[];
    private frente: number;
    private tras: number;
    private tamanhoAtual: number;
    private capacidadeMaxima: number;
    
    constructor(capacidade: number = 10) {
        this.elementos = new Array(capacidade);
        this.frente = 0;
        this.tras = 0;
        this.tamanhoAtual = 0;
        this.capacidadeMaxima = capacidade;
    }
    
    /**
     * Adiciona elemento no final da fila
     */
    public enfileirar(elemento: T): boolean {
        if (this.estaCheia()) {
            return false;
        }
        
        this.elementos[this.tras] = elemento;
        this.tras = (this.tras + 1) % this.capacidadeMaxima;
        this.tamanhoAtual++;
        
        return true;
    }
    
    /**
     * Remove e retorna elemento da frente da fila
     */
    public desenfileirar(): T | null {
        if (this.estaVazia()) {
            return null;
        }
        
        const elemento = this.elementos[this.frente];
        this.frente = (this.frente + 1) % this.capacidadeMaxima;
        this.tamanhoAtual--;
        
        return elemento;
    }
    
    /**
     * Retorna elemento da frente sem remover
     */
    public verFrente(): T | null {
        if (this.estaVazia()) {
            return null;
        }
        
        return this.elementos[this.frente];
    }
    
    /**
     * Retorna elemento do final sem remover
     */
    public verTras(): T | null {
        if (this.estaVazia()) {
            return null;
        }
        
        const indiceTras = (this.tras - 1 + this.capacidadeMaxima) % this.capacidadeMaxima;
        return this.elementos[indiceTras];
    }
    
    /**
     * Verifica se fila está vazia
     */
    public estaVazia(): boolean {
        return this.tamanhoAtual === 0;
    }
    
    /**
     * Verifica se fila está cheia
     */
    public estaCheia(): boolean {
        return this.tamanhoAtual === this.capacidadeMaxima;
    }
    
    /**
     * Retorna tamanho atual da fila
     */
    public tamanho(): number {
        return this.tamanhoAtual;
    }
    
    /**
     * Retorna capacidade máxima
     */
    public capacidade(): number {
        return this.capacidadeMaxima;
    }
    
    /**
     * Limpa toda a fila
     */
    public limpar(): void {
        this.frente = 0;
        this.tras = 0;
        this.tamanhoAtual = 0;
    }
    
    /**
     * Converte fila para array na ordem correta
     */
    public paraArray(): T[] {
        const resultado: T[] = [];
        
        if (this.estaVazia()) {
            return resultado;
        }
        
        let indice = this.frente;
        for (let i = 0; i < this.tamanhoAtual; i++) {
            resultado[i] = this.elementos[indice];
            indice = (indice + 1) % this.capacidadeMaxima;
        }
        
        return resultado;
    }
    
    /**
     * Busca elemento na fila
     */
    public contem(elemento: T): boolean {
        if (this.estaVazia()) {
            return false;
        }
        
        let indice = this.frente;
        for (let i = 0; i < this.tamanhoAtual; i++) {
            if (this.elementos[indice] === elemento) {
                return true;
            }
            indice = (indice + 1) % this.capacidadeMaxima;
        }
        
        return false;
    }
    
    /**
     * Obtém elemento em posição específica (0 = frente)
     */
    public obterElemento(posicao: number): T | null {
        if (posicao < 0 || posicao >= this.tamanhoAtual) {
            return null;
        }
        
        const indice = (this.frente + posicao) % this.capacidadeMaxima;
        return this.elementos[indice];
    }
}

/**
 * Simulador de sistema de atendimento
 */
class SistemaAtendimento {
    private filaAtendimento: FilaCircular<string>;
    private numeroProximoTicket: number;
    
    constructor(capacidadeFila: number = 20) {
        this.filaAtendimento = new FilaCircular<string>(capacidadeFila);
        this.numeroProximoTicket = 1;
    }
    
    /**
     * Gera novo ticket para cliente
     */
    public gerarTicket(nomeCliente: string): string | null {
        const ticket = `#${this.numeroProximoTicket.toString().padStart(3, '0')} - ${nomeCliente}`;
        
        if (this.filaAtendimento.enfileirar(ticket)) {
            this.numeroProximoTicket++;
            return ticket;
        }
        
        return null; // Fila cheia
    }
    
    /**
     * Chama próximo cliente
     */
    public chamarProximo(): string | null {
        return this.filaAtendimento.desenfileirar();
    }
    
    /**
     * Verifica quem é o próximo sem chamar
     */
    public verProximo(): string | null {
        return this.filaAtendimento.verFrente();
    }
    
    /**
     * Obtém posição de um cliente na fila
     */
    public obterPosicao(ticket: string): number {
        const fila = this.filaAtendimento.paraArray();
        
        for (let i = 0; i < fila.length; i++) {
            if (fila[i] === ticket) {
                return i + 1; // Posição começa em 1
            }
        }
        
        return -1; // Não encontrado
    }
    
    /**
     * Obtém estatísticas da fila
     */
    public obterEstatisticas(): {
        clientes_na_fila: number;
        capacidade_total: number;
        proximo_ticket: number;
        fila_cheia: boolean;
        fila_vazia: boolean;
    } {
        return {
            clientes_na_fila: this.filaAtendimento.tamanho(),
            capacidade_total: this.filaAtendimento.capacidade(),
            proximo_ticket: this.numeroProximoTicket,
            fila_cheia: this.filaAtendimento.estaCheia(),
            fila_vazia: this.filaAtendimento.estaVazia()
        };
    }
    
    /**
     * Lista todos os clientes na fila
     */
    public listarFila(): string[] {
        return this.filaAtendimento.paraArray();
    }
}

/**
 * Utilitários para demonstrar conceitos de fila
 */
class UtilsFila {
    
    /**
     * Simula processo de impressão
     */
    public static simularImpressao(documentos: string[]): void {
        const filaImpressao = new FilaCircular<string>(10);
        
        console.log("=== SIMULAÇÃO DE IMPRESSÃO ===");
        
        // Adiciona documentos na fila
        for (let i = 0; i < documentos.length; i++) {
            if (filaImpressao.enfileirar(documentos[i])) {
                console.log(`Adicionado à fila: ${documentos[i]}`);
            } else {
                console.log(`Fila cheia! Não foi possível adicionar: ${documentos[i]}`);
            }
        }
        
        console.log(`\nDocumentos na fila: ${filaImpressao.tamanho()}`);
        console.log("Ordem de impressão:", filaImpressao.paraArray());
        
        // Processa impressão
        console.log("\nProcessando impressão:");
        while (!filaImpressao.estaVazia()) {
            const documento = filaImpressao.desenfileirar();
            console.log(`Imprimindo: ${documento}`);
        }
        
        console.log("Impressão concluída!");
    }
    
    /**
     * Demonstra comportamento circular
     */
    public static demonstrarCircular(): void {
        const fila = new FilaCircular<number>(5);
        
        console.log("=== DEMONSTRAÇÃO CIRCULAR ===");
        
        // Enche a fila
        for (let i = 1; i <= 5; i++) {
            fila.enfileirar(i);
        }
        console.log("Fila cheia:", fila.paraArray());
        
        // Remove alguns elementos
        fila.desenfileirar();
        fila.desenfileirar();
        console.log("Após remover 2:", fila.paraArray());
        
        // Adiciona mais elementos (demonstra comportamento circular)
        fila.enfileirar(6);
        fila.enfileirar(7);
        console.log("Após adicionar 6 e 7:", fila.paraArray());
        
        console.log("Frente:", fila.verFrente());
        console.log("Trás:", fila.verTras());
    }
}

// Exemplos de uso
console.log("=== EXERCÍCIO 13 - FILA CIRCULAR ===");

const fila = new FilaCircular<string>(4);

console.log("Fila vazia:", fila.estaVazia());

// Enfileirando elementos
fila.enfileirar("Primeiro");
fila.enfileirar("Segundo");
fila.enfileirar("Terceiro");

console.log("Fila atual:", fila.paraArray());
console.log("Frente:", fila.verFrente());
console.log("Trás:", fila.verTras());
console.log("Tamanho:", fila.tamanho());

// Desenfileirando
console.log("Desenfileirar:", fila.desenfileirar());
console.log("Fila após desenfileirar:", fila.paraArray());

// Testando capacidade
fila.enfileirar("Quarto");
fila.enfileirar("Quinto");
console.log("Tentativa de adicionar quando cheia:", fila.enfileirar("Sexto"));
console.log("Fila cheia:", fila.paraArray());

// Sistema de atendimento
console.log("\n--- SISTEMA DE ATENDIMENTO ---");
const sistema = new SistemaAtendimento(5);

// Gerando tickets
const clientes = ["João", "Maria", "Pedro", "Ana"];
for (let i = 0; i < clientes.length; i++) {
    const ticket = sistema.gerarTicket(clientes[i]);
    console.log(`Ticket gerado: ${ticket}`);
}

console.log("\nFila de atendimento:", sistema.listarFila());

// Atendendo clientes
console.log("\nChamando próximo:", sistema.chamarProximo());
console.log("Próximo na fila:", sistema.verProximo());

const stats = sistema.obterEstatisticas();
console.log("Estatísticas:", stats);

// Demonstrações adicionais
console.log("\n");
UtilsFila.simularImpressao(["Documento1.pdf", "Foto.jpg", "Relatório.docx"]);

console.log("\n");
UtilsFila.demonstrarCircular();

export { FilaCircular, SistemaAtendimento, UtilsFila };
