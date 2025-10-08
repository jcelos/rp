/**
 * DESAFIO AVANÇADO 2 - ESTRUTURAS DE DADOS COMPLEXAS E ALGORITMOS GEOMÉTRICOS
 * 
 * Implementa estruturas de dados avançadas (Trie, Segment Tree, Union-Find)
 * e algoritmos geométricos computacionais com lógicas sofisticadas.
 */

/**
 * Implementação de uma Trie (Árvore de Prefixos) para busca eficiente de strings
 */
class TrieNode {
    public filhos: Map<string, TrieNode>;
    public fimPalavra: boolean;
    public frequencia: number;
    
    constructor() {
        this.filhos = new Map();
        this.fimPalavra = false;
        this.frequencia = 0;
    }
}

class Trie {
    private raiz: TrieNode;
    
    constructor() {
        this.raiz = new TrieNode();
    }
    
    /**
     * Insere uma palavra na Trie
     */
    public inserir(palavra: string): void {
        let noAtual = this.raiz;
        
        for (let i = 0; i < palavra.length; i++) {
            const char = palavra[i];
            
            if (!noAtual.filhos.has(char)) {
                noAtual.filhos.set(char, new TrieNode());
            }
            
            noAtual = noAtual.filhos.get(char)!;
        }
        
        noAtual.fimPalavra = true;
        noAtual.frequencia++;
    }
    
    /**
     * Busca uma palavra na Trie
     */
    public buscar(palavra: string): boolean {
        let noAtual = this.raiz;
        
        for (let i = 0; i < palavra.length; i++) {
            const char = palavra[i];
            
            if (!noAtual.filhos.has(char)) {
                return false;
            }
            
            noAtual = noAtual.filhos.get(char)!;
        }
        
        return noAtual.fimPalavra;
    }
    
    /**
     * Encontra todas as palavras com um prefixo dado
     */
    public buscarPorPrefixo(prefixo: string): string[] {
        let noAtual = this.raiz;
        
        // Navega até o final do prefixo
        for (let i = 0; i < prefixo.length; i++) {
            const char = prefixo[i];
            
            if (!noAtual.filhos.has(char)) {
                return [];
            }
            
            noAtual = noAtual.filhos.get(char)!;
        }
        
        // Coleta todas as palavras a partir do nó do prefixo
        const palavras: string[] = [];
        this.coletarPalavras(noAtual, prefixo, palavras);
        
        return palavras;
    }
    
    private coletarPalavras(no: TrieNode, prefixo: string, palavras: string[]): void {
        if (no.fimPalavra) {
            palavras[palavras.length] = prefixo;
        }
        
        no.filhos.forEach((filho, char) => {
            this.coletarPalavras(filho, prefixo + char, palavras);
        });
    }
    
    /**
     * Conta quantas palavras começam com um prefixo
     */
    public contarPorPrefixo(prefixo: string): number {
        return this.buscarPorPrefixo(prefixo).length;
    }
    
    /**
     * Remove uma palavra da Trie
     */
    public remover(palavra: string): boolean {
        return this.removerRecursivo(this.raiz, palavra, 0);
    }
    
    private removerRecursivo(no: TrieNode, palavra: string, indice: number): boolean {
        if (indice === palavra.length) {
            if (!no.fimPalavra) {
                return false; // Palavra não existe
            }
            
            no.fimPalavra = false;
            no.frequencia = 0;
            
            // Se não tem filhos, pode ser removido
            return no.filhos.size === 0;
        }
        
        const char = palavra[indice];
        const filho = no.filhos.get(char);
        
        if (!filho) {
            return false; // Palavra não existe
        }
        
        const deveRemoverFilho = this.removerRecursivo(filho, palavra, indice + 1);
        
        if (deveRemoverFilho) {
            no.filhos.delete(char);
            
            // Este nó pode ser removido se não for fim de palavra e não tiver filhos
            return !no.fimPalavra && no.filhos.size === 0;
        }
        
        return false;
    }
}

/**
 * Implementação de Segment Tree para consultas de range eficientes
 */
class SegmentTree {
    private arvore: number[];
    private tamanho: number;
    
    constructor(array: number[]) {
        this.tamanho = array.length;
        this.arvore = new Array(4 * this.tamanho);
        this.construir(array, 0, 0, this.tamanho - 1);
    }
    
