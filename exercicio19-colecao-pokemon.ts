/**
 * EXERCÍCIO 19 - COLEÇÃO DE CARTAS POKEMON
 * 
 * Inspirado no problema das Figurinhas de Sheldon, este exercício
 * trabalha com coleção de cartas Pokemon organizadas por raridade.
 * 
 * Conceitos explorados:
 * - Análise de coleções por critérios
 * - Classificação por raridade
 * - Estatísticas de coleção
 * - Busca e filtragem avançada
 * - Algoritmos de recomendação
 */

class CartaPokemon {
    private numero: number;
    private raridade: string; // "comum", "incomum", "rara", "ultra-rara"
    private tipo: string; // "fogo", "agua", "grama", "eletrico", "psiquico"

    constructor(numero: number, raridade: string, tipo: string) {
        this.numero = numero;
        this.raridade = raridade;
        this.tipo = tipo;
    }

    public obterNumero(): number {
        return this.numero;
    }

    public obterRaridade(): string {
        return this.raridade;
    }

    public obterTipo(): string {
        return this.tipo;
    }

    public obterValorRaridade(): number {
        // Valor numérico para ordenação: comum=1, incomum=2, rara=3, ultra-rara=4
        switch (this.raridade) {
            case "comum": return 1;
            case "incomum": return 2;
            case "rara": return 3;
            case "ultra-rara": return 4;
            default: return 0;
        }
    }
}

class ColecaoPokemon {
    private cartas: CartaPokemon[];

    constructor() {
        this.cartas = [];
    }

    public adicionarCarta(numero: number, raridade: string, tipo: string): void {
        const novaCarta = new CartaPokemon(numero, raridade, tipo);
        this.cartas[this.cartas.length] = novaCarta;
    }

    public adicionarCartas(listaCartas: [number, string, string][]): void {
        for (let i = 0; i < listaCartas.length; i++) {
            const carta = listaCartas[i];
            this.adicionarCarta(carta[0], carta[1], carta[2]);
        }
    }

    // Retorna cartas repetidas por número, ordenadas por raridade
    public obterRepetidas(): number[] {
        const repetidas: number[] = [];
        
        for (let i = 0; i < this.cartas.length; i++) {
            const cartaAtual = this.cartas[i];
            let contador = 0;
            
            // Conta quantas vezes aparece este número
            for (let j = 0; j < this.cartas.length; j++) {
                if (this.cartas[j].obterNumero() === cartaAtual.obterNumero()) {
                    contador++;
                }
            }
            
            // Se repetida e não processada ainda
            if (contador > 1) {
                let jaProcessada = false;
                for (let k = 0; k < i; k++) {
                    if (this.cartas[k].obterNumero() === cartaAtual.obterNumero()) {
                        jaProcessada = true;
                        break;
                    }
                }
                
                if (!jaProcessada) {
                    // Adiciona as repetidas (contador - 1)
                    for (let rep = 0; rep < contador - 1; rep++) {
                        repetidas[repetidas.length] = cartaAtual.obterNumero();
                    }
                }
            }
        }
        
        // Ordena numericamente
        for (let i = 0; i < repetidas.length - 1; i++) {
            for (let j = 0; j < repetidas.length - 1 - i; j++) {
                if (repetidas[j] > repetidas[j + 1]) {
                    const temp = repetidas[j];
                    repetidas[j] = repetidas[j + 1];
                    repetidas[j + 1] = temp;
                }
            }
        }
        
        return repetidas;
    }

    // Retorna cartas por tipo específico
    public obterPorTipo(tipo: string): number[] {
        const resultado: number[] = [];
        
        for (let i = 0; i < this.cartas.length; i++) {
            if (this.cartas[i].obterTipo() === tipo) {
                resultado[resultado.length] = this.cartas[i].obterNumero();
            }
        }
        
        // Ordena
        for (let i = 0; i < resultado.length - 1; i++) {
            for (let j = 0; j < resultado.length - 1 - i; j++) {
                if (resultado[j] > resultado[j + 1]) {
                    const temp = resultado[j];
                    resultado[j] = resultado[j + 1];
                    resultado[j + 1] = temp;
                }
            }
        }
        
        return resultado;
    }

    // Retorna cartas por raridade
    public obterPorRaridade(raridade: string): number[] {
        const resultado: number[] = [];
        
        for (let i = 0; i < this.cartas.length; i++) {
            if (this.cartas[i].obterRaridade() === raridade) {
                resultado[resultado.length] = this.cartas[i].obterNumero();
            }
        }
        
        // Ordena
        for (let i = 0; i < resultado.length - 1; i++) {
            for (let j = 0; j < resultado.length - 1 - i; j++) {
                if (resultado[j] > resultado[j + 1]) {
                    const temp = resultado[j];
                    resultado[j] = resultado[j + 1];
                    resultado[j + 1] = temp;
                }
            }
        }
        
        return resultado;
    }

    // Retorna cartas mais valiosas (ultra-raras)
    public obterMaisValiosas(): number[] {
        return this.obterPorRaridade("ultra-rara");
    }

