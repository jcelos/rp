/**
 * Variante manual: calcula rounds mínimos (níveis) sem Map/Set
 */

class ProjectScheduleManual {
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

    public minRounds(): number | null {
        const indeg: { [k: number]: number } = {};
        const rev: { [k: number]: number[] } = {};
        for (let i = 0; i < this.nodes.length; i++) {
            indeg[this.nodes[i]] = 0;
            rev[this.nodes[i]] = [];
        }

        for (const keyStr in this.adj) {
            const a = Number(keyStr);
            const deps = this.adj[a] || [];
            for (let j = 0; j < deps.length; j++) {
                const b = deps[j];
                indeg[a] = (indeg[a] || 0) + 1;
                // reverse: b -> a
                const arr = rev[b] || [];
                arr[arr.length] = a;
                rev[b] = arr;
            }
        }

        const q: number[] = [];
        let head = 0;
        const lvl: { [k: number]: number } = {};
        for (let i = 0; i < this.nodes.length; i++) {
            const n = this.nodes[i];
            if (indeg[n] === 0) { q[q.length] = n; lvl[n] = 1; }
            else lvl[n] = 0;
        }

        let processed = 0;
        let maxL = 0;
        while (head < q.length) {
            const u = q[head++];
            processed++;
            const L = lvl[u] || 1;
            if (L > maxL) maxL = L;
            const deps = rev[u] || [];
            for (let i = 0; i < deps.length; i++) {
                const v = deps[i];
                indeg[v] = indeg[v] - 1;
                const newLv = (lvl[v] || 0) > (L + 1) ? (lvl[v] || 0) : (L + 1);
                lvl[v] = newLv;
                if (indeg[v] === 0) q[q.length] = v;
            }
        }

        if (processed !== this.nodes.length) return null;
        return maxL;
    }
}

// Demo
const psm = new ProjectScheduleManual();
psm.addDependency(1, 2);
psm.addDependency(2, 4);
psm.addDependency(3, 4);
psm.addDependency(4, 5);
console.log('Min rounds manual (sem ciclo):', psm.minRounds());
psm.addDependency(5, 2);
console.log('Min rounds manual após (5,2) (deve ser null):', psm.minRounds());

export { ProjectScheduleManual };