    private construir(array: number[], no: number, inicio: number, fim: number): void {
        if (inicio === fim) {
            this.arvore[no] = array[inicio];
        } else {
            const meio = Math.floor((inicio + fim) / 2);
            this.construir(array, 2 * no + 1, inicio, meio);
            this.construir(array, 2 * no + 2, meio + 1, fim);
            
            this.arvore[no] = this.arvore[2 * no + 1] + this.arvore[2 * no + 2];
        }
    }
    
    /**
     * Consulta soma em um range [esquerda, direita]
     */
    public consultarSoma(esquerda: number, direita: number): number {
        return this.consultarSomaRecursivo(0, 0, this.tamanho - 1, esquerda, direita);
    }
    
    private consultarSomaRecursivo(no: number, inicio: number, fim: number, 
                                  esquerda: number, direita: number): number {
        if (esquerda > fim || direita < inicio) {
            return 0; // Fora do range
        }
        
        if (esquerda <= inicio && direita >= fim) {
            return this.arvore[no]; // Completamente dentro do range
        }
        
        const meio = Math.floor((inicio + fim) / 2);
        const somaEsquerda = this.consultarSomaRecursivo(2 * no + 1, inicio, meio, esquerda, direita);
        const somaDireita = this.consultarSomaRecursivo(2 * no + 2, meio + 1, fim, esquerda, direita);
        
        return somaEsquerda + somaDireita;
    }
    
    /**
     * Atualiza valor em uma posição
     */
    public atualizar(posicao: number, novoValor: number): void {
        this.atualizarRecursivo(0, 0, this.tamanho - 1, posicao, novoValor);
    }
    
    private atualizarRecursivo(no: number, inicio: number, fim: number, 
                              posicao: number, novoValor: number): void {
        if (inicio === fim) {
            this.arvore[no] = novoValor;
        } else {
            const meio = Math.floor((inicio + fim) / 2);
            
            if (posicao <= meio) {
                this.atualizarRecursivo(2 * no + 1, inicio, meio, posicao, novoValor);
            } else {
                this.atualizarRecursivo(2 * no + 2, meio + 1, fim, posicao, novoValor);
            }
            
            this.arvore[no] = this.arvore[2 * no + 1] + this.arvore[2 * no + 2];
        }
    }
    
    /**
     * Encontra o índice do menor elemento no range
     */
    public consultarMinimo(esquerda: number, direita: number): {
        indice: number;
        valor: number;
    } {
        return this.consultarMinimoRecursivo(0, 0, this.tamanho - 1, esquerda, direita);
    }
    
    private consultarMinimoRecursivo(no: number, inicio: number, fim: number,
                                   esquerda: number, direita: number): { indice: number; valor: number } {
        if (esquerda > fim || direita < inicio) {
            return { indice: -1, valor: Infinity };
        }
        
        if (inicio === fim) {
            return { indice: inicio, valor: this.arvore[no] };
        }
        
        if (esquerda <= inicio && direita >= fim) {
            const meio = Math.floor((inicio + fim) / 2);
            const minEsq = this.consultarMinimoRecursivo(2 * no + 1, inicio, meio, esquerda, direita);
            const minDir = this.consultarMinimoRecursivo(2 * no + 2, meio + 1, fim, esquerda, direita);
            
            return minEsq.valor <= minDir.valor ? minEsq : minDir;
        }
        
        const meio = Math.floor((inicio + fim) / 2);
        const minEsq = this.consultarMinimoRecursivo(2 * no + 1, inicio, meio, esquerda, direita);
        const minDir = this.consultarMinimoRecursivo(2 * no + 2, meio + 1, fim, esquerda, direita);
        
        return minEsq.valor <= minDir.valor ? minEsq : minDir;
    }
}

/**
 * Implementação de Union-Find (Disjoint Set Union) para componentes conectados
 */
class UnionFind {
    private pai: number[];
    private rank: number[];
    private tamanhoComponente: number[];
    private numeroComponentes: number;
    
    constructor(tamanho: number) {
        this.pai = new Array(tamanho);
        this.rank = new Array(tamanho);
        this.tamanhoComponente = new Array(tamanho);
        this.numeroComponentes = tamanho;
        
        for (let i = 0; i < tamanho; i++) {
            this.pai[i] = i;
            this.rank[i] = 0;
            this.tamanhoComponente[i] = 1;
        }
    }
    
