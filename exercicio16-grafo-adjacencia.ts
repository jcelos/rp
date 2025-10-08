/**
 * EXERCÍCIO BÁSICO 16 - GRAFO COM LISTA DE ADJACÊNCIA
 * 
 * Implementa um grafo usando lista de adjacência com algoritmos
 * básicos de traversal (DFS e BFS) e operações fundamentais.
 */

/**
 * Vértice do grafo
 */
class Vertice {
    public id: string;
    public visitado: boolean;
    public adjacentes: Vertice[];
    
    constructor(id: string) {
        this.id = id;
        this.visitado = false;
        this.adjacentes = [];
    }
    
    /**
     * Adiciona vértice adjacente
     */
    public adicionarAdjacente(vertice: Vertice): void {
        // Verifica se já existe para evitar duplicatas
        for (let i = 0; i < this.adjacentes.length; i++) {
            if (this.adjacentes[i].id === vertice.id) {
                return;
            }
        }
        
        this.adjacentes[this.adjacentes.length] = vertice;
    }
    
    /**
     * Remove vértice adjacente
     */
    public removerAdjacente(vertice: Vertice): boolean {
        for (let i = 0; i < this.adjacentes.length; i++) {
            if (this.adjacentes[i].id === vertice.id) {
                // Remove elemento do array
                for (let j = i; j < this.adjacentes.length - 1; j++) {
                    this.adjacentes[j] = this.adjacentes[j + 1];
                }
                this.adjacentes.length = this.adjacentes.length - 1;
                return true;
            }
        }
        return false;
    }
    
