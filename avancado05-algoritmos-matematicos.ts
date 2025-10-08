/**
 * EXERCÍCIO AVANÇADO 5 - ALGORITMOS MATEMÁTICOS E TEORIA DOS NÚMEROS
 * 
 * Implementa algoritmos avançados de matemática computacional incluindo
 * teoria dos números, geometria computacional, e algoritmos criptográficos.
 * Demonstra conceitos de modular arithmetic, números primos e geometria.
 */

/**
 * Classe para algoritmos de teoria dos números
 */
class TeoriaNumeros {
    
    /**
     * Algoritmo de Euclides para MDC (Máximo Divisor Comum)
     */
    public static mdc(a: number, b: number): number {
        a = Math.abs(a);
        b = Math.abs(b);
        
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        
        return a;
    }
    
    /**
     * MDC Estendido - encontra coeficientes x, y tal que ax + by = mdc(a, b)
     */
    public static mdcEstendido(a: number, b: number): { mdc: number; x: number; y: number } {
        if (b === 0) {
            return { mdc: a, x: 1, y: 0 };
        }
        
        const resultado = this.mdcEstendido(b, a % b);
        const x = resultado.y;
        const y = resultado.x - Math.floor(a / b) * resultado.y;
        
        return { mdc: resultado.mdc, x: x, y: y };
    }
    
    /**
     * MMC (Mínimo Múltiplo Comum)
     */
    public static mmc(a: number, b: number): number {
        return Math.abs(a * b) / this.mdc(a, b);
    }
    
    /**
     * Crivo de Eratóstenes para encontrar números primos até n
     */
    public static crivoEratostenes(n: number): number[] {
        const ehPrimo: boolean[] = [];
        const primos: number[] = [];
        
        // Inicializa array
        for (let i = 0; i <= n; i++) {
            ehPrimo[i] = true;
        }
        
        ehPrimo[0] = false;
        ehPrimo[1] = false;
        
        for (let p = 2; p * p <= n; p++) {
            if (ehPrimo[p]) {
                // Marca múltiplos de p
                for (let i = p * p; i <= n; i += p) {
                    ehPrimo[i] = false;
                }
            }
        }
        
        // Coleta primos
        for (let i = 2; i <= n; i++) {
            if (ehPrimo[i]) {
                primos[primos.length] = i;
            }
        }
        
        return primos;
    }
    