    /**
     * Encontra o representante do conjunto (com compressão de caminho)
     */
    public encontrar(x: number): number {
        if (this.pai[x] !== x) {
            this.pai[x] = this.encontrar(this.pai[x]); // Compressão de caminho
        }
        return this.pai[x];
    }
    
    /**
     * Une dois conjuntos (union by rank)
     */
    public unir(x: number, y: number): boolean {
        const raizX = this.encontrar(x);
        const raizY = this.encontrar(y);
        
        if (raizX === raizY) {
            return false; // Já estão no mesmo conjunto
        }
        
        // Union by rank
        if (this.rank[raizX] < this.rank[raizY]) {
            this.pai[raizX] = raizY;
            this.tamanhoComponente[raizY] += this.tamanhoComponente[raizX];
        } else if (this.rank[raizX] > this.rank[raizY]) {
            this.pai[raizY] = raizX;
            this.tamanhoComponente[raizX] += this.tamanhoComponente[raizY];
        } else {
            this.pai[raizY] = raizX;
            this.tamanhoComponente[raizX] += this.tamanhoComponente[raizY];
            this.rank[raizX]++;
        }
        
        this.numeroComponentes--;
        return true;
    }
    
    /**
     * Verifica se dois elementos estão no mesmo conjunto
     */
    public conectados(x: number, y: number): boolean {
        return this.encontrar(x) === this.encontrar(y);
    }
    
    /**
     * Retorna o tamanho do componente que contém x
     */
    public tamanhoDoComponente(x: number): number {
        return this.tamanhoComponente[this.encontrar(x)];
    }
    
    /**
     * Retorna o número total de componentes
     */
    public obterNumeroComponentes(): number {
        return this.numeroComponentes;
    }
}

/**
 * Ponto 2D para algoritmos geométricos
 */
class Ponto {
    public x: number;
    public y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    /**
     * Calcula distância para outro ponto
     */
    public distanciaPara(outro: Ponto): number {
        const dx = this.x - outro.x;
        const dy = this.y - outro.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * Calcula distância quadrática (evita sqrt)
     */
    public distanciaQuadraticaPara(outro: Ponto): number {
        const dx = this.x - outro.x;
        const dy = this.y - outro.y;
        return dx * dx + dy * dy;
    }
    
    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}

/**
 * Algoritmos geométricos computacionais
 */
class GeometriaComputacional {
    
    /**
     * Calcula orientação de três pontos (horário, anti-horário, colinear)
     */
    public static orientacao(p: Ponto, q: Ponto, r: Ponto): number {
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        
        if (val === 0) return 0;  // Colinear
        return val > 0 ? 1 : 2;   // Horário ou Anti-horário
    }
    
    /**
     * Algoritmo de Graham Scan para Convex Hull
     */
    public static convexHull(pontos: Ponto[]): Ponto[] {
        const n = pontos.length;
        if (n < 3) return [];
        
        // Copia array para não modificar o original
        const pontosOrdenados: Ponto[] = [];
        for (let i = 0; i < pontos.length; i++) {
            pontosOrdenados[i] = pontos[i];
        }
        
        // Encontra o ponto mais inferior (menor y, depois menor x)
        let l = 0;
        for (let i = 1; i < n; i++) {
            if (pontosOrdenados[i].y < pontosOrdenados[l].y) {
                l = i;
            } else if (pontosOrdenados[i].y === pontosOrdenados[l].y && 
                      pontosOrdenados[i].x < pontosOrdenados[l].x) {
                l = i;
            }
        }
        
        // Troca o ponto mais inferior para a primeira posição
        if (l !== 0) {
            const temp = pontosOrdenados[0];
            pontosOrdenados[0] = pontosOrdenados[l];
            pontosOrdenados[l] = temp;
        }
        
        const pontoBase = pontosOrdenados[0];
        
        // Ordena pontos por ângulo polar em relação ao ponto base
        const pontosSemBase: Ponto[] = [];
        for (let i = 1; i < n; i++) {
            pontosSemBase[pontosSemBase.length] = pontosOrdenados[i];
        }
        
        this.ordenarPorAnguloPolar(pontosSemBase, pontoBase);
        
        // Reconstrói array ordenado
        pontosOrdenados[0] = pontoBase;
        for (let i = 0; i < pontosSemBase.length; i++) {
            pontosOrdenados[i + 1] = pontosSemBase[i];
        }
        
        // Cria convex hull
        const pilha: Ponto[] = [];
        pilha[0] = pontosOrdenados[0];
        
        if (n > 1) pilha[1] = pontosOrdenados[1];
        if (n > 2) pilha[2] = pontosOrdenados[2];
        
        for (let i = 3; i < n; i++) {
            // Remove pontos que fazem curva à direita
            while (pilha.length > 1 && 
                   this.orientacao(pilha[pilha.length - 2], 
                                 pilha[pilha.length - 1], 
                                 pontosOrdenados[i]) !== 2) {
                pilha.length = pilha.length - 1;
            }
            
            pilha[pilha.length] = pontosOrdenados[i];
        }
        
        return pilha;
    }
    
