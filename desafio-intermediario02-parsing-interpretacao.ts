/**
 * DESAFIO INTERMEDIÁRIO 2 - SISTEMAS DE PARSING E INTERPRETAÇÃO
 * 
 * Implementa parsers sofisticados, interpretadores de linguagens simples,
 * analisadores sintáticos e semânticos com técnicas avançadas de compilação.
 */

/**
 * Token para análise lexical
 */
enum TipoToken {
    NUMERO = 'NUMERO',
    IDENTIFICADOR = 'IDENTIFICADOR',
    OPERADOR = 'OPERADOR',
    PALAVRA_CHAVE = 'PALAVRA_CHAVE',
    DELIMITADOR = 'DELIMITADOR',
    STRING = 'STRING',
    COMENTARIO = 'COMENTARIO',
    ESPACO_BRANCO = 'ESPACO_BRANCO',
    FIM_ARQUIVO = 'FIM_ARQUIVO',
    INVALIDO = 'INVALIDO'
}

class Token {
    public tipo: TipoToken;
    public valor: string;
    public linha: number;
    public coluna: number;
    
    constructor(tipo: TipoToken, valor: string, linha: number, coluna: number) {
        this.tipo = tipo;
        this.valor = valor;
        this.linha = linha;
        this.coluna = coluna;
    }
    
    public toString(): string {
        return `${this.tipo}("${this.valor}") [${this.linha}:${this.coluna}]`;
    }
}

/**
 * Analisador lexical (tokenizador) robusto
 */
class AnalisadorLexico {
    private entrada: string;
    private posicao: number;
    private linha: number;
    private coluna: number;
    private palavrasChave: Set<string>;
    private operadores: Set<string>;
    private delimitadores: Set<string>;
    
    constructor() {
        this.entrada = '';
        this.posicao = 0;
        this.linha = 1;
        this.coluna = 1;
        
        this.palavrasChave = new Set([
            'if', 'else', 'while', 'for', 'function', 'return', 
            'var', 'let', 'const', 'true', 'false', 'null'
        ]);
        
        this.operadores = new Set([
            '+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', 
            '<=', '>=', '&&', '||', '!', '++', '--', '+=', '-='
        ]);
        
        this.delimitadores = new Set([
            '(', ')', '{', '}', '[', ']', ';', ',', '.', ':'
        ]);
    }
    
    /**
     * Tokeniza o código fonte
     */
    public tokenizar(codigo: string): Token[] {
        this.entrada = codigo;
        this.posicao = 0;
        this.linha = 1;
        this.coluna = 1;
        
        const tokens: Token[] = [];
        
        while (this.posicao < this.entrada.length) {
            const token = this.proximoToken();
            
            if (token.tipo !== TipoToken.ESPACO_BRANCO && 
                token.tipo !== TipoToken.COMENTARIO) {
                tokens[tokens.length] = token;
            }
        }
        
        tokens[tokens.length] = new Token(TipoToken.FIM_ARQUIVO, '', this.linha, this.coluna);
        return tokens;
    }
    
    private proximoToken(): Token {
        this.pularEspacos();
        
        if (this.posicao >= this.entrada.length) {
            return new Token(TipoToken.FIM_ARQUIVO, '', this.linha, this.coluna);
        }
        
        const char = this.entrada[this.posicao];
        const linhaAtual = this.linha;
        const colunaAtual = this.coluna;
        
        // Comentários
        if (char === '/' && this.proximoChar() === '/') {
            return this.lerComentarioLinha();
        }
        
        if (char === '/' && this.proximoChar() === '*') {
            return this.lerComentarioBloco();
        }
        
        // Strings
        if (char === '"' || char === "'") {
            return this.lerString(char);
        }
        
        // Números
        if (this.ehDigito(char)) {
            return this.lerNumero();
        }
        
        // Identificadores e palavras-chave
        if (this.ehLetra(char) || char === '_') {
            return this.lerIdentificador();
        }
        
        // Operadores (multi-caractere primeiro)
        const operadorMulti = this.tentarOperadorMultiCaractere();
        if (operadorMulti) {
            return new Token(TipoToken.OPERADOR, operadorMulti, linhaAtual, colunaAtual);
        }
        
        // Operadores simples
        if (this.operadores.has(char)) {
            this.avancar();
            return new Token(TipoToken.OPERADOR, char, linhaAtual, colunaAtual);
        }
        
        // Delimitadores
        if (this.delimitadores.has(char)) {
            this.avancar();
            return new Token(TipoToken.DELIMITADOR, char, linhaAtual, colunaAtual);
        }
        
        // Caractere inválido
        this.avancar();
        return new Token(TipoToken.INVALIDO, char, linhaAtual, colunaAtual);
    }
    