    /**
     * Verifica se tem vértice adjacente
     */
    public temAdjacente(vertice: Vertice): boolean {
        for (let i = 0; i < this.adjacentes.length; i++) {
            if (this.adjacentes[i].id === vertice.id) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Obtém grau do vértice (número de adjacentes)
     */
    public obterGrau(): number {
        return this.adjacentes.length;
    }
    
    /**
     * Reset status de visitado
     */
    public resetarVisitado(): void {
        this.visitado = false;
    }
}

/**
 * Grafo usando lista de adjacência
 */
class Grafo {
    private vertices: Map<string, Vertice>;
    private direcionado: boolean;
    
    constructor(direcionado: boolean = false) {
        this.vertices = new Map();
        this.direcionado = direcionado;
    }
    
    /**
     * Adiciona vértice ao grafo
     */
    public adicionarVertice(id: string): Vertice {
        if (!this.vertices.has(id)) {
            const novoVertice = new Vertice(id);
            this.vertices.set(id, novoVertice);
            return novoVertice;
        }
        
        return this.vertices.get(id)!;
    }
    
    /**
     * Remove vértice do grafo
     */
    public removerVertice(id: string): boolean {
        const vertice = this.vertices.get(id);
        if (!vertice) {
            return false;
        }
        
        // Remove todas as arestas que chegam neste vértice
        this.vertices.forEach((v) => {
            v.removerAdjacente(vertice);
        });
        
        this.vertices.delete(id);
        return true;
    }
    
    /**
     * Adiciona aresta entre dois vértices
     */
    public adicionarAresta(origem: string, destino: string): boolean {
        const verticeOrigem = this.vertices.get(origem);
        const verticeDestino = this.vertices.get(destino);
        
        if (!verticeOrigem || !verticeDestino) {
            return false;
        }
        
        verticeOrigem.adicionarAdjacente(verticeDestino);
        
        // Se não é direcionado, adiciona aresta de volta
        if (!this.direcionado) {
            verticeDestino.adicionarAdjacente(verticeOrigem);
        }
        
        return true;
    }
    
    /**
     * Remove aresta entre dois vértices
     */
    public removerAresta(origem: string, destino: string): boolean {
        const verticeOrigem = this.vertices.get(origem);
        const verticeDestino = this.vertices.get(destino);
        
        if (!verticeOrigem || !verticeDestino) {
            return false;
        }
        
        const removido1 = verticeOrigem.removerAdjacente(verticeDestino);
        
        if (!this.direcionado) {
            verticeDestino.removerAdjacente(verticeOrigem);
        }
        
        return removido1;
    }
    
    /**
     * Verifica se existe aresta entre dois vértices
     */
    public temAresta(origem: string, destino: string): boolean {
        const verticeOrigem = this.vertices.get(origem);
        const verticeDestino = this.vertices.get(destino);
        
        if (!verticeOrigem || !verticeDestino) {
            return false;
        }
        
        return verticeOrigem.temAdjacente(verticeDestino);
    }
    
    /**
     * Busca em Profundidade (DFS) - Depth First Search
     */
    public buscaEmProfundidade(idInicio: string): string[] {
        this.resetarVisitados();
        
        const verticeInicio = this.vertices.get(idInicio);
        if (!verticeInicio) {
            return [];
        }
        
        const resultado: string[] = [];
        this.dfsRecursivo(verticeInicio, resultado);
        
        return resultado;
    }
    
    private dfsRecursivo(vertice: Vertice, resultado: string[]): void {
        vertice.visitado = true;
        resultado[resultado.length] = vertice.id;
        
        for (let i = 0; i < vertice.adjacentes.length; i++) {
            const adjacente = vertice.adjacentes[i];
            if (!adjacente.visitado) {
                this.dfsRecursivo(adjacente, resultado);
            }
        }
    }
    
    /**
     * Busca em Largura (BFS) - Breadth First Search
     */
    public buscaEmLargura(idInicio: string): string[] {
        this.resetarVisitados();
        
        const verticeInicio = this.vertices.get(idInicio);
        if (!verticeInicio) {
            return [];
        }
        
        const resultado: string[] = [];
        const fila: Vertice[] = [];
        
        verticeInicio.visitado = true;
        fila[fila.length] = verticeInicio;
        
        while (fila.length > 0) {
            const verticeAtual = this.removerPrimeiro(fila);
            resultado[resultado.length] = verticeAtual.id;
            
            for (let i = 0; i < verticeAtual.adjacentes.length; i++) {
                const adjacente = verticeAtual.adjacentes[i];
                
                if (!adjacente.visitado) {
                    adjacente.visitado = true;
                    fila[fila.length] = adjacente;
                }
            }
        }
        
        return resultado;
    }
    
    private removerPrimeiro<T>(array: T[]): T {
        const primeiro = array[0];
        
        for (let i = 0; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.length = array.length - 1;
        
        return primeiro;
    }
    
    /**
     * Encontra caminho entre dois vértices usando BFS
     */
    public encontrarCaminho(origem: string, destino: string): string[] {
        this.resetarVisitados();
        
        const verticeOrigem = this.vertices.get(origem);
        const verticeDestino = this.vertices.get(destino);
        
        if (!verticeOrigem || !verticeDestino) {
            return [];
        }
        
        if (origem === destino) {
            return [origem];
        }
        
        const fila: Vertice[] = [];
        const pais = new Map<string, string>();
        
        verticeOrigem.visitado = true;
        fila[fila.length] = verticeOrigem;
        
        while (fila.length > 0) {
            const verticeAtual = this.removerPrimeiro(fila);
            
            for (let i = 0; i < verticeAtual.adjacentes.length; i++) {
                const adjacente = verticeAtual.adjacentes[i];
                
                if (!adjacente.visitado) {
                    adjacente.visitado = true;
                    pais.set(adjacente.id, verticeAtual.id);
                    fila[fila.length] = adjacente;
                    
                    if (adjacente.id === destino) {
                        return this.reconstruirCaminho(pais, origem, destino);
                    }
                }
            }
        }
        
        return []; // Não há caminho
    }
    
    private reconstruirCaminho(pais: Map<string, string>, origem: string, destino: string): string[] {
        const caminho: string[] = [];
        let atual = destino;
        
        while (atual !== origem) {
            caminho[caminho.length] = atual;
            atual = pais.get(atual)!;
        }
        
        caminho[caminho.length] = origem;
        
        // Inverte o caminho
        const caminhoCorreto: string[] = [];
        for (let i = caminho.length - 1; i >= 0; i--) {
            caminhoCorreto[caminhoCorreto.length] = caminho[i];
        }
        
        return caminhoCorreto;
    }
    
    /**
     * Verifica se o grafo é conexo (não direcionado)
     */
    public ehConexo(): boolean {
        if (this.direcionado || this.vertices.size === 0) {
            return false;
        }
        
        // Pega primeiro vértice
        const primeiroVertice = this.vertices.values().next().value;
        const visitados = this.buscaEmProfundidade(primeiroVertice.id);
        
        return visitados.length === this.vertices.size;
    }
    
    /**
     * Detecta se há ciclo no grafo
     */
    public temCiclo(): boolean {
        this.resetarVisitados();
        
        if (this.direcionado) {
            return this.temCicloDirecionado();
        } else {
            return this.temCicloNaoDirecionado();
        }
    }
    
    private temCicloNaoDirecionado(): boolean {
        const visitados = new Set<string>();
        
        for (const vertice of this.vertices.values()) {
            if (!visitados.has(vertice.id)) {
                if (this.dfsDetectarCiclo(vertice, null, visitados)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private dfsDetectarCiclo(vertice: Vertice, pai: Vertice | null, visitados: Set<string>): boolean {
        visitados.add(vertice.id);
        
        for (let i = 0; i < vertice.adjacentes.length; i++) {
            const adjacente = vertice.adjacentes[i];
            
            if (!visitados.has(adjacente.id)) {
                if (this.dfsDetectarCiclo(adjacente, vertice, visitados)) {
                    return true;
                }
            } else if (pai === null || adjacente.id !== pai.id) {
                return true; // Ciclo encontrado
            }
        }
        
        return false;
    }
    
    private temCicloDirecionado(): boolean {
        const cores = new Map<string, 'branco' | 'cinza' | 'preto'>();
        
        // Inicializa todos como branco
        for (const vertice of this.vertices.values()) {
            cores.set(vertice.id, 'branco');
        }
        
        for (const vertice of this.vertices.values()) {
            if (cores.get(vertice.id) === 'branco') {
                if (this.dfsDetectarCicloDirecionado(vertice, cores)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private dfsDetectarCicloDirecionado(vertice: Vertice, cores: Map<string, 'branco' | 'cinza' | 'preto'>): boolean {
        cores.set(vertice.id, 'cinza');
        
        for (let i = 0; i < vertice.adjacentes.length; i++) {
            const adjacente = vertice.adjacentes[i];
            const cor = cores.get(adjacente.id);
            
            if (cor === 'cinza') {
                return true; // Back edge - ciclo detectado
            }
            
            if (cor === 'branco' && this.dfsDetectarCicloDirecionado(adjacente, cores)) {
                return true;
            }
        }
        
        cores.set(vertice.id, 'preto');
        return false;
    }
    
    /**
     * Reset status visitado de todos os vértices
     */
    private resetarVisitados(): void {
        this.vertices.forEach(vertice => {
            vertice.resetarVisitado();
        });
    }
    
    /**
     * Obtém lista de todos os vértices
     */
    public obterVertices(): string[] {
        return Array.from(this.vertices.keys());
    }
    
    /**
     * Obtém número de vértices
     */
    public numeroVertices(): number {
        return this.vertices.size;
    }
    
    /**
     * Obtém número de arestas
     */
    public numeroArestas(): number {
        let arestas = 0;
        
        this.vertices.forEach(vertice => {
            arestas += vertice.obterGrau();
        });
        
        // Se não direcionado, cada aresta foi contada duas vezes
        return this.direcionado ? arestas : arestas / 2;
    }
    
    /**
     * Obtém grau de um vértice
     */
    public obterGrau(id: string): number {
        const vertice = this.vertices.get(id);
        return vertice ? vertice.obterGrau() : 0;
    }
    
    /**
     * Lista adjacentes de um vértice
     */
    public obterAdjacentes(id: string): string[] {
        const vertice = this.vertices.get(id);
        if (!vertice) {
            return [];
        }
        
        const adjacentes: string[] = [];
        for (let i = 0; i < vertice.adjacentes.length; i++) {
            adjacentes[i] = vertice.adjacentes[i].id;
        }
        
        return adjacentes;
    }
    
    /**
     * Representação em string do grafo
     */
    public toString(): string {
        let resultado = "Grafo " + (this.direcionado ? "Direcionado" : "Não Direcionado") + ":\n";
        
        this.vertices.forEach((vertice, id) => {
            resultado += `${id}: `;
            
            const adjacentes: string[] = [];
            for (let i = 0; i < vertice.adjacentes.length; i++) {
                adjacentes[i] = vertice.adjacentes[i].id;
            }
            
            resultado += adjacentes.join(", ") + "\n";
        });
        
        return resultado;
    }
}

// Exemplos de uso
console.log("=== EXERCÍCIO 16 - GRAFO COM LISTA DE ADJACÊNCIA ===");

// Criando grafo não direcionado
const grafo = new Grafo(false);

console.log("Criando grafo não direcionado...");

// Adicionando vértices
const vertices = ["A", "B", "C", "D", "E"];
for (let i = 0; i < vertices.length; i++) {
    grafo.adicionarVertice(vertices[i]);
}

// Adicionando arestas
grafo.adicionarAresta("A", "B");
grafo.adicionarAresta("A", "C");
grafo.adicionarAresta("B", "D");
grafo.adicionarAresta("C", "D");
grafo.adicionarAresta("D", "E");

console.log("Número de vértices:", grafo.numeroVertices());
console.log("Número de arestas:", grafo.numeroArestas());

console.log("\n--- ESTRUTURA DO GRAFO ---");
console.log(grafo.toString());

// Testando adjacências
console.log("--- ADJACÊNCIAS ---");
console.log("A tem aresta com B:", grafo.temAresta("A", "B"));
console.log("A tem aresta com E:", grafo.temAresta("A", "E"));
console.log("Adjacentes de D:", grafo.obterAdjacentes("D"));
console.log("Grau de D:", grafo.obterGrau("D"));

// Busca em profundidade
console.log("\n--- BUSCA EM PROFUNDIDADE (DFS) ---");
const dfs = grafo.buscaEmProfundidade("A");
console.log("DFS iniciando de A:", dfs);

// Busca em largura
console.log("\n--- BUSCA EM LARGURA (BFS) ---");
const bfs = grafo.buscaEmLargura("A");
console.log("BFS iniciando de A:", bfs);

// Encontrar caminho
console.log("\n--- ENCONTRAR CAMINHO ---");
const caminho = grafo.encontrarCaminho("A", "E");
console.log("Caminho de A para E:", caminho);

const caminhoInexistente = grafo.encontrarCaminho("A", "Z");
console.log("Caminho de A para Z:", caminhoInexistente);

// Propriedades do grafo
console.log("\n--- PROPRIEDADES ---");
console.log("Grafo é conexo:", grafo.ehConexo());
console.log("Grafo tem ciclo:", grafo.temCiclo());

// Testando grafo direcionado
console.log("\n=== GRAFO DIRECIONADO ===");
const grafoDirecionado = new Grafo(true);

// Criando um grafo direcionado simples
grafoDirecionado.adicionarVertice("X");
grafoDirecionado.adicionarVertice("Y");
grafoDirecionado.adicionarVertice("Z");

grafoDirecionado.adicionarAresta("X", "Y");
grafoDirecionado.adicionarAresta("Y", "Z");
grafoDirecionado.adicionarAresta("Z", "X"); // Cria ciclo

console.log(grafoDirecionado.toString());
console.log("Tem ciclo:", grafoDirecionado.temCiclo());

// Removendo aresta para quebrar ciclo
grafoDirecionado.removerAresta("Z", "X");
console.log("Após remover Z->X, tem ciclo:", grafoDirecionado.temCiclo());

// Teste de performance
console.log("\n--- TESTE DE PERFORMANCE ---");
const grafoGrande = new Grafo(false);

const inicio = Date.now();

// Cria grafo com 100 vértices
for (let i = 0; i < 100; i++) {
    grafoGrande.adicionarVertice(`V${i}`);
}

// Adiciona arestas aleatórias
for (let i = 0; i < 200; i++) {
    const origem = Math.floor(Math.random() * 100);
    const destino = Math.floor(Math.random() * 100);
    
    if (origem !== destino) {
        grafoGrande.adicionarAresta(`V${origem}`, `V${destino}`);
    }
}

const tempo = Date.now() - inicio;
console.log(`Criação de grafo (100 vértices, ~200 arestas): ${tempo}ms`);

// Teste de busca no grafo grande
const inicioBusca = Date.now();
const resultadoDFS = grafoGrande.buscaEmProfundidade("V0");
const tempoBusca = Date.now() - inicioBusca;

console.log(`DFS em grafo grande: ${tempoBusca}ms`);
console.log(`Vértices alcançáveis de V0: ${resultadoDFS.length}`);

export { Vertice, Grafo };
