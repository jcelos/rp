/**
 * Variante 1: retorna uma ordenação topológica (se possível)
 */

class ProjectTopo {
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
            // evita duplicatas
            for (let i = 0; i < list.length; i++) if (list[i] === b) return;
            list[list.length] = b;
            this.adj.set(a, list);
        }
    }

    // Retorna array com ordem de execução (dependências antes), ou null se houver ciclo
    public getOrder(): number[] | null {
        // Para Kahn precisamos de indegree = número de dependências de cada nó.
        const indegree = new Map<number, number>();
        const reverseAdj = new Map<number, number[]>(); // dependency -> [dependents]

        // inicializa
        for (const k of this.nodes.keys()) {
            indegree.set(k, 0);
            reverseAdj.set(k, []);
        }

        for (const [a, deps] of this.adj.entries()) {
            indegree.set(a, (indegree.get(a) || 0) + deps.length);
            for (let i = 0; i < deps.length; i++) {
                const b = deps[i];
                const arr = reverseAdj.get(b) || [];
                arr[arr.length] = a;
                reverseAdj.set(b, arr);
            }
        }

        const queue: number[] = [];
        for (const [node, deg] of indegree.entries()) {
            if (deg === 0) queue.push(node);
        }

        const order: number[] = [];
        while (queue.length > 0) {
            const u = queue.shift()!;
            order[order.length] = u;
            const dependents = reverseAdj.get(u) || [];
            for (let i = 0; i < dependents.length; i++) {
                const v = dependents[i];
                indegree.set(v, (indegree.get(v) || 0) - 1);
                if (indegree.get(v) === 0) queue.push(v);
            }
        }

        // Se ordenamos todos os nós, OK
        if (order.length === Array.from(this.nodes.keys()).length) return order;
        return null; // ciclo
    }
}

// Demo
const p = new ProjectTopo();
p.addDependency(1, 2);
p.addDependency(2, 4);
p.addDependency(3, 4);
p.addDependency(4, 5);

console.log('Topological order (exemplo, válido):', p.getOrder());

// adiciona ciclo
p.addDependency(5, 2);
console.log('Topological order após (5,2) (deve ser null):', p.getOrder());

export { ProjectTopo };
