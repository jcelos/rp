/**
 * DESAFIO AVANÇADO 1 - ALGORITMOS DE PATTERN MATCHING E PROCESSAMENTO DE TEXTO
 * 
 * Implementa algoritmos sofisticados para busca de padrões em texto,
 * processamento de strings avançado e análise lexical.
 * Foca em eficiência e técnicas algorítmicas rebuscadas.
 */

/**
 * Implementação do algoritmo KMP (Knuth-Morris-Pratt) para busca eficiente de padrões
 */
class AlgoritmoKMP {
    
    /**
     * Constrói tabela de falhas (failure function) para o padrão
     */
    private static construirTabelaFalhas(padrao: string): number[] {
        const tabela: number[] = [];
        tabela[0] = 0;
        let j = 0;
        
        for (let i = 1; i < padrao.length; i++) {
            while (j > 0 && padrao[i] !== padrao[j]) {
                j = tabela[j - 1];
            }
            
            if (padrao[i] === padrao[j]) {
                j++;
            }
            
            tabela[i] = j;
        }
        
        return tabela;
    }
    
    /**
     * Busca todas as ocorrências de um padrão no texto usando KMP
     */
    public static buscarPadrao(texto: string, padrao: string): number[] {
        if (padrao.length === 0) return [];
        
        const tabelaFalhas = this.construirTabelaFalhas(padrao);
        const ocorrencias: number[] = [];
        let j = 0;
        
        for (let i = 0; i < texto.length; i++) {
            while (j > 0 && texto[i] !== padrao[j]) {
                j = tabelaFalhas[j - 1];
            }
            
            if (texto[i] === padrao[j]) {
                j++;
            }
            
            if (j === padrao.length) {
                ocorrencias[ocorrencias.length] = i - j + 1;
                j = tabelaFalhas[j - 1];
            }
        }
        
        return ocorrencias;
    }
    
    /**
     * Análise da complexidade e estatísticas da busca
     */
    public static analisarBusca(texto: string, padrao: string): {
        ocorrencias: number[];
        comparacoes: number;
        eficiencia: string;
        tabelaFalhas: number[];
    } {
        const tabelaFalhas = this.construirTabelaFalhas(padrao);
        let comparacoes = 0;
        const ocorrencias: number[] = [];
        let j = 0;
        
        for (let i = 0; i < texto.length; i++) {
            while (j > 0 && texto[i] !== padrao[j]) {
                j = tabelaFalhas[j - 1];
                comparacoes++;
            }
            
            comparacoes++;
            if (texto[i] === padrao[j]) {
                j++;
            }
            
            if (j === padrao.length) {
                ocorrencias[ocorrencias.length] = i - j + 1;
                j = tabelaFalhas[j - 1];
            }
        }
        
        const eficiencia = comparacoes <= texto.length + padrao.length ? "Ótima" : "Subótima";
        
        return {
            ocorrencias,
            comparacoes,
            eficiencia,
            tabelaFalhas
        };
    }
}

/**
 * Implementação do algoritmo Boyer-Moore para busca de padrões
 */
class AlgoritmoBoyerMoore {
    
    /**
     * Constrói tabela de caracteres ruins (bad character heuristic)
     */
    private static construirTabelaCaracteresRuins(padrao: string): Map<string, number> {
        const tabela = new Map<string, number>();
        
        for (let i = 0; i < padrao.length; i++) {
            tabela.set(padrao[i], i);
        }
        
        return tabela;
    }
    
    /**
     * Busca padrão usando Boyer-Moore (versão simplificada)
     */
    public static buscarPadrao(texto: string, padrao: string): number[] {
        if (padrao.length === 0 || padrao.length > texto.length) {
            return [];
        }
        
        const tabelaCaracteres = this.construirTabelaCaracteresRuins(padrao);
        const ocorrencias: number[] = [];
        let i = 0;
        
        while (i <= texto.length - padrao.length) {
            let j = padrao.length - 1;
            
            // Compara de trás para frente
            while (j >= 0 && padrao[j] === texto[i + j]) {
                j--;
            }
            
            if (j < 0) {
                // Padrão encontrado
                ocorrencias[ocorrencias.length] = i;
                i++;
            } else {
                // Calcula deslocamento usando heurística do caractere ruim
                const caracterRuim = texto[i + j];
                const ultimaOcorrencia = tabelaCaracteres.get(caracterRuim) || -1;
                i += Math.max(1, j - ultimaOcorrencia);
            }
        }
        
        return ocorrencias;
    }
}