    private static ordenarPorAnguloPolar(pontos: Ponto[], base: Ponto): void {
        // Bubble sort por ângulo polar
        for (let i = 0; i < pontos.length - 1; i++) {
            for (let j = 0; j < pontos.length - i - 1; j++) {
                const orientacao = this.orientacao(base, pontos[j], pontos[j + 1]);
                
                if (orientacao === 1 || 
                   (orientacao === 0 && 
                    base.distanciaQuadraticaPara(pontos[j]) > 
                    base.distanciaQuadraticaPara(pontos[j + 1]))) {
                    
                    const temp = pontos[j];
                    pontos[j] = pontos[j + 1];
                    pontos[j + 1] = temp;
                }
            }
        }
    }
    
    /**
     * Verifica se um ponto está dentro de um polígono (Ray Casting)
     */
    public static pontoNoPoligono(ponto: Ponto, poligono: Ponto[]): boolean {
        const n = poligono.length;
        if (n < 3) return false;
        
        let intersecoes = 0;
        
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            
            if (this.raioIntersectaAresta(ponto, poligono[i], poligono[j])) {
                intersecoes++;
            }
        }
        
        return intersecoes % 2 === 1;
    }
    
    private static raioIntersectaAresta(ponto: Ponto, v1: Ponto, v2: Ponto): boolean {
        // Verifica se o raio horizontal da direita intersecta a aresta v1-v2
        if ((v1.y > ponto.y) !== (v2.y > ponto.y)) {
            const intersecaoX = (v2.x - v1.x) * (ponto.y - v1.y) / (v2.y - v1.y) + v1.x;
            return ponto.x < intersecaoX;
        }
        return false;
    }
    
    /**
     * Encontra o par de pontos mais próximo usando divide e conquista
     */
    public static parMaisProximo(pontos: Ponto[]): { p1: Ponto; p2: Ponto; distancia: number } {
        if (pontos.length < 2) {
            throw new Error("Necessário pelo menos 2 pontos");
        }
        
        // Copia e ordena pontos por x
        const pontosX: Ponto[] = [];
        for (let i = 0; i < pontos.length; i++) {
            pontosX[i] = pontos[i];
        }
        
        this.ordenarPorX(pontosX);
        
        // Ordena pontos por y
        const pontosY: Ponto[] = [];
        for (let i = 0; i < pontos.length; i++) {
            pontosY[i] = pontos[i];
        }
        
        this.ordenarPorY(pontosY);
        
        return this.parMaisProximoRec(pontosX, pontosY);
    }
    
