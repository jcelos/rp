/**
 * DESAFIO - SEM DEPENDÊNCIAS
 *
 * Universidade Tecnológica Federal do Paraná - Campus Guarapuava
 * Problema: Sem Dependências
 *
 * Implementa a classe Project com addDependency(a,b) (a depende de b)
 * e isPossible() que retorna true se o grafo de dependências não
 * contiver ciclos (projeto exequível), ou false caso haja ciclo.
 */

class Project {
    private adj: Map<number, number[]>;
    private nodes: Map<number, boolean>; // track presence

    constructor() {
        this.adj = new Map<number, number[]>();
        this.nodes = new Map<number, boolean>();
    }

    // Adiciona dependência: tarefa `a` depende de `b`
    public addDependency(a: number, b: number): void {
        // Marca nós existentes
        if (!this.nodes.has(a)) this.nodes.set(a, true);
        if (!this.nodes.has(b)) this.nodes.set(b, true);

        // Insere aresta a -> b
        const list = this.adj.get(a);
        if (!list) {
            this.adj.set(a, [b]);
        } else {
            // evita duplicatas simples
            let found = false;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === b) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                list[list.length] = b;
                this.adj.set(a, list);
            }
        }
    }

    // Retorna true se não houver ciclos (projeto exequível)
    public isPossible(): boolean {
        const WHITE = 0; // não visitado
        const GRAY = 1;  // na pilha (visita em progresso)
        const BLACK = 2; // visitado totalmente

        const state = new Map<number, number>();
        // inicializa
        for (const key of this.nodes.keys()) {
            state.set(key, WHITE);
        }

        // DFS com detecção de retrocesso (back-edge)
        const dfs = (u: number): boolean => {
            state.set(u, GRAY);
            const neighbors = this.adj.get(u) || [];
            for (let i = 0; i < neighbors.length; i++) {
                const v = neighbors[i];
                const st = state.get(v) || WHITE;
                if (st === GRAY) {
                    // encontrou ciclo
                    return false;
                }
                if (st === WHITE) {
                    if (!dfs(v)) return false;
                }
            }
            state.set(u, BLACK);
            return true;
        };

        // verifica todos os nós (grafo pode ser desconexo)
        for (const key of this.nodes.keys()) {
            if ((state.get(key) || WHITE) === WHITE) {
                if (!dfs(key)) return false;
            }
        }

        return true;
    }
}

// Demo com o exemplo do enunciado
const myProject = new Project();
myProject.addDependency(1, 2);
myProject.addDependency(2, 4);
myProject.addDependency(3, 4);
myProject.addDependency(4, 5);

console.log("Exemplo 1 (deve ser true):", myProject.isPossible());

// adiciona dependência que cria ciclo indireto: 5 -> 2
myProject.addDependency(5, 2);
console.log("Após adicionar (5,2) (deve ser false):", myProject.isPossible());

export { Project };
