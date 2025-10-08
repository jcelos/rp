/**
 * EXERCÍCIO INICIANTE 2 - BUSCA SIMPLES
 * 
 * Crie uma classe que permita buscar elementos em uma lista usando apenas loops manuais.
 * Implemente métodos para:
 * - Verificar se um elemento existe na lista
 * - Encontrar a primeira posição de um elemento
 * - Encontrar a última posição de um elemento
 * - Contar quantas vezes um elemento aparece
 * - Listar todas as posições onde um elemento aparece
 */

class BuscaSimples {
    private elementos: number[];

    constructor(elementos: number[]) {
        this.elementos = [];
        for (let i = 0; i < elementos.length; i++) {
            this.elementos[i] = elementos[i];
        }
    }

    /**
     * Construtor que cria lista com elementos duplicados para testes
     */
    public static comElementosDuplicados(tamanho: number): BuscaSimples {
        const elementos: number[] = [];
        for (let i = 0; i < tamanho; i++) {
            // Cria alguns elementos duplicados propositalmente
            const elemento = Math.floor(Math.random() * 5) + 1; // números de 1 a 5
            elementos[i] = elemento;
        }
        return new BuscaSimples(elementos);
    }

    public toString(): string {
        let resultado = "[";
        for (let i = 0; i < this.elementos.length; i++) {
            resultado += this.elementos[i];
            if (i < this.elementos.length - 1) {
                resultado += ", ";
            }
        }
        resultado += "]";
        return resultado;
    }

    /**
     * Verifica se um elemento existe na lista
     */
    public existe(elemento: number): boolean {
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] === elemento) {
                return true;
            }
        }
        return false;
    }

    /**
     * Encontra a primeira posição (índice) de um elemento
     * @returns Índice da primeira ocorrência ou -1 se não encontrado
     */
    public primeiraPosicao(elemento: number): number {
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] === elemento) {
                return i;
            }
        }
        return -1; // Não encontrado
    }

    /**
     * Encontra a última posição (índice) de um elemento
     * @returns Índice da última ocorrência ou -1 se não encontrado
     */
    public ultimaPosicao(elemento: number): number {
        let ultimaPos = -1;
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] === elemento) {
                ultimaPos = i;
            }
        }
        return ultimaPos;
    }

    /**
     * Conta quantas vezes um elemento aparece na lista
     */
    public contarOcorrencias(elemento: number): number {
        let contador = 0;
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] === elemento) {
                contador++;
            }
        }
        return contador;
    }

    /**
     * Lista todas as posições onde um elemento aparece
     */
    public todasAsPosicoes(elemento: number): number[] {
        const posicoes: number[] = [];
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] === elemento) {
                posicoes[posicoes.length] = i;
            }
        }
        return posicoes;
    }

    /**
     * Retorna o elemento mais frequente da lista
     */
    public elementoMaisFrequente(): number {
        if (this.elementos.length === 0) {
            throw new Error("Lista vazia");
        }

        let elementoMaisFreq = this.elementos[0];
        let maiorFrequencia = 0;

        // Para cada elemento único, conta sua frequência
        for (let i = 0; i < this.elementos.length; i++) {
            const elementoAtual = this.elementos[i];
            const frequencia = this.contarOcorrencias(elementoAtual);
            
            if (frequencia > maiorFrequencia) {
                maiorFrequencia = frequencia;
                elementoMaisFreq = elementoAtual;
            }
        }

        return elementoMaisFreq;
    }

    /**
     * Lista todos os elementos únicos (sem repetição)
     */
    public elementosUnicos(): number[] {
        const unicos: number[] = [];
        
        for (let i = 0; i < this.elementos.length; i++) {
            const elementoAtual = this.elementos[i];
            let jaExiste = false;
            
            // Verifica se já foi adicionado aos únicos
            for (let j = 0; j < unicos.length; j++) {
                if (unicos[j] === elementoAtual) {
                    jaExiste = true;
                    break;
                }
            }
            
            if (!jaExiste) {
                unicos[unicos.length] = elementoAtual;
            }
        }
        
        return unicos;
    }

    /**
     * Busca detalhada de um elemento
     */
    public buscarDetalhes(elemento: number): string {
        const existe = this.existe(elemento);
        if (!existe) {
            return `Elemento ${elemento} não foi encontrado na lista.`;
        }

        const primeira = this.primeiraPosicao(elemento);
        const ultima = this.ultimaPosicao(elemento);
        const ocorrencias = this.contarOcorrencias(elemento);
        const posicoes = this.todasAsPosicoes(elemento);

        return `Elemento ${elemento}: ${ocorrencias} ocorrência(s) | Primeira: ${primeira} | Última: ${ultima} | Todas: [${posicoes.join(", ")}]`;
    }

    public getElementos(): number[] {
        const copia: number[] = [];
        for (let i = 0; i < this.elementos.length; i++) {
            copia[i] = this.elementos[i];
        }
        return copia;
    }

    public getTamanho(): number {
        return this.elementos.length;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO INICIANTE 2 - BUSCA SIMPLES ===");

// Teste 1: Lista com elementos repetidos
const lista1 = new BuscaSimples([1, 3, 5, 3, 7, 3, 9, 1]);
console.log("Lista:", lista1.toString());
console.log("Busca por 3:", lista1.buscarDetalhes(3));
console.log("Busca por 1:", lista1.buscarDetalhes(1));
console.log("Busca por 5:", lista1.buscarDetalhes(5));
console.log("Busca por 10:", lista1.buscarDetalhes(10));

// Teste 2: Análise de frequência
console.log("\nAnálise de frequência:");
const unicos = lista1.elementosUnicos();
console.log("Elementos únicos:", unicos);
for (let i = 0; i < unicos.length; i++) {
    const elemento = unicos[i];
    const freq = lista1.contarOcorrencias(elemento);
    console.log(`Elemento ${elemento}: ${freq} ocorrência(s)`);
}
console.log("Mais frequente:", lista1.elementoMaisFrequente());

// Teste 3: Lista com duplicados aleatórios
const lista2 = BuscaSimples.comElementosDuplicados(12);
console.log("\nLista aleatória:", lista2.toString());
console.log("Elementos únicos:", lista2.elementosUnicos());
console.log("Mais frequente:", lista2.elementoMaisFrequente());

// Teste 4: Lista sem repetições
const lista3 = new BuscaSimples([10, 20, 30, 40, 50]);
console.log("\nLista sem repetições:", lista3.toString());
console.log("Busca por 30:", lista3.buscarDetalhes(30));
console.log("Busca por 60:", lista3.buscarDetalhes(60));

// Teste 5: Lista com um único elemento repetido
const lista4 = new BuscaSimples([7, 7, 7, 7, 7]);
console.log("\nLista com elemento único:", lista4.toString());
console.log("Busca por 7:", lista4.buscarDetalhes(7));

export { BuscaSimples };
