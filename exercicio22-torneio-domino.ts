/**
 * EXERCÍCIO 22 - TORNEIO DE DOMINÓ
 * 
 * Inspirado no jogo de dominó, este exercício simula um torneio
 * completo com múltiplas partidas e classificação.
 * 
 * Conceitos explorados:
 * - Sistemas de torneio e classificação
 * - Gestão de múltiplas partidas
 * - Algoritmos de emparelhamento
 * - Estatísticas de performance
 * - Ranking e pontuação
 */

class JogadorTorneio {
    private nome: string;
    private vitorias: number;
    private derrotas: number;
    private pontosMarcados: number;
    private pontosSofridos: number;
    private partidasJogadas: number;

    constructor(nome: string) {
        this.nome = nome;
        this.vitorias = 0;
        this.derrotas = 0;
        this.pontosMarcados = 0;
        this.pontosSofridos = 0;
        this.partidasJogadas = 0;
    }

    public obterNome(): string {
        return this.nome;
    }

    public obterVitorias(): number {
        return this.vitorias;
    }

    public obterDerrotas(): number {
        return this.derrotas;
    }

    public obterPartidasJogadas(): number {
        return this.partidasJogadas;
    }

    public registrarVitoria(pontosMarcados: number, pontosSofridos: number): void {
        this.vitorias++;
        this.pontosMarcados += pontosMarcados;
        this.pontosSofridos += pontosSofridos;
        this.partidasJogadas++;
    }

    public registrarDerrota(pontosMarcados: number, pontosSofridos: number): void {
        this.derrotas++;
        this.pontosMarcados += pontosMarcados;
        this.pontosSofridos += pontosSofridos;
        this.partidasJogadas++;
    }

    public calcularPontuacao(): number {
        // Sistema de pontuação: 3 pontos por vitória
        return this.vitorias * 3;
    }

    public calcularSaldoPontos(): number {
        return this.pontosMarcados - this.pontosSofridos;
    }

    public calcularPercentualVitorias(): number {
        if (this.partidasJogadas === 0) {
            return 0;
        }
        return Math.floor((this.vitorias / this.partidasJogadas) * 100);
    }

    public calcularMediaPontosPorPartida(): number {
        if (this.partidasJogadas === 0) {
            return 0;
        }
        return Math.floor((this.pontosMarcados / this.partidasJogadas) * 100) / 100;
    }

    public obterEstatisticas(): number[] {
        return [
            this.vitorias,
            this.derrotas,
            this.partidasJogadas,
            this.calcularPontuacao(),
            this.calcularSaldoPontos(),
            this.calcularPercentualVitorias(),
            Math.floor(this.calcularMediaPontosPorPartida() * 100)
        ];
    }
}

class PartidaTorneio {
    private jogador1: string;
    private jogador2: string;
    private pontosJogador1: number;
    private pontosJogador2: number;
    private vencedor: string;
    private finalizada: boolean;

    constructor(jogador1: string, jogador2: string) {
        this.jogador1 = jogador1;
        this.jogador2 = jogador2;
        this.pontosJogador1 = 0;
        this.pontosJogador2 = 0;
        this.vencedor = "";
        this.finalizada = false;
    }

    public obterJogadores(): string[] {
        return [this.jogador1, this.jogador2];
    }

    public simularPartida(): void {
        // Simula uma partida com pontos aleatórios
        // Dominó tradicional: partida até 100 pontos ou peças acabando
        
        this.pontosJogador1 = Math.floor(Math.random() * 50) + 10; // 10-59 pontos
        this.pontosJogador2 = Math.floor(Math.random() * 50) + 10; // 10-59 pontos
        
        // Determina vencedor (quem fez menos pontos ganha no dominó)
        if (this.pontosJogador1 < this.pontosJogador2) {
            this.vencedor = this.jogador1;
        } else if (this.pontosJogador2 < this.pontosJogador1) {
            this.vencedor = this.jogador2;
        } else {
            // Empate - decide aleatoriamente
            this.vencedor = Math.random() < 0.5 ? this.jogador1 : this.jogador2;
        }
        
        this.finalizada = true;
    }

    public estaFinalizada(): boolean {
        return this.finalizada;
    }

    public obterVencedor(): string {
        return this.vencedor;
    }

    public obterResultado(): number[] {
        return [this.pontosJogador1, this.pontosJogador2];
    }

    public obterResultadoCompleto(): any {
        return {
            jogador1: this.jogador1,
            jogador2: this.jogador2,
            pontos1: this.pontosJogador1,
            pontos2: this.pontosJogador2,
            vencedor: this.vencedor,
            finalizada: this.finalizada
        };
    }
}

