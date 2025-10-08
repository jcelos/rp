/**
 * DESAFIO BÁSICO 1 - FUNDAMENTOS DE LÓGICA
 * 
 * Implementa conceitos iniciais de programação usando apenas lógica básica.
 * Foco em estruturas condicionais, loops e manipulação simples de dados.
 * Ideal para iniciantes em algoritmos.
 */

/**
 * Classe para operações básicas com números
 */
class OperacoesBasicas {
    
    /**
     * Verifica se um número é par
     */
    public static ehPar(numero: number): boolean {
        return numero % 2 === 0;
    }
    
    /**
     * Verifica se um número é positivo
     */
    public static ehPositivo(numero: number): boolean {
        return numero > 0;
    }
    
    /**
     * Retorna o maior entre dois números sem usar Math.max
     */
    public static maior(a: number, b: number): number {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }
    
    /**
     * Conta dígitos de um número
     */
    public static contarDigitos(numero: number): number {
        if (numero === 0) {
            return 1;
        }
        
        let contador = 0;
        let temp = numero < 0 ? -numero : numero; // Valor absoluto manual
        
        while (temp > 0) {
            temp = Math.floor(temp / 10);
            contador++;
        }
        
        return contador;
    }
    
    /**
     * Inverte um número (ex: 123 -> 321)
     */
    public static inverterNumero(numero: number): number {
        let resultado = 0;
        let temp = numero < 0 ? -numero : numero;
        
        while (temp > 0) {
            const digito = temp % 10;
            resultado = resultado * 10 + digito;
            temp = Math.floor(temp / 10);
        }
        
        return numero < 0 ? -resultado : resultado;
    }
}

/**
 * Classe para trabalhar com strings básicas
 */
class ManipuladorString {
    
    /**
     * Conta vogais em uma string
     */
    public static contarVogais(texto: string): number {
        let contador = 0;
        const vogais = "aeiouAEIOU";
        
        for (let i = 0; i < texto.length; i++) {
            const char = texto[i];
            
            // Busca manual na string de vogais
            for (let j = 0; j < vogais.length; j++) {
                if (char === vogais[j]) {
                    contador++;
                    break;
                }
            }
        }
        
        return contador;
    }
    
    /**
     * Conta consoantes em uma string
     */
    public static contarConsoantes(texto: string): number {
        let contador = 0;
        
        for (let i = 0; i < texto.length; i++) {
            const char = texto[i];
            
            // Verifica se é letra
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                // Verifica se não é vogal
                if (!this.ehVogal(char)) {
                    contador++;
                }
            }
        }
        
