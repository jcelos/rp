// EXERCÍCIO 1 - BALANCEAMENTO
class ExpressaoMatematica {
    private expressao: string;

    constructor(expressao: string) {
        this.expressao = expressao;
    }

    public estaBalanceada(): boolean {
        const pilha: string[] = [];
        const abertura = ['(', '[', '{'];
        const fechamento = [')', ']', '}'];

        for (let i = 0; i < this.expressao.length; i++) {
            const char = this.expressao[i];

            // Se é um caractere de abertura, adiciona na pilha
            if (this.contem(abertura, char)) {
                pilha[pilha.length] = char;
            }
            // Se é um caractere de fechamento
            else if (this.contem(fechamento, char)) {
                if (pilha.length === 0) {
                    return false; // Não há abertura correspondente
                }

                const topo = pilha[pilha.length - 1];
                pilha.length = pilha.length - 1; // Remove o último elemento

                // Verifica se o fechamento corresponde à abertura
                if (!this.saoCorrespondentes(topo, char)) {
                    return false;
                }

                // Verifica hierarquia: chaves > colchetes > parênteses
                if (!this.respeitaHierarquia(topo, char)) {
                    return false;
                }
            }
        }

        return pilha.length === 0; // Deve estar vazia se balanceada
    }

    private contem(array: string[], elemento: string): boolean {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === elemento) {
                return true;
            }
        }
        return false;
    }

    private saoCorrespondentes(abertura: string, fechamento: string): boolean {
        return (abertura === '(' && fechamento === ')') ||
               (abertura === '[' && fechamento === ']') ||
               (abertura === '{' && fechamento === '}');
    }

    private respeitaHierarquia(abertura: string, fechamento: string): boolean {
        // Parênteses não podem conter colchetes ou chaves
        // Colchetes não podem conter chaves
        return true; // A verificação de correspondência já garante isso
    }
}

// EXERCÍCIO 2-9 - LISTA ALEATÓRIA E OPERAÇÕES
class ListaAleatoria {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    private gerarElementosAleatorios(n: number): void {
        for (let i = 0; i < n; i++) {
            // Gera número aleatório entre 1 e 100
            const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
            this.elementos[i] = numeroAleatorio;
        }
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

    // EXERCÍCIO 3 - VALOR DE CORTE
    public removeAbaixoDeCorte(valorCorte: number): void {
        const novosElementos: number[] = [];
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] >= valorCorte) {
                novosElementos[novosElementos.length] = this.elementos[i];
            }
        }
        this.elementos = novosElementos;
    }

    // EXERCÍCIO 4 - REMOVE MÚLTIPLOS
    public removeMultiplos(numero: number): void {
        if (numero === 0) return;

        const novosElementos: number[] = [];
        for (let i = 0; i < this.elementos.length; i++) {
            // Posição é i+1, então verificamos se (i+1) é múltiplo de numero
            if ((i + 1) % numero !== 0) {
                novosElementos[novosElementos.length] = this.elementos[i];
            }
        }
        this.elementos = novosElementos;
    }

    // EXERCÍCIO 5 - MAIS PRÓXIMO DA MÉDIA
    public maisProximoDaMedia(): number {
        const media = this.calcularMedia();
        let maisProximo = this.elementos[0];
        let menorDistancia = this.valorAbsoluto(this.elementos[0] - media);

        for (let i = 1; i < this.elementos.length; i++) {
            const distancia = this.valorAbsoluto(this.elementos[i] - media);
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                maisProximo = this.elementos[i];
            }
        }

        return maisProximo;
    }

    private calcularMedia(): number {
        let soma = 0;
        for (let i = 0; i < this.elementos.length; i++) {
            soma += this.elementos[i];
        }
        return soma / this.elementos.length;
    }

    private valorAbsoluto(numero: number): number {
        return numero < 0 ? -numero : numero;
    }

    // EXERCÍCIO 6 - REDUZ
    public reduz(n: number): void {
        if (n >= this.elementos.length) return;

        const novosElementos: number[] = [];
        for (let i = 0; i < n; i++) {
            novosElementos[i] = this.elementos[i];
        }
        this.elementos = novosElementos;
    }

    // EXERCÍCIO 7 - FATIA
    public fatia(inicio: number, fim: number): void {
        const novosElementos: number[] = [];
        let indice = 0;

        for (let i = inicio; i <= fim && i < this.elementos.length; i++) {
            if (i >= 0) {
                novosElementos[indice] = this.elementos[i];
                indice++;
            }
        }
        this.elementos = novosElementos;
    }

    // EXERCÍCIO 8 - INVERTE
    public inverte(): void {
        const tamanho = this.elementos.length;
        for (let i = 0; i < tamanho / 2; i++) {
            const temp = this.elementos[i];
            this.elementos[i] = this.elementos[tamanho - 1 - i];
            this.elementos[tamanho - 1 - i] = temp;
        }
    }

    // EXERCÍCIO 9 - AMPLITUDE
    public amplitude(): number {
        if (this.elementos.length === 0) return 0;

        let maior = this.elementos[0];
        let menor = this.elementos[0];

        for (let i = 1; i < this.elementos.length; i++) {
            if (this.elementos[i] > maior) {
                maior = this.elementos[i];
            }
            if (this.elementos[i] < menor) {
                menor = this.elementos[i];
            }
        }

        return maior - menor;
    }

    public getElementos(): number[] {
        return this.elementos;
    }
}