/**
 * Processador avançado de texto com múltiplas funcionalidades
 */
class ProcessadorTextoAvancado {
    
    /**
     * Extrai tokens (palavras, números, símbolos) de um texto
     */
    public static tokenizar(texto: string): {
        palavra: string;
        tipo: 'PALAVRA' | 'NUMERO' | 'SIMBOLO' | 'ESPACO';
        posicao: number;
    }[] {
        const tokens: {
            palavra: string;
            tipo: 'PALAVRA' | 'NUMERO' | 'SIMBOLO' | 'ESPACO';
            posicao: number;
        }[] = [];
        
        let i = 0;
        while (i < texto.length) {
            const char = texto[i];
            
            if (this.ehLetra(char)) {
                // Processa palavra
                let palavra = '';
                const inicio = i;
                
                while (i < texto.length && this.ehLetra(texto[i])) {
                    palavra += texto[i];
                    i++;
                }
                
                tokens[tokens.length] = {
                    palavra: palavra,
                    tipo: 'PALAVRA',
                    posicao: inicio
                };
            } else if (this.ehDigito(char)) {
                // Processa número
                let numero = '';
                const inicio = i;
                
                while (i < texto.length && (this.ehDigito(texto[i]) || texto[i] === '.')) {
                    numero += texto[i];
                    i++;
                }
                
                tokens[tokens.length] = {
                    palavra: numero,
                    tipo: 'NUMERO',
                    posicao: inicio
                };
            } else if (char === ' ' || char === '\t' || char === '\n') {
                // Processa espaços
                let espacos = '';
                const inicio = i;
                
                while (i < texto.length && (texto[i] === ' ' || texto[i] === '\t' || texto[i] === '\n')) {
                    espacos += texto[i];
                    i++;
                }
                
                tokens[tokens.length] = {
                    palavra: espacos,
                    tipo: 'ESPACO',
                    posicao: inicio
                };
            } else {
                // Símbolo
                tokens[tokens.length] = {
                    palavra: char,
                    tipo: 'SIMBOLO',
                    posicao: i
                };
                i++;
            }
        }
        
        return tokens;
    }
    
    private static ehLetra(char: string): boolean {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
    }
    
    private static ehDigito(char: string): boolean {
        return char >= '0' && char <= '9';
    }
    