    private lerString(delimitador: string): Token {
        const linhaInicio = this.linha;
        const colunaInicio = this.coluna;
        let valor = '';
        
        this.avancar(); // Pula delimitador inicial
        
        while (this.posicao < this.entrada.length && this.entrada[this.posicao] !== delimitador) {
            if (this.entrada[this.posicao] === '\\') {
                this.avancar();
                if (this.posicao < this.entrada.length) {
                    const escaped = this.entrada[this.posicao];
                    switch (escaped) {
                        case 'n': valor += '\n'; break;
                        case 't': valor += '\t'; break;
                        case 'r': valor += '\r'; break;
                        case '\\': valor += '\\'; break;
                        case '"': valor += '"'; break;
                        case "'": valor += "'"; break;
                        default: valor += escaped; break;
                    }
                    this.avancar();
                }
            } else {
                valor += this.entrada[this.posicao];
                this.avancar();
            }
        }
        
        if (this.posicao < this.entrada.length) {
            this.avancar(); // Pula delimitador final
        }
        
        return new Token(TipoToken.STRING, valor, linhaInicio, colunaInicio);
    }
    
    private lerNumero(): Token {
        const linhaInicio = this.linha;
        const colunaInicio = this.coluna;
        let valor = '';
        let temPonto = false;
        
        while (this.posicao < this.entrada.length) {
            const char = this.entrada[this.posicao];
            
            if (this.ehDigito(char)) {
                valor += char;
                this.avancar();
            } else if (char === '.' && !temPonto) {
                temPonto = true;
                valor += char;
                this.avancar();
            } else {
                break;
            }
        }
        
        return new Token(TipoToken.NUMERO, valor, linhaInicio, colunaInicio);
    }
    
    private lerIdentificador(): Token {
        const linhaInicio = this.linha;
        const colunaInicio = this.coluna;
        let valor = '';
        
        while (this.posicao < this.entrada.length) {
            const char = this.entrada[this.posicao];
            
            if (this.ehLetra(char) || this.ehDigito(char) || char === '_') {
                valor += char;
                this.avancar();
            } else {
                break;
            }
        }
        
        const tipo = this.palavrasChave.has(valor) ? TipoToken.PALAVRA_CHAVE : TipoToken.IDENTIFICADOR;
        return new Token(tipo, valor, linhaInicio, colunaInicio);
    }
    
    private lerComentarioLinha(): Token {
        const linhaInicio = this.linha;
        const colunaInicio = this.coluna;
        let valor = '';
        
        while (this.posicao < this.entrada.length && this.entrada[this.posicao] !== '\n') {
            valor += this.entrada[this.posicao];
            this.avancar();
        }
        
        return new Token(TipoToken.COMENTARIO, valor, linhaInicio, colunaInicio);
    }
    
    private lerComentarioBloco(): Token {
        const linhaInicio = this.linha;
        const colunaInicio = this.coluna;
        let valor = '';
        
        this.avancar(); // /
        this.avancar(); // *
        
        while (this.posicao < this.entrada.length - 1) {
            if (this.entrada[this.posicao] === '*' && this.entrada[this.posicao + 1] === '/') {
                this.avancar(); // *
                this.avancar(); // /
                break;
            }
            
            valor += this.entrada[this.posicao];
            this.avancar();
        }
        
        return new Token(TipoToken.COMENTARIO, valor, linhaInicio, colunaInicio);
    }
    
    private tentarOperadorMultiCaractere(): string | null {
        if (this.posicao >= this.entrada.length - 1) return null;
        
        const doisChars = this.entrada.substring(this.posicao, this.posicao + 2);
        
        if (this.operadores.has(doisChars)) {
            this.avancar();
            this.avancar();
            return doisChars;
        }
        
        return null;
    }
    