    /**
     * Teste de primalidade de Miller-Rabin
     */
    public static ehPrimoMillerRabin(n: number, k: number = 5): boolean {
        if (n < 2) return false;
        if (n === 2 || n === 3) return true;
        if (n % 2 === 0) return false;
        
        // Escreve n-1 como d * 2^r
        let d = n - 1;
        let r = 0;
        while (d % 2 === 0) {
            d = Math.floor(d / 2);
            r++;
        }
        
        // Testa k vezes
        for (let i = 0; i < k; i++) {
            const a = 2 + Math.floor(Math.random() * (n - 3));
            let x = this.potenciaModular(a, d, n);
            
            if (x === 1 || x === n - 1) {
                continue;
            }
            
            let composito = true;
            for (let j = 0; j < r - 1; j++) {
                x = this.potenciaModular(x, 2, n);
                if (x === n - 1) {
                    composito = false;
                    break;
                }
            }
            
            if (composito) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Exponenciação modular eficiente (a^b mod m)
     */
    public static potenciaModular(base: number, exp: number, mod: number): number {
        let resultado = 1;
        base = base % mod;
        
        while (exp > 0) {
            if (exp % 2 === 1) {
                resultado = (resultado * base) % mod;
            }
            exp = Math.floor(exp / 2);
            base = (base * base) % mod;
        }
        
        return resultado;
    }
    
    /**
     * Inverso modular usando algoritmo estendido de Euclides
     */
    public static inversoModular(a: number, m: number): number | null {
        const resultado = this.mdcEstendido(a, m);
        
        if (resultado.mdc !== 1) {
            return null; // Inverso não existe
        }
        
        return (resultado.x % m + m) % m;
    }
    
    /**
     * Fatorização de inteiros (algoritmo simples)
     */
    public static fatorizar(n: number): number[] {
        const fatores: number[] = [];
        let divisor = 2;
        
        while (divisor * divisor <= n) {
            while (n % divisor === 0) {
                fatores[fatores.length] = divisor;
                n = Math.floor(n / divisor);
            }
            divisor++;
        }
        
        if (n > 1) {
            fatores[fatores.length] = n;
        }
        
        return fatores;
    }
    
    /**
     * Função de Euler (totiente)
     */
    public static funcaoEuler(n: number): number {
        let resultado = n;
        let p = 2;
        
        while (p * p <= n) {
            if (n % p === 0) {
                while (n % p === 0) {
                    n = Math.floor(n / p);
                }
                resultado -= Math.floor(resultado / p);
            }
            p++;
        }
        
        if (n > 1) {
            resultado -= Math.floor(resultado / n);
        }
        
        return resultado;
    }
}

/**
 * Classe para algoritmos de geometria computacional
 */
class GeometriaComputacional {
    
    /**
     * Orientação de três pontos (colinear, horário, anti-horário)
     */
    public static orientacao(p: any, q: any, r: any): number {
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (val === 0) return 0; // Colinear
        return val > 0 ? 1 : 2; // 1 = horário, 2 = anti-horário
    }
    
    /**
     * Verifica se ponto q está no segmento pr
     */
    public static pontoNoSegmento(p: any, q: any, r: any): boolean {
        return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
               q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
    }
    
    /**
     * Verifica se dois segmentos se intersectam
     */
    public static segmentosIntersectam(p1: any, q1: any, p2: any, q2: any): boolean {
        const o1 = this.orientacao(p1, q1, p2);
        const o2 = this.orientacao(p1, q1, q2);
        const o3 = this.orientacao(p2, q2, p1);
        const o4 = this.orientacao(p2, q2, q1);
        
        // Caso geral
        if (o1 !== o2 && o3 !== o4) {
            return true;
        }
        
        // Casos especiais (colinear)
        if (o1 === 0 && this.pontoNoSegmento(p1, p2, q1)) return true;
        if (o2 === 0 && this.pontoNoSegmento(p1, q2, q1)) return true;
        if (o3 === 0 && this.pontoNoSegmento(p2, p1, q2)) return true;
        if (o4 === 0 && this.pontoNoSegmento(p2, q1, q2)) return true;
        
        return false;
    }
    
    /**
     * Algoritmo de Graham Scan para encontrar envoltória convexa
     */
    public static envolturiaConvexa(pontos: any[]): any[] {
        const n = pontos.length;
        if (n < 3) return [];
        
        // Encontra ponto inferior esquerdo
        let l = 0;
        for (let i = 1; i < n; i++) {
            if (pontos[i].y < pontos[l].y) {
                l = i;
            } else if (pontos[i].y === pontos[l].y && pontos[i].x < pontos[l].x) {
                l = i;
            }
        }
        
        // Troca ponto inferior para início
        const temp = pontos[0];
        pontos[0] = pontos[l];
        pontos[l] = temp;
        
        // Ordena pontos pelo ângulo polar
        this.ordenarPorAngulo(pontos);
        
        // Cria envoltória convexa
        const pilha: any[] = [];
        pilha[pilha.length] = pontos[0];
        pilha[pilha.length] = pontos[1];
        pilha[pilha.length] = pontos[2];
        
        for (let i = 3; i < n; i++) {
            while (pilha.length > 1 && 
                   this.orientacao(pilha[pilha.length - 2], pilha[pilha.length - 1], pontos[i]) !== 2) {
                pilha.length--;
            }
            pilha[pilha.length] = pontos[i];
        }
        
        return pilha;
    }
    
    private static ordenarPorAngulo(pontos: any[]): void {
        const p0 = pontos[0];
        
        // Ordenação por inserção baseada no ângulo polar
        for (let i = 2; i < pontos.length; i++) {
            const chave = pontos[i];
            let j = i - 1;
            
            while (j >= 1 && this.compararAngulo(p0, pontos[j], chave) > 0) {
                pontos[j + 1] = pontos[j];
                j--;
            }
            
            pontos[j + 1] = chave;
        }
    }
    
    private static compararAngulo(p0: any, p1: any, p2: any): number {
        const o = this.orientacao(p0, p1, p2);
        if (o === 0) {
            // Se colinear, ordena por distância
            const d1 = p0.distanciaAte(p1);
            const d2 = p0.distanciaAte(p2);
            return d1 - d2;
        }
        return o === 2 ? -1 : 1;
    }
    
    /**
     * Área de polígono usando fórmula de Shoelace
     */
    public static areaPoligono(pontos: any[]): number {
        const n = pontos.length;
        if (n < 3) return 0;
        
        let area = 0;
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            area += pontos[i].x * pontos[j].y;
            area -= pontos[j].x * pontos[i].y;
        }
        
        return Math.abs(area) / 2;
    }
}

// Criar classe Ponto fora da classe GeometriaComputacional
class Ponto {
    public x: number;
    public y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    public distanciaAte(outro: Ponto): number {
        const dx = this.x - outro.x;
        const dy = this.y - outro.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}

/**
 * Classe para algoritmos criptográficos básicos
 */
class Criptografia {
    
