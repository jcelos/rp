// João Celos

/**
 * EXERCÍCIO 4 - SIMULAÇÃO DE INSERÇÃO EM BST
 * Insira na ordem: 50, 126, 28, 77, 12, 429, 39, 84, 256, 31
 */

class NodeBST {
    public value: number;
    public left: NodeBST | null;
    public right: NodeBST | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function insert(root: NodeBST | null, v: number): NodeBST {
    if (root === null) return new NodeBST(v);
    if (v < root.value) {
        root.left = insert(root.left, v);
    } else {
        root.right = insert(root.right, v);
    }
    return root;
}

function inorder(root: NodeBST | null, arr: number[]): void {
    if (root === null) return;
    inorder(root.left, arr);
    arr[arr.length] = root.value;
    inorder(root.right, arr);
}

function printTree(root: NodeBST | null, prefix: string): void {
    if (root === null) return;
    // imprime raiz, depois subárvores com recuo
    console.log(prefix + root.value);
    printTree(root.left, prefix + '  L-');
    printTree(root.right, prefix + '  R-');
}

const seq = [50,126,28,77,12,429,39,84,256,31];
let raiz: NodeBST | null = null;
for (let i = 0; i < seq.length; i++) raiz = insert(raiz, seq[i]);

console.log('Impressão simbólica da árvore (prefixos L-/R- mostram direção):');
printTree(raiz, '');

const arr: number[] = [];
inorder(raiz, arr);
console.log('Travessia in-order (crescente):', arr);
export { NodeBST };
