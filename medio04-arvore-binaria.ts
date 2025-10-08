/**
 * EXERCÍCIO MÉDIO 4 - ÁRVORE BINÁRIA SIMPLES
 * 
 * Implemente uma árvore binária básica com operações fundamentais.
 * Foque na estrutura hierárquica e algoritmos de travessia recursivos.
 * Sem usar métodos nativos, apenas lógica manual.
 */

class NoArvore<T> {
    public valor: T;
    public esquerda: NoArvore<T> | null;
    public direita: NoArvore<T> | null;

    constructor(valor: T) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

class ArvoreBinaria<T> {
    private raiz: NoArvore<T> | null;
    private tamanhoAtual: number;

    constructor() {
        this.raiz = null;
        this.tamanhoAtual = 0;
    }

    /**
     * Insere um valor na árvore (como árvore binária de busca)
     */
    public inserir(valor: T): void {
        this.raiz = this.inserirRecursivo(this.raiz, valor);
        this.tamanhoAtual++;
    }

    private inserirRecursivo(no: NoArvore<T> | null, valor: T): NoArvore<T> {
        if (no === null) {
            return new NoArvore<T>(valor);
        }

        // Para números, insere baseado em comparação
        if (typeof valor === 'number' && typeof no.valor === 'number') {
            if (valor <= no.valor) {
                no.esquerda = this.inserirRecursivo(no.esquerda, valor);
            } else {
                no.direita = this.inserirRecursivo(no.direita, valor);
            }
        } else {
            // Para outros tipos, insere alternando esquerda/direita
            if (this.calcularAltura(no.esquerda) <= this.calcularAltura(no.direita)) {
                no.esquerda = this.inserirRecursivo(no.esquerda, valor);
            } else {
                no.direita = this.inserirRecursivo(no.direita, valor);
            }
        }

        return no;
    }

    /**
     * Busca um valor na árvore
     */
    public buscar(valor: T): boolean {
        return this.buscarRecursivo(this.raiz, valor);
    }

    private buscarRecursivo(no: NoArvore<T> | null, valor: T): boolean {
        if (no === null) {
            return false;
        }

        if (no.valor === valor) {
            return true;
        }

        // Para números, usa busca otimizada em BST
        if (typeof valor === 'number' && typeof no.valor === 'number') {
            if (valor < no.valor) {
                return this.buscarRecursivo(no.esquerda, valor);
            } else {
                return this.buscarRecursivo(no.direita, valor);
            }
        } else {
            // Para outros tipos, busca em ambos os lados
            return this.buscarRecursivo(no.esquerda, valor) || 
                   this.buscarRecursivo(no.direita, valor);
        }
    }

    /**
     * Travessia em ordem (in-order): esquerda → raiz → direita
     */
    public travessiaEmOrdem(): T[] {
        const resultado: T[] = [];
        this.emOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    private emOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            this.emOrdemRecursivo(no.esquerda, resultado);
            resultado[resultado.length] = no.valor;
            this.emOrdemRecursivo(no.direita, resultado);
        }
    }