        return contador;
    }
    
    /**
     * Verifica se um caractere é vogal
     */
    private static ehVogal(char: string): boolean {
        const vogais = "aeiouAEIOU";
        
        for (let i = 0; i < vogais.length; i++) {
            if (char === vogais[i]) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Converte string para maiúsculas manualmente
     */
    public static paraMaiuscula(texto: string): string {
        let resultado = "";
        
        for (let i = 0; i < texto.length; i++) {
            const char = texto[i];
            
            if (char >= 'a' && char <= 'z') {
                // Converte usando código ASCII
                const novoChar = String.fromCharCode(char.charCodeAt(0) - 32);
                resultado += novoChar;
            } else {
                resultado += char;
            }
        }
        
        return resultado;
    }
    
    /**
     * Verifica se uma string é palíndromo (ignora espaços e case)
     */
    public static ehPalindromo(texto: string): boolean {
        // Remove espaços e converte para maiúscula
        let textoLimpo = "";
        
        for (let i = 0; i < texto.length; i++) {
            const char = texto[i];
            if (char !== ' ') {
                textoLimpo += this.paraMaiuscula(char);
            }
        }
        
        // Verifica palíndromo
        const tamanho = textoLimpo.length;
        for (let i = 0; i < Math.floor(tamanho / 2); i++) {
            if (textoLimpo[i] !== textoLimpo[tamanho - 1 - i]) {
                return false;
            }
        }
        
        return true;
    }
}

/**
 * Classe para padrões e sequências básicas
 */
class PadroesBasicos {
    
    /**
     * Gera sequência de números pares até um limite
     */
    public static gerarPares(limite: number): number[] {
        const resultado: number[] = [];
        
        for (let i = 2; i <= limite; i += 2) {
            resultado[resultado.length] = i;
        }
        
        return resultado;
    }
    
    /**
     * Gera tabuada de um número
     */
    public static gerarTabuada(numero: number, limite: number = 10): string[] {
        const resultado: string[] = [];
        
        for (let i = 1; i <= limite; i++) {
            const produto = numero * i;
            resultado[resultado.length] = `${numero} x ${i} = ${produto}`;
        }
        
        return resultado;
    }
    
    /**
     * Desenha triângulo de asteriscos
     */
    public static desenharTriangulo(altura: number): string[] {
        const resultado: string[] = [];
        
        for (let i = 1; i <= altura; i++) {
            let linha = "";
            
            // Adiciona espaços para centralizar
            for (let j = 0; j < altura - i; j++) {
                linha += " ";
            }
            
            // Adiciona asteriscos
            for (let k = 0; k < i; k++) {
                linha += "* ";
            }
            
            resultado[resultado.length] = linha;
        }
        
        return resultado;
    }
    
    /**
     * Conta caracteres específicos em uma string
     */
    public static contarCaractere(texto: string, caractere: string): number {
        let contador = 0;
        
        for (let i = 0; i < texto.length; i++) {
            if (texto[i] === caractere) {
                contador++;
            }
        }
        
        return contador;
    }
    
    /**
     * Encontra o maior número em um array
     */
    public static encontrarMaior(numeros: number[]): number {
        if (numeros.length === 0) {
            throw new Error("Array vazio");
        }
        
        let maior = numeros[0];
        
        for (let i = 1; i < numeros.length; i++) {
            if (numeros[i] > maior) {
                maior = numeros[i];
            }
        }
        
        return maior;
    }
}

/**
 * Classe para desafios lógicos simples
 */
class DesafiosLogicos {
    
    /**
     * Verifica se três números podem formar um triângulo
     */
    public static podeFormarTriangulo(a: number, b: number, c: number): boolean {
        return (a + b > c) && (a + c > b) && (b + c > a);
    }
    
    /**
     * Calcula idade em anos, meses e dias
     */
    public static calcularIdade(anoNascimento: number, anoAtual: number = 2025): {
        anos: number;
        meses: number;
        dias: number;
    } {
        const anos = anoAtual - anoNascimento;
        
        // Simplificação: assumindo que estamos no início do ano
        return {
            anos: anos,
            meses: anos * 12,
            dias: anos * 365 // Aproximação sem anos bissextos
        };
    }
    
    /**
     * Converte temperatura Celsius para Fahrenheit
     */
    public static celsiusParaFahrenheit(celsius: number): number {
        return (celsius * 9 / 5) + 32;
    }
    
    /**
     * Calcula média de notas e determina situação
     */
    public static avaliarEstudante(notas: number[]): {
        media: number;
        situacao: string;
        aprovado: boolean;
    } {
        if (notas.length === 0) {
            return { media: 0, situacao: "Sem notas", aprovado: false };
        }
        
        let soma = 0;
        for (let i = 0; i < notas.length; i++) {
            soma += notas[i];
        }
        
        const media = soma / notas.length;
        let situacao: string;
        let aprovado: boolean;
        
        if (media >= 7.0) {
            situacao = "Aprovado";
            aprovado = true;
        } else if (media >= 5.0) {
            situacao = "Recuperação";
            aprovado = false;
        } else {
            situacao = "Reprovado";
            aprovado = false;
        }
        
        return { media: media, situacao: situacao, aprovado: aprovado };
    }
    
    /**
     * Gera sequência de Fibonacci até um limite
     */
    public static fibonacciAte(limite: number): number[] {
        const resultado: number[] = [];
        
        if (limite >= 0) {
            resultado[resultado.length] = 0;
        }
        if (limite >= 1) {
            resultado[resultado.length] = 1;
        }
        
        if (resultado.length < 2) {
            return resultado;
        }
        
        let anterior = 0;
        let atual = 1;
        
        while (true) {
            const proximo = anterior + atual;
            if (proximo > limite) {
                break;
            }
            
            resultado[resultado.length] = proximo;
            anterior = atual;
            atual = proximo;
        }
        
        return resultado;
    }
}

// Exemplos de uso e testes
console.log("=== DESAFIO BÁSICO 1 - FUNDAMENTOS DE LÓGICA ===");

// Teste 1: Operações Básicas
console.log("--- OPERAÇÕES BÁSICAS ---");
console.log("15 é par:", OperacoesBasicas.ehPar(15));
console.log("20 é par:", OperacoesBasicas.ehPar(20));
console.log("-5 é positivo:", OperacoesBasicas.ehPositivo(-5));
console.log("Maior entre 10 e 7:", OperacoesBasicas.maior(10, 7));
console.log("Dígitos de 12345:", OperacoesBasicas.contarDigitos(12345));
console.log("123 invertido:", OperacoesBasicas.inverterNumero(123));
console.log("-456 invertido:", OperacoesBasicas.inverterNumero(-456));

// Teste 2: Manipulação de Strings
console.log("\n--- MANIPULAÇÃO DE STRINGS ---");
const texto = "Programacao";
console.log(`Texto: "${texto}"`);
console.log("Vogais:", ManipuladorString.contarVogais(texto));
console.log("Consoantes:", ManipuladorString.contarConsoantes(texto));
console.log("Maiúscula:", ManipuladorString.paraMaiuscula(texto));

const palindromos = ["radar", "hello", "A man a plan a canal Panama"];
for (let i = 0; i < palindromos.length; i++) {
    const pal = palindromos[i];
    console.log(`"${pal}" é palíndromo:`, ManipuladorString.ehPalindromo(pal));
}

// Teste 3: Padrões Básicos
console.log("\n--- PADRÕES BÁSICOS ---");
console.log("Números pares até 10:", PadroesBasicos.gerarPares(10));
console.log("Tabuada do 7 (primeiros 5):");
const tabuada = PadroesBasicos.gerarTabuada(7, 5);
for (let i = 0; i < tabuada.length; i++) {
    console.log("  " + tabuada[i]);
}

console.log("Triângulo altura 4:");
const triangulo = PadroesBasicos.desenharTriangulo(4);
for (let i = 0; i < triangulo.length; i++) {
    console.log(triangulo[i]);
}

const textoTeste = "abracadabra";
console.log(`Letra 'a' em "${textoTeste}":`, PadroesBasicos.contarCaractere(textoTeste, 'a'));

const numeros = [3, 7, 2, 9, 1, 8];
console.log("Números:", numeros);
console.log("Maior número:", PadroesBasicos.encontrarMaior(numeros));

// Teste 4: Desafios Lógicos
console.log("\n--- DESAFIOS LÓGICOS ---");
console.log("Lados 3, 4, 5 formam triângulo:", DesafiosLogicos.podeFormarTriangulo(3, 4, 5));
console.log("Lados 1, 1, 5 formam triângulo:", DesafiosLogicos.podeFormarTriangulo(1, 1, 5));

const idade = DesafiosLogicos.calcularIdade(2000, 2025);
console.log("Nascido em 2000, idade em 2025:");
console.log(`  ${idade.anos} anos = ${idade.meses} meses = ${idade.dias} dias`);

console.log("25°C em Fahrenheit:", DesafiosLogicos.celsiusParaFahrenheit(25));

const notas = [8.5, 7.0, 6.5, 9.0];
const avaliacao = DesafiosLogicos.avaliarEstudante(notas);
console.log("Notas:", notas);
console.log(`Média: ${avaliacao.media.toFixed(2)}`);
console.log(`Situação: ${avaliacao.situacao}`);
console.log(`Aprovado: ${avaliacao.aprovado}`);

console.log("Fibonacci até 20:", DesafiosLogicos.fibonacciAte(20));

// Teste 5: Exercícios Práticos
console.log("\n--- EXERCÍCIOS PRÁTICOS ---");

// Contar palavras em uma frase
function contarPalavras(frase: string): number {
    let contador = 0;
    let dentroDeUmaPalavra = false;
    
    for (let i = 0; i < frase.length; i++) {
        const char = frase[i];
        
        if (char !== ' ') {
            if (!dentroDeUmaPalavra) {
                contador++;
                dentroDeUmaPalavra = true;
            }
        } else {
            dentroDeUmaPalavra = false;
        }
    }
    
    return contador;
}

const frase = "Esta e uma frase de teste";
console.log(`Frase: "${frase}"`);
console.log("Número de palavras:", contarPalavras(frase));

// Calcular fatorial de forma iterativa
function calcularFatorial(n: number): number {
    if (n < 0) return 0;
    if (n <= 1) return 1;
    
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
        resultado *= i;
    }
    
    return resultado;
}

console.log("5! =", calcularFatorial(5));
console.log("0! =", calcularFatorial(0));

// Verificar se número é primo
function ehPrimo(numero: number): boolean {
    if (numero < 2) return false;
    if (numero === 2) return true;
    if (numero % 2 === 0) return false;
    
    for (let i = 3; i * i <= numero; i += 2) {
        if (numero % i === 0) {
            return false;
        }
    }
    
    return true;
}

const numerosPrimos = [2, 3, 4, 17, 25, 29];
for (let i = 0; i < numerosPrimos.length; i++) {
    const num = numerosPrimos[i];
    console.log(`${num} é primo:`, ehPrimo(num));
}

export { OperacoesBasicas, ManipuladorString, PadroesBasicos, DesafiosLogicos };
