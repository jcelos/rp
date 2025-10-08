/**
 * EXERCÍCIO AVANÇADO 3 - ÁRVORES AVANÇADAS (AVL E B-TREE)
 * 
 * Implementa estruturas de árvore auto-balanceadas e árvores B para aplicações
 * de alto desempenho. Demonstra rotações, balanceamento e operações otimizadas.
 * Implementação manual sem métodos nativos.
 */

/**
 * Classe para nó de árvore AVL
 */
class NoAVL<T> {
    public valor: T;
    public esquerda: NoAVL<T> | null;
    public direita: NoAVL<T> | null;
    public altura: number;

    constructor(valor: T) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
        this.altura = 1;
    }
}

/**
 * ÁRVORE AVL - Árvore binária de busca auto-balanceada
 */
class ArvoreAVL<T> {
    private raiz: NoAVL<T> | null;
    private tamanhoAtual: number;

    constructor() {
        this.raiz = null;
        this.tamanhoAtual = 0;
    }

    /**
     * Insere um valor mantendo propriedades AVL
     */
    public inserir(valor: T): void {
        this.raiz = this.inserirRecursivo(this.raiz, valor);
        this.tamanhoAtual++;
    }

    private inserirRecursivo(no: NoAVL<T> | null, valor: T): NoAVL<T> {
        // 1. Inserção BST normal
        if (no === null) {
            return new NoAVL<T>(valor);
        }

        if (this.comparar(valor, no.valor) < 0) {
            no.esquerda = this.inserirRecursivo(no.esquerda, valor);
        } else if (this.comparar(valor, no.valor) > 0) {
            no.direita = this.inserirRecursivo(no.direita, valor);
        } else {
            return no; // Valor duplicado não é inserido
        }

        // 2. Atualiza altura do nó ancestral
        no.altura = 1 + this.max(this.obterAltura(no.esquerda), this.obterAltura(no.direita));

        // 3. Obtém fator de balanceamento
        const balance = this.obterBalance(no);

        // 4. Se desbalanceado, executa rotações apropriadas

        // Caso Left Left
        if (balance > 1 && this.comparar(valor, no.esquerda!.valor) < 0) {
            return this.rotacaoDireita(no);
        }

        // Caso Right Right
        if (balance < -1 && this.comparar(valor, no.direita!.valor) > 0) {
            return this.rotacaoEsquerda(no);
        }

        // Caso Left Right
        if (balance > 1 && this.comparar(valor, no.esquerda!.valor) > 0) {
            no.esquerda = this.rotacaoEsquerda(no.esquerda!);
            return this.rotacaoDireita(no);
        }

        // Caso Right Left
        if (balance < -1 && this.comparar(valor, no.direita!.valor) < 0) {
            no.direita = this.rotacaoDireita(no.direita!);
            return this.rotacaoEsquerda(no);
        }

        return no; // Nó não mudou
    }

    /**
     * Remove um valor mantendo propriedades AVL
     */
    public remover(valor: T): boolean {
        const tamanhoAnterior = this.tamanhoAtual;
        this.raiz = this.removerRecursivo(this.raiz, valor);
        return this.tamanhoAtual < tamanhoAnterior;
    }

