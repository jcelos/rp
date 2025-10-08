/**
 * EXERCÍCIO 21 - ANÁLISE DE COLECIONÁVEIS
 * 
 * Inspirado no universo de coleções do Sheldon, este exercício
 * analisa diferentes tipos de colecionáveis com métricas avançadas.
 * 
 * Conceitos explorados:
 * - Análise estatística de coleções
 * - Comparação entre coleções
 * - Métricas de valor e raridade
 * - Recomendações de investimento
 * - Algoritmos de otimização de coleção
 */

class ItemColecionavel {
    private id: number;
    private categoria: string; // "quadrinhos", "filmes", "jogos", "cartas"
    private ano: number;
    private condicao: string; // "perfeita", "boa", "regular", "ruim"
    private valor: number;

    constructor(id: number, categoria: string, ano: number, condicao: string, valor: number) {
        this.id = id;
        this.categoria = categoria;
        this.ano = ano;
        this.condicao = condicao;
        this.valor = valor;
    }

    public obterID(): number {
        return this.id;
    }

    public obterCategoria(): string {
        return this.categoria;
    }

    public obterAno(): number {
        return this.ano;
    }

    public obterCondicao(): string {
        return this.condicao;
    }

    public obterValor(): number {
        return this.valor;
    }

    public calcularValorAjustado(): number {
        // Ajusta valor baseado na condição
        let multiplicador = 1.0;
        
        switch (this.condicao) {
            case "perfeita":
                multiplicador = 1.5;
                break;
            case "boa":
                multiplicador = 1.2;
                break;
            case "regular":
                multiplicador = 1.0;
                break;
            case "ruim":
                multiplicador = 0.7;
                break;
        }
        
        return Math.floor(this.valor * multiplicador);
    }

    public calcularIdade(): number {
        const anoAtual = 2025;
        return anoAtual - this.ano;
    }

    public ehVintage(): boolean {
        return this.calcularIdade() >= 25; // 25+ anos
    }

    public toArray(): (number | string)[] {
        return [this.id, this.categoria, this.ano, this.condicao, this.valor];
    }
}

class AnaliseColecao {
    private itens: ItemColecionavel[];

    constructor() {
        this.itens = [];
    }

    public adicionarItem(id: number, categoria: string, ano: number, condicao: string, valor: number): void {
        const item = new ItemColecionavel(id, categoria, ano, condicao, valor);
        this.itens[this.itens.length] = item;
    }

    public adicionarItens(listaItens: [number, string, number, string, number][]): void {
        for (let i = 0; i < listaItens.length; i++) {
            const item = listaItens[i];
            this.adicionarItem(item[0], item[1], item[2], item[3], item[4]);
        }
    }

    // Análise por categoria
    public analisePorCategoria(categoria: string): number[] {
        let quantidade = 0;
        let valorTotal = 0;
        let valorMinimo = Number.MAX_VALUE;
        let valorMaximo = 0;
        
        for (let i = 0; i < this.itens.length; i++) {
            const item = this.itens[i];
            
            if (item.obterCategoria() === categoria) {
                quantidade++;
                const valor = item.calcularValorAjustado();
                valorTotal += valor;
                
                if (valor < valorMinimo) {
                    valorMinimo = valor;
                }
                if (valor > valorMaximo) {
                    valorMaximo = valor;
                }
            }
        }
        
        if (quantidade === 0) {
            return [0, 0, 0, 0, 0]; // [quantidade, total, média, mínimo, máximo]
        }
        
        const valorMedio = Math.floor(valorTotal / quantidade);
        return [quantidade, valorTotal, valorMedio, valorMinimo, valorMaximo];
    }

    // Itens mais valiosos (top N)
    public obterMaisValiosos(quantidade: number): number[][] {
        // Ordena por valor ajustado (descrescente)
        const itensOrdenados: ItemColecionavel[] = [];
        
        // Copia todos os itens
        for (let i = 0; i < this.itens.length; i++) {
            itensOrdenados[i] = this.itens[i];
        }
        
        // Ordena por valor ajustado (bubble sort decrescente)
        for (let i = 0; i < itensOrdenados.length - 1; i++) {
            for (let j = 0; j < itensOrdenados.length - 1 - i; j++) {
                if (itensOrdenados[j].calcularValorAjustado() < itensOrdenados[j + 1].calcularValorAjustado()) {
                    const temp = itensOrdenados[j];
                    itensOrdenados[j] = itensOrdenados[j + 1];
                    itensOrdenados[j + 1] = temp;
                }
            }
        }
        
        // Retorna os top N
        const resultado: number[][] = [];
        const limite = quantidade < itensOrdenados.length ? quantidade : itensOrdenados.length;
        
        for (let i = 0; i < limite; i++) {
            const item = itensOrdenados[i];
            resultado[i] = [item.obterID(), item.calcularValorAjustado()];
        }
        
        return resultado;
    }

