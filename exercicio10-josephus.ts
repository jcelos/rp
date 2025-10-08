/**
 * EXERCÍCIO 10 - JOSEPHUS
 * 
 * Modele e implemente uma variação do Problema de Josephus. Um grupo de pessoas
 * são dispostas em círculo e cada uma escolhe um inteiro positivo. Sorteia-se uma pessoa e toma-se o
 * número que ela escolheu para iniciar uma contagem, a partir da pessoa seguinte, em sentido horário.
 * Aquele que estiver na posição correspondente ao número escolhido é eliminado do jogo, então o
 * número que essa pessoa escolheu é usado para continuar a contagem. A cada pessoa eliminada,
 * usa-se o número por ela escolhido para determinar a próxima pessoa eliminada. Retorne a última
 * pessoa restante nesse jogo.
 */

/**
 * Classe que representa uma pessoa no problema de Josephus
 */
class Pessoa {
    public nome: string;
    public numero: number;

    constructor(nome: string, numero: number) {
        this.nome = nome;
        this.numero = numero;
    }

    /**
     * Representação em string da pessoa
     * @returns String no formato "Nome(numero)"
     */
    public toString(): string {
        return `${this.nome}(${this.numero})`;
    }

    /**
     * Cria uma cópia da pessoa
     * @returns Nova instância da pessoa com os mesmos dados
     */
    public clonar(): Pessoa {
        return new Pessoa(this.nome, this.numero);
    }
}

/**
 * Classe que implementa a variação do Problema de Josephus
 */
class JosephusProblem {
    private pessoas: Pessoa[];

    constructor(pessoas: Pessoa[]) {
        this.pessoas = [];
        // Cria cópias das pessoas para não modificar o array original
        for (let i = 0; i < pessoas.length; i++) {
            this.pessoas[i] = pessoas[i].clonar();
        }
    }

    /**
     * Resolve o problema de Josephus com a variação especificada
     * @param indiceInicial Índice da pessoa que começará o jogo (0-indexado)
     * @returns A última pessoa sobrevivente
     */
    public resolverJosephus(indiceInicial: number): Pessoa {
        if (this.pessoas.length === 0) {
            throw new Error("Não há pessoas no círculo");
        }

        if (indiceInicial < 0 || indiceInicial >= this.pessoas.length) {
            throw new Error("Índice inicial inválido");
        }

        // Cria uma cópia das pessoas para trabalhar (lista de sobreviventes)
        let sobreviventes = this.copiarArrayPessoas(this.pessoas);
        let posicaoAtual = indiceInicial;

        console.log("\n=== SIMULAÇÃO DO JOGO ===");
        console.log("Participantes iniciais:", this.listarPessoas(sobreviventes));
        console.log(`Pessoa inicial: ${sobreviventes[posicaoAtual].toString()}`);

        let rodada = 1;

        // Continua até restar apenas uma pessoa
        while (sobreviventes.length > 1) {
            const pessoaAtual = sobreviventes[posicaoAtual];
            const numeroEscolhido = pessoaAtual.numero;
            
            console.log(`\nRodada ${rodada}:`);
            console.log(`Pessoa atual: ${pessoaAtual.toString()}`);
            console.log(`Número escolhido: ${numeroEscolhido}`);

            // Remove a pessoa atual do círculo
            console.log(`${pessoaAtual.nome} foi eliminado(a)!`);
            sobreviventes = this.removerPessoa(sobreviventes, posicaoAtual);

            // Se não há mais pessoas, para o jogo
            if (sobreviventes.length === 0) break;

            // Ajusta a posição atual se necessário (se removeu a última pessoa)
            if (posicaoAtual >= sobreviventes.length) {
                posicaoAtual = 0;
            }

            // Conta a partir da próxima pessoa usando o número da pessoa eliminada
            posicaoAtual = this.contarProximaPosicao(sobreviventes, posicaoAtual, numeroEscolhido);
            
            console.log(`Próxima pessoa: ${sobreviventes[posicaoAtual].toString()}`);
            console.log(`Sobreviventes: ${this.listarPessoas(sobreviventes)}`);
            
            rodada++;
        }

        if (sobreviventes.length === 0) {
            throw new Error("Erro: nenhum sobrevivente restou");
        }

        const vencedor = sobreviventes[0];
        console.log(`\n🏆 VENCEDOR: ${vencedor.toString()}`);
        
        return vencedor;
    }

    /**
     * Conta a partir da posição atual para encontrar a próxima pessoa a ser eliminada
     * @param pessoas Array de pessoas sobreviventes
     * @param posicaoAtual Posição atual no círculo
     * @param numeroParaContar Número de posições para contar
     * @returns Nova posição no círculo
     */
    private contarProximaPosicao(pessoas: Pessoa[], posicaoAtual: number, numeroParaContar: number): number {
        // Conta numeroParaContar posições a partir da posição atual (não incluindo a atual)
        let novaPosition = posicaoAtual;
        
        for (let i = 0; i < numeroParaContar; i++) {
            novaPosition = (novaPosition + 1) % pessoas.length;
        }
        
        return novaPosition;
    }