    private removerRecursivo(no: NoAVL<T> | null, valor: T): NoAVL<T> | null {
        // 1. Remoção BST normal
        if (no === null) {
            return no;
        }

        if (this.comparar(valor, no.valor) < 0) {
            no.esquerda = this.removerRecursivo(no.esquerda, valor);
        } else if (this.comparar(valor, no.valor) > 0) {
            no.direita = this.removerRecursivo(no.direita, valor);
        } else {
            // Nó a ser removido encontrado
            this.tamanhoAtual--;

            if (no.esquerda === null || no.direita === null) {
                const temp = no.esquerda ? no.esquerda : no.direita;

                if (temp === null) {
                    // Nó sem filhos
                    no = null;
                } else {
                    // Nó com um filho
                    no = temp;
                }
            } else {
                // Nó com dois filhos
                const temp = this.encontrarMinimo(no.direita);
                no.valor = temp.valor;
                no.direita = this.removerRecursivo(no.direita, temp.valor);
            }
        }

        if (no === null) {
            return no;
        }

        // 2. Atualiza altura
        no.altura = 1 + this.max(this.obterAltura(no.esquerda), this.obterAltura(no.direita));

        // 3. Obtém fator de balanceamento
        const balance = this.obterBalance(no);

        // 4. Executa rotações se necessário

        // Left Left Case
        if (balance > 1 && this.obterBalance(no.esquerda!) >= 0) {
            return this.rotacaoDireita(no);
        }

        // Left Right Case
        if (balance > 1 && this.obterBalance(no.esquerda!) < 0) {
            no.esquerda = this.rotacaoEsquerda(no.esquerda!);
            return this.rotacaoDireita(no);
        }

        // Right Right Case
        if (balance < -1 && this.obterBalance(no.direita!) <= 0) {
            return this.rotacaoEsquerda(no);
        }

        // Right Left Case
        if (balance < -1 && this.obterBalance(no.direita!) > 0) {
            no.direita = this.rotacaoDireita(no.direita!);
            return this.rotacaoEsquerda(no);
        }

        return no;
    }

    /**
     * Rotação à direita
     */
    private rotacaoDireita(y: NoAVL<T>): NoAVL<T> {
        const x = y.esquerda!;
        const T2 = x.direita;

        // Executa rotação
        x.direita = y;
        y.esquerda = T2;

        // Atualiza alturas
        y.altura = this.max(this.obterAltura(y.esquerda), this.obterAltura(y.direita)) + 1;
        x.altura = this.max(this.obterAltura(x.esquerda), this.obterAltura(x.direita)) + 1;

        return x; // Nova raiz
    }

    /**
     * Rotação à esquerda
     */
    private rotacaoEsquerda(x: NoAVL<T>): NoAVL<T> {
        const y = x.direita!;
        const T2 = y.esquerda;

        // Executa rotação
        y.esquerda = x;
        x.direita = T2;

        // Atualiza alturas
        x.altura = this.max(this.obterAltura(x.esquerda), this.obterAltura(x.direita)) + 1;
        y.altura = this.max(this.obterAltura(y.esquerda), this.obterAltura(y.direita)) + 1;

        return y; // Nova raiz
    }

    private obterAltura(no: NoAVL<T> | null): number {
        return no === null ? 0 : no.altura;
    }

    private obterBalance(no: NoAVL<T> | null): number {
        return no === null ? 0 : this.obterAltura(no.esquerda) - this.obterAltura(no.direita);
    }

    private max(a: number, b: number): number {
        return a > b ? a : b;
    }

    private encontrarMinimo(no: NoAVL<T>): NoAVL<T> {
        while (no.esquerda !== null) {
            no = no.esquerda;
        }
        return no;
    }