    // Itens vintage (25+ anos)
    public obterItensVintage(): number[] {
        const vintage: number[] = [];
        
        for (let i = 0; i < this.itens.length; i++) {
            const item = this.itens[i];
            
            if (item.ehVintage()) {
                vintage[vintage.length] = item.obterID();
            }
        }
        
        // Ordena por ID
        for (let i = 0; i < vintage.length - 1; i++) {
            for (let j = 0; j < vintage.length - 1 - i; j++) {
                if (vintage[j] > vintage[j + 1]) {
                    const temp = vintage[j];
                    vintage[j] = vintage[j + 1];
                    vintage[j + 1] = temp;
                }
            }
        }
        
        return vintage;
    }

    // Análise de diversificação (quantas categorias diferentes)
    public analiseDiversificacao(): string[] {
        const categorias: string[] = [];
        
        for (let i = 0; i < this.itens.length; i++) {
            const categoria = this.itens[i].obterCategoria();
            
            // Verifica se categoria já foi adicionada
            let jaExiste = false;
            for (let j = 0; j < categorias.length; j++) {
                if (categorias[j] === categoria) {
                    jaExiste = true;
                    break;
                }
            }
            
            if (!jaExiste) {
                categorias[categorias.length] = categoria;
            }
        }
        
        // Ordena alfabeticamente
        for (let i = 0; i < categorias.length - 1; i++) {
            for (let j = 0; j < categorias.length - 1 - i; j++) {
                if (categorias[j] > categorias[j + 1]) {
                    const temp = categorias[j];
                    categorias[j] = categorias[j + 1];
                    categorias[j + 1] = temp;
                }
            }
        }
        
        return categorias;
    }

    // Recomendações de melhoria (itens em condição ruim/regular)
    public recomendacoesMelhoria(): number[][] {
        const recomendacoes: number[][] = [];
        
        for (let i = 0; i < this.itens.length; i++) {
            const item = this.itens[i];
            
            if (item.obterCondicao() === "ruim" || item.obterCondicao() === "regular") {
                const potencialGanho = item.obterValor() - item.calcularValorAjustado();
                recomendacoes[recomendacoes.length] = [item.obterID(), potencialGanho];
            }
        }
        
        // Ordena por potencial de ganho (decrescente)
        for (let i = 0; i < recomendacoes.length - 1; i++) {
            for (let j = 0; j < recomendacoes.length - 1 - i; j++) {
                if (recomendacoes[j][1] < recomendacoes[j + 1][1]) {
                    const temp = recomendacoes[j];
                    recomendacoes[j] = recomendacoes[j + 1];
                    recomendacoes[j + 1] = temp;
                }
            }
        }
        
        return recomendacoes;
    }

    // Análise temporal (distribuição por década)
    public analiseDecadas(): number[][] {
        const decadas: number[][] = []; // [década, quantidade, valor_total]
        
        // Encontra décadas representadas
        const decadasEncontradas: number[] = [];
        
        for (let i = 0; i < this.itens.length; i++) {
            const ano = this.itens[i].obterAno();
            const decada = Math.floor(ano / 10) * 10; // Ex: 1987 -> 1980
            
            let jaExiste = false;
            for (let j = 0; j < decadasEncontradas.length; j++) {
                if (decadasEncontradas[j] === decada) {
                    jaExiste = true;
                    break;
                }
            }
            
            if (!jaExiste) {
                decadasEncontradas[decadasEncontradas.length] = decada;
            }
        }
        
        // Ordena décadas
        for (let i = 0; i < decadasEncontradas.length - 1; i++) {
            for (let j = 0; j < decadasEncontradas.length - 1 - i; j++) {
                if (decadasEncontradas[j] > decadasEncontradas[j + 1]) {
                    const temp = decadasEncontradas[j];
                    decadasEncontradas[j] = decadasEncontradas[j + 1];
                    decadasEncontradas[j + 1] = temp;
                }
            }
        }
        
        // Calcula estatísticas por década
        for (let i = 0; i < decadasEncontradas.length; i++) {
            const decada = decadasEncontradas[i];
            let quantidade = 0;
            let valorTotal = 0;
            
            for (let j = 0; j < this.itens.length; j++) {
                const item = this.itens[j];
                const anoItem = item.obterAno();
                const decadaItem = Math.floor(anoItem / 10) * 10;
                
                if (decadaItem === decada) {
                    quantidade++;
                    valorTotal += item.calcularValorAjustado();
                }
            }
            
            decadas[i] = [decada, quantidade, valorTotal];
        }
        
        return decadas;
    }