    /**
     * Travessia pré-ordem (pre-order): raiz → esquerda → direita
     */
    public travessiaPreOrdem(): T[] {
        const resultado: T[] = [];
        this.preOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    private preOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            resultado[resultado.length] = no.valor;
            this.preOrdemRecursivo(no.esquerda, resultado);
            this.preOrdemRecursivo(no.direita, resultado);
        }
    }

    /**
     * Travessia pós-ordem (post-order): esquerda → direita → raiz
     */
    public travessiaPosOrdem(): T[] {
        const resultado: T[] = [];
        this.posOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    private posOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            this.posOrdemRecursivo(no.esquerda, resultado);
            this.posOrdemRecursivo(no.direita, resultado);
            resultado[resultado.length] = no.valor;
        }
    }

    /**
     * Travessia por nível (level-order) usando fila manual
     */
    public travessiaPorNivel(): T[] {
        if (this.raiz === null) {
            return [];
        }

        const resultado: T[] = [];
        const fila: NoArvore<T>[] = [];
        let inicioFila = 0;
        let fimFila = 0;

        // Adiciona raiz na fila
        fila[fimFila] = this.raiz;
        fimFila++;

        while (inicioFila < fimFila) {
            const noAtual = fila[inicioFila];
            inicioFila++;

            resultado[resultado.length] = noAtual.valor;

            // Adiciona filhos na fila
            if (noAtual.esquerda !== null) {
                fila[fimFila] = noAtual.esquerda;
                fimFila++;
            }
            if (noAtual.direita !== null) {
                fila[fimFila] = noAtual.direita;
                fimFila++;
            }
        }

        return resultado;
    }

    /**
     * Calcula a altura da árvore
     */
    public altura(): number {
        return this.calcularAltura(this.raiz);
    }

    private calcularAltura(no: NoArvore<T> | null): number {
        if (no === null) {
            return -1; // Árvore vazia tem altura -1
        }

        const alturaEsquerda = this.calcularAltura(no.esquerda);
        const alturaDireita = this.calcularAltura(no.direita);

        return 1 + (alturaEsquerda > alturaDireita ? alturaEsquerda : alturaDireita);
    }

    /**
     * Conta o número total de nós
     */
    public tamanho(): number {
        return this.tamanhoAtual;
    }

    /**
     * Verifica se a árvore está vazia
     */
    public estaVazia(): boolean {
        return this.raiz === null;
    }

    /**
     * Conta nós folha (nós sem filhos)
     */
    public contarFolhas(): number {
        return this.contarFolhasRecursivo(this.raiz);
    }

    private contarFolhasRecursivo(no: NoArvore<T> | null): number {
        if (no === null) {
            return 0;
        }

        if (no.esquerda === null && no.direita === null) {
            return 1; // É uma folha
        }

        return this.contarFolhasRecursivo(no.esquerda) + 
               this.contarFolhasRecursivo(no.direita);
    }

    /**
     * Encontra o valor mínimo (mais à esquerda)
     */
    public encontrarMinimo(): T | null {
        if (this.raiz === null) {
            return null;
        }

        let atual = this.raiz;
        while (atual.esquerda !== null) {
            atual = atual.esquerda;
        }
        return atual.valor;
    }

    /**
     * Encontra o valor máximo (mais à direita)
     */
    public encontrarMaximo(): T | null {
        if (this.raiz === null) {
            return null;
        }

        let atual = this.raiz;
        while (atual.direita !== null) {
            atual = atual.direita;
        }
        return atual.valor;
    }

    /**
     * Visualização simples da árvore
     */
    public visualizar(): string {
        if (this.raiz === null) {
            return "Árvore vazia";
        }

        return this.visualizarRecursivo(this.raiz, "", true);
    }

    private visualizarRecursivo(no: NoArvore<T> | null, prefixo: string, ehUltimo: boolean): string {
        if (no === null) {
            return "";
        }

        let resultado = prefixo + (ehUltimo ? "└── " : "├── ") + no.valor + "\n";

        const filhos: (NoArvore<T> | null)[] = [];
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

    /**
     * Verifica se a árvore é uma BST válida (para números)
     */
    public ehBSTValida(): boolean {
        if (typeof this.raiz?.valor !== 'number') {
            return false; // Só funciona com números
        }
        return this.verificarBST(this.raiz, null, null);
    }

    private verificarBST(no: NoArvore<T> | null, min: T | null, max: T | null): boolean {
        if (no === null) {
            return true;
        }

        if (typeof no.valor === 'number') {
            const valor = no.valor as number;
            const minNum = min as number | null;
            const maxNum = max as number | null;

            if ((minNum !== null && valor <= minNum) || 
                (maxNum !== null && valor >= maxNum)) {
                return false;
            }

            return this.verificarBST(no.esquerda, min, no.valor) &&
                   this.verificarBST(no.direita, no.valor, max);
        }

        return false;
    }
}

/**
 * Classe com aplicações práticas da árvore binária
 */
class AplicacoesArvore {
    
    /**
     * Cria árvore a partir de expressão matemática
     */
    public static criarArvoreExpressao(expressao: string[]): ArvoreBinaria<string> {
        const arvore = new ArvoreBinaria<string>();
        
        // Insere tokens da expressão
        for (let i = 0; i < expressao.length; i++) {
            arvore.inserir(expressao[i]);
        }
        
        return arvore;
    }
    
    /**
     * Encontra caminho da raiz até um valor
     */
    public static encontrarCaminho<T>(arvore: ArvoreBinaria<T>, valor: T): string {
        // Implementação simplificada usando travessias
        const emOrdem = arvore.travessiaEmOrdem();
        const preOrdem = arvore.travessiaPreOrdem();
        
        let posicaoEmOrdem = -1;
        let posicaoPreOrdem = -1;
        
        for (let i = 0; i < emOrdem.length; i++) {
            if (emOrdem[i] === valor) {
                posicaoEmOrdem = i;
                break;
            }
        }
        
        for (let i = 0; i < preOrdem.length; i++) {
            if (preOrdem[i] === valor) {
                posicaoPreOrdem = i;
                break;
            }
        }
        
        if (posicaoEmOrdem === -1) {
            return "Valor não encontrado";
        }
        
        return `Encontrado na posição ${posicaoEmOrdem} (em-ordem) e ${posicaoPreOrdem} (pré-ordem)`;
    }
    
