/**
 * EXERCÍCIO MÉDIO 2 - PILHA (STACK) MANUAL
 * 
 * Implemente uma estrutura de dados Pilha (Stack) usando apenas arrays básicos.
 * A pilha segue o princípio LIFO (Last In, First Out).
 * Implemente operações fundamentais e aplicações práticas.
 */

class PilhaManual<T> {
    private elementos: T[];
    private topo: number;
    private capacidadeMaxima: number;

    constructor(capacidade: number = 100) {
        this.elementos = [];
        this.topo = -1; // -1 indica pilha vazia
        this.capacidadeMaxima = capacidade;
    }

    /**
     * Adiciona um elemento no topo da pilha (PUSH)
     */
    public empilhar(elemento: T): boolean {
        if (this.estaCheia()) {
            return false; // Pilha cheia
        }
        
        this.topo++;
        this.elementos[this.topo] = elemento;
        return true;
    }

    /**
     * Remove e retorna o elemento do topo da pilha (POP)
     */
    public desempilhar(): T | null {
        if (this.estaVazia()) {
            return null; // Pilha vazia
        }
        
        const elemento = this.elementos[this.topo];
        this.topo--;
        return elemento;
    }

    /**
     * Retorna o elemento do topo sem removê-lo (PEEK/TOP)
     */
    public obterTopo(): T | null {
        if (this.estaVazia()) {
            return null;
        }
        return this.elementos[this.topo];
    }

    /**
     * Verifica se a pilha está vazia
     */
    public estaVazia(): boolean {
        return this.topo === -1;
    }

    /**
     * Verifica se a pilha está cheia
     */
    public estaCheia(): boolean {
        return this.topo === this.capacidadeMaxima - 1;
    }

    /**
     * Retorna o número de elementos na pilha
     */
    public tamanho(): number {
        return this.topo + 1;
    }

    /**
     * Esvazia a pilha
     */
    public limpar(): void {
        this.topo = -1;
    }

    /**
     * Retorna uma representação em string da pilha
     */
    public toString(): string {
        if (this.estaVazia()) {
            return "Pilha: []";
        }
        
        let resultado = "Pilha: [";
        for (let i = 0; i <= this.topo; i++) {
            resultado += this.elementos[i];
            if (i < this.topo) {
                resultado += ", ";
            }
        }
        resultado += "] ← topo";
        return resultado;
    }

    /**
     * Retorna uma visualização vertical da pilha
     */
    public visualizarVertical(): string {
        if (this.estaVazia()) {
            return "Pilha vazia";
        }
        
        let resultado = "Pilha (vertical):\n";
        resultado += "┌─────────┐\n";
        
        for (let i = this.topo; i >= 0; i--) {
            const marcador = i === this.topo ? " ← topo" : "";
            resultado += `│   ${String(this.elementos[i]).padStart(3)}   │${marcador}\n`;
        }
        
        resultado += "└─────────┘";
        return resultado;
    }

    /**
     * Busca um elemento na pilha (retorna posição a partir do topo)
     */
    public buscar(elemento: T): number {
        for (let i = this.topo; i >= 0; i--) {
            if (this.elementos[i] === elemento) {
                return this.topo - i; // Posição a partir do topo (0 = topo)
            }
        }
        return -1; // Não encontrado
    }

    /**
     * Retorna uma cópia dos elementos como array
     */
    public paraArray(): T[] {
        const copia: T[] = [];
        for (let i = 0; i <= this.topo; i++) {
            copia[i] = this.elementos[i];
        }
        return copia;
    }

    public getCapacidade(): number {
        return this.capacidadeMaxima;
    }

    public espacoDisponivel(): number {
        return this.capacidadeMaxima - this.tamanho();
    }
}

/**
 * Classe com aplicações práticas da pilha
 */
class AplicacoesPilha {
    
    /**
     * Verifica se parênteses estão balanceados usando pilha
     */
    public static verificarParenteses(expressao: string): boolean {
        const pilha = new PilhaManual<string>(expressao.length);
        
        for (let i = 0; i < expressao.length; i++) {
            const char = expressao[i];
            
            if (char === '(' || char === '[' || char === '{') {
                pilha.empilhar(char);
            } else if (char === ')' || char === ']' || char === '}') {
                if (pilha.estaVazia()) {
                    return false; // Fechamento sem abertura
                }
                
                const abertura = pilha.desempilhar();
                
                // Verifica se a abertura corresponde ao fechamento
                if ((char === ')' && abertura !== '(') ||
                    (char === ']' && abertura !== '[') ||
                    (char === '}' && abertura !== '{')) {
                    return false;
                }
            }
        }
        
        return pilha.estaVazia(); // Deve estar vazia se balanceada
    }
    
    /**
     * Inverte uma string usando pilha
     */
    public static inverterString(texto: string): string {
        const pilha = new PilhaManual<string>(texto.length);
        
        // Empilha todos os caracteres
        for (let i = 0; i < texto.length; i++) {
            pilha.empilhar(texto[i]);
        }
        
        // Desempilha para formar string invertida
        let resultado = "";
        while (!pilha.estaVazia()) {
            resultado += pilha.desempilhar();
        }
        
        return resultado;
    }
    