    // Analisa completude da coleção (números de 1 a N)
    public analisarCompletude(numeroMaximo: number): number[] {
        const faltantes: number[] = [];
        
        for (let num = 1; num <= numeroMaximo; num++) {
            let encontrada = false;
            
            for (let i = 0; i < this.cartas.length; i++) {
                if (this.cartas[i].obterNumero() === num) {
                    encontrada = true;
                    break;
                }
            }
            
            if (!encontrada) {
                faltantes[faltantes.length] = num;
            }
        }
        
        return faltantes;
    }

    // Estatísticas da coleção
    public obterEstatisticas(): number[] {
        if (this.cartas.length === 0) {
            return [0, 0, 0, 0, 0]; // [total, comum, incomum, rara, ultra-rara]
        }

        let totalComum = 0;
        let totalIncomum = 0;
        let totalRara = 0;
        let totalUltraRara = 0;

        for (let i = 0; i < this.cartas.length; i++) {
            const raridade = this.cartas[i].obterRaridade();
            
            switch (raridade) {
                case "comum":
                    totalComum++;
                    break;
                case "incomum":
                    totalIncomum++;
                    break;
                case "rara":
                    totalRara++;
                    break;
                case "ultra-rara":
                    totalUltraRara++;
                    break;
            }
        }

        return [this.cartas.length, totalComum, totalIncomum, totalRara, totalUltraRara];
    }

    // Recomendação de troca (cartas que não temos de uma lista)
    public recomendarTroca(oferta: [number, string, string][]): number[] {
        const recomendacoes: number[] = [];
        
        for (let i = 0; i < oferta.length; i++) {
            const cartaOfertada = oferta[i];
            const numero = cartaOfertada[0];
            
            // Verifica se não temos esta carta
            let temos = false;
            for (let j = 0; j < this.cartas.length; j++) {
                if (this.cartas[j].obterNumero() === numero) {
                    temos = true;
                    break;
                }
            }
            
            // Se não temos e não foi adicionada ainda
            if (!temos) {
                let jaAdicionada = false;
                for (let k = 0; k < recomendacoes.length; k++) {
                    if (recomendacoes[k] === numero) {
                        jaAdicionada = true;
                        break;
                    }
                }
                
                if (!jaAdicionada) {
                    recomendacoes[recomendacoes.length] = numero;
                }
            }
        }
        
        // Ordena recomendações
        for (let i = 0; i < recomendacoes.length - 1; i++) {
            for (let j = 0; j < recomendacoes.length - 1 - i; j++) {
                if (recomendacoes[j] > recomendacoes[j + 1]) {
                    const temp = recomendacoes[j];
                    recomendacoes[j] = recomendacoes[j + 1];
                    recomendacoes[j + 1] = temp;
                }
            }
        }
        
        return recomendacoes;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 19 - COLEÇÃO DE CARTAS POKEMON ===\n");

// Teste 1: Criação da coleção
console.log("1. CRIAÇÃO DA COLEÇÃO:");
const colecao = new ColecaoPokemon();
colecao.adicionarCartas([
    [1, "comum", "fogo"],
    [2, "incomum", "agua"],
    [1, "comum", "fogo"],      // repetida
    [3, "rara", "grama"],
    [4, "ultra-rara", "eletrico"],
    [2, "incomum", "agua"],    // repetida
    [5, "comum", "psiquico"],
    [3, "rara", "grama"],      // repetida
]);

console.log("Cartas repetidas:", colecao.obterRepetidas());
console.log();

// Teste 2: Busca por tipo
console.log("2. BUSCA POR TIPO:");
console.log("Cartas de fogo:", colecao.obterPorTipo("fogo"));
console.log("Cartas de água:", colecao.obterPorTipo("agua"));
console.log("Cartas de grama:", colecao.obterPorTipo("grama"));
console.log();

// Teste 3: Busca por raridade
console.log("3. BUSCA POR RARIDADE:");
console.log("Cartas comuns:", colecao.obterPorRaridade("comum"));
console.log("Cartas raras:", colecao.obterPorRaridade("rara"));
console.log("Cartas ultra-raras:", colecao.obterMaisValiosas());
console.log();

// Teste 4: Análise de completude
console.log("4. ANÁLISE DE COMPLETUDE:");
console.log("Faltantes para completar 1-10:", colecao.analisarCompletude(10));
console.log("Faltantes para completar 1-5:", colecao.analisarCompletude(5));
console.log();

// Teste 5: Estatísticas
console.log("5. ESTATÍSTICAS DA COLEÇÃO:");
const stats = colecao.obterEstatisticas();
console.log("Estatísticas [total, comum, incomum, rara, ultra-rara]:", stats);
console.log();

// Teste 6: Recomendação de troca
console.log("6. RECOMENDAÇÃO DE TROCA:");
const oferta: [number, string, string][] = [
    [6, "rara", "psiquico"],
    [7, "ultra-rara", "fogo"],
    [1, "comum", "fogo"],      // já temos
    [8, "incomum", "agua"],
    [2, "incomum", "agua"]     // já temos
];

console.log("Recomendações de troca:", colecao.recomendarTroca(oferta));

export { CartaPokemon, ColecaoPokemon };
