/**
 * EXERCÍCIO 20 - JOGO DE DOMINÓ BRASILEIRO
 * 
 * Inspirado no exercício de ordenação de dominó, este exercício
 * simula um jogo completo de dominó brasileiro com regras tradicionais.
 * 
 * Conceitos explorados:
 * - Simulação de jogos com regras
 * - Distribuição aleatória de peças
 * - Lógica de encaixe e validação
 * - Estratégias básicas de jogo
 * - Contagem de pontos
 */

class PecaDominoJogo {
    private lado1: number;
    private lado2: number;

    constructor(lado1: number, lado2: number) {
        // Valida valores de 0 a 6 para dominó tradicional
        if (lado1 < 0 || lado1 > 6 || lado2 < 0 || lado2 > 6) {
            throw new Error("Valores inválidos para peça de dominó");
        }
        
        this.lado1 = lado1;
        this.lado2 = lado2;
    }

    public obterLado1(): number {
        return this.lado1;
    }

    public obterLado2(): number {
        return this.lado2;
    }

    public ehDupla(): boolean {
        return this.lado1 === this.lado2;
    }

    public contemNumero(numero: number): boolean {
        return this.lado1 === numero || this.lado2 === numero;
    }

    public obterOutroLado(numero: number): number {
        if (this.lado1 === numero) {
            return this.lado2;
        } else if (this.lado2 === numero) {
            return this.lado1;
        } else {
            return -1; // Não contém o número
        }
    }

    public calcularPontos(): number {
        return this.lado1 + this.lado2;
    }

    public podeEncaixar(numeroMesa: number): boolean {
        return this.contemNumero(numeroMesa);
    }

    public toArray(): number[] {
        return [this.lado1, this.lado2];
    }
}

class MesaDomino {
    private extremoEsquerdo: number;
    private extremoDireito: number;
    private pecasJogadas: PecaDominoJogo[];

    constructor() {
        this.extremoEsquerdo = -1;
        this.extremoDireito = -1;
        this.pecasJogadas = [];
    }

    public estaVazia(): boolean {
        return this.pecasJogadas.length === 0;
    }

    public obterExtremoEsquerdo(): number {
        return this.extremoEsquerdo;
    }

    public obterExtremoDireito(): number {
        return this.extremoDireito;
    }

    public colocarPrimeiraPeca(peca: PecaDominoJogo): boolean {
        if (!this.estaVazia()) {
            return false;
        }

        this.pecasJogadas[0] = peca;
        this.extremoEsquerdo = peca.obterLado1();
        this.extremoDireito = peca.obterLado2();
        return true;
    }

    public colocarPecaEsquerda(peca: PecaDominoJogo): boolean {
        if (this.estaVazia()) {
            return this.colocarPrimeiraPeca(peca);
        }

        if (!peca.podeEncaixar(this.extremoEsquerdo)) {
            return false;
        }

        const novoExtremo = peca.obterOutroLado(this.extremoEsquerdo);
        this.extremoEsquerdo = novoExtremo;
        
        // Adiciona no início (simula colocação à esquerda)
        const novasPecas: PecaDominoJogo[] = [];
        novasPecas[0] = peca;
        for (let i = 0; i < this.pecasJogadas.length; i++) {
            novasPecas[i + 1] = this.pecasJogadas[i];
        }
        this.pecasJogadas = novasPecas;
        
        return true;
    }

    public colocarPecaDireita(peca: PecaDominoJogo): boolean {
        if (this.estaVazia()) {
            return this.colocarPrimeiraPeca(peca);
        }

        if (!peca.podeEncaixar(this.extremoDireito)) {
            return false;
        }

        const novoExtremo = peca.obterOutroLado(this.extremoDireito);
        this.extremoDireito = novoExtremo;
        
        // Adiciona no final
        this.pecasJogadas[this.pecasJogadas.length] = peca;
        
        return true;
    }

    public podeJogar(peca: PecaDominoJogo): boolean {
        if (this.estaVazia()) {
            return true;
        }
        
        return peca.podeEncaixar(this.extremoEsquerdo) || 
               peca.podeEncaixar(this.extremoDireito);
    }

    public obterEstadoMesa(): number[] {
        if (this.estaVazia()) {
            return [];
        }
        return [this.extremoEsquerdo, this.extremoDireito];
    }

    public obterSequenciaPecas(): number[][] {
        const sequencia: number[][] = [];
        for (let i = 0; i < this.pecasJogadas.length; i++) {
            sequencia[i] = this.pecasJogadas[i].toArray();
        }
        return sequencia;
    }
}

class JogadorDomino {
    private nome: string;
    private mao: PecaDominoJogo[];

    constructor(nome: string) {
        this.nome = nome;
        this.mao = [];
    }

    public obterNome(): string {
        return this.nome;
    }

    public receberPeca(peca: PecaDominoJogo): void {
        this.mao[this.mao.length] = peca;
    }

    public obterQuantidadePecas(): number {
        return this.mao.length;
    }