    /**
     * Converte número decimal para binário usando pilha
     */
    public static decimalParaBinario(numero: number): string {
        if (numero === 0) return "0";
        
        const pilha = new PilhaManual<number>(32); // 32 bits suficientes
        let num = numero;
        
        // Empilha os restos das divisões por 2
        while (num > 0) {
            pilha.empilhar(num % 2);
            num = Math.floor(num / 2);
        }
        
        // Desempilha para formar o número binário
        let binario = "";
        while (!pilha.estaVazia()) {
            binario += pilha.desempilhar();
        }
        
        return binario;
    }
    
    /**
     * Avalia expressão em notação pós-fixa (RPN)
     */
    public static avaliarPostfixa(expressao: string[]): number {
        const pilha = new PilhaManual<number>(expressao.length);
        
        for (let i = 0; i < expressao.length; i++) {
            const token = expressao[i];
            
            if (this.eNumero(token)) {
                pilha.empilhar(parseFloat(token));
            } else {
                // É um operador
                if (pilha.tamanho() < 2) {
                    throw new Error("Expressão inválida: operador sem operandos suficientes");
                }
                
                const b = pilha.desempilhar()!;
                const a = pilha.desempilhar()!;
                
                let resultado: number;
                switch (token) {
                    case '+':
                        resultado = a + b;
                        break;
                    case '-':
                        resultado = a - b;
                        break;
                    case '*':
                        resultado = a * b;
                        break;
                    case '/':
                        if (b === 0) throw new Error("Divisão por zero");
                        resultado = a / b;
                        break;
                    default:
                        throw new Error(`Operador desconhecido: ${token}`);
                }
                
                pilha.empilhar(resultado);
            }
        }
        
        if (pilha.tamanho() !== 1) {
            throw new Error("Expressão inválida: deve restar apenas um resultado");
        }
        
        return pilha.desempilhar()!;
    }
    
    private static eNumero(str: string): boolean {
        return !isNaN(parseFloat(str));
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO MÉDIO 2 - PILHA (STACK) MANUAL ===");

// Teste 1: Operações básicas da pilha
const pilha = new PilhaManual<number>(5);
console.log("Pilha criada com capacidade 5:");
console.log(pilha.toString());
console.log("Está vazia:", pilha.estaVazia());

// Empilha elementos
console.log("\nEmpilhando elementos 10, 20, 30:");
pilha.empilhar(10);
pilha.empilhar(20);
pilha.empilhar(30);
console.log(pilha.toString());
console.log(pilha.visualizarVertical());

// Teste 2: Operações de consulta
console.log("\nOperações de consulta:");
console.log("Topo:", pilha.obterTopo());
console.log("Tamanho:", pilha.tamanho());
console.log("Buscar 20:", pilha.buscar(20), "posições do topo");
console.log("Buscar 40:", pilha.buscar(40));

// Teste 3: Desempilhar
console.log("\nDesempilhando elementos:");
console.log("Removido:", pilha.desempilhar());
console.log("Removido:", pilha.desempilhar());
console.log(pilha.toString());

// Teste 4: Aplicação - Verificar parênteses
console.log("\n--- APLICAÇÃO: VERIFICAR PARÊNTESES ---");
const expressoes = [
    "(a + b)",
    "{[()]}", 
    "((()))",
    "(a + b]",
    "((())",
    "{[}]"
];

for (let i = 0; i < expressoes.length; i++) {
    const expr = expressoes[i];
    const balanceada = AplicacoesPilha.verificarParenteses(expr);
    console.log(`"${expr}": ${balanceada ? "✓ Balanceada" : "✗ Não balanceada"}`);
}

// Teste 5: Aplicação - Inverter string
console.log("\n--- APLICAÇÃO: INVERTER STRING ---");
const textos = ["HELLO", "TypeScript", "12345"];
for (let i = 0; i < textos.length; i++) {
    const texto = textos[i];
    const invertido = AplicacoesPilha.inverterString(texto);
    console.log(`"${texto}" → "${invertido}"`);
}

// Teste 6: Aplicação - Decimal para binário
console.log("\n--- APLICAÇÃO: DECIMAL PARA BINÁRIO ---");
const numeros = [10, 25, 42, 255];
for (let i = 0; i < numeros.length; i++) {
    const num = numeros[i];
    const binario = AplicacoesPilha.decimalParaBinario(num);
    console.log(`${num} → ${binario}`);
}

// Teste 7: Aplicação - Avaliação pós-fixa
console.log("\n--- APLICAÇÃO: AVALIAÇÃO PÓS-FIXA (RPN) ---");
const expressoes_rpn = [
    ["3", "4", "+"],           // 3 + 4 = 7
    ["15", "7", "1", "1", "+", "-", "/", "3", "*", "2", "1", "1", "+", "+", "-"], // Complexa
    ["5", "1", "2", "+", "4", "*", "+", "3", "-"]  // 5 + ((1 + 2) * 4) - 3 = 14
];

for (let i = 0; i < expressoes_rpn.length; i++) {
    const expr = expressoes_rpn[i];
    try {
        const resultado = AplicacoesPilha.avaliarPostfixa(expr);
        console.log(`[${expr.join(", ")}] = ${resultado}`);
    } catch (error) {
        console.log(`[${expr.join(", ")}] = Erro: ${error}`);
    }
}

export { PilhaManual, AplicacoesPilha };