    /**
     * Cifra de César
     */
    public static cifraCesar(texto: string, deslocamento: number): string {
        let resultado = "";
        
        for (let i = 0; i < texto.length; i++) {
            const char = texto[i];
            
            if (char >= 'A' && char <= 'Z') {
                const novoChar = String.fromCharCode(((char.charCodeAt(0) - 65 + deslocamento) % 26 + 26) % 26 + 65);
                resultado += novoChar;
            } else if (char >= 'a' && char <= 'z') {
                const novoChar = String.fromCharCode(((char.charCodeAt(0) - 97 + deslocamento) % 26 + 26) % 26 + 97);
                resultado += novoChar;
            } else {
                resultado += char;
            }
        }
        
        return resultado;
    }
    
    /**
     * RSA simples (apenas para demonstração com números pequenos)
     */
    public static gerarChavesRSA(p: number, q: number): { 
        n: number; 
        e: number; 
        d: number; 
        phi: number 
    } | null {
        if (!TeoriaNumeros.ehPrimoMillerRabin(p) || !TeoriaNumeros.ehPrimoMillerRabin(q)) {
            return null;
        }
        
        const n = p * q;
        const phi = (p - 1) * (q - 1);
        
        // Escolhe e (comumente 65537, mas usaremos algo menor)
        let e = 3;
        while (TeoriaNumeros.mdc(e, phi) !== 1) {
            e += 2;
        }
        
        // Calcula d (inverso modular de e)
        const d = TeoriaNumeros.inversoModular(e, phi);
        
        if (d === null) {
            return null;
        }
        
        return { n: n, e: e, d: d, phi: phi };
    }
    
    /**
     * Criptografia RSA
     */
    public static criptografarRSA(mensagem: number, e: number, n: number): number {
        return TeoriaNumeros.potenciaModular(mensagem, e, n);
    }
    
    /**
     * Descriptografia RSA
     */
    public static descriptografarRSA(cifra: number, d: number, n: number): number {
        return TeoriaNumeros.potenciaModular(cifra, d, n);
    }
    
    /**
     * Hash simples (para demonstração)
     */
    public static hashSimples(texto: string): number {
        let hash = 0;
        const primo = 31;
        
        for (let i = 0; i < texto.length; i++) {
            hash = (hash * primo + texto.charCodeAt(i)) % 1000000007;
        }
        
        return hash;
    }
}

/**
 * Classe para algoritmos de combinatória
 */
class Combinatoria {
    
    /**
     * Fatorial
     */
    public static fatorial(n: number): number {
        if (n < 0) return 0;
        if (n <= 1) return 1;
        
        let resultado = 1;
        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }
        
        return resultado;
    }
    
    /**
     * Combinação C(n, k) = n! / (k! * (n-k)!)
     */
    public static combinacao(n: number, k: number): number {
        if (k > n || k < 0) return 0;
        if (k === 0 || k === n) return 1;
        
        // Usa propriedade C(n,k) = C(n,n-k) para otimizar
        if (k > n - k) {
            k = n - k;
        }
        
        let resultado = 1;
        for (let i = 0; i < k; i++) {
            resultado = resultado * (n - i) / (i + 1);
        }
        
        return Math.round(resultado);
    }
    
    /**
     * Permutação P(n, k) = n! / (n-k)!
     */
    public static permutacao(n: number, k: number): number {
        if (k > n || k < 0) return 0;
        
        let resultado = 1;
        for (let i = 0; i < k; i++) {
            resultado *= (n - i);
        }
        
        return resultado;
    }
    