    public temPecasParaJogar(mesa: MesaDomino): boolean {
        for (let i = 0; i < this.mao.length; i++) {
            if (mesa.podeJogar(this.mao[i])) {
                return true;
            }
        }
        return false;
    }

    // Estratégia simples: joga primeira peça possível
    public escolherPeca(mesa: MesaDomino): number {
        for (let i = 0; i < this.mao.length; i++) {
            if (mesa.podeJogar(this.mao[i])) {
                return i;
            }
        }
        return -1; // Não pode jogar
    }

    public jogarPeca(indicePeca: number): PecaDominoJogo | null {
        if (indicePeca < 0 || indicePeca >= this.mao.length) {
            return null;
        }

        const peca = this.mao[indicePeca];
        
        // Remove a peça da mão
        const novaMao: PecaDominoJogo[] = [];
        for (let i = 0; i < this.mao.length; i++) {
            if (i !== indicePeca) {
                novaMao[novaMao.length] = this.mao[i];
            }
        }
        this.mao = novaMao;
        
        return peca;
    }

    public calcularPontosMao(): number {
        let total = 0;
        for (let i = 0; i < this.mao.length; i++) {
            total += this.mao[i].calcularPontos();
        }
        return total;
    }

    public obterMao(): number[][] {
        const mao: number[][] = [];
        for (let i = 0; i < this.mao.length; i++) {
            mao[i] = this.mao[i].toArray();
        }
        return mao;
    }

    public temDupla(): boolean {
        for (let i = 0; i < this.mao.length; i++) {
            if (this.mao[i].ehDupla()) {
                return true;
            }
        }
        return false;
    }
}

class JogoDomino {
    private pecas: PecaDominoJogo[];
    private jogadores: JogadorDomino[];
    private mesa: MesaDomino;
    private jogadorAtual: number;
    private jogoTerminado: boolean;

    constructor(nomeJogadores: string[]) {
        this.pecas = [];
        this.jogadores = [];
        this.mesa = new MesaDomino();
        this.jogadorAtual = 0;
        this.jogoTerminado = false;

        // Cria jogadores
        for (let i = 0; i < nomeJogadores.length; i++) {
            this.jogadores[i] = new JogadorDomino(nomeJogadores[i]);
        }

        this.gerarPecasDomino();
        this.embaralharPecas();
        this.distribuirPecas();
    }

