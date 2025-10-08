/**
 * EXERCÍCIO BÁSICO 12 - PILHA COM ARRAY
 * 
 * Implementa uma pilha (stack) usando array interno,
 * demonstrando o conceito LIFO (Last In, First Out).
 */

/**
 * Pilha implementada com array interno
 */
class PilhaArray<T> {
    private elementos: T[];
    private topo: number;
    private capacidadeMaxima: number;
    
    constructor(capacidade: number = 100) {
        this.elementos = new Array(capacidade);
        this.topo = -1;
        this.capacidadeMaxima = capacidade;
    }
    
    /**
     * Adiciona elemento no topo da pilha
     */
    public empilhar(elemento: T): boolean {
        if (this.estaCheia()) {
            return false;
        }
        
        this.topo++;
        this.elementos[this.topo] = elemento;
        return true;
    }
    
    /**
     * Remove e retorna elemento do topo
     */
    public desempilhar(): T | null {
        if (this.estaVazia()) {
            return null;
        }
        
        const elemento = this.elementos[this.topo];
        this.topo--;
        return elemento;
    }
    
    /**
     * Retorna elemento do topo sem remover
     */
    public verTopo(): T | null {
        if (this.estaVazia()) {
            return null;
        }
        
        return this.elementos[this.topo];
    }
    
    /**
     * Verifica se pilha está vazia
     */
    public estaVazia(): boolean {
        return this.topo === -1;
    }
    
    /**
     * Verifica se pilha está cheia
     */
    public estaCheia(): boolean {
        return this.topo === this.capacidadeMaxima - 1;
    }
    
    /**
     * Retorna tamanho atual da pilha
     */
    public tamanho(): number {
        return this.topo + 1;
    }
    
    /**
     * Limpa toda a pilha
     */
    public limpar(): void {
        this.topo = -1;
    }
    
    /**
     * Converte pilha para array (do fundo ao topo)
     */
    public paraArray(): T[] {
        const resultado: T[] = [];
        
        for (let i = 0; i <= this.topo; i++) {
            resultado[i] = this.elementos[i];
        }
        
        return resultado;
    }
    
    /**
     * Busca elemento na pilha (sem remover)
     */
    public contem(elemento: T): boolean {
        for (let i = 0; i <= this.topo; i++) {
            if (this.elementos[i] === elemento) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Duplica o elemento do topo
     */
    public duplicarTopo(): boolean {
        if (this.estaVazia() || this.estaCheia()) {
            return false;
        }
        
        const elementoTopo = this.elementos[this.topo];
        this.topo++;
        this.elementos[this.topo] = elementoTopo;
        return true;
    }
}

/**
 * Utilitários para operações com pilha
 */
class UtilsPilha {
    
    /**
     * Verifica se parênteses estão balanceados
     */
    public static verificarParenteses(expressao: string): boolean {
        const pilha = new PilhaArray<string>();
        
        for (let i = 0; i < expressao.length; i++) {
            const char = expressao[i];
            
            if (char === '(') {
                pilha.empilhar(char);
            } else if (char === ')') {
                if (pilha.estaVazia()) {
                    return false;
                }
                pilha.desempilhar();
            }
        }
        
        return pilha.estaVazia();
    }
    
    /**
     * Inverte string usando pilha
     */
    public static inverterString(texto: string): string {
        const pilha = new PilhaArray<string>();
        
        // Empilha todos os caracteres
        for (let i = 0; i < texto.length; i++) {
            pilha.empilhar(texto[i]);
        }
        
        // Desempilha para formar string invertida
        let resultado = '';
        while (!pilha.estaVazia()) {
            resultado += pilha.desempilhar();
        }
        
        return resultado;
    }
    
    /**
     * Avalia expressão pós-fixa simples
     */
    public static avaliarPosFixa(expressao: string[]): number {
        const pilha = new PilhaArray<number>();
        
        for (let i = 0; i < expressao.length; i++) {
            const token = expressao[i];
            
            if (this.ehNumero(token)) {
                pilha.empilhar(parseFloat(token));
            } else if (this.ehOperador(token)) {
                if (pilha.tamanho() < 2) {
                    throw new Error("Expressão inválida");
                }
                
                const b = pilha.desempilhar()!;
                const a = pilha.desempilhar()!;
                
                let resultado: number;
                switch (token) {
                    case '+': resultado = a + b; break;
                    case '-': resultado = a - b; break;
                    case '*': resultado = a * b; break;
                    case '/': resultado = a / b; break;
                    default: throw new Error(`Operador inválido: ${token}`);
                }
                
                pilha.empilhar(resultado);
            }
        }
        
        if (pilha.tamanho() !== 1) {
            throw new Error("Expressão inválida");
        }
        
        return pilha.desempilhar()!;
    }
    
    private static ehNumero(token: string): boolean {
        return !isNaN(parseFloat(token));
    }
    
    private static ehOperador(token: string): boolean {
        return ['+', '-', '*', '/'].indexOf(token) !== -1;
    }
}

// Exemplos de uso
console.log("=== EXERCÍCIO 12 - PILHA COM ARRAY ===");

const pilha = new PilhaArray<string>(5);

console.log("Pilha vazia:", pilha.estaVazia());

// Empilhando elementos
pilha.empilhar("A");
pilha.empilhar("B");
pilha.empilhar("C");

console.log("Pilha atual:", pilha.paraArray()); // [A, B, C]
console.log("Topo da pilha:", pilha.verTopo()); // C
console.log("Tamanho:", pilha.tamanho()); // 3

// Desempilhando
console.log("Desempilhar:", pilha.desempilhar()); // C
console.log("Pilha após desempilhar:", pilha.paraArray()); // [A, B]

// Duplicando topo
pilha.duplicarTopo();
console.log("Após duplicar topo:", pilha.paraArray()); // [A, B, B]

// Testando utilidades
console.log("\n--- UTILITÁRIOS ---");

// Verificar parênteses
const expressoes = ["()", "(())", "(()", "())", "(()())"];
for (let i = 0; i < expressoes.length; i++) {
    const expr = expressoes[i];
    console.log(`"${expr}" balanceado:`, UtilsPilha.verificarParenteses(expr));
}

// Inverter string
const texto = "TypeScript";
console.log(`Inverter "${texto}":`, UtilsPilha.inverterString(texto));

// Avaliar expressão pós-fixa
const posFixa = ["3", "4", "+", "2", "*"]; // (3 + 4) * 2 = 14
console.log(`Pós-fixa ${posFixa.join(" ")}:`, UtilsPilha.avaliarPosFixa(posFixa));

export { PilhaArray, UtilsPilha };
