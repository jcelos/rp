// João Celos - Problema: As Figurinhas de Sheldon

/**
 * PROBLEMA: AS FIGURINHAS DE SHELDON
 * 
 * UNIVERSIDADE TECNOLÓGICA FEDERAL DO PARANÁ
 * Campus Guarapuava
 * Curso de Sistemas para Internet
 * Resolução de Problemas
 * Prof. Dr. Eleandro Maschio
 * 
 * Implementação de uma classe Album para gerenciar coleção de figurinhas,
 * identificando repetidas e faltantes sem utilizar métodos nativos.
 */

class Album {
    private figurinhas: number[];

    constructor(figurinhas: number[]) {
        // Copia manual do array de entrada para o atributo da classe
        this.figurinhas = [];
        for (let i = 0; i < figurinhas.length; i++) {
            this.figurinhas[this.figurinhas.length] = figurinhas[i];
        }
    }

    /**
     * Retorna uma matriz unidimensional com as figurinhas repetidas ordenadas.
     * Se uma figurinha aparece 3 vezes, retorna 2 repetidas.
     */
    public getRepeated(): number[] {
        const repetidas: number[] = [];
        
        // Para cada figurinha, conta quantas vezes aparece
        for (let i = 0; i < this.figurinhas.length; i++) {
            const figurinhaAtual = this.figurinhas[i];
            let contador = 0;
            
            // Conta ocorrências da figurinha atual
            for (let j = 0; j < this.figurinhas.length; j++) {
                if (this.figurinhas[j] === figurinhaAtual) {
                    contador++;
                }
            }
            
            // Se aparece mais de uma vez, adiciona as repetidas
            if (contador > 1) {
                // Verifica se já foi processada esta figurinha
                let jaProcessada = false;
                for (let k = 0; k < i; k++) {
                    if (this.figurinhas[k] === figurinhaAtual) {
                        jaProcessada = true;
                        break;
                    }
                }
                
                // Se não foi processada, adiciona as repetidas
                if (!jaProcessada) {
                    // Adiciona (contador - 1) vezes, pois são as repetidas
                    for (let rep = 0; rep < contador - 1; rep++) {
                        repetidas[repetidas.length] = figurinhaAtual;
                    }
                }
            }
        }
        
        // Ordena as repetidas manualmente (Bubble Sort)
        for (let i = 0; i < repetidas.length - 1; i++) {
            for (let j = 0; j < repetidas.length - 1 - i; j++) {
                if (repetidas[j] > repetidas[j + 1]) {
                    // Troca manual
                    const temp = repetidas[j];
                    repetidas[j] = repetidas[j + 1];
                    repetidas[j + 1] = temp;
                }
            }
        }
        
        return repetidas;
    }

    /**
     * Recebe uma lista de figurinhas para troca e retorna apenas aquelas
     * que estão faltando na coleção, sem repetir.
     */
    public getWanted(paratroca: number[]): number[] {
        const faltantes: number[] = [];
        
        // Para cada figurinha da lista de troca
        for (let i = 0; i < paratroca.length; i++) {
            const figurinhaTraca = paratroca[i];
            
            // Verifica se a figurinha está na coleção atual
            let temNaColecao = false;
            for (let j = 0; j < this.figurinhas.length; j++) {
                if (this.figurinhas[j] === figurinhaTraca) {
                    temNaColecao = true;
                    break;
                }
            }
            
            // Se não tem na coleção, verifica se já foi adicionada aos faltantes
            if (!temNaColecao) {
                let jaAdicionada = false;
                for (let k = 0; k < faltantes.length; k++) {
                    if (faltantes[k] === figurinhaTraca) {
                        jaAdicionada = true;
                        break;
                    }
                }
                
                // Se não foi adicionada ainda, adiciona aos faltantes
                if (!jaAdicionada) {
                    faltantes[faltantes.length] = figurinhaTraca;
                }
            }
        }
        
        // Ordena os faltantes manualmente (Bubble Sort)
        for (let i = 0; i < faltantes.length - 1; i++) {
            for (let j = 0; j < faltantes.length - 1 - i; j++) {
                if (faltantes[j] > faltantes[j + 1]) {
                    // Troca manual
                    const temp = faltantes[j];
                    faltantes[j] = faltantes[j + 1];
                    faltantes[j + 1] = temp;
                }
            }
        }
        
        return faltantes;
    }
}

// Testes conforme o exemplo do enunciado
console.log("=== PROBLEMA: AS FIGURINHAS DE SHELDON ===\n");

console.log("Teste do exemplo fornecido:");
let sheldon = new Album([3, 6, 9, 6, 12, 3, 6]);

console.log("sheldon.getRepeated():", sheldon.getRepeated());
console.log("sheldon.getWanted([3, 6, 4, 12, 8, 4]):", sheldon.getWanted([3, 6, 4, 12, 8, 4]));

console.log("\n" + "=".repeat(50));

// Testes adicionais para validar a implementação
console.log("\nTestes adicionais:");

// Teste 1: Coleção sem repetidas
console.log("\n1. Coleção sem repetidas:");
let album1 = new Album([1, 2, 3, 4, 5]);
console.log("getRepeated():", album1.getRepeated());
console.log("getWanted([6, 7, 8]):", album1.getWanted([6, 7, 8]));

// Teste 2: Coleção com muitas repetidas
console.log("\n2. Coleção com muitas repetidas:");
let album2 = new Album([1, 1, 1, 2, 2, 3, 3, 3, 3]);
console.log("getRepeated():", album2.getRepeated());
console.log("getWanted([1, 4, 5, 2]):", album2.getWanted([1, 4, 5, 2]));

// Teste 3: Lista de troca com repetidas (deve retornar sem repetir)
console.log("\n3. Lista de troca com repetidas:");
let album3 = new Album([10, 20, 30]);
console.log("getRepeated():", album3.getRepeated());
console.log("getWanted([5, 5, 15, 15, 25, 25]):", album3.getWanted([5, 5, 15, 15, 25, 25]));

// Teste 4: Coleção vazia
console.log("\n4. Coleção vazia:");
let album4 = new Album([]);
console.log("getRepeated():", album4.getRepeated());
console.log("getWanted([1, 2, 3]):", album4.getWanted([1, 2, 3]));

// Teste 5: Lista de troca vazia
console.log("\n5. Lista de troca vazia:");
let album5 = new Album([1, 2, 2, 3]);
console.log("getRepeated():", album5.getRepeated());
console.log("getWanted([]):", album5.getWanted([]));

// Teste 6: Números não ordenados e maiores
console.log("\n6. Números maiores e desordenados:");
let album6 = new Album([100, 50, 75, 50, 25, 100, 75, 75]);
console.log("getRepeated():", album6.getRepeated());
console.log("getWanted([25, 60, 80, 100, 90]):", album6.getWanted([25, 60, 80, 100, 90]));

export { Album };