    private pularEspacos(): void {
        while (this.posicao < this.entrada.length && 
               (this.entrada[this.posicao] === ' ' || 
                this.entrada[this.posicao] === '\t' ||
                this.entrada[this.posicao] === '\n' ||
                this.entrada[this.posicao] === '\r')) {
            this.avancar();
        }
    }
    
    private avancar(): void {
        if (this.posicao < this.entrada.length) {
            if (this.entrada[this.posicao] === '\n') {
                this.linha++;
                this.coluna = 1;
            } else {
                this.coluna++;
            }
            this.posicao++;
        }
    }
    
    private proximoChar(): string {
        return this.posicao + 1 < this.entrada.length ? this.entrada[this.posicao + 1] : '';
    }
    
    private ehDigito(char: string): boolean {
        return char >= '0' && char <= '9';
    }
    
    private ehLetra(char: string): boolean {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
    }
}

/**
 * Nós da AST (Árvore Sintática Abstrata)
 */
abstract class NoAST {
    abstract aceitar<T>(visitante: VisitanteAST<T>): T;
}

class NoNumero extends NoAST {
    constructor(public valor: number) {
        super();
    }
    
    aceitar<T>(visitante: VisitanteAST<T>): T {
        return visitante.visitarNumero(this);
    }
}

class NoIdentificador extends NoAST {
    constructor(public nome: string) {
        super();
    }
    
    aceitar<T>(visitante: VisitanteAST<T>): T {
        return visitante.visitarIdentificador(this);
    }
}

class NoOperacaoBinaria extends NoAST {
    constructor(
        public esquerda: NoAST,
        public operador: string,
        public direita: NoAST
    ) {
        super();
    }
    
    aceitar<T>(visitante: VisitanteAST<T>): T {
        return visitante.visitarOperacaoBinaria(this);
    }
}

class NoAtribuicao extends NoAST {
    constructor(
        public identificador: string,
        public valor: NoAST
    ) {
        super();
    }
    
    aceitar<T>(visitante: VisitanteAST<T>): T {
        return visitante.visitarAtribuicao(this);
    }
}

class NoDeclaracao extends NoAST {
    constructor(
        public identificador: string,
        public valor?: NoAST
    ) {
        super();
    }
    
    aceitar<T>(visitante: VisitanteAST<T>): T {
        return visitante.visitarDeclaracao(this);
    }
}

class NoBloco extends NoAST {
    constructor(public declaracoes: NoAST[]) {
        super();
    }
    
    aceitar<T>(visitante: VisitanteAST<T>): T {
        return visitante.visitarBloco(this);
    }
}

/**
 * Interface do padrão Visitor para percorrer a AST
 */
interface VisitanteAST<T> {
    visitarNumero(no: NoNumero): T;
    visitarIdentificador(no: NoIdentificador): T;
    visitarOperacaoBinaria(no: NoOperacaoBinaria): T;
    visitarAtribuicao(no: NoAtribuicao): T;
    visitarDeclaracao(no: NoDeclaracao): T;
    visitarBloco(no: NoBloco): T;
}

/**
 * Parser recursivo descendente
 */
class Parser {
    private tokens: Token[];
    private atual: number;
    
    constructor() {
        this.tokens = [];
        this.atual = 0;
    }
    
    /**
     * Faz parsing dos tokens e gera AST
     */
    public analisar(tokens: Token[]): NoAST {
        this.tokens = tokens;
        this.atual = 0;
        
        return this.programa();
    }
    
    // programa -> declaracao*
    private programa(): NoAST {
        const declaracoes: NoAST[] = [];
        
        while (!this.ehFimArquivo() && !this.verificar(TipoToken.FIM_ARQUIVO)) {
            const decl = this.declaracao();
            if (decl) {
                declaracoes[declaracoes.length] = decl;
            }
        }
        
        return new NoBloco(declaracoes);
    }
    
    // declaracao -> declaracaoVar | declaracaoAtribuicao | expressao
    private declaracao(): NoAST | null {
        try {
            if (this.coincidir(TipoToken.PALAVRA_CHAVE) && this.anterior().valor === 'var') {
                return this.declaracaoVar();
            }
            
            return this.expressao();
        } catch (erro) {
            this.sincronizar();
            return null;
        }
    }
    
