// João Celos

/**
 * EXERCÍCIO 1 - ANÁLISE DE ÁRVORE
 * Construção simbólica da árvore com raiz em 'a' e cálculo de folhas,
 * nós internos, altura, grau e propriedades de alguns nós.
 */

class Node {
    public label: string;
    public children: Node[];
    public parent: Node | null;

    constructor(label: string) {
        this.label = label;
        this.children = [];
        this.parent = null;
    }
}

// Constrói a árvore conforme o enunciado
function buildTree(): Node {
    const nodes: { [k: string]: Node } = {};
    const labels = ['a','b','c','d','e','f','g','h','i','j','k','l','m'];
    for (let i = 0; i < labels.length; i++) {
        nodes[labels[i]] = new Node(labels[i]);
    }

    function addEdge(parent: string, child: string) {
        nodes[parent].children[nodes[parent].children.length] = nodes[child];
        nodes[child].parent = nodes[parent];
    }

    addEdge('a','b');
    addEdge('b','d');
    addEdge('b','e');
    addEdge('d','g');
    addEdge('d','h');
    addEdge('e','i');
    addEdge('e','j');
    addEdge('j','l');
    addEdge('j','m');
    addEdge('a','c');
    addEdge('c','f');
    addEdge('f','k');

    return nodes['a'];
}

function getLeaves(root: Node): string[] {
    const leaves: string[] = [];
    const stack: Node[] = [root];
    while (stack.length > 0) {
        const node = stack[stack.length - 1];
        stack.length = stack.length - 1;
        if (node.children.length === 0) {
            leaves[leaves.length] = node.label;
        } else {
            for (let i = 0; i < node.children.length; i++) {
                stack[stack.length] = node.children[i];
            }
        }
    }
    // ordena lexicograficamente (manual)
    for (let i = 0; i < leaves.length - 1; i++) {
        for (let j = 0; j < leaves.length - 1 - i; j++) {
            if (leaves[j] > leaves[j+1]) {
                const t = leaves[j]; leaves[j] = leaves[j+1]; leaves[j+1] = t;
            }
        }
    }
    return leaves;
}

function getInternalNodes(root: Node): string[] {
    const internals: string[] = [];
    const stack: Node[] = [root];
    while (stack.length > 0) {
        const node = stack[stack.length - 1];
        stack.length = stack.length - 1;
        if (node.children.length > 0) {
            internals[internals.length] = node.label;
            for (let i = 0; i < node.children.length; i++) {
                stack[stack.length] = node.children[i];
            }
        }
    }
    // ordena manualmente
    for (let i = 0; i < internals.length - 1; i++) {
        for (let j = 0; j < internals.length - 1 - i; j++) {
            if (internals[j] > internals[j+1]) {
                const t = internals[j]; internals[j] = internals[j+1]; internals[j+1] = t;
            }
        }
    }
    return internals;
}

function height(node: Node): number {
    if (!node) return 0;
    if (node.children.length === 0) return 0; // altura em arestas
    let maxh = 0;
    for (let i = 0; i < node.children.length; i++) {
        const h = height(node.children[i]);
        if (h > maxh) maxh = h;
    }
    return maxh + 1;
}

function degreeTree(root: Node): number {
    let maxdeg = 0;
    const stack: Node[] = [root];
    while (stack.length > 0) {
        const node = stack[stack.length - 1];
        stack.length = stack.length - 1;
        if (node.children.length > maxdeg) maxdeg = node.children.length;
        for (let i = 0; i < node.children.length; i++) stack[stack.length] = node.children[i];
    }
    return maxdeg;
}

function descendants(node: Node): string[] {
    const result: string[] = [];
    const stack: Node[] = [];
    for (let i = 0; i < node.children.length; i++) stack[stack.length] = node.children[i];
    while (stack.length > 0) {
        const n = stack[stack.length - 1]; stack.length = stack.length - 1;
        result[result.length] = n.label;
        for (let i = 0; i < n.children.length; i++) stack[stack.length] = n.children[i];
    }
    // ordenar
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
            if (result[j] > result[j+1]) { const t = result[j]; result[j] = result[j+1]; result[j+1] = t; }
        }
    }
    return result;
}

function siblings(node: Node): string[] {
    if (!node.parent) return [];
    const sibs: string[] = [];
    const p = node.parent;
    for (let i = 0; i < p.children.length; i++) {
        if (p.children[i] !== node) sibs[sibs.length] = p.children[i].label;
    }
    // ordenar
    for (let i = 0; i < sibs.length - 1; i++) {
        for (let j = 0; j < sibs.length - 1 - i; j++) {
            if (sibs[j] > sibs[j+1]) { const t = sibs[j]; sibs[j] = sibs[j+1]; sibs[j+1] = t; }
        }
    }
    return sibs;
}

// Execução e respostas
const raiz = buildTree();
console.log('Folhas:', getLeaves(raiz));
console.log('Nós internos:', getInternalNodes(raiz));
console.log('Altura (em arestas):', height(raiz));
console.log('Grau da árvore:', degreeTree(raiz));

// Para cinco nós: a, b, d, j, f
const labelsToCheck = ['a','b','d','j','f'];
const mapNodes: { [k:string]: Node } = {};
function mapAll(node: Node) {
    mapNodes[node.label] = node;
    for (let i = 0; i < node.children.length; i++) mapAll(node.children[i]);
}
mapAll(raiz);

for (let i = 0; i < labelsToCheck.length; i++) {
    const lab = labelsToCheck[i];
    const nd = mapNodes[lab];
    const pai = nd.parent ? nd.parent.label : null;
    const filhos: string[] = [];
    for (let j = 0; j < nd.children.length; j++) filhos[filhos.length] = nd.children[j].label;
    console.log('\nNó', lab);
    console.log('  Pai:', pai);
    console.log('  Filhos:', filhos);
    console.log('  Descendentes:', descendants(nd));
    console.log('  Irmãos:', siblings(nd));
    console.log('  Grau:', nd.children.length);
}
