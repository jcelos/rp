/**
 * EXERCÍCIO INICIANTE 4 - COMPARAÇÃO DE LISTAS
 * 
 * Crie uma classe que permita comparar duas listas de números:
 * - Verificar se duas listas são idênticas
 * - Verificar se uma lista contém todos os elementos de outra
 * - Encontrar elementos comuns entre duas listas
 * - Encontrar elementos únicos de cada lista
 * - Verificar se duas listas têm o mesmo tamanho
 * - Comparar elemento por elemento
 */

class ComparadorListas {
    private lista1: number[];
    private lista2: number[];

    constructor(lista1: number[], lista2: number[]) {
        this.lista1 = [];
        this.lista2 = [];
        
        // Copia as listas manualmente
        for (let i = 0; i < lista1.length; i++) {
            this.lista1[i] = lista1[i];
        }
        
        for (let i = 0; i < lista2.length; i++) {
            this.lista2[i] = lista2[i];
        }
    }

    /**
     * Construtor que gera duas listas aleatórias com alguns elementos comuns
     */
    public static comElementosComuns(tamanho1: number, tamanho2: number): ComparadorListas {
        const lista1: number[] = [];
        const lista2: number[] = [];
        
        // Gera primeira lista
        for (let i = 0; i < tamanho1; i++) {
            lista1[i] = Math.floor(Math.random() * 10) + 1; // 1 a 10
        }
        
        // Gera segunda lista com alguns elementos da primeira
        for (let i = 0; i < tamanho2; i++) {
            if (i < tamanho1 && Math.random() < 0.3) {
                // 30% de chance de pegar da primeira lista
                lista2[i] = lista1[i];
            } else {
                lista2[i] = Math.floor(Math.random() * 10) + 1; // 1 a 10
            }
        }
        
        return new ComparadorListas(lista1, lista2);
    }

    public toString(): string {
        let resultado1 = "[";
        for (let i = 0; i < this.lista1.length; i++) {
            resultado1 += this.lista1[i];
            if (i < this.lista1.length - 1) {
                resultado1 += ", ";
            }
        }
        resultado1 += "]";

        let resultado2 = "[";
        for (let i = 0; i < this.lista2.length; i++) {
            resultado2 += this.lista2[i];
            if (i < this.lista2.length - 1) {
                resultado2 += ", ";
            }
        }
        resultado2 += "]";

        return `Lista 1: ${resultado1}\nLista 2: ${resultado2}`;
    }

    /**
     * Verifica se as duas listas são completamente idênticas
     */
    public saoIdenticas(): boolean {
        if (this.lista1.length !== this.lista2.length) {
            return false;
        }

        for (let i = 0; i < this.lista1.length; i++) {
            if (this.lista1[i] !== this.lista2[i]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Verifica se têm o mesmo tamanho
     */
    public mesmoTamanho(): boolean {
        return this.lista1.length === this.lista2.length;
    }

    /**
     * Verifica se um elemento existe numa lista
     */
    private contemElemento(lista: number[], elemento: number): boolean {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] === elemento) {
                return true;
            }
        }
        return false;
    }

