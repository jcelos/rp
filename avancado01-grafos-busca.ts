/**
 * EXERCÍCIO AVANÇADO 1 - GRAFOS E ALGORITMOS DE BUSCA
 * 
 * Implementa estrutura de dados Grafo com representação por lista de adjacência
 * e algoritmos clássicos como BFS, DFS, detecção de ciclos e componentes conectados.
 * Sem usar métodos nativos, apenas implementação manual.
 */

class Grafo {
    private vertices: number;
    private listaAdjacencia: number[][];
    private direcionado: boolean;

    constructor(numVertices: number, direcionado: boolean = false) {
        this.vertices = numVertices;
        this.direcionado = direcionado;
        this.listaAdjacencia = [];
        
        // Inicializa lista de adjacência
        for (let i = 0; i < numVertices; i++) {
            this.listaAdjacencia[i] = [];
        }
    }

    /**
     * Adiciona uma aresta entre dois vértices
     */
    public adicionarAresta(origem: number, destino: number): boolean {
        if (origem < 0 || origem >= this.vertices || 
            destino < 0 || destino >= this.vertices) {
            return false; // Vértices inválidos
        }

        // Adiciona destino à lista de adjacência da origem
        this.listaAdjacencia[origem][this.listaAdjacencia[origem].length] = destino;

        // Se não é direcionado, adiciona origem à lista do destino
        if (!this.direcionado) {
            this.listaAdjacencia[destino][this.listaAdjacencia[destino].length] = origem;
        }

        return true;
    }

    /**
     * Remove uma aresta entre dois vértices
     */
    public removerAresta(origem: number, destino: number): boolean {
        if (origem < 0 || origem >= this.vertices || 
            destino < 0 || destino >= this.vertices) {
            return false;
        }

        // Remove destino da lista de adjacência da origem
        this.removerDaLista(this.listaAdjacencia[origem], destino);

        // Se não é direcionado, remove origem da lista do destino
        if (!this.direcionado) {
            this.removerDaLista(this.listaAdjacencia[destino], origem);
        }

        return true;
    }