class TorneioDomino {
    private jogadores: JogadorTorneio[];
    private partidas: PartidaTorneio[];
    private rodadaAtual: number;
    private torneioFinalizado: boolean;

    constructor(nomesJogadores: string[]) {
        this.jogadores = [];
        this.partidas = [];
        this.rodadaAtual = 1;
        this.torneioFinalizado = false;

        // Cria jogadores
        for (let i = 0; i < nomesJogadores.length; i++) {
            this.jogadores[i] = new JogadorTorneio(nomesJogadores[i]);
        }
    }

    private encontrarJogador(nome: string): JogadorTorneio | null {
        for (let i = 0; i < this.jogadores.length; i++) {
            if (this.jogadores[i].obterNome() === nome) {
                return this.jogadores[i];
            }
        }
        return null;
    }

    // Gera todas as combinações possíveis (todos contra todos)
    public gerarRodadaCompleta(): void {
        const novasPartidas: PartidaTorneio[] = [];
        
        // Todos contra todos
        for (let i = 0; i < this.jogadores.length - 1; i++) {
            for (let j = i + 1; j < this.jogadores.length; j++) {
                const jogador1 = this.jogadores[i].obterNome();
                const jogador2 = this.jogadores[j].obterNome();
                
                novasPartidas[novasPartidas.length] = new PartidaTorneio(jogador1, jogador2);
            }
        }
        
        // Adiciona as novas partidas ao array principal
        for (let i = 0; i < novasPartidas.length; i++) {
            this.partidas[this.partidas.length] = novasPartidas[i];
        }
    }

    public simularRodada(): boolean {
        let partidasSimuladas = 0;
        
        // Simula partidas não finalizadas
        for (let i = 0; i < this.partidas.length; i++) {
            const partida = this.partidas[i];
            
            if (!partida.estaFinalizada()) {
                partida.simularPartida();
                this.atualizarEstatisticas(partida);
                partidasSimuladas++;
            }
        }
        
        if (partidasSimuladas > 0) {
            this.rodadaAtual++;
            return true;
        }
        
        return false;
    }

    private atualizarEstatisticas(partida: PartidaTorneio): void {
        const jogadores = partida.obterJogadores();
        const resultado = partida.obterResultado();
        const vencedor = partida.obterVencedor();
        
        const jogador1 = this.encontrarJogador(jogadores[0]);
        const jogador2 = this.encontrarJogador(jogadores[1]);
        
        if (jogador1 && jogador2) {
            if (vencedor === jogadores[0]) {
                jogador1.registrarVitoria(resultado[0], resultado[1]);
                jogador2.registrarDerrota(resultado[1], resultado[0]);
            } else {
                jogador1.registrarDerrota(resultado[0], resultado[1]);
                jogador2.registrarVitoria(resultado[1], resultado[0]);
            }
        }
    }

    public obterClassificacao(): string[] {
        // Ordena jogadores por pontuação, depois por saldo de pontos
        const jogadoresOrdenados: JogadorTorneio[] = [];
        
        // Copia array
        for (let i = 0; i < this.jogadores.length; i++) {
            jogadoresOrdenados[i] = this.jogadores[i];
        }
        
        // Ordena (bubble sort)
        for (let i = 0; i < jogadoresOrdenados.length - 1; i++) {
            for (let j = 0; j < jogadoresOrdenados.length - 1 - i; j++) {
                const jogador1 = jogadoresOrdenados[j];
                const jogador2 = jogadoresOrdenados[j + 1];
                
                const pontos1 = jogador1.calcularPontuacao();
                const pontos2 = jogador2.calcularPontuacao();
                
                // Critério primário: pontuação
                // Critério secundário: saldo de pontos
                const devesTrocar = 
                    pontos1 < pontos2 || 
                    (pontos1 === pontos2 && jogador1.calcularSaldoPontos() < jogador2.calcularSaldoPontos());
                
                if (devesTrocar) {
                    jogadoresOrdenados[j] = jogador2;
                    jogadoresOrdenados[j + 1] = jogador1;
                }
            }
        }
        
        // Retorna nomes ordenados
        const classificacao: string[] = [];
        for (let i = 0; i < jogadoresOrdenados.length; i++) {
            classificacao[i] = jogadoresOrdenados[i].obterNome();
        }
        
        return classificacao;
    }

    public obterEstatisticasCompletas(): any[] {
        const estatisticas: any[] = [];
        
        for (let i = 0; i < this.jogadores.length; i++) {
            const jogador = this.jogadores[i];
            const stats = jogador.obterEstatisticas();
            
            estatisticas[i] = {
                nome: jogador.obterNome(),
                vitorias: stats[0],
                derrotas: stats[1],
                partidas: stats[2],
                pontuacao: stats[3],
                saldo: stats[4],
                percentual: stats[5],
                mediaPontos: stats[6] / 100
            };
        }
        
        return estatisticas;
    }

