// João Celos

/**
 * EXERCÍCIO 5 - DIFICULDADES AO ORDENAR ELEMENTOS DE UMA BST
 * 
 * Texto-resposta:
 * - Em teoria, uma BST já suporta listagem ordenada por travessia in-order.
 * - Dificuldades surgem quando a árvore não está balanceada: profundidade aumenta e operação torna-se O(n) em pior caso.
 * - Se a BST contém duplicatas (sem convenção clara), decidir posição/ordem das duplicatas é necessário.
 * - Operações concorrentes (várias threads) exigem sincronização para manter propriedade da BST.
 * - Remoção de nós com dois filhos requer substituto (sucessor ou predecessor) e cuidado para manter propriedades.
 * - Em resumo: a ordenação é trivial via in-order, mas desempenho e consistência podem complicar a prática.
 */

console.log('Arquivo de discussão sobre dificuldades em ordenar elementos de uma BST.');
export {};