    // declaracaoVar -> "var" IDENTIFICADOR ("=" expressao)? ";"
    private declaracaoVar(): NoAST {
        const nome = this.consumir(TipoToken.IDENTIFICADOR, "Esperado nome da variável").valor;
        
        let inicializador: NoAST | undefined;
        if (this.coincidir(TipoToken.OPERADOR) && this.anterior().valor === '=') {
            inicializador = this.expressao();
        }
        
        this.consumir(TipoToken.DELIMITADOR, "Esperado ';' após declaração de variável");
        return new NoDeclaracao(nome, inicializador);
    }
    
    // expressao -> atribuicao
    private expressao(): NoAST {
        return this.atribuicao();
    }
    
    // atribuicao -> IDENTIFICADOR "=" atribuicao | ou
    private atribuicao(): NoAST {
        const expr = this.ou();
        
        if (this.coincidir(TipoToken.OPERADOR) && this.anterior().valor === '=') {
            const valor = this.atribuicao();
            
            if (expr instanceof NoIdentificador) {
                return new NoAtribuicao(expr.nome, valor);
            }
            
            throw new Error("Alvo de atribuição inválido");
        }
        
        return expr;
    }
    
    // ou -> e ("||" e)*
    private ou(): NoAST {
        let expr = this.e();
        
        while (this.coincidir(TipoToken.OPERADOR) && this.anterior().valor === '||') {
            const operador = this.anterior().valor;
            const direita = this.e();
            expr = new NoOperacaoBinaria(expr, operador, direita);
        }
        
        return expr;
    }
    
    // e -> igualdade ("&&" igualdade)*
    private e(): NoAST {
        let expr = this.igualdade();
        
        while (this.coincidir(TipoToken.OPERADOR) && this.anterior().valor === '&&') {
            const operador = this.anterior().valor;
            const direita = this.igualdade();
            expr = new NoOperacaoBinaria(expr, operador, direita);
        }
        
        return expr;
    }
    
    // igualdade -> comparacao (("!=" | "==") comparacao)*
    private igualdade(): NoAST {
        let expr = this.comparacao();
        
        while (this.coincidir(TipoToken.OPERADOR) && 
               (this.anterior().valor === '!=' || this.anterior().valor === '==')) {
            const operador = this.anterior().valor;
            const direita = this.comparacao();
            expr = new NoOperacaoBinaria(expr, operador, direita);
        }
        
        return expr;
    }
    
    // comparacao -> termo ((">" | ">=" | "<" | "<=") termo)*
    private comparacao(): NoAST {
        let expr = this.termo();
        
        while (this.coincidir(TipoToken.OPERADOR) && 
               (this.anterior().valor === '>' || this.anterior().valor === '>=' ||
                this.anterior().valor === '<' || this.anterior().valor === '<=')) {
            const operador = this.anterior().valor;
            const direita = this.termo();
            expr = new NoOperacaoBinaria(expr, operador, direita);
        }
        
        return expr;
    }
    
    // termo -> fator (("-" | "+") fator)*
    private termo(): NoAST {
        let expr = this.fator();
        
        while (this.coincidir(TipoToken.OPERADOR) && 
               (this.anterior().valor === '-' || this.anterior().valor === '+')) {
            const operador = this.anterior().valor;
            const direita = this.fator();
            expr = new NoOperacaoBinaria(expr, operador, direita);
        }
        
        return expr;
    }
    
    // fator -> unario (("/" | "*" | "%") unario)*
    private fator(): NoAST {
        let expr = this.unario();
        
        while (this.coincidir(TipoToken.OPERADOR) && 
               (this.anterior().valor === '/' || this.anterior().valor === '*' || this.anterior().valor === '%')) {
            const operador = this.anterior().valor;
            const direita = this.unario();
            expr = new NoOperacaoBinaria(expr, operador, direita);
        }
        
        return expr;
    }
    
