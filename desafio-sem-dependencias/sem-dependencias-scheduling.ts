/**
 * Variante 3: calcula o número mínimo de rounds (etapas) para executar
 * todas as tarefas assumindo workers ilimitados, respeitando dependências.
 * Retorna null se houver ciclo.
 */

class ProjectSchedule {
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

    // Retorna número mínimo de rounds (1-based), ou null se houver ciclo
    public minRounds(): number | null {
        // Constrói reverseAdj (dependency -> dependents) e indegree (#dependencies)
        const indegree = new Map<number, number>();
        const reverseAdj = new Map<number, number[]>();

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
        const level = new Map<number, number>();
        for (const [node, deg] of indegree.entries()) {
            if (deg === 0) {
                queue.push(node);
                level.set(node, 1);
            }
        }

        let processed = 0;
        let maxLevel = 0;

        while (queue.length > 0) {
            const u = queue.shift()!;
            processed++;
            const l = level.get(u) || 1;
            if (l > maxLevel) maxLevel = l;
            const dependents = reverseAdj.get(u) || [];
            for (let i = 0; i < dependents.length; i++) {
                const v = dependents[i];
                indegree.set(v, (indegree.get(v) || 0) - 1);
                // nível do dependente é no mínimo l+1
                level.set(v, Math.max(level.get(v) || 0, l + 1));
                if (indegree.get(v) === 0) queue.push(v);
            }
        }

        if (processed !== Array.from(this.nodes.keys()).length) return null; // ciclo
        return maxLevel;
    }
}

// Demo
const ps = new ProjectSchedule();
ps.addDependency(1, 2);
ps.addDependency(2, 4);
ps.addDependency(3, 4);
ps.addDependency(4, 5);

console.log('Min rounds (sem ciclo):', ps.minRounds());

ps.addDependency(5, 2);
console.log('Min rounds após (5,2) (deve ser null):', ps.minRounds());

export { ProjectSchedule };
