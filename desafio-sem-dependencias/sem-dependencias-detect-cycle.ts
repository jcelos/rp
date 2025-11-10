/**
 * Variante 2: detecta e retorna um ciclo (lista de nós) se existir
 */

class ProjectCycle {
    private adj: Map<number, number[]>;
    private nodes: Map<number, boolean>;

    constructor() {
        this.adj = new Map();
        this.nodes = new Map();
    }

    public addDependency(a: number, b: number): void {
        if (!this.nodes.has(a)) this.nodes.set(a, true);
        if (!this.nodes.has(b)) this.nodes.set(b, true);

        const list = this.adj.get(a);
        if (!list) this.adj.set(a, [b]);
        else {
            for (let i = 0; i < list.length; i++) if (list[i] === b) return;
            list[list.length] = b;
            this.adj.set(a, list);
        }
    }

    // retorna um vetor com os nós que formam um ciclo (na ordem do ciclo), ou null
    public findCycle(): number[] | null {
        const WHITE = 0, GRAY = 1, BLACK = 2;
        const state = new Map<number, number>();
        const parent = new Map<number, number | null>();

        for (const k of this.nodes.keys()) {
            state.set(k, WHITE);
            parent.set(k, null);
        }

        let foundCycle: number[] | null = null;

        const dfs = (u: number): boolean => {
            state.set(u, GRAY);
            const neigh = this.adj.get(u) || [];
            for (let i = 0; i < neigh.length; i++) {
                const v = neigh[i];
                const st = state.get(v) || WHITE;
                if (st === WHITE) {
                    parent.set(v, u);
                    if (dfs(v)) return true;
                } else if (st === GRAY) {
                    // constrói ciclo: de v até u
                    const cycle: number[] = [];
                    let cur: number | null = u;
                    cycle.push(v);
                    while (cur !== null && cur !== v) {
                        cycle.push(cur);
                        cur = parent.get(cur) ?? null;
                    }
                    cycle.reverse();
                    foundCycle = cycle;
                    return true;
                }
            }
            state.set(u, BLACK);
            return false;
        };

        for (const k of this.nodes.keys()) {
            if ((state.get(k) || WHITE) === WHITE) {
                if (dfs(k)) break;
            }
        }

        return foundCycle;
    }
}

// Demo
const pc = new ProjectCycle();
pc.addDependency(1, 2);
pc.addDependency(2, 4);
pc.addDependency(3, 4);
pc.addDependency(4, 5);

console.log('findCycle (deve ser null):', pc.findCycle());

pc.addDependency(5, 2);
console.log('findCycle após (5,2) (deve retornar ciclo):', pc.findCycle());

export { ProjectCycle };