    /**
     * Verifica se a lista1 contém todos os elementos da lista2
     */
    public lista1ContemTodos(): boolean {
        for (let i = 0; i < this.lista2.length; i++) {
            if (!this.contemElemento(this.lista1, this.lista2[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Verifica se a lista2 contém todos os elementos da lista1
     */
    public lista2ContemTodos(): boolean {
        for (let i = 0; i < this.lista1.length; i++) {
            if (!this.contemElemento(this.lista2, this.lista1[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Encontra elementos que aparecem em ambas as listas
     */
    public elementosComuns(): number[] {
        const comuns: number[] = [];
        
        for (let i = 0; i < this.lista1.length; i++) {
            const elemento = this.lista1[i];
            
            // Verifica se existe na lista2 e ainda não foi adicionado aos comuns
            if (this.contemElemento(this.lista2, elemento) && 
                !this.contemElemento(comuns, elemento)) {
                comuns[comuns.length] = elemento;
            }
        }
        
        return comuns;
    }

    /**
     * Encontra elementos que estão apenas na lista1
     */
    public elementosApenasLista1(): number[] {
        const apenas1: number[] = [];
        
        for (let i = 0; i < this.lista1.length; i++) {
            const elemento = this.lista1[i];
            
            // Se não existe na lista2 e ainda não foi adicionado
            if (!this.contemElemento(this.lista2, elemento) && 
                !this.contemElemento(apenas1, elemento)) {
                apenas1[apenas1.length] = elemento;
            }
        }
        
        return apenas1;
    }

    /**
     * Encontra elementos que estão apenas na lista2
     */
    public elementosApenasLista2(): number[] {
        const apenas2: number[] = [];
        
        for (let i = 0; i < this.lista2.length; i++) {
            const elemento = this.lista2[i];
            
            // Se não existe na lista1 e ainda não foi adicionado
            if (!this.contemElemento(this.lista1, elemento) && 
                !this.contemElemento(apenas2, elemento)) {
                apenas2[apenas2.length] = elemento;
            }
        }
        
        return apenas2;
    }

    /**
     * Compara elemento por elemento e retorna as diferenças
     */
    public compararPosicoes(): string[] {
        const comparacoes: string[] = [];
        const tamanhoMax = this.lista1.length > this.lista2.length ? 
                          this.lista1.length : this.lista2.length;
        
        for (let i = 0; i < tamanhoMax; i++) {
            const elem1 = i < this.lista1.length ? this.lista1[i] : "indefinido";
            const elem2 = i < this.lista2.length ? this.lista2[i] : "indefinido";
            
            let resultado = "";
            if (elem1 === elem2) {
                resultado = `Posição ${i}: ${elem1} = ${elem2} ✓`;
            } else {
                resultado = `Posição ${i}: ${elem1} ≠ ${elem2} ✗`;
            }
            
            comparacoes[comparacoes.length] = resultado;
        }
        
        return comparacoes;
    }

    /**
     * Gera um relatório completo de comparação
     */
    public relatorioCompleto(): string {
        let relatorio = "=== RELATÓRIO DE COMPARAÇÃO ===\n";
        relatorio += this.toString() + "\n\n";
        
        relatorio += `Mesmo tamanho: ${this.mesmoTamanho()} (${this.lista1.length} vs ${this.lista2.length})\n`;
        relatorio += `São idênticas: ${this.saoIdenticas()}\n`;
        relatorio += `Lista1 contém todos de Lista2: ${this.lista1ContemTodos()}\n`;
        relatorio += `Lista2 contém todos de Lista1: ${this.lista2ContemTodos()}\n`;
        
        const comuns = this.elementosComuns();
        const apenas1 = this.elementosApenasLista1();
        const apenas2 = this.elementosApenasLista2();
        
        relatorio += `Elementos comuns: [${comuns.join(", ")}]\n`;
        relatorio += `Apenas em Lista1: [${apenas1.join(", ")}]\n`;
        relatorio += `Apenas em Lista2: [${apenas2.join(", ")}]\n`;
        
        return relatorio;
    }

    public getLista1(): number[] {
        const copia: number[] = [];
        for (let i = 0; i < this.lista1.length; i++) {
            copia[i] = this.lista1[i];
        }
        return copia;
    }

    public getLista2(): number[] {
        const copia: number[] = [];
        for (let i = 0; i < this.lista2.length; i++) {
            copia[i] = this.lista2[i];
        }
        return copia;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO INICIANTE 4 - COMPARAÇÃO DE LISTAS ===");

// Teste 1: Listas idênticas
const comp1 = new ComparadorListas([1, 2, 3, 4], [1, 2, 3, 4]);
console.log("Teste 1 - Listas idênticas:");
console.log(comp1.relatorioCompleto());

// Teste 2: Listas diferentes
const comp2 = new ComparadorListas([1, 2, 3, 5], [1, 2, 4, 6]);
console.log("\nTeste 2 - Listas diferentes:");
console.log(comp2.relatorioCompleto());

// Teste 3: Tamanhos diferentes
const comp3 = new ComparadorListas([1, 2, 3], [1, 2, 3, 4, 5]);
console.log("\nTeste 3 - Tamanhos diferentes:");
console.log(comp3.relatorioCompleto());

// Teste 4: Uma contém a outra
const comp4 = new ComparadorListas([1, 2, 3, 4, 5, 6], [2, 4, 6]);
console.log("\nTeste 4 - Uma contém a outra:");
console.log(comp4.relatorioCompleto());

// Teste 5: Comparação posição por posição
const comp5 = new ComparadorListas([10, 20, 30], [10, 25, 30]);
console.log("\nTeste 5 - Comparação posição por posição:");
console.log(comp5.toString());
const comparacoes = comp5.compararPosicoes();
for (let i = 0; i < comparacoes.length; i++) {
    console.log(comparacoes[i]);
}

// Teste 6: Listas geradas aleatoriamente
const comp6 = ComparadorListas.comElementosComuns(6, 6);
console.log("\nTeste 6 - Listas aleatórias:");
console.log(comp6.relatorioCompleto());

export { ComparadorListas };
