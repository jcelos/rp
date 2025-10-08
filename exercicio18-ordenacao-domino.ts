/**
 * EXERCÍCIO 18 - ORDENAÇÃO DE DOMINÓ (RETORNO EXCLUSIVO EM ARRAYS)
 * 
 * Implementa um sistema de ordenação de peças de dominó onde:
 * - A parte superior representa a dezena
 * - A parte inferior representa a unidade
 * - O valor da peça é calculado como: (superior * 10) + inferior
 * - TODOS OS MÉTODOS RETORNAM EXCLUSIVAMENTE ARRAYS
 * 
 * Exemplo: Dominó com 3 em cima e 7 embaixo = 37
 * 
 * Conceitos explorados:
 * - Estruturas de dados personalizadas com retorno em arrays
 * - Algoritmos de ordenação com critérios customizados
 * - Comparação de objetos complexos
 * - Validação de dados de entrada
 * - Conversão de estruturas para arrays multidimensionais
 * - Manipulação de dados sem strings ou objetos literais
 */

class PecaDomino {
    private superior: number;
    private inferior: number;

    constructor(superior: number, inferior: number) {
        this.validarPeca(superior, inferior);
        this.superior = superior;
        this.inferior = inferior;
    }

    private validarPeca(superior: number, inferior: number): void {
        if (superior < 0 || superior > 6) {
            throw new Error(`Valor superior inválido: ${superior}. Deve estar entre 0 e 6.`);
        }
        if (inferior < 0 || inferior > 9) {
            throw new Error(`Valor inferior inválido: ${inferior}. Deve estar entre 0 e 9.`);
        }
    }

    public obterSuperior(): number {
        return this.superior;
    }

    public obterInferior(): number {
        return this.inferior;
    }

    public obterValor(): number {
        return (this.superior * 10) + this.inferior;
    }

    public toArray(): number[] {
        return [this.superior, this.inferior];
    }

    public toArrayComValor(): number[] {
        return [this.superior, this.inferior, this.obterValor()];
    }

    // Método para rotacionar a peça (trocar superior com inferior)
    public rotacionar(): PecaDomino {
        return new PecaDomino(this.inferior % 7, this.superior); // Garante que superior fique entre 0-6
    }

    // Verifica se é uma peça dupla (mesmo valor em ambos os lados)
    public ehDupla(): boolean {
        return this.superior === this.inferior;
    }
}

class ConjuntoDomino {
    private pecas: PecaDomino[];

    constructor() {
        this.pecas = [];
    }

    public adicionarPeca(superior: number, inferior: number): void {
        const novaPeca = new PecaDomino(superior, inferior);
        
        // Adiciona no final do array manualmente
        this.pecas[this.pecas.length] = novaPeca;
    }

    public adicionarPecas(listaPecas: [number, number][]): void {
        for (let i = 0; i < listaPecas.length; i++) {
            const peca = listaPecas[i];
            this.adicionarPeca(peca[0], peca[1]);
        }
    }

    public obterPecas(): PecaDomino[] {
        // Retorna uma cópia do array
        const copia: PecaDomino[] = [];
        for (let i = 0; i < this.pecas.length; i++) {
            copia[i] = this.pecas[i];
        }
        return copia;
    }

    public obterQuantidade(): number {
        return this.pecas.length;
    }