    private static parMaisProximoRec(pontosX: Ponto[], pontosY: Ponto[]): 
        { p1: Ponto; p2: Ponto; distancia: number } {
        
        const n = pontosX.length;
        
        // Caso base: força bruta para poucos pontos
        if (n <= 3) {
            return this.forcaBruta(pontosX);
        }
        
        // Divide
        const meio = Math.floor(n / 2);
        const pontoMeio = pontosX[meio];
        
        const esquerdaX: Ponto[] = [];
        const direitaX: Ponto[] = [];
        
        for (let i = 0; i < meio; i++) {
            esquerdaX[i] = pontosX[i];
        }
        
        for (let i = meio; i < n; i++) {
            direitaX[i - meio] = pontosX[i];
        }
        
        const esquerdaY: Ponto[] = [];
        const direitaY: Ponto[] = [];
        
        for (let i = 0; i < pontosY.length; i++) {
            if (pontosY[i].x <= pontoMeio.x) {
                esquerdaY[esquerdaY.length] = pontosY[i];
            } else {
                direitaY[direitaY.length] = pontosY[i];
            }
        }
        
        // Conquista
        const menorEsquerda = this.parMaisProximoRec(esquerdaX, esquerdaY);
        const menorDireita = this.parMaisProximoRec(direitaX, direitaY);
        
        const menor = menorEsquerda.distancia <= menorDireita.distancia ? 
                     menorEsquerda : menorDireita;
        
        // Verifica pontos na linha divisória
        const faixa: Ponto[] = [];
        for (let i = 0; i < pontosY.length; i++) {
            if (Math.abs(pontosY[i].x - pontoMeio.x) < menor.distancia) {
                faixa[faixa.length] = pontosY[i];
            }
        }
        
        const menorFaixa = this.menorNaFaixa(faixa, menor.distancia);
        
        return menorFaixa.distancia < menor.distancia ? menorFaixa : menor;
    }
    
    private static forcaBruta(pontos: Ponto[]): { p1: Ponto; p2: Ponto; distancia: number } {
        let minDist = Infinity;
        let p1 = pontos[0];
        let p2 = pontos[1];
        
        for (let i = 0; i < pontos.length; i++) {
            for (let j = i + 1; j < pontos.length; j++) {
                const dist = pontos[i].distanciaPara(pontos[j]);
                if (dist < minDist) {
                    minDist = dist;
                    p1 = pontos[i];
                    p2 = pontos[j];
                }
            }
        }
        
        return { p1, p2, distancia: minDist };
    }
    
    private static menorNaFaixa(faixa: Ponto[], d: number): 
        { p1: Ponto; p2: Ponto; distancia: number } {
        
        let minDist = d;
        let p1 = faixa[0];
        let p2 = faixa[1];
        
        for (let i = 0; i < faixa.length; i++) {
            for (let j = i + 1; j < faixa.length && (faixa[j].y - faixa[i].y) < minDist; j++) {
                const dist = faixa[i].distanciaPara(faixa[j]);
                if (dist < minDist) {
                    minDist = dist;
                    p1 = faixa[i];
                    p2 = faixa[j];
                }
            }
        }
        
        return { p1, p2, distancia: minDist };
    }
    
    private static ordenarPorX(pontos: Ponto[]): void {
        for (let i = 0; i < pontos.length - 1; i++) {
            for (let j = 0; j < pontos.length - i - 1; j++) {
                if (pontos[j].x > pontos[j + 1].x) {
                    const temp = pontos[j];
                    pontos[j] = pontos[j + 1];
                    pontos[j + 1] = temp;
                }
            }
        }
    }
    
    private static ordenarPorY(pontos: Ponto[]): void {
        for (let i = 0; i < pontos.length - 1; i++) {
            for (let j = 0; j < pontos.length - i - 1; j++) {
                if (pontos[j].y > pontos[j + 1].y) {
                    const temp = pontos[j];
                    pontos[j] = pontos[j + 1];
                    pontos[j + 1] = temp;
                }
            }
        }
    }
}

// Exemplos de uso e testes
console.log("=== DESAFIO AVANÇADO 2 - ESTRUTURAS COMPLEXAS E GEOMETRIA ===");

// Teste 1: Trie
console.log("--- TRIE (ÁRVORE DE PREFIXOS) ---");
const trie = new Trie();

const palavras = ["casa", "carro", "carta", "cartão", "telefone", "televisão", "caneta"];
console.log("Inserindo palavras:", palavras.join(", "));

for (let i = 0; i < palavras.length; i++) {
    trie.inserir(palavras[i]);
}

console.log("\nBusca por palavras:");
console.log("'casa' existe:", trie.buscar("casa"));
console.log("'car' existe:", trie.buscar("car"));
console.log("'carro' existe:", trie.buscar("carro"));

console.log("\nPalavras com prefixo 'car':", trie.buscarPorPrefixo("car"));
console.log("Palavras com prefixo 'tel':", trie.buscarPorPrefixo("tel"));
console.log("Contagem com prefixo 'ca':", trie.contarPorPrefixo("ca"));

// Teste 2: Segment Tree
console.log("\n--- SEGMENT TREE ---");
const array = [1, 3, 5, 7, 9, 11];
const segTree = new SegmentTree(array);