    // unario -> ("!" | "-") unario | primario
    private unario(): NoAST {
        if (this.coincidir(TipoToken.OPERADOR) && 
            (this.anterior().valor === '!' || this.anterior().valor === '-')) {
            const operador = this.anterior().valor;
            const direita = this.unario();
            return new NoOperacaoBinaria(new NoNumero(0), operador, direita);
        }
        
        return this.primario();
    }
    
    // primario -> NUMERO | IDENTIFICADOR | "(" expressao ")"
    private primario(): NoAST {
        if (this.coincidir(TipoToken.NUMERO)) {
            return new NoNumero(parseFloat(this.anterior().valor));
        }
        
        if (this.coincidir(TipoToken.IDENTIFICADOR)) {
            return new NoIdentificador(this.anterior().valor);
        }
        
        if (this.coincidir(TipoToken.DELIMITADOR) && this.anterior().valor === '(') {
            const expr = this.expressao();
            this.consumir(TipoToken.DELIMITADOR, "Esperado ')' após expressão");
            return expr;
        }
        
        throw new Error("Esperado expressão");
    }
    
    private coincidir(...tipos: TipoToken[]): boolean {
        for (let i = 0; i < tipos.length; i++) {
            if (this.verificar(tipos[i])) {
                this.avancar();
                return true;
            }
        }
        return false;
    }
    
    private verificar(tipo: TipoToken): boolean {
        if (this.ehFimArquivo()) return false;
        return this.peek().tipo === tipo;
    }
    
    private avancar(): Token {
        if (!this.ehFimArquivo()) this.atual++;
        return this.anterior();
    }
    
    private ehFimArquivo(): boolean {
        return this.peek().tipo === TipoToken.FIM_ARQUIVO;
    }
    
    private peek(): Token {
        return this.tokens[this.atual];
    }
    
    private anterior(): Token {
        return this.tokens[this.atual - 1];
    }
    
    private consumir(tipo: TipoToken, mensagem: string): Token {
        if (this.verificar(tipo)) return this.avancar();
        
        const atual = this.peek();
        throw new Error(`${mensagem}. Encontrado: ${atual.toString()}`);
    }
    
    private sincronizar(): void {
        this.avancar();
        
        while (!this.ehFimArquivo()) {
            if (this.anterior().tipo === TipoToken.DELIMITADOR && this.anterior().valor === ';') {
                return;
            }
            
            if (this.peek().tipo === TipoToken.PALAVRA_CHAVE) {
                const valor = this.peek().valor;
                if (valor === 'if' || valor === 'for' || valor === 'while' || 
                    valor === 'return' || valor === 'var' || valor === 'function') {
                    return;
                }
            }
            
            this.avancar();
        }
    }
}

/**
 * Interpretador que executa a AST
 */
class Interpretador implements VisitanteAST<any> {
    private ambiente: Map<string, any>;
    
    constructor() {
        this.ambiente = new Map<string, any>();
    }
    
    /**
     * Interpreta/executa a AST
     */
    public interpretar(ast: NoAST): any {
        return ast.aceitar(this);
    }
    
    visitarNumero(no: NoNumero): number {
        return no.valor;
    }
    
    visitarIdentificador(no: NoIdentificador): any {
        if (!this.ambiente.has(no.nome)) {
            throw new Error(`Variável não definida: ${no.nome}`);
        }
        return this.ambiente.get(no.nome);
    }
    
    visitarOperacaoBinaria(no: NoOperacaoBinaria): any {
        const esquerda = no.esquerda.aceitar(this);
        const direita = no.direita.aceitar(this);
        
        switch (no.operador) {
            case '+': return esquerda + direita;
            case '-': return esquerda - direita;
            case '*': return esquerda * direita;
            case '/': 
                if (direita === 0) throw new Error("Divisão por zero");
                return esquerda / direita;
            case '%': return esquerda % direita;
            case '>': return esquerda > direita;
            case '>=': return esquerda >= direita;
            case '<': return esquerda < direita;
            case '<=': return esquerda <= direita;
            case '==': return esquerda === direita;
            case '!=': return esquerda !== direita;
            case '&&': return esquerda && direita;
            case '||': return esquerda || direita;
            default:
                throw new Error(`Operador não suportado: ${no.operador}`);
        }
    }
    