    // Ordenação por Bubble Sort baseada no valor da peça
    public ordenarPorValor(): void {
        const n = this.pecas.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                if (this.pecas[j].obterValor() > this.pecas[j + 1].obterValor()) {
                    // Troca manual das peças
                    const temp = this.pecas[j];
                    this.pecas[j] = this.pecas[j + 1];
                    this.pecas[j + 1] = temp;
                }
            }
        }
    }

    // Ordenação por Selection Sort baseada primeiro no superior, depois no inferior
    public ordenarPorPosicao(): void {
        const n = this.pecas.length;
        
        for (let i = 0; i < n - 1; i++) {
            let menorIndice = i;
            
            for (let j = i + 1; j < n; j++) {
                const pecaAtual = this.pecas[j];
                const menorPeca = this.pecas[menorIndice];
                
                // Compara primeiro por superior, depois por inferior
                if (pecaAtual.obterSuperior() < menorPeca.obterSuperior() ||
                    (pecaAtual.obterSuperior() === menorPeca.obterSuperior() && 
                     pecaAtual.obterInferior() < menorPeca.obterInferior())) {
                    menorIndice = j;
                }
            }
            
            // Troca manual se necessário
            if (menorIndice !== i) {
                const temp = this.pecas[i];
                this.pecas[i] = this.pecas[menorIndice];
                this.pecas[menorIndice] = temp;
            }
        }
    }

    // Ordenação por Insertion Sort para peças duplas primeiro
    public ordenarDuplasAntes(): void {
        const n = this.pecas.length;
        
        for (let i = 1; i < n; i++) {
            const pecaAtual = this.pecas[i];
            let j = i - 1;
            
            // Move elementos que devem vir depois da peça atual
            while (j >= 0 && this.deveVirAntes(pecaAtual, this.pecas[j])) {
                this.pecas[j + 1] = this.pecas[j];
                j--;
            }
            
            this.pecas[j + 1] = pecaAtual;
        }
    }

    private deveVirAntes(peca1: PecaDomino, peca2: PecaDomino): boolean {
        // Duplas vêm primeiro
        if (peca1.ehDupla() && !peca2.ehDupla()) {
            return true;
        }
        if (!peca1.ehDupla() && peca2.ehDupla()) {
            return false;
        }
        
        // Se ambas são duplas ou nenhuma é dupla, ordena por valor
        return peca1.obterValor() < peca2.obterValor();
    }

    // Busca peças por valor específico
    public buscarPorValor(valor: number): PecaDomino[] {
        const resultado: PecaDomino[] = [];
        
        for (let i = 0; i < this.pecas.length; i++) {
            if (this.pecas[i].obterValor() === valor) {
                resultado[resultado.length] = this.pecas[i];
            }
        }
        
        return resultado;
    }

    // Busca peças que contêm um número específico
    public buscarComNumero(numero: number): PecaDomino[] {
        const resultado: PecaDomino[] = [];
        
        for (let i = 0; i < this.pecas.length; i++) {
            const peca = this.pecas[i];
            if (peca.obterSuperior() === numero || peca.obterInferior() === numero) {
                resultado[resultado.length] = peca;
            }
        }
        
        return resultado;
    }

    // Estatísticas do conjunto
    public obterEstatisticas(): any {
        if (this.pecas.length === 0) {
            return {
                total: 0,
                menorValor: 0,
                maiorValor: 0,
                valorMedio: 0,
                quantidadeDuplas: 0
            };
        }

        let menorValor = this.pecas[0].obterValor();
        let maiorValor = this.pecas[0].obterValor();
        let somaValores = 0;
        let quantidadeDuplas = 0;

        for (let i = 0; i < this.pecas.length; i++) {
            const valor = this.pecas[i].obterValor();
            
            if (valor < menorValor) {
                menorValor = valor;
            }
            if (valor > maiorValor) {
                maiorValor = valor;
            }
            
            somaValores += valor;
            
            if (this.pecas[i].ehDupla()) {
                quantidadeDuplas++;
            }
        }

        return {
            total: this.pecas.length,
            menorValor: menorValor,
            maiorValor: maiorValor,
            valorMedio: Math.floor(somaValores / this.pecas.length * 100) / 100, // Arredonda para 2 casas
            quantidadeDuplas: quantidadeDuplas
        };
    }

    public toArray(): number[][] {
        const resultado: number[][] = [];
        for (let i = 0; i < this.pecas.length; i++) {
            resultado[i] = this.pecas[i].toArray();
        }
        return resultado;
    }

    public toArrayComValores(): number[][] {
        const resultado: number[][] = [];
        for (let i = 0; i < this.pecas.length; i++) {
            resultado[i] = this.pecas[i].toArrayComValor();
        }
        return resultado;
    }

    public toArrayValores(): number[] {
        const resultado: number[] = [];
        for (let i = 0; i < this.pecas.length; i++) {
            resultado[i] = this.pecas[i].obterValor();
        }
        return resultado;
    }

    // Retorna array com informações de visualização [superior[], inferior[]]
    public toArrayVisualizacao(): number[][] {
        const superiores: number[] = [];
        const inferiores: number[] = [];
        
        for (let i = 0; i < this.pecas.length; i++) {
            superiores[i] = this.pecas[i].obterSuperior();
            inferiores[i] = this.pecas[i].obterInferior();
        }
        
        return [superiores, inferiores];
    }
}