    private removerDaLista(lista: number[], valor: number): void {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] === valor) {
                // Move todos os elementos para a esquerda
                for (let j = i; j < lista.length - 1; j++) {
                    lista[j] = lista[j + 1];
                }
                lista.length--; // Reduz tamanho
                break;
            }
        }
    }

    /**
     * Busca em Largura (BFS) - Breadth-First Search
     */
    public bfs(verticeInicial: number): number[] {
        if (verticeInicial < 0 || verticeInicial >= this.vertices) {
            return [];
        }

        const visitado: boolean[] = [];
        const resultado: number[] = [];
        const fila: number[] = [];
        let inicioFila = 0;
        let fimFila = 0;

        // Inicializa array de visitados
        for (let i = 0; i < this.vertices; i++) {
            visitado[i] = false;
        }

        // Marca vértice inicial como visitado e adiciona na fila
        visitado[verticeInicial] = true;
        fila[fimFila] = verticeInicial;
        fimFila++;

        while (inicioFila < fimFila) {
            const verticeAtual = fila[inicioFila];
            inicioFila++;
            resultado[resultado.length] = verticeAtual;

            // Visita todos os vértices adjacentes não visitados
            const adjacentes = this.listaAdjacencia[verticeAtual];
            for (let i = 0; i < adjacentes.length; i++) {
                const vizinho = adjacentes[i];
                if (!visitado[vizinho]) {
                    visitado[vizinho] = true;
                    fila[fimFila] = vizinho;
                    fimFila++;
                }
            }
        }

        return resultado;
    }

    /**
     * Busca em Profundidade (DFS) - Depth-First Search
     */
    public dfs(verticeInicial: number): number[] {
        if (verticeInicial < 0 || verticeInicial >= this.vertices) {
            return [];
        }

        const visitado: boolean[] = [];
        const resultado: number[] = [];

        // Inicializa array de visitados
        for (let i = 0; i < this.vertices; i++) {
            visitado[i] = false;
        }

        this.dfsRecursivo(verticeInicial, visitado, resultado);
        return resultado;
    }

    private dfsRecursivo(vertice: number, visitado: boolean[], resultado: number[]): void {
        visitado[vertice] = true;
        resultado[resultado.length] = vertice;

        // Visita todos os vértices adjacentes não visitados
        const adjacentes = this.listaAdjacencia[vertice];
        for (let i = 0; i < adjacentes.length; i++) {
            const vizinho = adjacentes[i];
            if (!visitado[vizinho]) {
                this.dfsRecursivo(vizinho, visitado, resultado);
            }
        }
    }

    /**
     * Verifica se o grafo possui ciclo (para grafos direcionados)
     */
    public temCiclo(): boolean {
        if (!this.direcionado) {
            return this.temCicloNaoDirecionado();
        }

        const cor: number[] = []; // 0 = branco, 1 = cinza, 2 = preto
        
        // Inicializa todos como brancos (não visitados)
        for (let i = 0; i < this.vertices; i++) {
            cor[i] = 0;
        }

        // Executa DFS de todos os vértices não visitados
        for (let i = 0; i < this.vertices; i++) {
            if (cor[i] === 0) {
                if (this.dfsDetectarCiclo(i, cor)) {
                    return true;
                }
            }
        }

        return false;
    }

    private dfsDetectarCiclo(vertice: number, cor: number[]): boolean {
        cor[vertice] = 1; // Marca como cinza (em processamento)

        const adjacentes = this.listaAdjacencia[vertice];
        for (let i = 0; i < adjacentes.length; i++) {
            const vizinho = adjacentes[i];
            
            if (cor[vizinho] === 1) {
                return true; // Ciclo encontrado (back edge)
            }
            
            if (cor[vizinho] === 0 && this.dfsDetectarCiclo(vizinho, cor)) {
                return true;
            }
        }

        cor[vertice] = 2; // Marca como preto (processado)
        return false;
    }

    private temCicloNaoDirecionado(): boolean {
        const visitado: boolean[] = [];
        
        for (let i = 0; i < this.vertices; i++) {
            visitado[i] = false;
        }

        // Verifica ciclo para cada componente conectado
        for (let i = 0; i < this.vertices; i++) {
            if (!visitado[i]) {
                if (this.dfsDetectarCicloNaoDirecionado(i, -1, visitado)) {
                    return true;
                }
            }
        }

        return false;
    }

    private dfsDetectarCicloNaoDirecionado(vertice: number, pai: number, visitado: boolean[]): boolean {
        visitado[vertice] = true;

        const adjacentes = this.listaAdjacencia[vertice];
        for (let i = 0; i < adjacentes.length; i++) {
            const vizinho = adjacentes[i];
            
            if (!visitado[vizinho]) {
                if (this.dfsDetectarCicloNaoDirecionado(vizinho, vertice, visitado)) {
                    return true;
                }
            } else if (vizinho !== pai) {
                return true; // Ciclo encontrado
            }
        }

        return false;
    }

    /**
     * Encontra componentes conectados (para grafos não direcionados)
     */
    public componentesConectados(): number[][] {
        if (this.direcionado) {
            return []; // Só funciona para grafos não direcionados
        }

        const visitado: boolean[] = [];
        const componentes: number[][] = [];

        for (let i = 0; i < this.vertices; i++) {
            visitado[i] = false;
        }

        for (let i = 0; i < this.vertices; i++) {
            if (!visitado[i]) {
                const componente: number[] = [];
                this.dfsComponente(i, visitado, componente);
                componentes[componentes.length] = componente;
            }
        }

        return componentes;
    }

    private dfsComponente(vertice: number, visitado: boolean[], componente: number[]): void {
        visitado[vertice] = true;
        componente[componente.length] = vertice;

        const adjacentes = this.listaAdjacencia[vertice];
        for (let i = 0; i < adjacentes.length; i++) {
            const vizinho = adjacentes[i];
            if (!visitado[vizinho]) {
                this.dfsComponente(vizinho, visitado, componente);
            }
        }
    }

    /**
     * Ordenação topológica (para DAGs - Directed Acyclic Graphs)
     */
    public ordenacaoTopologica(): number[] {
        if (!this.direcionado || this.temCiclo()) {
            return []; // Só funciona para DAGs
        }

        const grauEntrada: number[] = [];
        const resultado: number[] = [];
        const fila: number[] = [];
        let inicioFila = 0;
        let fimFila = 0;

        // Calcula grau de entrada de cada vértice
        for (let i = 0; i < this.vertices; i++) {
            grauEntrada[i] = 0;
        }

        for (let i = 0; i < this.vertices; i++) {
            const adjacentes = this.listaAdjacencia[i];
            for (let j = 0; j < adjacentes.length; j++) {
                grauEntrada[adjacentes[j]]++;
            }
        }

        // Adiciona vértices com grau de entrada 0 na fila
        for (let i = 0; i < this.vertices; i++) {
            if (grauEntrada[i] === 0) {
                fila[fimFila] = i;
                fimFila++;
            }
        }

        while (inicioFila < fimFila) {
            const vertice = fila[inicioFila];
            inicioFila++;
            resultado[resultado.length] = vertice;

            // Remove aresta de todos os adjacentes
            const adjacentes = this.listaAdjacencia[vertice];
            for (let i = 0; i < adjacentes.length; i++) {
                const vizinho = adjacentes[i];
                grauEntrada[vizinho]--;
                
                if (grauEntrada[vizinho] === 0) {
                    fila[fimFila] = vizinho;
                    fimFila++;
                }
            }
        }

        return resultado;
    }

    /**
     * Verifica se há caminho entre dois vértices
     */
    public existeCaminho(origem: number, destino: number): boolean {
        if (origem < 0 || origem >= this.vertices || 
            destino < 0 || destino >= this.vertices) {
            return false;
        }

        if (origem === destino) {
            return true;
        }

        const visitados = this.bfs(origem);
        for (let i = 0; i < visitados.length; i++) {
            if (visitados[i] === destino) {
                return true;
            }
        }

        return false;
    }

    /**
     * Retorna representação em string do grafo
     */
    public toString(): string {
        let resultado = `Grafo ${this.direcionado ? "direcionado" : "não direcionado"} com ${this.vertices} vértices:\n`;
        
        for (let i = 0; i < this.vertices; i++) {
            resultado += `${i}: `;
            const adjacentes = this.listaAdjacencia[i];
            
            if (adjacentes.length === 0) {
                resultado += "(sem conexões)";
            } else {
                for (let j = 0; j < adjacentes.length; j++) {
                    resultado += adjacentes[j];
                    if (j < adjacentes.length - 1) {
                        resultado += " → ";
                    }
                }
            }
            resultado += "\n";
        }
        
        return resultado;
    }

    public getVertices(): number {
        return this.vertices;
    }

    public ehDirecionado(): boolean {
        return this.direcionado;
    }

    public getAdjacentes(vertice: number): number[] {
        if (vertice < 0 || vertice >= this.vertices) {
            return [];
        }
        
        // Retorna cópia da lista de adjacência
        const copia: number[] = [];
        const lista = this.listaAdjacencia[vertice];
        for (let i = 0; i < lista.length; i++) {
            copia[i] = lista[i];
        }
        return copia;
    }
}