    public simularTorneioCompleto(): any {
        // Gera todas as partidas
        this.gerarRodadaCompleta();
        
        // Simula todas as partidas
        while (this.simularRodada()) {
            // Continue simulando até não haver mais partidas
        }
        
        this.torneioFinalizado = true;
        
        return {
            classificacao: this.obterClassificacao(),
            estatisticas: this.obterEstatisticasCompletas(),
            totalPartidas: this.partidas.length,
            rodadas: this.rodadaAtual - 1
        };
    }

    public obterResumoPartidas(): any[] {
        const resumo: any[] = [];
        
        for (let i = 0; i < this.partidas.length; i++) {
            if (this.partidas[i].estaFinalizada()) {
                resumo[resumo.length] = this.partidas[i].obterResultadoCompleto();
            }
        }
        
        return resumo;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 22 - TORNEIO DE DOMINÓ ===\n");

// Teste 1: Torneio pequeno (4 jogadores)
console.log("1. TORNEIO COM 4 JOGADORES:");
const torneio1 = new TorneioDomino(["Alice", "Bruno", "Carlos", "Diana"]);

console.log("Simulando torneio completo...");
const resultado1 = torneio1.simularTorneioCompleto();

console.log("Classificação final:");
for (let i = 0; i < resultado1.classificacao.length; i++) {
    console.log(`${i + 1}º lugar: ${resultado1.classificacao[i]}`);
}

console.log(`\nTotal de partidas: ${resultado1.totalPartidas}`);
console.log("Estatísticas dos jogadores:");
for (let i = 0; i < resultado1.estatisticas.length; i++) {
    const stat = resultado1.estatisticas[i];
    console.log(`${stat.nome}: ${stat.vitorias}V-${stat.derrotas}D, ${stat.pontuacao} pts, saldo ${stat.saldo}`);
}
console.log();

// Teste 2: Torneio maior (6 jogadores)
console.log("2. TORNEIO COM 6 JOGADORES:");
const torneio2 = new TorneioDomino(["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda"]);

const resultado2 = torneio2.simularTorneioCompleto();

console.log("Top 3:");
for (let i = 0; i < 3 && i < resultado2.classificacao.length; i++) {
    const jogador = resultado2.estatisticas.find((stat: any) => stat.nome === resultado2.classificacao[i]);
    console.log(`${i + 1}º: ${jogador.nome} - ${jogador.pontuacao} pontos (${jogador.percentual}% vitórias)`);
}

console.log(`\nTotal de partidas: ${resultado2.totalPartidas}`);
console.log();

// Teste 3: Análise detalhada
console.log("3. ANÁLISE DETALHADA:");
const estatisticasDetalhadas = resultado2.estatisticas;

// Jogador com mais vitórias
let maisVitorias = estatisticasDetalhadas[0];
for (let i = 1; i < estatisticasDetalhadas.length; i++) {
    if (estatisticasDetalhadas[i].vitorias > maisVitorias.vitorias) {
        maisVitorias = estatisticasDetalhadas[i];
    }
}

// Jogador com melhor percentual
let melhorPercentual = estatisticasDetalhadas[0];
for (let i = 1; i < estatisticasDetalhadas.length; i++) {
    if (estatisticasDetalhadas[i].percentual > melhorPercentual.percentual) {
        melhorPercentual = estatisticasDetalhadas[i];
    }
}

// Jogador com melhor saldo
let melhorSaldo = estatisticasDetalhadas[0];
for (let i = 1; i < estatisticasDetalhadas.length; i++) {
    if (estatisticasDetalhadas[i].saldo > melhorSaldo.saldo) {
        melhorSaldo = estatisticasDetalhadas[i];
    }
}

console.log(`Mais vitórias: ${maisVitorias.nome} (${maisVitorias.vitorias} vitórias)`);
console.log(`Melhor percentual: ${melhorPercentual.nome} (${melhorPercentual.percentual}%)`);
console.log(`Melhor saldo: ${melhorSaldo.nome} (${melhorSaldo.saldo} pontos)`);
console.log();

// Teste 4: Resumo de algumas partidas
console.log("4. RESUMO DAS PARTIDAS (primeiras 5):");
const partidasResumo = torneio2.obterResumoPartidas();
for (let i = 0; i < 5 && i < partidasResumo.length; i++) {
    const partida = partidasResumo[i];
    console.log(`${partida.jogador1} ${partida.pontos1} x ${partida.pontos2} ${partida.jogador2} - Vencedor: ${partida.vencedor}`);
}

export { JogadorTorneio, PartidaTorneio, TorneioDomino };