    private comparar(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    /**
     * Busca um valor
     */
    public buscar(valor: T): boolean {
        return this.buscarRecursivo(this.raiz, valor);
    }

    private buscarRecursivo(no: NoAVL<T> | null, valor: T): boolean {
        if (no === null) {
            return false;
        }

        if (this.comparar(valor, no.valor) === 0) {
            return true;
        }

        if (this.comparar(valor, no.valor) < 0) {
            return this.buscarRecursivo(no.esquerda, valor);
        } else {
            return this.buscarRecursivo(no.direita, valor);
        }
    }

    /**
     * Travessia em ordem
     */
    public emOrdem(): T[] {
        const resultado: T[] = [];
        this.emOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    private emOrdemRecursivo(no: NoAVL<T> | null, resultado: T[]): void {
        if (no !== null) {
            this.emOrdemRecursivo(no.esquerda, resultado);
            resultado[resultado.length] = no.valor;
            this.emOrdemRecursivo(no.direita, resultado);
        }
    }

    public tamanho(): number {
        return this.tamanhoAtual;
    }

    public altura(): number {
        return this.obterAltura(this.raiz);
    }

    /**
     * Verifica se a árvore está balanceada
     */
    public estaBalanceada(): boolean {
        return this.verificarBalance(this.raiz);
    }

    private verificarBalance(no: NoAVL<T> | null): boolean {
        if (no === null) {
            return true;
        }

        const balance = this.obterBalance(no);
        if (balance < -1 || balance > 1) {
            return false;
        }

        return this.verificarBalance(no.esquerda) && this.verificarBalance(no.direita);
    }

    /**
     * Visualização da árvore com indicação de alturas
     */
    public visualizar(): string {
        if (this.raiz === null) {
            return "Árvore AVL vazia";
        }
        return this.visualizarRecursivo(this.raiz, "", true);
    }

    private visualizarRecursivo(no: NoAVL<T> | null, prefixo: string, ehUltimo: boolean): string {
        if (no === null) {
            return "";
        }

        let resultado = prefixo + (ehUltimo ? "└── " : "├── ") + 
                       no.valor + ` (h:${no.altura}, b:${this.obterBalance(no)})` + "\n";

        const filhos: (NoAVL<T> | null)[] = [];
        if (no.esquerda !== null || no.direita !== null) {
            if (no.esquerda !== null) filhos[filhos.length] = no.esquerda;
            if (no.direita !== null) filhos[filhos.length] = no.direita;
        }

        for (let i = 0; i < filhos.length; i++) {
            const ehUltimoFilho = i === filhos.length - 1;
            const novoPrefixo = prefixo + (ehUltimo ? "    " : "│   ");
            resultado += this.visualizarRecursivo(filhos[i], novoPrefixo, ehUltimoFilho);
        }

        return resultado;
    }
}

/**
 * ÁRVORE B - Estrutura para sistemas de arquivos e bancos de dados
 */
class NoB<T> {
    public chaves: T[];
    public filhos: NoB<T>[];
    public ehFolha: boolean;
    public numChaves: number;

    constructor(grau: number, ehFolha: boolean = false) {
        this.chaves = [];
        this.filhos = [];
        this.ehFolha = ehFolha;
        this.numChaves = 0;
        
        // Inicializa arrays com capacidade máxima
        for (let i = 0; i < 2 * grau - 1; i++) {
            this.chaves[i] = null as any;
        }
        for (let i = 0; i < 2 * grau; i++) {
            this.filhos[i] = null as any;
        }
    }
}

class ArvoreB<T> {
    private raiz: NoB<T> | null;
    private grau: number; // Grau mínimo
    private tamanhoAtual: number;

    constructor(grau: number = 3) {
        this.raiz = null;
        this.grau = grau;
        this.tamanhoAtual = 0;
    }

    /**
     * Busca uma chave na árvore B
     */
    public buscar(chave: T): boolean {
        return this.buscarRecursivo(this.raiz, chave);
    }

    private buscarRecursivo(no: NoB<T> | null, chave: T): boolean {
        if (no === null) {
            return false;
        }

        let i = 0;
        while (i < no.numChaves && this.comparar(chave, no.chaves[i]) > 0) {
            i++;
        }

        if (i < no.numChaves && this.comparar(chave, no.chaves[i]) === 0) {
            return true; // Chave encontrada
        }

        if (no.ehFolha) {
            return false; // Chave não encontrada
        }

        return this.buscarRecursivo(no.filhos[i], chave);
    }

    /**
     * Insere uma chave na árvore B
     */
    public inserir(chave: T): void {
        if (this.raiz === null) {
            this.raiz = new NoB<T>(this.grau, true);
            this.raiz.chaves[0] = chave;
            this.raiz.numChaves = 1;
            this.tamanhoAtual++;
            return;
        }

        // Se raiz está cheia, árvore cresce em altura
        if (this.raiz.numChaves === 2 * this.grau - 1) {
            const novaRaiz = new NoB<T>(this.grau);
            novaRaiz.filhos[0] = this.raiz;
            this.dividirFilho(novaRaiz, 0);
            this.raiz = novaRaiz;
        }

        this.inserirNaoCheio(this.raiz, chave);
        this.tamanhoAtual++;
    }

    private inserirNaoCheio(no: NoB<T>, chave: T): void {
        let i = no.numChaves - 1;

        if (no.ehFolha) {
            // Move chaves maiores para a direita
            while (i >= 0 && this.comparar(chave, no.chaves[i]) < 0) {
                no.chaves[i + 1] = no.chaves[i];
                i--;
            }

            no.chaves[i + 1] = chave;
            no.numChaves++;
        } else {
            // Encontra filho onde inserir
            while (i >= 0 && this.comparar(chave, no.chaves[i]) < 0) {
                i--;
            }
            i++;

            // Se filho está cheio, divide
            if (no.filhos[i].numChaves === 2 * this.grau - 1) {
                this.dividirFilho(no, i);

                if (this.comparar(chave, no.chaves[i]) > 0) {
                    i++;
                }
            }

            this.inserirNaoCheio(no.filhos[i], chave);
        }
    }

    private dividirFilho(pai: NoB<T>, indice: number): void {
        const grau = this.grau;
        const filhoCompleto = pai.filhos[indice];
        const novoFilho = new NoB<T>(grau, filhoCompleto.ehFolha);

        novoFilho.numChaves = grau - 1;

        // Copia últimas (grau-1) chaves para novo nó
        for (let j = 0; j < grau - 1; j++) {
            novoFilho.chaves[j] = filhoCompleto.chaves[j + grau];
        }

        // Copia últimos grau filhos se não é folha
        if (!filhoCompleto.ehFolha) {
            for (let j = 0; j < grau; j++) {
                novoFilho.filhos[j] = filhoCompleto.filhos[j + grau];
            }
        }

        filhoCompleto.numChaves = grau - 1;

        // Move filhos do pai para abrir espaço
        for (let j = pai.numChaves; j >= indice + 1; j--) {
            pai.filhos[j + 1] = pai.filhos[j];
        }

        pai.filhos[indice + 1] = novoFilho;

        // Move chaves do pai
        for (let j = pai.numChaves - 1; j >= indice; j--) {
            pai.chaves[j + 1] = pai.chaves[j];
        }

        pai.chaves[indice] = filhoCompleto.chaves[grau - 1];
        pai.numChaves++;
    }

    private comparar(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    /**
     * Travessia da árvore B
     */
    public travessia(): T[] {
        const resultado: T[] = [];
        this.travessiaRecursiva(this.raiz, resultado);
        return resultado;
    }

    private travessiaRecursiva(no: NoB<T> | null, resultado: T[]): void {
        if (no === null) {
            return;
        }

        let i = 0;
        for (i = 0; i < no.numChaves; i++) {
            if (!no.ehFolha) {
                this.travessiaRecursiva(no.filhos[i], resultado);
            }
            resultado[resultado.length] = no.chaves[i];
        }

        if (!no.ehFolha) {
            this.travessiaRecursiva(no.filhos[i], resultado);
        }
    }

    public tamanho(): number {
        return this.tamanhoAtual;
    }

    /**
     * Visualização da árvore B
     */
    public visualizar(): string {
        if (this.raiz === null) {
            return "Árvore B vazia";
        }
        return this.visualizarRecursivo(this.raiz, "", true, 0);
    }

    private visualizarRecursivo(no: NoB<T> | null, prefixo: string, ehUltimo: boolean, nivel: number): string {
        if (no === null) {
            return "";
        }

        let resultado = prefixo + (ehUltimo ? "└── " : "├── ");
        
        // Mostra todas as chaves do nó
        resultado += "[";
        for (let i = 0; i < no.numChaves; i++) {
            resultado += no.chaves[i];
            if (i < no.numChaves - 1) {
                resultado += ", ";
            }
        }
        resultado += `] (${no.numChaves} chaves)`;
        resultado += no.ehFolha ? " FOLHA" : "";
        resultado += "\n";

        if (!no.ehFolha) {
            for (let i = 0; i <= no.numChaves; i++) {
                if (no.filhos[i] !== null) {
                    const ehUltimoFilho = i === no.numChaves;
                    const novoPrefixo = prefixo + (ehUltimo ? "    " : "│   ");
                    resultado += this.visualizarRecursivo(no.filhos[i], novoPrefixo, ehUltimoFilho, nivel + 1);
                }
            }
        }

        return resultado;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO AVANÇADO 3 - ÁRVORES AVANÇADAS (AVL E B-TREE) ===");

// Teste 1: Árvore AVL
console.log("--- ÁRVORE AVL ---");
const avl = new ArvoreAVL<number>();

console.log("Inserindo sequência: 10, 20, 30, 40, 50, 25");
const sequencia = [10, 20, 30, 40, 50, 25];
for (let i = 0; i < sequencia.length; i++) {
    avl.inserir(sequencia[i]);
    console.log(`Após inserir ${sequencia[i]}:`);
    console.log(`Altura: ${avl.altura()}, Balanceada: ${avl.estaBalanceada()}`);
}

console.log("\nÁrvore AVL final:");
console.log(avl.visualizar());

console.log("Travessia em ordem:", avl.emOrdem());

// Teste 2: Busca na AVL
console.log("\n--- BUSCA NA AVL ---");
const valoresBusca = [25, 35, 50];
for (let i = 0; i < valoresBusca.length; i++) {
    const valor = valoresBusca[i];
    const encontrado = avl.buscar(valor);
    console.log(`Buscar ${valor}: ${encontrado ? "✓ Encontrado" : "✗ Não encontrado"}`);
}

// Teste 3: Remoção na AVL
console.log("\n--- REMOÇÃO NA AVL ---");
console.log("Removendo 30:");
const removido = avl.remover(30);
console.log(`Removido: ${removido}`);
console.log("Nova travessia:", avl.emOrdem());
console.log(`Altura: ${avl.altura()}, Balanceada: ${avl.estaBalanceada()}`);

// Teste 4: Árvore B
console.log("\n--- ÁRVORE B (grau 3) ---");
const arvoreB = new ArvoreB<number>(3);

console.log("Inserindo sequência: 10, 20, 5, 6, 12, 30, 7, 17");
const sequenciaB = [10, 20, 5, 6, 12, 30, 7, 17];
for (let i = 0; i < sequenciaB.length; i++) {
    arvoreB.inserir(sequenciaB[i]);
    console.log(`Após inserir ${sequenciaB[i]}:`);
    console.log(`Tamanho: ${arvoreB.tamanho()}`);
}

console.log("\nÁrvore B final:");
console.log(arvoreB.visualizar());

console.log("Travessia:", arvoreB.travessia());

// Teste 5: Busca na Árvore B
console.log("\n--- BUSCA NA ÁRVORE B ---");
const valoresBuscaB = [6, 15, 17];
for (let i = 0; i < valoresBuscaB.length; i++) {
    const valor = valoresBuscaB[i];
    const encontrado = arvoreB.buscar(valor);
    console.log(`Buscar ${valor}: ${encontrado ? "✓ Encontrado" : "✗ Não encontrado"}`);
}

// Teste 6: Árvore B com grau maior
console.log("\n--- ÁRVORE B (grau 5) ---");
const arvoreBGrande = new ArvoreB<number>(5);

console.log("Inserindo números de 1 a 20:");
for (let i = 1; i <= 20; i++) {
    arvoreBGrande.inserir(i);
}

console.log("Árvore B grau 5:");
console.log(arvoreBGrande.visualizar());
console.log(`Tamanho: ${arvoreBGrande.tamanho()}`);

// Teste 7: Comparação de performance (conceitual)
console.log("\n--- COMPARAÇÃO CONCEITUAL ---");
console.log("AVL:");
console.log("- Altura garantida: O(log n)");
console.log("- Busca: O(log n)");
console.log("- Inserção/Remoção: O(log n)");
console.log("- Rotações por operação: ≤ 2");
console.log("- Uso: Aplicações que fazem muitas buscas");

console.log("\nÁrvore B:");
console.log("- Altura: O(log_t n) onde t = grau");
console.log("- Busca: O(log n)");
console.log("- Inserção: O(log n)");
console.log("- Fatores de ramificação altos");
console.log("- Uso: Sistemas de arquivos, bancos de dados");

// Teste 8: Árvore AVL com strings
console.log("\n--- AVL COM STRINGS ---");
const avlStrings = new ArvoreAVL<string>();
const palavras = ["banana", "apple", "cherry", "date", "elderberry"];

for (let i = 0; i < palavras.length; i++) {
    avlStrings.inserir(palavras[i]);
}

console.log("Palavras inseridas:", palavras);
console.log("Ordem alfabética (travessia):", avlStrings.emOrdem());
console.log("Altura da árvore:", avlStrings.altura());

export { ArvoreAVL, NoAVL, ArvoreB, NoB };