// Classe utilitária para geração de dominós
class GeradorDomino {
    // Gera um conjunto tradicional de dominó (0-0 até 6-6)
    public static gerarConjuntoTradicional(): ConjuntoDomino {
        const conjunto = new ConjuntoDomino();
        
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                conjunto.adicionarPeca(i, j);
            }
        }
        
        return conjunto;
    }

    // Gera peças aleatórias
    public static gerarPecasAleatorias(quantidade: number): ConjuntoDomino {
        const conjunto = new ConjuntoDomino();
        
        for (let i = 0; i < quantidade; i++) {
            const superior = Math.floor(Math.random() * 7); // 0-6
            const inferior = Math.floor(Math.random() * 10); // 0-9
            conjunto.adicionarPeca(superior, inferior);
        }
        
        return conjunto;
    }

    // Gera peças com padrão específico
    public static gerarPadrao(padrao: string): ConjuntoDomino {
        const conjunto = new ConjuntoDomino();
        
        switch (padrao.toLowerCase()) {
            case "crescente":
                for (let i = 0; i <= 5; i++) {
                    conjunto.adicionarPeca(i, i + 1);
                }
                break;
                
            case "duplas":
                for (let i = 0; i <= 6; i++) {
                    conjunto.adicionarPeca(i, i);
                }
                break;
                
            case "decrescente":
                for (let i = 6; i >= 1; i--) {
                    conjunto.adicionarPeca(i, i - 1);
                }
                break;
                
            default:
                console.log("Padrão não reconhecido. Gerando padrão crescente.");
                return GeradorDomino.gerarPadrao("crescente");
        }
        
        return conjunto;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 18 - ORDENAÇÃO DE DOMINÓ ===\n");

// Teste 1: Criação e manipulação básica de peças
console.log("1. CRIAÇÃO DE PEÇAS INDIVIDUAIS:");
const peca1 = new PecaDomino(3, 7); // Valor = 37
const peca2 = new PecaDomino(1, 5); // Valor = 15
const peca3 = new PecaDomino(2, 2); // Valor = 22 (dupla)

console.log("Peça 1 [superior, inferior, valor]:", peca1.toArrayComValor());
console.log("Peça 2 [superior, inferior, valor]:", peca2.toArrayComValor());
console.log("Peça 3 [superior, inferior, valor]:", peca3.toArrayComValor(), "(dupla:", peca3.ehDupla() + ")");
console.log();

// Teste 2: Conjunto de dominós personalizado
console.log("2. CONJUNTO PERSONALIZADO:");
const conjunto = new ConjuntoDomino();
conjunto.adicionarPecas([
    [5, 3], // 53
    [2, 8], // 28
    [4, 1], // 41
    [1, 1], // 11 (dupla)
    [3, 6], // 36
    [0, 9], // 09
    [6, 0]  // 60
]);

console.log("Conjunto original [superior, inferior]:", conjunto.toArray());
console.log("Visualização [superiores[], inferiores[]]:", conjunto.toArrayVisualizacao());
console.log("Valores das peças:", conjunto.toArrayValores());
console.log();

// Teste 3: Ordenação por valor
console.log("3. ORDENAÇÃO POR VALOR:");
const conjuntoValor = new ConjuntoDomino();
conjuntoValor.adicionarPecas([
    [5, 3], [2, 8], [4, 1], [1, 1], [3, 6], [0, 9], [6, 0]
]);

console.log("Antes da ordenação [superior, inferior, valor]:");
console.log(conjuntoValor.toArrayComValores());

conjuntoValor.ordenarPorValor();

console.log("\nDepois da ordenação por valor [superior, inferior, valor]:");
console.log(conjuntoValor.toArrayComValores());
console.log("Visualização ordenada [superiores[], inferiores[]]:");
console.log(conjuntoValor.toArrayVisualizacao());
console.log();

// Teste 4: Ordenação por posição (superior primeiro, depois inferior)
console.log("4. ORDENAÇÃO POR POSIÇÃO:");
const conjuntoPosicao = new ConjuntoDomino();
conjuntoPosicao.adicionarPecas([
    [3, 7], [3, 2], [1, 9], [1, 5], [2, 8], [2, 1]
]);

console.log("Antes da ordenação [superior, inferior, valor]:");
console.log(conjuntoPosicao.toArrayComValores());

conjuntoPosicao.ordenarPorPosicao();

console.log("\nDepois da ordenação por posição [superior, inferior, valor]:");
console.log(conjuntoPosicao.toArrayComValores());
console.log();

// Teste 5: Ordenação com duplas primeiro
console.log("5. ORDENAÇÃO COM DUPLAS PRIMEIRO:");
const conjuntoDuplas = new ConjuntoDomino();
conjuntoDuplas.adicionarPecas([
    [4, 7], [2, 2], [5, 1], [3, 3], [1, 8], [6, 6], [2, 9]
]);

console.log("Antes da ordenação [superior, inferior, valor]:");
console.log(conjuntoDuplas.toArrayComValores());

conjuntoDuplas.ordenarDuplasAntes();

console.log("\nDepois da ordenação (duplas primeiro) [superior, inferior, valor]:");
console.log(conjuntoDuplas.toArrayComValores());
console.log();

// Teste 6: Busca e estatísticas
console.log("6. BUSCA E ESTATÍSTICAS:");
const conjuntoBusca = new ConjuntoDomino();
conjuntoBusca.adicionarPecas([
    [2, 5], [1, 3], [2, 8], [4, 2], [1, 1], [3, 6], [2, 2]
]);

console.log("Conjunto para busca [superior, inferior]:", conjuntoBusca.toArray());

// Buscar peças com valor específico
const pecasComValor25 = conjuntoBusca.buscarPorValor(25);
const arrayPecas25: number[][] = [];
for (let i = 0; i < pecasComValor25.length; i++) {
    arrayPecas25[i] = pecasComValor25[i].toArray();
}
console.log("Peças com valor 25:", arrayPecas25);

// Buscar peças que contêm o número 2
const pecasCom2 = conjuntoBusca.buscarComNumero(2);
const arrayPecasCom2: number[][] = [];
for (let i = 0; i < pecasCom2.length; i++) {
    arrayPecasCom2[i] = pecasCom2[i].toArray();
}
console.log("Peças que contêm o número 2:", arrayPecasCom2);

// Estatísticas
const stats = conjuntoBusca.obterEstatisticas();
console.log("Estatísticas [total, menor, maior, média, duplas]:");
console.log([stats.total, stats.menorValor, stats.maiorValor, stats.valorMedio, stats.quantidadeDuplas]);
console.log();

// Teste 7: Geradores de dominó
console.log("7. GERADORES DE DOMINÓ:");

// Conjunto tradicional (primeiras 10 peças)
console.log("Primeiras 10 peças do conjunto tradicional [superior, inferior, valor]:");
const tradicional = GeradorDomino.gerarConjuntoTradicional();
const arrayTradicional = tradicional.toArrayComValores();
const primeiras10: number[][] = [];
for (let i = 0; i < 10 && i < arrayTradicional.length; i++) {
    primeiras10[i] = arrayTradicional[i];
}
console.log(primeiras10);

// Peças aleatórias
console.log("\nPeças aleatórias (5 unidades) [superior, inferior, valor]:");
const aleatorio = GeradorDomino.gerarPecasAleatorias(5);
console.log(aleatorio.toArrayComValores());

// Padrão de duplas
console.log("\nPadrão de duplas [superior, inferior]:");
const duplas = GeradorDomino.gerarPadrao("duplas");
console.log(duplas.toArray());
console.log();

// Teste 8: Rotação de peças
console.log("8. ROTAÇÃO DE PEÇAS:");
const pecaOriginal = new PecaDomino(4, 7);
const pecaRotacionada = pecaOriginal.rotacionar();

console.log("Peça original [superior, inferior, valor]:", pecaOriginal.toArrayComValor());
console.log("Peça rotacionada [superior, inferior, valor]:", pecaRotacionada.toArrayComValor());
console.log();

// Teste 9: Demonstração completa
console.log("9. DEMONSTRAÇÃO COMPLETA:");
const demonstracao = new ConjuntoDomino();
demonstracao.adicionarPecas([
    [6, 4], [1, 7], [3, 3], [2, 9], [5, 1], [0, 8], [4, 4]
]);

console.log("Estado inicial [superior, inferior]:");
console.log(demonstracao.toArray());
console.log("Visualização inicial [superiores[], inferiores[]]:");
console.log(demonstracao.toArrayVisualizacao());

console.log("\nOrdenação por valor:");
demonstracao.ordenarPorValor();
console.log("Estado final [superior, inferior]:");
console.log(demonstracao.toArray());
console.log("Visualização final [superiores[], inferiores[]]:");
console.log(demonstracao.toArrayVisualizacao());

const statsFinais = demonstracao.obterEstatisticas();
console.log("Estatísticas finais [total, menor, maior, média, duplas]:");
console.log([statsFinais.total, statsFinais.menorValor, statsFinais.maiorValor, statsFinais.valorMedio, statsFinais.quantidadeDuplas]);

export { PecaDomino, ConjuntoDomino, GeradorDomino };