    /**
     * Compara duas árvores estruturalmente
     */
    public static arvoresIguais<T>(arvore1: ArvoreBinaria<T>, arvore2: ArvoreBinaria<T>): boolean {
        const travessia1 = arvore1.travessiaPreOrdem();
        const travessia2 = arvore2.travessiaPreOrdem();
        
        if (travessia1.length !== travessia2.length) {
            return false;
        }
        
        for (let i = 0; i < travessia1.length; i++) {
            if (travessia1[i] !== travessia2[i]) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Calcula estatísticas da árvore
     */
    public static obterEstatisticas<T>(arvore: ArvoreBinaria<T>): {
        tamanho: number;
        altura: number;
        folhas: number;
        vazia: boolean;
        minimo: T | null;
        maximo: T | null;
        ehBST: boolean;
    } {
        return {
            tamanho: arvore.tamanho(),
            altura: arvore.altura(),
            folhas: arvore.contarFolhas(),
            vazia: arvore.estaVazia(),
            minimo: arvore.encontrarMinimo(),
            maximo: arvore.encontrarMaximo(),
            ehBST: arvore.ehBSTValida()
        };
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO MÉDIO 4 - ÁRVORE BINÁRIA SIMPLES ===");

// Teste 1: Criação e inserção
const arvore = new ArvoreBinaria<number>();
console.log("Árvore vazia:", arvore.estaVazia());

console.log("\nInserindo números: 50, 30, 70, 20, 40, 60, 80");
const numeros = [50, 30, 70, 20, 40, 60, 80];
for (let i = 0; i < numeros.length; i++) {
    arvore.inserir(numeros[i]);
}

console.log("Tamanho:", arvore.tamanho());
console.log("Altura:", arvore.altura());

// Teste 2: Visualização
console.log("\n--- VISUALIZAÇÃO DA ÁRVORE ---");
console.log(arvore.visualizar());

// Teste 3: Travessias
console.log("--- TRAVESSIAS ---");
console.log("Em ordem:", arvore.travessiaEmOrdem());
console.log("Pré-ordem:", arvore.travessiaPreOrdem());
console.log("Pós-ordem:", arvore.travessiaPosOrdem());
console.log("Por nível:", arvore.travessiaPorNivel());

// Teste 4: Busca
console.log("\n--- BUSCAS ---");
const valorProcurado = [40, 90, 20];
for (let i = 0; i < valorProcurado.length; i++) {
    const valor = valorProcurado[i];
    const encontrado = arvore.buscar(valor);
    console.log(`Buscar ${valor}: ${encontrado ? "✓ Encontrado" : "✗ Não encontrado"}`);
}

// Teste 5: Informações da árvore
console.log("\n--- INFORMAÇÕES ---");
console.log("Folhas:", arvore.contarFolhas());
console.log("Mínimo:", arvore.encontrarMinimo());
console.log("Máximo:", arvore.encontrarMaximo());
console.log("É BST válida:", arvore.ehBSTValida());

// Teste 6: Árvore com strings
console.log("\n--- ÁRVORE COM STRINGS ---");
const arvoreTexto = new ArvoreBinaria<string>();
const palavras = ["raiz", "esquerda", "direita", "folha1", "folha2"];
for (let i = 0; i < palavras.length; i++) {
    arvoreTexto.inserir(palavras[i]);
}

console.log("Árvore de texto:");
console.log(arvoreTexto.visualizar());
console.log("Travessia em ordem:", arvoreTexto.travessiaEmOrdem());

// Teste 7: Aplicações
console.log("\n--- APLICAÇÕES ---");

// Estatísticas
const stats = AplicacoesArvore.obterEstatisticas(arvore);
console.log("Estatísticas da árvore:");
console.log("- Tamanho:", stats.tamanho);
console.log("- Altura:", stats.altura);
console.log("- Folhas:", stats.folhas);
console.log("- Mínimo:", stats.minimo);
console.log("- Máximo:", stats.maximo);
console.log("- É BST:", stats.ehBST);

// Caminho até valor
const caminho = AplicacoesArvore.encontrarCaminho(arvore, 40);
console.log("\nCaminho até 40:", caminho);

// Comparação de árvores
const arvore2 = new ArvoreBinaria<number>();
const numeros2 = [50, 30, 70, 20, 40, 60, 80]; // Mesma sequência
for (let i = 0; i < numeros2.length; i++) {
    arvore2.inserir(numeros2[i]);
}

const arvore3 = new ArvoreBinaria<number>();
const numeros3 = [50, 30, 70, 25, 40, 60, 80]; // Sequência diferente
for (let i = 0; i < numeros3.length; i++) {
    arvore3.inserir(numeros3[i]);
}

console.log("\nÁrvores iguais (mesma sequência):", AplicacoesArvore.arvoresIguais(arvore, arvore2));
console.log("Árvores iguais (sequência diferente):", AplicacoesArvore.arvoresIguais(arvore, arvore3));

export { ArvoreBinaria, NoArvore, AplicacoesArvore };