    /**
     * Triângulo de Pascal
     */
    public static trianguloPascal(linhas: number): number[][] {
        const triangulo: number[][] = [];
        
        for (let i = 0; i < linhas; i++) {
            triangulo[i] = [];
            triangulo[i][0] = 1;
            
            for (let j = 1; j < i; j++) {
                triangulo[i][j] = triangulo[i - 1][j - 1] + triangulo[i - 1][j];
            }
            
            if (i > 0) {
                triangulo[i][i] = 1;
            }
        }
        
        return triangulo;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO AVANÇADO 5 - ALGORITMOS MATEMÁTICOS E TEORIA DOS NÚMEROS ===");

// Teste 1: Teoria dos Números
console.log("--- TEORIA DOS NÚMEROS ---");
console.log("MDC(48, 30):", TeoriaNumeros.mdc(48, 30));
console.log("MMC(48, 30):", TeoriaNumeros.mmc(48, 30));

const mdcExt = TeoriaNumeros.mdcEstendido(30, 48);
console.log("MDC Estendido(30, 48):", mdcExt);
console.log(`Verificação: 30*${mdcExt.x} + 48*${mdcExt.y} = ${30 * mdcExt.x + 48 * mdcExt.y}`);

// Primos até 30
const primos = TeoriaNumeros.crivoEratostenes(30);
console.log("Primos até 30:", primos);

// Teste de primalidade
const numeroTeste = 97;
console.log(`${numeroTeste} é primo (Miller-Rabin):`, TeoriaNumeros.ehPrimoMillerRabin(numeroTeste));

// Exponenciação modular
console.log("2^10 mod 1000:", TeoriaNumeros.potenciaModular(2, 10, 1000));

// Fatorização
console.log("Fatores de 60:", TeoriaNumeros.fatorizar(60));

// Função de Euler
console.log("φ(12):", TeoriaNumeros.funcaoEuler(12));

// Teste 2: Geometria Computacional
console.log("\n--- GEOMETRIA COMPUTACIONAL ---");

// Pontos para teste
const pontos = [
    new Ponto(0, 3),
    new Ponto(1, 1),
    new Ponto(2, 2),
    new Ponto(4, 4),
    new Ponto(0, 0),
    new Ponto(1, 2),
    new Ponto(3, 1),
    new Ponto(3, 3)
];

console.log("Pontos:", pontos.map(p => p.toString()));

// Envoltória convexa
const envoltura = GeometriaComputacional.envolturiaConvexa([...pontos]);
console.log("Envoltória convexa:", envoltura.map(p => p.toString()));

// Área do polígono formado pela envoltória
const area = GeometriaComputacional.areaPoligono(envoltura);
console.log("Área da envoltória convexa:", area);

// Teste de intersecção de segmentos
const p1 = new Ponto(1, 1);
const q1 = new Ponto(10, 1);
const p2 = new Ponto(1, 2);
const q2 = new Ponto(10, 2);

console.log(`Segmentos ${p1.toString()}-${q1.toString()} e ${p2.toString()}-${q2.toString()} intersectam:`, 
            GeometriaComputacional.segmentosIntersectam(p1, q1, p2, q2));

// Teste 3: Criptografia
console.log("\n--- CRIPTOGRAFIA ---");

// Cifra de César
const textoOriginal = "HELLO WORLD";
const textoCifrado = Criptografia.cifraCesar(textoOriginal, 3);
const textoDescifrado = Criptografia.cifraCesar(textoCifrado, -3);

console.log("Texto original:", textoOriginal);
console.log("Cifra de César (+3):", textoCifrado);
console.log("Descriptografado:", textoDescifrado);

// RSA simples
const chavesRSA = Criptografia.gerarChavesRSA(61, 53);
if (chavesRSA) {
    console.log("Chaves RSA geradas:");
    console.log(`n = ${chavesRSA.n}, e = ${chavesRSA.e}, d = ${chavesRSA.d}`);
    
    const mensagem = 42;
    const cifrada = Criptografia.criptografarRSA(mensagem, chavesRSA.e, chavesRSA.n);
    const descriptografada = Criptografia.descriptografarRSA(cifrada, chavesRSA.d, chavesRSA.n);
    
    console.log(`Mensagem: ${mensagem}`);
    console.log(`Cifrada: ${cifrada}`);
    console.log(`Descriptografada: ${descriptografada}`);
}

// Hash simples
const hash = Criptografia.hashSimples(textoOriginal);
console.log(`Hash de "${textoOriginal}":`, hash);

// Teste 4: Combinatória
console.log("\n--- COMBINATÓRIA ---");
console.log("5! =", Combinatoria.fatorial(5));
console.log("C(5,2) =", Combinatoria.combinacao(5, 2));
console.log("P(5,2) =", Combinatoria.permutacao(5, 2));

console.log("Triângulo de Pascal (6 linhas):");
const pascal = Combinatoria.trianguloPascal(6);
for (let i = 0; i < pascal.length; i++) {
    let linha = "";
    // Espaçamento para centralizar
    for (let k = 0; k < pascal.length - i - 1; k++) {
        linha += " ";
    }
    for (let j = 0; j <= i; j++) {
        linha += pascal[i][j] + " ";
    }
    console.log(linha);
}

// Teste 5: Problemas avançados
console.log("\n--- APLICAÇÕES AVANÇADAS ---");

// Encontrar inverso modular
const inv = TeoriaNumeros.inversoModular(7, 26);
console.log("Inverso de 7 mod 26:", inv);
if (inv !== null) {
    console.log(`Verificação: (7 * ${inv}) mod 26 = ${(7 * inv) % 26}`);
}

// Teste de números grandes para primalidade
const numeroGrande = 1009;
console.log(`${numeroGrande} é primo:`, TeoriaNumeros.ehPrimoMillerRabin(numeroGrande));

console.log("\nComplexidades dos algoritmos implementados:");
console.log("- Crivo de Eratóstenes: O(n log log n)");
console.log("- Miller-Rabin: O(k log³ n)");
console.log("- Exponenciação Modular: O(log n)");
console.log("- Graham Scan: O(n log n)");
console.log("- MDC Euclides: O(log min(a,b))");

export { TeoriaNumeros, GeometriaComputacional, Criptografia, Combinatoria, Ponto };