console.log("Array original:", array);
console.log("Soma do range [1, 3]:", segTree.consultarSoma(1, 3)); // 3 + 5 + 7 = 15
console.log("Soma do range [0, 5]:", segTree.consultarSoma(0, 5)); // Soma total = 36

const minimo = segTree.consultarMinimo(2, 4);
console.log(`Mínimo no range [2, 4]: índice ${minimo.indice}, valor ${minimo.valor}`);

console.log("\nAtualizando posição 2 para 10");
segTree.atualizar(2, 10);
console.log("Nova soma do range [1, 3]:", segTree.consultarSoma(1, 3)); // 3 + 10 + 7 = 20

// Teste 3: Union-Find
console.log("\n--- UNION-FIND ---");
const uf = new UnionFind(6);

console.log("Estado inicial - 6 componentes:", uf.obterNumeroComponentes());

console.log("Conectando: 0-1, 2-3, 4-5");
uf.unir(0, 1);
uf.unir(2, 3);
uf.unir(4, 5);

console.log("Número de componentes:", uf.obterNumeroComponentes());
console.log("0 e 1 conectados:", uf.conectados(0, 1));
console.log("0 e 2 conectados:", uf.conectados(0, 2));
console.log("Tamanho do componente de 0:", uf.tamanhoDoComponente(0));

console.log("\nConectando componente (0,1) com (2,3)");
uf.unir(1, 2);
console.log("Número de componentes:", uf.obterNumeroComponentes());
console.log("Tamanho do componente de 0:", uf.tamanhoDoComponente(0));

// Teste 4: Geometria - Convex Hull
console.log("\n--- CONVEX HULL ---");
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

console.log("Pontos:", pontos.map(p => p.toString()).join(", "));

const hull = GeometriaComputacional.convexHull(pontos);
console.log("Convex Hull:", hull.map(p => p.toString()).join(" → "));

// Teste 5: Ponto no Polígono
console.log("\n--- PONTO NO POLÍGONO ---");
const quadrado = [
    new Ponto(0, 0),
    new Ponto(4, 0),
    new Ponto(4, 4),
    new Ponto(0, 4)
];

const pontosTeste = [
    new Ponto(2, 2),   // Dentro
    new Ponto(5, 5),   // Fora
    new Ponto(0, 2),   // Na borda
    new Ponto(1, 3)    // Dentro
];

console.log("Polígono (quadrado):", quadrado.map(p => p.toString()).join(" → "));

for (let i = 0; i < pontosTeste.length; i++) {
    const ponto = pontosTeste[i];
    const dentro = GeometriaComputacional.pontoNoPoligono(ponto, quadrado);
    console.log(`Ponto ${ponto.toString()}: ${dentro ? "DENTRO" : "FORA"}`);
}

// Teste 6: Par Mais Próximo
console.log("\n--- PAR DE PONTOS MAIS PRÓXIMO ---");
const pontosProximidade = [
    new Ponto(2, 3),
    new Ponto(12, 30),
    new Ponto(40, 50),
    new Ponto(5, 1),
    new Ponto(12, 10),
    new Ponto(3, 4)
];

console.log("Pontos:", pontosProximidade.map(p => p.toString()).join(", "));

const parProximo = GeometriaComputacional.parMaisProximo(pontosProximidade);
console.log(`Par mais próximo: ${parProximo.p1.toString()} e ${parProximo.p2.toString()}`);
console.log(`Distância: ${parProximo.distancia.toFixed(2)}`);

// Teste 7: Performance e Complexidade
console.log("\n--- ANÁLISE DE PERFORMANCE ---");

// Trie com muitas palavras
const trieGrande = new Trie();
const prefixos = ["a", "ab", "abc", "abcd", "b", "bc", "bcd"];

console.log("Testando Trie com prefixos:", prefixos.join(", "));

for (let i = 0; i < 1000; i++) {
    const prefixo = prefixos[i % prefixos.length];
    trieGrande.inserir(prefixo + i);
}

const inicio = Date.now();
const resultados = trieGrande.buscarPorPrefixo("abc");
const tempo = Date.now() - inicio;

console.log(`Busca por prefixo 'abc': ${resultados.length} resultados em ${tempo}ms`);

export { 
    Trie, 
    SegmentTree, 
    UnionFind, 
    Ponto, 
    GeometriaComputacional 
};