    /**
     * Remove uma pessoa do array de sobreviventes
     * @param pessoas Array de pessoas
     * @param indice Índice da pessoa a ser removida
     * @returns Novo array sem a pessoa removida
     */
    private removerPessoa(pessoas: Pessoa[], indice: number): Pessoa[] {
        const novoArray: Pessoa[] = [];
        
        for (let i = 0; i < pessoas.length; i++) {
            if (i !== indice) {
                novoArray[novoArray.length] = pessoas[i];
            }
        }
        
        return novoArray;
    }

    /**
     * Cria uma cópia de um array de pessoas
     * @param pessoas Array original
     * @returns Cópia do array
     */
    private copiarArrayPessoas(pessoas: Pessoa[]): Pessoa[] {
        const copia: Pessoa[] = [];
        for (let i = 0; i < pessoas.length; i++) {
            copia[i] = pessoas[i].clonar();
        }
        return copia;
    }

    /**
     * Cria uma representação em string de um array de pessoas
     * @param pessoas Array de pessoas
     * @returns String representando o array
     */
    private listarPessoas(pessoas: Pessoa[]): string {
        let resultado = "[";
        for (let i = 0; i < pessoas.length; i++) {
            resultado += pessoas[i].toString();
            if (i < pessoas.length - 1) {
                resultado += ", ";
            }
        }
        resultado += "]";
        return resultado;
    }

    /**
     * Simula o problema de Josephus com diferentes pessoas iniciais
     * @returns Array com os resultados de cada simulação
     */
    public simularTodosInicios(): Pessoa[] {
        const resultados: Pessoa[] = [];
        
        console.log("\n=== SIMULAÇÃO COM TODAS AS PESSOAS INICIAIS ===");
        
        for (let i = 0; i < this.pessoas.length; i++) {
            console.log(`\n--- Iniciando com ${this.pessoas[i].nome} ---`);
            const vencedor = this.resolverJosephus(i);
            resultados[resultados.length] = vencedor.clonar();
        }
        
        return resultados;
    }

    /**
     * Retorna uma cópia das pessoas originais
     * @returns Array com cópias das pessoas
     */
    public getPessoas(): Pessoa[] {
        return this.copiarArrayPessoas(this.pessoas);
    }

    /**
     * Retorna o número de pessoas no jogo
     * @returns Quantidade de pessoas
     */
    public getTamanho(): number {
        return this.pessoas.length;
    }
}

// Exemplos de uso e testes
console.log("=== EXERCÍCIO 10 - PROBLEMA DE JOSEPHUS ===");

// Teste 1: Exemplo básico com 5 pessoas
const pessoas1 = [
    new Pessoa("Ana", 3),
    new Pessoa("Bruno", 2),
    new Pessoa("Carlos", 4),
    new Pessoa("Diana", 1),
    new Pessoa("Eduardo", 5)
];

const jogo1 = new JosephusProblem(pessoas1);
console.log("Pessoas no jogo:", jogo1.getPessoas().map(p => p.toString()).join(", "));

const vencedor1 = jogo1.resolverJosephus(0); // Começa com Ana
console.log("Vencedor:", vencedor1.toString());

// Teste 2: Exemplo menor com 3 pessoas
console.log("\n" + "=".repeat(50));
const pessoas2 = [
    new Pessoa("Alice", 2),
    new Pessoa("Bob", 1),
    new Pessoa("Carol", 3)
];

const jogo2 = new JosephusProblem(pessoas2);
const vencedor2 = jogo2.resolverJosephus(1); // Começa com Bob
console.log("Vencedor do jogo pequeno:", vencedor2.toString());

// Teste 3: Exemplo com números iguais
console.log("\n" + "=".repeat(50));
const pessoas3 = [
    new Pessoa("P1", 2),
    new Pessoa("P2", 2),
    new Pessoa("P3", 2),
    new Pessoa("P4", 2)
];

const jogo3 = new JosephusProblem(pessoas3);
const vencedor3 = jogo3.resolverJosephus(0);
console.log("Vencedor com números iguais:", vencedor3.toString());

// Teste 4: Caso especial - apenas uma pessoa
console.log("\n" + "=".repeat(50));
const pessoas4 = [new Pessoa("Solitário", 10)];

const jogo4 = new JosephusProblem(pessoas4);
const vencedor4 = jogo4.resolverJosephus(0);
console.log("Vencedor solitário:", vencedor4.toString());

// Teste 5: Comparação com diferentes pessoas iniciais
console.log("\n" + "=".repeat(50));
const pessoas5 = [
    new Pessoa("Alpha", 1),
    new Pessoa("Beta", 2),
    new Pessoa("Gamma", 3),
    new Pessoa("Delta", 4)
];

const jogo5 = new JosephusProblem(pessoas5);
console.log("Testando com diferentes pessoas iniciais:");

for (let i = 0; i < pessoas5.length; i++) {
    const jogoTeste = new JosephusProblem(pessoas5);
    const vencedor = jogoTeste.resolverJosephus(i);
    console.log(`Iniciando com ${pessoas5[i].nome}: vencedor = ${vencedor.toString()}`);
}

export { Pessoa, JosephusProblem };