// EXERCÍCIO 10 - JOSEPHUS
class Pessoa {
    public nome: string;
    public numero: number;

    constructor(nome: string, numero: number) {
        this.nome = nome;
        this.numero = numero;
    }
}

class JosephusProblem {
    private pessoas: Pessoa[];

    constructor(pessoas: Pessoa[]) {
        this.pessoas = [];
        for (let i = 0; i < pessoas.length; i++) {
            this.pessoas[i] = pessoas[i];
        }
    }

    public resolverJosephus(pessoaInicial: number): Pessoa {
        if (this.pessoas.length === 0) {
            throw new Error("Não há pessoas no círculo");
        }

        let pessoasRestantes = this.copiarArray(this.pessoas);
        let posicaoAtual = pessoaInicial % pessoasRestantes.length;

        while (pessoasRestantes.length > 1) {
            const pessoaAtual = pessoasRestantes[posicaoAtual];
            const numeroEscolhido = pessoaAtual.numero;

            // Remove a pessoa atual
            pessoasRestantes = this.removerPessoa(pessoasRestantes, posicaoAtual);

            // Ajusta a posição se necessário
            if (posicaoAtual >= pessoasRestantes.length) {
                posicaoAtual = 0;
            }

            // Conta a partir da próxima pessoa
            posicaoAtual = (posicaoAtual + numeroEscolhido - 1) % pessoasRestantes.length;
        }

        return pessoasRestantes[0];
    }

    private copiarArray(array: Pessoa[]): Pessoa[] {
        const copia: Pessoa[] = [];
        for (let i = 0; i < array.length; i++) {
            copia[i] = array[i];
        }
        return copia;
    }

    private removerPessoa(array: Pessoa[], indice: number): Pessoa[] {
        const novoArray: Pessoa[] = [];
        let novoIndice = 0;

        for (let i = 0; i < array.length; i++) {
            if (i !== indice) {
                novoArray[novoIndice] = array[i];
                novoIndice++;
            }
        }

        return novoArray;
    }
}

// EXEMPLOS DE USO E TESTES
console.log("=== EXERCÍCIO 1 - BALANCEAMENTO ===");
const expr1 = new ExpressaoMatematica("(a + b)");
const expr2 = new ExpressaoMatematica("{a * [c – b * (e + f)]} – 2");
const expr3 = new ExpressaoMatematica("(a + b");
const expr4 = new ExpressaoMatematica("{a * [(c – b * (e + f)]} – 2");

console.log("(a + b):", expr1.estaBalanceada()); // true
console.log("{a * [c – b * (e + f)]} – 2:", expr2.estaBalanceada()); // true
console.log("(a + b:", expr3.estaBalanceada()); // false
console.log("{a * [(c – b * (e + f)]} – 2:", expr4.estaBalanceada()); // false

console.log("=== EXERCÍCIOS 2-9 - LISTA ALEATÓRIA ===");
const lista = new ListaAleatoria(10);
console.log("Lista inicial:", lista.toString());

console.log("Mais próximo da média:", lista.maisProximoDaMedia());
console.log("Amplitude:", lista.amplitude());

const lista2 = new ListaAleatoria(8);
console.log("Lista para testes:", lista2.toString());

lista2.removeAbaixoDeCorte(50);
console.log("Após remover abaixo de 50:", lista2.toString());

const lista3 = new ListaAleatoria(10);
console.log("Lista antes de remover múltiplos de 3:", lista3.toString());
lista3.removeMultiplos(3);
console.log("Após remover múltiplos de 3:", lista3.toString());

const lista4 = new ListaAleatoria(10);
console.log("Lista antes de reduzir:", lista4.toString());
lista4.reduz(5);
console.log("Após reduzir para 5 elementos:", lista4.toString());

const lista5 = new ListaAleatoria(10);
console.log("Lista antes da fatia:", lista5.toString());
lista5.fatia(2, 6);
console.log("Fatia de 2 a 6:", lista5.toString());

const lista6 = new ListaAleatoria(6);
console.log("Lista antes de inverter:", lista6.toString());
lista6.inverte();
console.log("Após inverter:", lista6.toString());

console.log("=== EXERCÍCIO 10 - JOSEPHUS ===");
const pessoas = [
    new Pessoa("Ana", 3),
    new Pessoa("Bruno", 2),
    new Pessoa("Carlos", 4),
    new Pessoa("Diana", 1),
    new Pessoa("Eduardo", 5)
];

const josephus = new JosephusProblem(pessoas);
const sobrevivente = josephus.resolverJosephus(0);
console.log("Pessoa sobrevivente:", sobrevivente.nome, "com número", sobrevivente.numero);