    /**
     * Calcula similaridade entre duas strings usando distância de Levenshtein
     */
    public static calcularSimilaridade(str1: string, str2: string): {
        distancia: number;
        similaridade: number;
        matriz: number[][];
    } {
        const m = str1.length;
        const n = str2.length;
        const dp: number[][] = [];
        
        // Inicializa matriz
        for (let i = 0; i <= m; i++) {
            dp[i] = [];
            for (let j = 0; j <= n; j++) {
                if (i === 0) {
                    dp[i][j] = j;
                } else if (j === 0) {
                    dp[i][j] = i;
                } else {
                    dp[i][j] = 0;
                }
            }
        }
        
        // Preenche matriz
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    const substituir = dp[i - 1][j - 1] + 1;
                    const inserir = dp[i][j - 1] + 1;
                    const deletar = dp[i - 1][j] + 1;
                    
                    dp[i][j] = Math.min(substituir, Math.min(inserir, deletar));
                }
            }
        }
        
        const distancia = dp[m][n];
        const tamanhoMax = Math.max(m, n);
        const similaridade = tamanhoMax === 0 ? 1 : (tamanhoMax - distancia) / tamanhoMax;
        
        return {
            distancia,
            similaridade,
            matriz: dp
        };
    }
    
    /**
     * Encontra subsequência comum mais longa entre duas strings
     */
    public static subsequenciaComumMaisLonga(str1: string, str2: string): {
        tamanho: number;
        subsequencia: string;
        posicoes1: number[];
        posicoes2: number[];
    } {
        const m = str1.length;
        const n = str2.length;
        const dp: number[][] = [];
        
        // Inicializa e preenche matriz DP
        for (let i = 0; i <= m; i++) {
            dp[i] = [];
            for (let j = 0; j <= n; j++) {
                if (i === 0 || j === 0) {
                    dp[i][j] = 0;
                } else if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        // Reconstrói subsequência
        const subsequencia: string[] = [];
        const posicoes1: number[] = [];
        const posicoes2: number[] = [];
        
        let i = m, j = n;
        while (i > 0 && j > 0) {
            if (str1[i - 1] === str2[j - 1]) {
                subsequencia[subsequencia.length] = str1[i - 1];
                posicoes1[posicoes1.length] = i - 1;
                posicoes2[posicoes2.length] = j - 1;
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        
        // Inverte arrays para ordem correta
        const subsequenciaFinal = this.inverterArray(subsequencia).join('');
        const pos1Final = this.inverterArray(posicoes1);
        const pos2Final = this.inverterArray(posicoes2);
        
        return {
            tamanho: dp[m][n],
            subsequencia: subsequenciaFinal,
            posicoes1: pos1Final,
            posicoes2: pos2Final
        };
    }
    
    private static inverterArray<T>(array: T[]): T[] {
        const resultado: T[] = [];
        for (let i = array.length - 1; i >= 0; i--) {
            resultado[resultado.length] = array[i];
        }
        return resultado;
    }
    
    /**
     * Análise estatística completa de um texto
     */
    public static analisarTexto(texto: string): {
        caracteres: number;
        palavras: number;
        linhas: number;
        frequenciaCaracteres: Map<string, number>;
        frequenciaPalavras: Map<string, number>;
        palavraMaisFrequente: string;
        caractereMaisFrequente: string;
        complexidadeLexical: number;
    } {
        const frequenciaCaracteres = new Map<string, number>();
        const frequenciaPalavras = new Map<string, number>();
        
        // Conta caracteres
        for (let i = 0; i < texto.length; i++) {
            const char = texto[i].toLowerCase();
            frequenciaCaracteres.set(char, (frequenciaCaracteres.get(char) || 0) + 1);
        }
        
        // Tokeniza e conta palavras
        const tokens = this.tokenizar(texto);
        const palavras = tokens.filter(token => token.tipo === 'PALAVRA');
        
        for (let i = 0; i < palavras.length; i++) {
            const palavra = palavras[i].palavra.toLowerCase();
            frequenciaPalavras.set(palavra, (frequenciaPalavras.get(palavra) || 0) + 1);
        }
        
        // Encontra mais frequentes
        let palavraMaisFrequente = '';
        let maxFreqPalavra = 0;
        frequenciaPalavras.forEach((freq, palavra) => {
            if (freq > maxFreqPalavra) {
                maxFreqPalavra = freq;
                palavraMaisFrequente = palavra;
            }
        });
        
        let caractereMaisFrequente = '';
        let maxFreqChar = 0;
        frequenciaCaracteres.forEach((freq, char) => {
            if (char !== ' ' && char !== '\n' && char !== '\t' && freq > maxFreqChar) {
                maxFreqChar = freq;
                caractereMaisFrequente = char;
            }
        });
        
        // Calcula complexidade lexical (razão de palavras únicas)
        const palavrasUnicas = frequenciaPalavras.size;
        const totalPalavras = palavras.length;
        const complexidadeLexical = totalPalavras > 0 ? palavrasUnicas / totalPalavras : 0;
        
        // Conta linhas
        let linhas = 1;
        for (let i = 0; i < texto.length; i++) {
            if (texto[i] === '\n') {
                linhas++;
            }
        }
        
        return {
            caracteres: texto.length,
            palavras: totalPalavras,
            linhas: linhas,
            frequenciaCaracteres,
            frequenciaPalavras,
            palavraMaisFrequente,
            caractereMaisFrequente,
            complexidadeLexical
        };
    }
}

/**
 * Implementação de um autômato finito para reconhecimento de padrões complexos
 */
class AutomatoFinito {
    private estados: Map<string, Map<string, string>>;
    private estadoInicial: string;
    private estadosFinais: Set<string>;
    
    constructor() {
        this.estados = new Map();
        this.estadoInicial = '';
        this.estadosFinais = new Set();
    }
    
    /**
     * Define estado inicial
     */
    public definirEstadoInicial(estado: string): void {
        this.estadoInicial = estado;
    }
    
    /**
     * Adiciona estado final
     */
    public adicionarEstadoFinal(estado: string): void {
        this.estadosFinais.add(estado);
    }
    
    /**
     * Adiciona transição entre estados
     */
    public adicionarTransicao(de: string, simbolo: string, para: string): void {
        if (!this.estados.has(de)) {
            this.estados.set(de, new Map());
        }
        this.estados.get(de)!.set(simbolo, para);
    }
    
    /**
     * Verifica se uma string é aceita pelo autômato
     */
    public aceitar(entrada: string): {
        aceito: boolean;
        caminho: string[];
        posicaoParada: number;
    } {
        let estadoAtual = this.estadoInicial;
        const caminho: string[] = [estadoAtual];
        
        for (let i = 0; i < entrada.length; i++) {
            const simbolo = entrada[i];
            const transicoes = this.estados.get(estadoAtual);
            
            if (!transicoes || !transicoes.has(simbolo)) {
                return {
                    aceito: false,
                    caminho,
                    posicaoParada: i
                };
            }
            
            estadoAtual = transicoes.get(simbolo)!;
            caminho[caminho.length] = estadoAtual;
        }
        
        return {
            aceito: this.estadosFinais.has(estadoAtual),
            caminho,
            posicaoParada: entrada.length
        };
    }
    
    /**
     * Cria autômato para validar emails simples
     */
    public static criarValidadorEmail(): AutomatoFinito {
        const automato = new AutomatoFinito();
        
        automato.definirEstadoInicial('inicio');
        automato.adicionarEstadoFinal('fim');
        
        // Estados para partes do email
        automato.adicionarTransicao('inicio', 'a', 'usuario');
        automato.adicionarTransicao('usuario', 'a', 'usuario');
        automato.adicionarTransicao('usuario', '@', 'arroba');
        automato.adicionarTransicao('arroba', 'a', 'dominio');
        automato.adicionarTransicao('dominio', 'a', 'dominio');
        automato.adicionarTransicao('dominio', '.', 'ponto');
        automato.adicionarTransicao('ponto', 'a', 'fim');
        automato.adicionarTransicao('fim', 'a', 'fim');
        
        return automato;
    }
}

// Exemplos de uso e testes
console.log("=== DESAFIO AVANÇADO 1 - PATTERN MATCHING E PROCESSAMENTO DE TEXTO ===");

// Teste 1: Algoritmo KMP
console.log("--- ALGORITMO KMP ---");
const textoKMP = "ababcababa";
const padraoKMP = "aba";

const resultadoKMP = AlgoritmoKMP.analisarBusca(textoKMP, padraoKMP);
console.log(`Texto: "${textoKMP}"`);
console.log(`Padrão: "${padraoKMP}"`);
console.log("Ocorrências:", resultadoKMP.ocorrencias);
console.log("Comparações:", resultadoKMP.comparacoes);
console.log("Eficiência:", resultadoKMP.eficiencia);
console.log("Tabela de falhas:", resultadoKMP.tabelaFalhas);

// Teste 2: Boyer-Moore
console.log("\n--- ALGORITMO BOYER-MOORE ---");
const textoBM = "abaaabaaababaaba";
const padraoBM = "aaba";

const ocorrenciasBM = AlgoritmoBoyerMoore.buscarPadrao(textoBM, padraoBM);
console.log(`Texto: "${textoBM}"`);
console.log(`Padrão: "${padraoBM}"`);
console.log("Ocorrências Boyer-Moore:", ocorrenciasBM);

// Teste 3: Tokenização
console.log("\n--- TOKENIZAÇÃO DE TEXTO ---");
const textoToken = "Olá mundo! O valor é 42.5 e o resultado = verdadeiro.";
const tokens = ProcessadorTextoAvancado.tokenizar(textoToken);

console.log(`Texto: "${textoToken}"`);
console.log("Tokens encontrados:");
for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.tipo !== 'ESPACO') {
        console.log(`  ${token.tipo}: "${token.palavra}" (pos: ${token.posicao})`);
    }
}

// Teste 4: Similaridade de Strings
console.log("\n--- SIMILARIDADE DE STRINGS ---");
const str1 = "algoritmo";
const str2 = "logaritmo";

const similaridade = ProcessadorTextoAvancado.calcularSimilaridade(str1, str2);
console.log(`String 1: "${str1}"`);
console.log(`String 2: "${str2}"`);
console.log("Distância de Levenshtein:", similaridade.distancia);
console.log("Similaridade:", (similaridade.similaridade * 100).toFixed(2) + "%");

// Teste 5: Subsequência Comum Mais Longa
console.log("\n--- SUBSEQUÊNCIA COMUM MAIS LONGA ---");
const lcs = ProcessadorTextoAvancado.subsequenciaComumMaisLonga(str1, str2);
console.log("LCS tamanho:", lcs.tamanho);
console.log("LCS:", lcs.subsequencia);
console.log("Posições em str1:", lcs.posicoes1);
console.log("Posições em str2:", lcs.posicoes2);

// Teste 6: Análise de Texto
console.log("\n--- ANÁLISE ESTATÍSTICA DE TEXTO ---");
const textoAnalise = `TypeScript é uma linguagem de programação.
TypeScript adiciona tipagem estática ao JavaScript.
A linguagem TypeScript é muito popular.`;

const analise = ProcessadorTextoAvancado.analisarTexto(textoAnalise);
console.log("Estatísticas do texto:");
console.log("- Caracteres:", analise.caracteres);
console.log("- Palavras:", analise.palavras);
console.log("- Linhas:", analise.linhas);
console.log("- Palavra mais frequente:", analise.palavraMaisFrequente);
console.log("- Caractere mais frequente:", analise.caractereMaisFrequente);
console.log("- Complexidade lexical:", (analise.complexidadeLexical * 100).toFixed(2) + "%");

console.log("\nTop 5 palavras mais frequentes:");
const palavrasOrdenadas = Array.from(analise.frequenciaPalavras.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

for (let i = 0; i < palavrasOrdenadas.length; i++) {
    const [palavra, freq] = palavrasOrdenadas[i];
    console.log(`  ${i + 1}. "${palavra}": ${freq} vez(es)`);
}

// Teste 7: Autômato Finito
console.log("\n--- AUTÔMATO FINITO - VALIDADOR DE EMAIL ---");
const validador = AutomatoFinito.criarValidadorEmail();

// Simplifica emails para teste (apenas letras minúsculas)
const emailsTeste = [
    "a@a.a",      // Válido
    "aa@aa.aa",   // Válido
    "a@a",        // Inválido (sem domínio)
    "@a.a",       // Inválido (sem usuário)
    "a.a@a.a"     // Inválido (ponto no usuário)
];

for (let i = 0; i < emailsTeste.length; i++) {
    const email = emailsTeste[i];
    const resultado = validador.aceitar(email);
    
    console.log(`Email: "${email}"`);
    console.log(`  Válido: ${resultado.aceito}`);
    console.log(`  Caminho: ${resultado.caminho.join(' → ')}`);
    if (!resultado.aceito) {
        console.log(`  Parou na posição: ${resultado.posicaoParada}`);
    }
}

// Teste 8: Comparação de Performance
console.log("\n--- COMPARAÇÃO DE PERFORMANCE ---");
const textoGrande = "a".repeat(1000) + "b".repeat(100) + "aba" + "c".repeat(900);
const padraoTeste = "aba";

console.log("Teste com texto de 2000+ caracteres:");

// KMP
const inicioKMP = Date.now();
const resultKMP = AlgoritmoKMP.buscarPadrao(textoGrande, padraoTeste);
const tempoKMP = Date.now() - inicioKMP;

// Boyer-Moore
const inicioBM = Date.now();
const resultBM = AlgoritmoBoyerMoore.buscarPadrao(textoGrande, padraoTeste);
const tempoBM = Date.now() - inicioBM;

console.log(`KMP: ${resultKMP.length} ocorrências em ${tempoKMP}ms`);
console.log(`Boyer-Moore: ${resultBM.length} ocorrências em ${tempoBM}ms`);

export { 
    AlgoritmoKMP, 
    AlgoritmoBoyerMoore, 
    ProcessadorTextoAvancado, 
    AutomatoFinito 
};