/**
 * Classe com aplicações avançadas de grafos
 */
class AplicacoesGrafo {
    
    /**
     * Encontra menor caminho usando BFS (para grafos não ponderados)
     */
    public static menorCaminhoBFS(grafo: Grafo, origem: number, destino: number): number[] {
        if (origem === destino) {
            return [origem];
        }

        const vertices = grafo.getVertices();
        const visitado: boolean[] = [];
        const pai: number[] = [];
        const fila: number[] = [];
        let inicioFila = 0;
        let fimFila = 0;

        // Inicializa arrays
        for (let i = 0; i < vertices; i++) {
            visitado[i] = false;
            pai[i] = -1;
        }

        // BFS
        visitado[origem] = true;
        fila[fimFila] = origem;
        fimFila++;

        while (inicioFila < fimFila) {
            const atual = fila[inicioFila];
            inicioFila++;

            if (atual === destino) {
                break; // Destino encontrado
            }

            const adjacentes = grafo.getAdjacentes(atual);
            for (let i = 0; i < adjacentes.length; i++) {
                const vizinho = adjacentes[i];
                if (!visitado[vizinho]) {
                    visitado[vizinho] = true;
                    pai[vizinho] = atual;
                    fila[fimFila] = vizinho;
                    fimFila++;
                }
            }
        }

        // Reconstrói caminho
        if (!visitado[destino]) {
            return []; // Não há caminho
        }

        const caminho: number[] = [];
        let atual = destino;
        while (atual !== -1) {
            caminho[caminho.length] = atual;
            atual = pai[atual];
        }

        // Inverte caminho
        const caminhoCorreto: number[] = [];
        for (let i = caminho.length - 1; i >= 0; i--) {
            caminhoCorreto[caminhoCorreto.length] = caminho[i];
        }

        return caminhoCorreto;
    }

