/**
 * Variante manual: detecta ciclo e retorna a lista de nós do ciclo
 * Implementado sem Map/Set e sem métodos de array externos.
 */

class ProjectCycleManual {
    private adj: { [k: number]: number[] };
    private nodes: number[];

    constructor() {
        this.adj = {};
        this.nodes = [];
    }

    public addDependency(a: number, b: number): void {
        let foundA = false;
        let foundB = false;
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i] === a) foundA = true;
            if (this.nodes[i] === b) foundB = true;
        }
        if (!foundA) this.nodes[this.nodes.length] = a;
        if (!foundB) this.nodes[this.nodes.length] = b;

        if (!this.adj[a]) this.adj[a] = [b];
        else {
            let dup = false;
            for (let i = 0; i < this.adj[a].length; i++) {
                if (this.adj[a][i] === b) { dup = true; break; }
            }
            if (!dup) this.adj[a][this.adj[a].length] = b;
        }
    }

    // retorna ciclo como array ou null
    public findCycle(): number[] | null {
        const WHITE = 0, GRAY = 1, BLACK = 2;
        const state: { [k: number]: number } = {};
        const parent: { [k: number]: number | null } = {};
        for (let i = 0; i < this.nodes.length; i++) {
            state[this.nodes[i]] = WHITE;
            parent[this.nodes[i]] = null;
        }

        let found: number[] | null = null;

        const dfs = (u: number): boolean => {
            state[u] = GRAY;
            const neigh = this.adj[u] || [];
            for (let i = 0; i < neigh.length; i++) {
                const v = neigh[i];
                const st = state[v] || WHITE;
                if (st === WHITE) {
                    parent[v] = u;
                    if (dfs(v)) return true;
                } else if (st === GRAY) {
                    // constrói ciclo de v..u
                    const cycle: number[] = [];
                    let cur: number | null = u;
                    cycle[cycle.length] = v;
                    while (cur !== null && cur !== v) {
                        cycle[cycle.length] = cur;
                        cur = parent[cur] ?? null;
                    }
                    // reverse
                    const rev: number[] = [];
                    for (let j = cycle.length - 1; j >= 0; j--) rev[rev.length] = cycle[j];
                    found = rev;
                    return true;
                }
            }
            state[u] = BLACK;
            return false;
        };

        for (let i = 0; i < this.nodes.length; i++) {
            const k = this.nodes[i];
            if (state[k] === WHITE) {
                if (dfs(k)) break;
            }
        }

        return found;
    }
}

// Demo
const pcm = new ProjectCycleManual();
pcm.addDependency(1, 2);
pcm.addDependency(2, 4);
pcm.addDependency(3, 4);
pcm.addDependency(4, 5);
console.log('findCycle manual (deve ser null):', pcm.findCycle());
pcm.addDependency(5, 2);
console.log('findCycle manual após (5,2) (deve indicar ciclo):', pcm.findCycle());

export { ProjectCycleManual };
