/**
 * Variante: algoritmo da vizinhança (busca local por trocas adjacentes)
 * Objetivo: encontrar ordenação que minimize violações de dependências.
 * Se chegar a zero violações, obtemos uma ordenação topológica.
 * Implementado de forma manual (objetos e arrays).
 */

class ProjectNeighborhood {
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
            for (let i = 0; i < this.adj[a].length; i++) if (this.adj[a][i] === b) { dup = true; break; }
            if (!dup) this.adj[a][this.adj[a].length] = b;
        }
    }

    // conta violações (um par (a->b) é violação se pos(a) > pos(b))
    private countViolations(order: number[]): number {
        // construir posição
        const pos: { [k: number]: number } = {};
        for (let i = 0; i < order.length; i++) pos[order[i]] = i;

        let viol = 0;
        for (let i = 0; i < this.nodes.length; i++) {
            const a = this.nodes[i];
            const deps = this.adj[a] || [];
            for (let j = 0; j < deps.length; j++) {
                const b = deps[j];
                if ((pos[a] || 0) > (pos[b] || 0)) viol = viol + 1;
            }
        }
        return viol;
    }

    // Gera ordem inicial por indegree heurístico simples
    private initialOrder(): number[] {
        // calculamos indegree manual
        const indeg: { [k: number]: number } = {};
        for (let i = 0; i < this.nodes.length; i++) indeg[this.nodes[i]] = 0;
        for (const kStr in this.adj) {
            const a = Number(kStr);
            const deps = this.adj[a] || [];
            indeg[a] = (indeg[a] || 0) + deps.length;
        }

        // ordena nodes por indegree ascendente (insertion sort manual)
        const arr: number[] = [];
        for (let i = 0; i < this.nodes.length; i++) {
            const n = this.nodes[i];
            // insere n na posição correta
            if (arr.length === 0) arr[0] = n;
            else {
                let inserted = false;
                for (let j = 0; j < arr.length; j++) {
                    if ((indeg[n] || 0) < (indeg[arr[j]] || 0)) {
                        // shift right a partir de j
                        for (let k = arr.length; k > j; k--) arr[k] = arr[k-1];
                        arr[j] = n;
                        inserted = true;
                        break;
                    }
                }
                if (!inserted) arr[arr.length] = n;
            }
        }
        return arr;
    }

    // busca local: troca adjacentes enquanto melhora
    public localSearch(maxIters: number = 1000): { order: number[]; violations: number } {
        let order = this.initialOrder();
        let bestViol = this.countViolations(order);
        let improved = true;
        let iters = 0;

        while (improved && iters < maxIters) {
            improved = false;
            iters = iters + 1;
            // tenta todas trocas adjacentes
            for (let i = 0; i < order.length - 1; i++) {
                // swap adj i,i+1
                const tmp = order[i]; order[i] = order[i+1]; order[i+1] = tmp;
                const v = this.countViolations(order);
                if (v < bestViol) {
                    bestViol = v;
                    improved = true;
                    // mantém troca
                } else {
                    // desfaz troca
                    const tmp2 = order[i]; order[i] = order[i+1]; order[i+1] = tmp2;
                }
                if (bestViol === 0) return { order: order, violations: 0 };
            }
        }

        return { order: order, violations: bestViol };
    }
}

// Demo
const pn = new ProjectNeighborhood();
pn.addDependency(1, 2);
pn.addDependency(2, 4);
pn.addDependency(3, 4);
pn.addDependency(4, 5);

let res = pn.localSearch(500);
console.log('Neighborhood result (sem ciclo) violations:', res.violations, 'order:', res.order);

pn.addDependency(5, 2);
res = pn.localSearch(2000);
console.log('Neighborhood após (5,2) violations:', res.violations, 'order:', res.order);

export { ProjectNeighborhood };