    /**
     * Verifica se grafo é bipartido
     */
    public static ehBipartido(grafo: Grafo): boolean {
        const vertices = grafo.getVertices();
        const cor: number[] = [];

        // Inicializa cores (-1 = não colorido)
        for (let i = 0; i < vertices; i++) {
            cor[i] = -1;
        }

        // Verifica cada componente conectado
        for (let i = 0; i < vertices; i++) {
            if (cor[i] === -1) {
                if (!this.colorirBipartido(grafo, i, cor)) {
                    return false;
                }
            }
        }

        return true;
    }

    private static colorirBipartido(grafo: Grafo, inicio: number, cor: number[]): boolean {
        const fila: number[] = [];
        let inicioFila = 0;
        let fimFila = 0;

        cor[inicio] = 0; // Cor inicial
        fila[fimFila] = inicio;
        fimFila++;

        while (inicioFila < fimFila) {
            const atual = fila[inicioFila];
            inicioFila++;

            const adjacentes = grafo.getAdjacentes(atual);
            for (let i = 0; i < adjacentes.length; i++) {
                const vizinho = adjacentes[i];

                if (cor[vizinho] === -1) {
                    // Colore com cor oposta
                    cor[vizinho] = 1 - cor[atual];
                    fila[fimFila] = vizinho;
                    fimFila++;
                } else if (cor[vizinho] === cor[atual]) {
                    return false; // Conflito de cor
                }
            }
        }

        return true;
    }