    visitarAtribuicao(no: NoAtribuicao): any {
        const valor = no.valor.aceitar(this);
        this.ambiente.set(no.identificador, valor);
        return valor;
    }
    
    visitarDeclaracao(no: NoDeclaracao): any {
        let valor: any = null;
        
        if (no.valor) {
            valor = no.valor.aceitar(this);
        }
        
        this.ambiente.set(no.identificador, valor);
        return null;
    }
    
    visitarBloco(no: NoBloco): any {
        let resultado: any = null;
        
        for (let i = 0; i < no.declaracoes.length; i++) {
            resultado = no.declaracoes[i].aceitar(this);
        }
        
        return resultado;
    }
    
    /**
     * Obtém estado atual do ambiente (variáveis)
     */
    public obterAmbiente(): Map<string, any> {
        return new Map(this.ambiente);
    }
    
    /**
     * Limpa o ambiente
     */
    public limparAmbiente(): void {
        this.ambiente.clear();
    }
}

/**
 * Sistema completo de compilação simples
 */
class SistemaCompilacao {
    private lexico: AnalisadorLexico;
    private parser: Parser;
    private interpretador: Interpretador;
    private historico: {
        codigo: string;
        tokens: Token[];
        ast: NoAST;
        resultado: any;
        tempo: number;
    }[];
    
    constructor() {
        this.lexico = new AnalisadorLexico();
        this.parser = new Parser();
        this.interpretador = new Interpretador();
        this.historico = [];
    }
    
    /**
     * Compila e executa código fonte
     */
    public executar(codigo: string): {
        tokens: Token[];
        ast: NoAST;
        resultado: any;
        ambiente: Map<string, any>;
        tempo: number;
        erro?: string;
    } {
        const inicio = Date.now();
        
        try {
            // Análise léxica
            const tokens = this.lexico.tokenizar(codigo);
            
            // Análise sintática
            const ast = this.parser.analisar(tokens);
            
            // Interpretação
            const resultado = this.interpretador.interpretar(ast);
            
            const tempo = Date.now() - inicio;
            
            // Salva no histórico
            this.historico[this.historico.length] = {
                codigo,
                tokens,
                ast,
                resultado,
                tempo
            };
            
            return {
                tokens,
                ast,
                resultado,
                ambiente: this.interpretador.obterAmbiente(),
                tempo
            };
            
        } catch (erro) {
            const tempo = Date.now() - inicio;
            
            return {
                tokens: [],
                ast: new NoBloco([]),
                resultado: null,
                ambiente: new Map(),
                tempo,
                erro: erro instanceof Error ? erro.message : String(erro)
            };
        }
    }
    
    /**
     * Executa múltiplas linhas de código
     */
    public executarPrograma(linhas: string[]): {
        resultados: any[];
        ambiente_final: Map<string, any>;
        tempo_total: number;
        erros: string[];
    } {
        const resultados: any[] = [];
        const erros: string[] = [];
        const inicioTotal = Date.now();
        
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            
            if (linha === '' || linha.startsWith('//')) {
                continue; // Pula linhas vazias e comentários
            }
            
            const execucao = this.executar(linha);
            
            if (execucao.erro) {
                erros[erros.length] = `Linha ${i + 1}: ${execucao.erro}`;
            } else {
                resultados[resultados.length] = execucao.resultado;
            }
        }
        
        const tempoTotal = Date.now() - inicioTotal;
        
