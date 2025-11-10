/**
 * Variante manual: ordenação topológica usando estruturas simples (objetos e arrays)
 * Sem uso de Map/Set e sem métodos de array avançados.
 */

class ProjectTopoManual {
    private adj: { [k: number]: number[] };
    private nodes: number[]; // lista de nós

    constructor() {
        this.adj = {};
        this.nodes = [];
    }

    public addDependency(a: number, b: number): void {
        // registra nós manualmente
        let foundA = false;
        let foundB = false;
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i] === a) foundA = true;
            if (this.nodes[i] === b) foundB = true;
        }
        if (!foundA) this.nodes[this.nodes.length] = a;
        if (!foundB) this.nodes[this.nodes.length] = b;

        // adiciona adj[a] -> b sem duplicatas
        if (!this.adj[a]) this.adj[a] = [b];
        else {
            let dup = false;
            for (let i = 0; i < this.adj[a].length; i++) {
                if (this.adj[a][i] === b) { dup = true; break; }
            }
            if (!dup) this.adj[a][this.adj[a].length] = b;
        }
    }

    // Kahn manual: retorna ordem ou null se ciclo
    public getOrder(): number[] | null {
        // indegree inicial zero
        const indeg: { [k: number]: number } = {};
        for (let i = 0; i < this.nodes.length; i++) indeg[this.nodes[i]] = 0;

        // soma indegrees (cada aresta a -> b conta como +1 para a)
        for (const keyStr in this.adj) {
            const key = Number(keyStr);
            const arr = this.adj[key] || [];
            for (let j = 0; j < arr.length; j++) {
                // a depende de b -> indeg[a]++
                indeg[key] = (indeg[key] || 0) + 1;
            }
        }

        // fila manual com head index
        const q: number[] = [];
        let head = 0;
        for (let i = 0; i < this.nodes.length; i++) {
            const n = this.nodes[i];
            if (indeg[n] === 0) {
                q[q.length] = n;
            }
        }

        const order: number[] = [];
        while (head < q.length) {
            const u = q[head++];
            order[order.length] = u;
            // para cada dependente v tal que v depende de u? precisamos procurar todos os nós que têm u como dependência
            for (let i = 0; i < this.nodes.length; i++) {
                const v = this.nodes[i];
                const deps = this.adj[v] || [];
                // se v depende de u, decrementa indeg[v]
                for (let j = 0; j < deps.length; j++) {
                    if (deps[j] === u) {
                        indeg[v] = indeg[v] - 1;
                        if (indeg[v] === 0) q[q.length] = v;
                        break;
                    }
                }
            }
        }

        // verificamos se ordenamos todos os nós
        if (order.length === this.nodes.length) return order;
        return null; // ciclo
    }
}

// Demo manual
const ptm = new ProjectTopoManual();
ptm.addDependency(1, 2);
ptm.addDependency(2, 4);
ptm.addDependency(3, 4);
ptm.addDependency(4, 5);

console.log('Topo manual (deve ser válido):', ptm.getOrder());
ptm.addDependency(5, 2);
console.log('Topo manual após (5,2) (deve ser null):', ptm.getOrder());

export { ProjectTopoManual };