    private gerarPecasDomino(): void {
        // Gera conjunto completo de dominó (0-0 até 6-6)
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                this.pecas[this.pecas.length] = new PecaDominoJogo(i, j);
            }
        }
    }

    private embaralharPecas(): void {
        // Embaralhamento manual (Fisher-Yates adaptado)
        for (let i = this.pecas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            
            // Troca
            const temp = this.pecas[i];
            this.pecas[i] = this.pecas[j];
            this.pecas[j] = temp;
        }
    }

    private distribuirPecas(): void {
        const pecasPorJogador = 7; // Padrão do dominó brasileiro
        let indicePeca = 0;

        for (let rodada = 0; rodada < pecasPorJogador; rodada++) {
            for (let j = 0; j < this.jogadores.length; j++) {
                if (indicePeca < this.pecas.length) {
                    this.jogadores[j].receberPeca(this.pecas[indicePeca]);
                    indicePeca++;
                }
            }
        }

        // Remove peças distribuídas do monte
        const novasPecas: PecaDominoJogo[] = [];
        for (let i = indicePeca; i < this.pecas.length; i++) {
            novasPecas[novasPecas.length] = this.pecas[i];
        }
        this.pecas = novasPecas;
    }

    public executarJogada(): boolean {
        if (this.jogoTerminado) {
            return false;
        }

        const jogador = this.jogadores[this.jogadorAtual];
        
        // Verifica se jogador pode jogar
        if (!jogador.temPecasParaJogar(this.mesa)) {
            // Passa a vez
            this.proximoJogador();
            return true;
        }

        // Escolhe peça para jogar
        const indicePeca = jogador.escolherPeca(this.mesa);
        if (indicePeca === -1) {
            this.proximoJogador();
            return true;
        }

        const peca = jogador.jogarPeca(indicePeca);
        if (peca === null) {
            return false;
        }

        // Tenta colocar na mesa
        let colocada = false;
        if (this.mesa.estaVazia()) {
            colocada = this.mesa.colocarPrimeiraPeca(peca);
        } else {
            // Tenta direita primeiro, depois esquerda
            colocada = this.mesa.colocarPecaDireita(peca) || 
                      this.mesa.colocarPecaEsquerda(peca);
        }

        if (!colocada) {
            // Devolve a peça (erro de lógica)
            jogador.receberPeca(peca);
            return false;
        }

        // Verifica se jogador ganhou
        if (jogador.obterQuantidadePecas() === 0) {
            this.jogoTerminado = true;
            return true;
        }

        this.proximoJogador();
        return true;
    }

    private proximoJogador(): void {
        this.jogadorAtual = (this.jogadorAtual + 1) % this.jogadores.length;
    }

    public obterEstadoJogo(): any {
        const estado: any = {
            mesa: this.mesa.obterEstadoMesa(),
            sequencia: this.mesa.obterSequenciaPecas(),
            jogadorAtual: this.jogadorAtual,
            jogoTerminado: this.jogoTerminado,
            jogadores: []
        };

        for (let i = 0; i < this.jogadores.length; i++) {
            const jogador = this.jogadores[i];
            estado.jogadores[i] = {
                nome: jogador.obterNome(),
                quantidadePecas: jogador.obterQuantidadePecas(),
                pontosMao: jogador.calcularPontosMao(),
                mao: jogador.obterMao()
            };
        }

        return estado;
    }

    public simularJogoCompleto(): any {
        const maxJogadas = 100; // Evita loop infinito
        let jogadas = 0;

        while (!this.jogoTerminado && jogadas < maxJogadas) {
            this.executarJogada();
            jogadas++;
        }

        return this.obterEstadoJogo();
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 20 - JOGO DE DOMINÓ BRASILEIRO ===\n");

// Teste 1: Peças individuais
console.log("1. TESTE DE PEÇAS:");
const peca1 = new PecaDominoJogo(3, 5);
const peca2 = new PecaDominoJogo(2, 2);

console.log("Peça [3,5] - Array:", peca1.toArray());
console.log("Peça [2,2] - É dupla:", peca2.ehDupla());
console.log("Peça [3,5] - Contém 3:", peca1.contemNumero(3));
console.log("Peça [3,5] - Outro lado do 3:", peca1.obterOutroLado(3));
console.log("Peça [3,5] - Pontos:", peca1.calcularPontos());
console.log();

// Teste 2: Mesa de dominó
console.log("2. TESTE DE MESA:");
const mesa = new MesaDomino();
console.log("Mesa vazia:", mesa.estaVazia());

const pecaMesa1 = new PecaDominoJogo(4, 6);
mesa.colocarPrimeiraPeca(pecaMesa1);
console.log("Após primeira peça [4,6] - Estado:", mesa.obterEstadoMesa());

const pecaMesa2 = new PecaDominoJogo(6, 2);
const colocada = mesa.colocarPecaDireita(pecaMesa2);
console.log("Colocou [6,2] na direita:", colocada);
console.log("Estado da mesa:", mesa.obterEstadoMesa());
console.log("Sequência de peças:", mesa.obterSequenciaPecas());
console.log();

// Teste 3: Jogador
console.log("3. TESTE DE JOGADOR:");
const jogador = new JogadorDomino("Alice");
jogador.receberPeca(new PecaDominoJogo(1, 3));
jogador.receberPeca(new PecaDominoJogo(2, 4));
jogador.receberPeca(new PecaDominoJogo(5, 5));

console.log("Jogador Alice - Quantidade de peças:", jogador.obterQuantidadePecas());
console.log("Jogador Alice - Mão:", jogador.obterMao());
console.log("Jogador Alice - Pontos na mão:", jogador.calcularPontosMao());
console.log("Jogador Alice - Tem dupla:", jogador.temDupla());
console.log();

// Teste 4: Jogo completo (simulação rápida)
console.log("4. SIMULAÇÃO DE JOGO COMPLETO:");
const jogo = new JogoDomino(["Ana", "Bruno"]);

console.log("Estado inicial:");
const estadoInicial = jogo.obterEstadoJogo();
console.log("Mesa:", estadoInicial.mesa);
console.log("Jogador Ana - Peças:", estadoInicial.jogadores[0].quantidadePecas);
console.log("Jogador Bruno - Peças:", estadoInicial.jogadores[1].quantidadePecas);

// Executa algumas jogadas
console.log("\nExecutando 5 jogadas:");
for (let i = 0; i < 5; i++) {
    const sucesso = jogo.executarJogada();
    if (sucesso) {
        const estado = jogo.obterEstadoJogo();
        console.log(`Jogada ${i + 1} - Mesa: [${estado.mesa}] - Peças: Ana(${estado.jogadores[0].quantidadePecas}) Bruno(${estado.jogadores[1].quantidadePecas})`);
    }
}

console.log("\nSimulação completa:");
const estadoFinal = jogo.simularJogoCompleto();
console.log("Jogo terminado:", estadoFinal.jogoTerminado);
console.log("Estado final da mesa:", estadoFinal.mesa);
console.log("Sequência final (primeiras 5 peças):", estadoFinal.sequencia.slice(0, 5));

for (let i = 0; i < estadoFinal.jogadores.length; i++) {
    const jogadorFinal = estadoFinal.jogadores[i];
    console.log(`${jogadorFinal.nome} - Peças restantes: ${jogadorFinal.quantidadePecas}, Pontos: ${jogadorFinal.pontosMao}`);
}

export { PecaDominoJogo, MesaDomino, JogadorDomino, JogoDomino };