    // Estatísticas gerais da coleção
    public estatisticasGerais(): number[] {
        if (this.itens.length === 0) {
            return [0, 0, 0, 0, 0, 0]; // [total, valor_total, valor_médio, vintage, perfeitas, boa_condição]
        }

        let valorTotal = 0;
        let quantidadeVintage = 0;
        let quantidadePerfeita = 0;
        let quantidadeBoaCondicao = 0;

        for (let i = 0; i < this.itens.length; i++) {
            const item = this.itens[i];
            
            valorTotal += item.calcularValorAjustado();
            
            if (item.ehVintage()) {
                quantidadeVintage++;
            }
            
            const condicao = item.obterCondicao();
            if (condicao === "perfeita") {
                quantidadePerfeita++;
            } else if (condicao === "boa") {
                quantidadeBoaCondicao++;
            }
        }

        const valorMedio = Math.floor(valorTotal / this.itens.length);
        
        return [
            this.itens.length,
            valorTotal,
            valorMedio,
            quantidadeVintage,
            quantidadePerfeita,
            quantidadeBoaCondicao
        ];
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 21 - ANÁLISE DE COLECIONÁVEIS ===\n");

// Teste 1: Criação da coleção
console.log("1. CRIAÇÃO DA COLEÇÃO:");
const analise = new AnaliseColecao();
analise.adicionarItens([
    [1, "quadrinhos", 1985, "perfeita", 500],
    [2, "quadrinhos", 1990, "boa", 300],
    [3, "filmes", 1995, "regular", 150],
    [4, "jogos", 1988, "perfeita", 800],
    [5, "cartas", 2000, "boa", 200],
    [6, "quadrinhos", 1975, "ruim", 1000],    // vintage, mas condição ruim
    [7, "filmes", 1982, "perfeita", 400],     // vintage
    [8, "jogos", 2010, "boa", 100],
    [9, "cartas", 1998, "perfeita", 600],
    [10, "quadrinhos", 1992, "regular", 250]
]);

console.log("Coleção criada com 10 itens");
console.log();

// Teste 2: Análise por categoria
console.log("2. ANÁLISE POR CATEGORIA:");
const quadrinhos = analise.analisePorCategoria("quadrinhos");
const filmes = analise.analisePorCategoria("filmes");
const jogos = analise.analisePorCategoria("jogos");

console.log("Quadrinhos [qtd, total, média, mín, máx]:", quadrinhos);
console.log("Filmes [qtd, total, média, mín, máx]:", filmes);
console.log("Jogos [qtd, total, média, mín, máx]:", jogos);
console.log();

// Teste 3: Itens mais valiosos
console.log("3. ITENS MAIS VALIOSOS (TOP 5):");
const maisValiosos = analise.obterMaisValiosos(5);
console.log("Top 5 [ID, valor_ajustado]:");
for (let i = 0; i < maisValiosos.length; i++) {
    console.log(`  ${i + 1}. Item ${maisValiosos[i][0]}: $${maisValiosos[i][1]}`);
}
console.log();

// Teste 4: Itens vintage
console.log("4. ITENS VINTAGE (25+ anos):");
const vintage = analise.obterItensVintage();
console.log("IDs dos itens vintage:", vintage);
console.log();

// Teste 5: Diversificação
console.log("5. ANÁLISE DE DIVERSIFICAÇÃO:");
const categorias = analise.analiseDiversificacao();
console.log("Categorias na coleção:", categorias);
console.log("Diversificação:", categorias.length, "categorias diferentes");
console.log();

// Teste 6: Recomendações de melhoria
console.log("6. RECOMENDAÇÕES DE MELHORIA:");
const melhorias = analise.recomendacoesMelhoria();
console.log("Itens para melhorar [ID, potencial_ganho]:");
for (let i = 0; i < melhorias.length; i++) {
    console.log(`  Item ${melhorias[i][0]}: potencial ganho $${melhorias[i][1]}`);
}
console.log();

// Teste 7: Análise por décadas
console.log("7. ANÁLISE POR DÉCADAS:");
const decadas = analise.analiseDecadas();
console.log("Distribuição por década [década, quantidade, valor_total]:");
for (let i = 0; i < decadas.length; i++) {
    console.log(`  ${decadas[i][0]}s: ${decadas[i][1]} itens, valor total $${decadas[i][2]}`);
}
console.log();

// Teste 8: Estatísticas gerais
console.log("8. ESTATÍSTICAS GERAIS:");
const stats = analise.estatisticasGerais();
console.log("Estatísticas [total, valor_total, valor_médio, vintage, perfeitas, boas]:");
console.log(stats);
console.log(`Resumo: ${stats[0]} itens, valor total $${stats[1]}, média $${stats[2]}`);
console.log(`Vintage: ${stats[3]} itens, Perfeitas: ${stats[4]} itens, Boas: ${stats[5]} itens`);

export { ItemColecionavel, AnaliseColecao };