        return {
            resultados,
            ambiente_final: this.interpretador.obterAmbiente(),
            tempo_total: tempoTotal,
            erros
        };
    }
    
    /**
     * Obtém análise detalhada de um código
     */
    public analisar(codigo: string): {
        tokens_detalhados: string[];
        estrutura_ast: string;
        metricas: {
            tokens: number;
            identificadores: number;
            operadores: number;
            numeros: number;
            complexidade: number;
        };
    } {
        const tokens = this.lexico.tokenizar(codigo);
        const ast = this.parser.analisar(tokens);
        
        const tokensDetalhados = tokens.map(token => token.toString());
        
        let identificadores = 0;
        let operadores = 0;
        let numeros = 0;
        
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            switch (token.tipo) {
                case TipoToken.IDENTIFICADOR:
                    identificadores++;
                    break;
                case TipoToken.OPERADOR:
                    operadores++;
                    break;
                case TipoToken.NUMERO:
                    numeros++;
                    break;
            }
        }
        
        const complexidade = operadores + identificadores; // Métrica simples
        
        return {
            tokens_detalhados: tokensDetalhados,
            estrutura_ast: this.astParaString(ast),
            metricas: {
                tokens: tokens.length,
                identificadores,
                operadores,
                numeros,
                complexidade
            }
        };
    }
    
    private astParaString(no: NoAST, nivel: number = 0): string {
        const indentacao = '  '.repeat(nivel);
        
        if (no instanceof NoNumero) {
            return `${indentacao}Número: ${no.valor}`;
        }
        
        if (no instanceof NoIdentificador) {
            return `${indentacao}Identificador: ${no.nome}`;
        }
        
        if (no instanceof NoOperacaoBinaria) {
            return `${indentacao}Operação: ${no.operador}\n` +
                   `${this.astParaString(no.esquerda, nivel + 1)}\n` +
                   `${this.astParaString(no.direita, nivel + 1)}`;
        }
        
        if (no instanceof NoAtribuicao) {
            return `${indentacao}Atribuição: ${no.identificador}\n` +
                   `${this.astParaString(no.valor, nivel + 1)}`;
        }
        
        if (no instanceof NoDeclaracao) {
            let resultado = `${indentacao}Declaração: ${no.identificador}`;
            if (no.valor) {
                resultado += `\n${this.astParaString(no.valor, nivel + 1)}`;
            }
            return resultado;
        }
        
        if (no instanceof NoBloco) {
            let resultado = `${indentacao}Bloco:`;
            for (let i = 0; i < no.declaracoes.length; i++) {
                resultado += `\n${this.astParaString(no.declaracoes[i], nivel + 1)}`;
            }
            return resultado;
        }
        
        return `${indentacao}Nó desconhecido`;
    }
    
    /**
     * Obtém histórico de execuções
     */
    public obterHistorico(): typeof this.historico {
        return [...this.historico];
    }
    
    /**
     * Limpa histórico e ambiente
     */
    public reiniciar(): void {
        this.historico.length = 0;
        this.interpretador.limparAmbiente();
    }
}

// Exemplos de uso e testes
console.log("=== DESAFIO INTERMEDIÁRIO 2 - PARSING E INTERPRETAÇÃO ===");

// Teste 1: Análise Lexical
console.log("--- ANÁLISE LEXICAL ---");
const lexico = new AnalisadorLexico();

const codigoTeste = `
    var x = 42;
    var y = x + 10;
    // Este é um comentário
    var resultado = (x * y) / 2;
    var nome = "TypeScript";
`;

const tokens = lexico.tokenizar(codigoTeste);
console.log("Tokens encontrados:");

for (let i = 0; i < Math.min(tokens.length, 15); i++) {
    const token = tokens[i];
    console.log(`  ${token.toString()}`);
}

// Teste 2: Sistema de Compilação Completo
console.log("\n--- SISTEMA DE COMPILAÇÃO ---");
const sistema = new SistemaCompilacao();

const programaTeste = [
    "var a = 5;",
    "var b = 10;",
    "var soma = a + b;",
    "var produto = a * b;",
    "var media = (a + b) / 2;"
];

console.log("Executando programa:");
for (let i = 0; i < programaTeste.length; i++) {
    console.log(`  ${programaTeste[i]}`);
}

const execucaoPrograma = sistema.executarPrograma(programaTeste);

console.log("\nResultados:");
for (let i = 0; i < execucaoPrograma.resultados.length; i++) {
    console.log(`  Linha ${i + 1}: ${execucaoPrograma.resultados[i]}`);
}

console.log("\nVariáveis no ambiente:");
execucaoPrograma.ambiente_final.forEach((valor, nome) => {
    console.log(`  ${nome} = ${valor}`);
});

console.log(`\nTempo total: ${execucaoPrograma.tempo_total}ms`);

if (execucaoPrograma.erros.length > 0) {
    console.log("\nErros encontrados:");
    for (let i = 0; i < execucaoPrograma.erros.length; i++) {
        console.log(`  ${execucaoPrograma.erros[i]}`);
    }
}