    /**
     * Cria grafo completo
     */
    public static criarGrafoCompleto(n: number): Grafo {
        const grafo = new Grafo(n, false);
        
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                grafo.adicionarAresta(i, j);
            }
        }
        
        return grafo;
    }

    /**
     * Cria grafo estrela
     */
    public static criarGrafoEstrela(n: number): Grafo {
        const grafo = new Grafo(n, false);
        
        // Conecta vértice 0 (centro) com todos os outros
        for (let i = 1; i < n; i++) {
            grafo.adicionarAresta(0, i);
        }
        
        return grafo;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO AVANÇADO 1 - GRAFOS E ALGORITMOS DE BUSCA ===");

// Teste 1: Criação e operações básicas
console.log("--- CRIAÇÃO DE GRAFO ---");
const grafo = new Grafo(6, false);

// Adiciona arestas: 0-1, 0-2, 1-3, 2-4, 3-5
grafo.adicionarAresta(0, 1);
grafo.adicionarAresta(0, 2);
grafo.adicionarAresta(1, 3);
grafo.adicionarAresta(2, 4);
grafo.adicionarAresta(3, 5);
grafo.adicionarAresta(4, 5);

console.log(grafo.toString());

// Teste 2: Algoritmos de busca
console.log("--- ALGORITMOS DE BUSCA ---");
console.log("BFS partir do vértice 0:", grafo.bfs(0));
console.log("DFS partir do vértice 0:", grafo.dfs(0));

// Teste 3: Detecção de ciclos
console.log("\n--- DETECÇÃO DE CICLOS ---");
console.log("Grafo atual tem ciclo:", grafo.temCiclo());

// Cria grafo com ciclo
const grafoCiclo = new Grafo(4, false);
grafoCiclo.adicionarAresta(0, 1);
grafoCiclo.adicionarAresta(1, 2);
grafoCiclo.adicionarAresta(2, 3);
grafoCiclo.adicionarAresta(3, 0); // Forma ciclo

console.log("Grafo com ciclo:");
console.log(grafoCiclo.toString());
console.log("Tem ciclo:", grafoCiclo.temCiclo());

// Teste 4: Componentes conectados
console.log("\n--- COMPONENTES CONECTADOS ---");
const grafoDesconectado = new Grafo(7, false);
grafoDesconectado.adicionarAresta(0, 1);
grafoDesconectado.adicionarAresta(1, 2);
grafoDesconectado.adicionarAresta(3, 4);
grafoDesconectado.adicionarAresta(5, 6);

console.log("Grafo desconectado:");
console.log(grafoDesconectado.toString());
const componentes = grafoDesconectado.componentesConectados();
console.log("Componentes conectados:");
for (let i = 0; i < componentes.length; i++) {
    console.log(`Componente ${i + 1}: [${componentes[i].join(", ")}]`);
}

// Teste 5: Ordenação topológica
console.log("\n--- ORDENAÇÃO TOPOLÓGICA ---");
const dag = new Grafo(6, true); // Grafo direcionado
dag.adicionarAresta(5, 2);
dag.adicionarAresta(5, 0);
dag.adicionarAresta(4, 0);
dag.adicionarAresta(4, 1);
dag.adicionarAresta(2, 3);
dag.adicionarAresta(3, 1);

console.log("DAG (Directed Acyclic Graph):");
console.log(dag.toString());
console.log("Ordenação topológica:", dag.ordenacaoTopologica());

// Teste 6: Aplicações avançadas
console.log("\n--- APLICAÇÕES AVANÇADAS ---");

// Menor caminho
const caminho = AplicacoesGrafo.menorCaminhoBFS(grafo, 0, 5);
console.log("Menor caminho de 0 para 5:", caminho);

// Verifica se é bipartido
console.log("Grafo é bipartido:", AplicacoesGrafo.ehBipartido(grafo));

// Grafo completo pequeno
const grafoCompleto = AplicacoesGrafo.criarGrafoCompleto(4);
console.log("\nGrafo completo K4:");
console.log(grafoCompleto.toString());
console.log("É bipartido:", AplicacoesGrafo.ehBipartido(grafoCompleto));

// Grafo estrela
const grafoEstrela = AplicacoesGrafo.criarGrafoEstrela(5);
console.log("\nGrafo estrela com 5 vértices:");
console.log(grafoEstrela.toString());
console.log("É bipartido:", AplicacoesGrafo.ehBipartido(grafoEstrela));

// Teste 7: Conectividade
console.log("\n--- TESTE DE CONECTIVIDADE ---");
console.log("Existe caminho 0 → 5:", grafo.existeCaminho(0, 5));
console.log("Existe caminho 1 → 4:", grafo.existeCaminho(1, 4));
console.log("Existe caminho 0 → 6:", grafo.existeCaminho(0, 6)); // Não existe vértice 6

export { Grafo, AplicacoesGrafo };
