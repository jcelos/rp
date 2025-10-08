/**
 * EXERCÍCIO 1 - BALANCEAMENTO
 * 
 * Modele uma classe que tenha, como atributo, um texto que represente uma
 * expressão matemática (recebido no construtor). Implemente um método que retorne se essa
 * expressão está balanceada quanto às chaves, colchetes e parênteses.
 * 
 * Considere que os colchetes são internos às chaves e que os parênteses são internos aos colchetes.
 * Assim, não se pode ter chaves dentro de parênteses.
 */

class ExpressaoMatematica {
    private expressao: string;

    constructor(expressao: string) {
        this.expressao = expressao;
    }

    /**
     * Verifica se a expressão está balanceada quanto aos símbolos de abertura e fechamento
     * @returns true se a expressão estiver balanceada, false caso contrário
     */
    public estaBalanceada(): boolean {
        const pilha: string[] = [];
        const simbolosAbertura = ['(', '[', '{'];
        const simbolosFechamento = [')', ']', '}'];

        for (let i = 0; i < this.expressao.length; i++) {
            const caractere = this.expressao[i];

            // Se é um símbolo de abertura, adiciona na pilha
            if (this.contemElemento(simbolosAbertura, caractere)) {
                pilha[pilha.length] = caractere;
            }
            // Se é um símbolo de fechamento
            else if (this.contemElemento(simbolosFechamento, caractere)) {
                // Se não há símbolos de abertura correspondentes
                if (pilha.length === 0) {
                    return false;
                }

                const topo = pilha[pilha.length - 1];
                pilha.length = pilha.length - 1; // Remove o último elemento (pop)

                // Verifica se o fechamento corresponde à abertura
                if (!this.saoCorrespondentes(topo, caractere)) {
                    return false;
                }
            }
        }

        // Se a pilha estiver vazia, a expressão está balanceada
        return pilha.length === 0;
    }

    /**
     * Verifica se um array contém um determinado elemento
     * @param array Array a ser verificado
     * @param elemento Elemento procurado
     * @returns true se o elemento estiver no array
     */
    private contemElemento(array: string[], elemento: string): boolean {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === elemento) {
                return true;
            }
        }
        return false;
    }

    /**
     * Verifica se um símbolo de abertura corresponde ao símbolo de fechamento
     * @param abertura Símbolo de abertura
     * @param fechamento Símbolo de fechamento
     * @returns true se correspondem
     */
    private saoCorrespondentes(abertura: string, fechamento: string): boolean {
        return (abertura === '(' && fechamento === ')') ||
               (abertura === '[' && fechamento === ']') ||
               (abertura === '{' && fechamento === '}');
    }

    /**
     * Getter para a expressão
     * @returns A expressão matemática
     */
    public getExpressao(): string {
        return this.expressao;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 1 - BALANCEAMENTO ===");

// Testes com expressões válidas
const expr1 = new ExpressaoMatematica("(a + b)");
console.log(`"${expr1.getExpressao()}": ${expr1.estaBalanceada()}`); // true

const expr2 = new ExpressaoMatematica("{a * [c – b * (e + f)]} – 2");
console.log(`"${expr2.getExpressao()}": ${expr2.estaBalanceada()}`); // true

const expr3 = new ExpressaoMatematica("abc");
console.log(`"${expr3.getExpressao()}": ${expr3.estaBalanceada()}`); // true (sem símbolos)

// Testes com expressões inválidas
const expr4 = new ExpressaoMatematica("(a + b");
console.log(`"${expr4.getExpressao()}": ${expr4.estaBalanceada()}`); // false

const expr5 = new ExpressaoMatematica("a + b)");
console.log(`"${expr5.getExpressao()}": ${expr5.estaBalanceada()}`); // false

const expr6 = new ExpressaoMatematica("{a * [(c – b * (e + f)]} – 2");
console.log(`"${expr6.getExpressao()}": ${expr6.estaBalanceada()}`); // false

const expr7 = new ExpressaoMatematica("((()))");
console.log(`"${expr7.getExpressao()}": ${expr7.estaBalanceada()}`); // true

const expr8 = new ExpressaoMatematica("([)]");
console.log(`"${expr8.getExpressao()}": ${expr8.estaBalanceada()}`); // false (ordem incorreta)

export { ExpressaoMatematica };