// Teste 3: Análise Detalhada
console.log("\n--- ANÁLISE DETALHADA ---");
const codigoComplexo = "var resultado = (x + y * 2) / (z - 1);";

const analise = sistema.analisar(codigoComplexo);

console.log(`Código: ${codigoComplexo}`);
console.log("\nMétricas:");
console.log(`  Total de tokens: ${analise.metricas.tokens}`);
console.log(`  Identificadores: ${analise.metricas.identificadores}`);
console.log(`  Operadores: ${analise.metricas.operadores}`);
console.log(`  Números: ${analise.metricas.numeros}`);
console.log(`  Complexidade: ${analise.metricas.complexidade}`);

console.log("\nEstrutura AST:");
console.log(analise.estrutura_ast);

// Teste 4: Expressões Matemáticas
console.log("\n--- EXPRESSÕES MATEMÁTICAS ---");
const expressoes = [
    "2 + 3 * 4",
    "(2 + 3) * 4",
    "10 / 2 - 1",
    "2 * 3 + 4 * 5",
    "100 % 7"
];

for (let i = 0; i < expressoes.length; i++) {
    const expr = expressoes[i];
    const resultado = sistema.executar(expr);
    
    console.log(`${expr} = ${resultado.resultado} (${resultado.tempo}ms)`);
}

// Teste 5: Comparações e Lógica
console.log("\n--- OPERAÇÕES LÓGICAS ---");
sistema.reiniciar(); // Limpa ambiente

const operacoesLogicas = [
    "var a = 5;",
    "var b = 3;",
    "a > b",
    "a < b",
    "a == 5",
    "a != b",
    "a >= 5 && b <= 3",
    "a < 0 || b > 0"
];

for (let i = 0; i < operacoesLogicas.length; i++) {
    const operacao = operacoesLogicas[i];
    const resultado = sistema.executar(operacao);
    
    if (resultado.resultado !== null) {
        console.log(`${operacao} => ${resultado.resultado}`);
    } else {
        console.log(`${operacao} (declaração executada)`);
    }
}

// Teste 6: Tratamento de Erros
console.log("\n--- TRATAMENTO DE ERROS ---");
const codigosComErro = [
    "var x = ;",           // Erro sintático
    "y = 5;",              // Variável não declarada
    "5 / 0;",              // Divisão por zero
    "var 123invalid = 1;"   // Nome inválido
];

for (let i = 0; i < codigosComErro.length; i++) {
    const codigo = codigosComErro[i];
    const resultado = sistema.executar(codigo);
    
    console.log(`"${codigo}"`);
    if (resultado.erro) {
        console.log(`  Erro: ${resultado.erro}`);
    } else {
        console.log(`  Resultado: ${resultado.resultado}`);
    }
}

// Teste 7: Performance Benchmark
console.log("\n--- BENCHMARK DE PERFORMANCE ---");
const codigoBench = "var result = ((a + b) * c - d) / e + f % g;";

sistema.reiniciar();
sistema.executar("var a = 1; var b = 2; var c = 3; var d = 4; var e = 5; var f = 6; var g = 7;");

const tempos: number[] = [];

for (let i = 0; i < 100; i++) {
    const execucao = sistema.executar(codigoBench);
    tempos[tempos.length] = execucao.tempo;
}

// Calcula estatísticas
let soma = 0;
let min = tempos[0];
let max = tempos[0];

for (let i = 0; i < tempos.length; i++) {
    soma += tempos[i];
    if (tempos[i] < min) min = tempos[i];
    if (tempos[i] > max) max = tempos[i];
}

const media = soma / tempos.length;

console.log("Benchmark - 100 execuções:");
console.log(`  Tempo médio: ${media.toFixed(2)}ms`);
console.log(`  Tempo mínimo: ${min}ms`);
console.log(`  Tempo máximo: ${max}ms`);

export {
    TipoToken,
    Token,
    AnalisadorLexico,
    NoAST,
    NoNumero,
    NoIdentificador,
    NoOperacaoBinaria,
    NoAtribuicao,
    NoDeclaracao,
    NoBloco,
    Parser,
    Interpretador,
    SistemaCompilacao
};
