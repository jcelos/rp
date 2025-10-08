/**
 * EXERCÍCIO BÁSICO 15 - TABELA HASH SIMPLES
 * 
 * Implementa uma tabela hash básica com tratamento de colisões
 * usando encadeamento (chaining) com listas ligadas.
 */

/**
 * Entrada da tabela hash
 */
class EntradaHash<K, V> {
    public chave: K;
    public valor: V;
    public proximo: EntradaHash<K, V> | null;
    
    constructor(chave: K, valor: V) {
        this.chave = chave;
        this.valor = valor;
        this.proximo = null;
    }
}

/**
 * Tabela Hash com encadeamento
 */
class TabelaHash<K, V> {
    private buckets: (EntradaHash<K, V> | null)[];
    private capacidade: number;
    private tamanho: number;
    private fatorCarga: number;
    
    constructor(capacidadeInicial: number = 16) {
        this.capacidade = capacidadeInicial;
        this.buckets = new Array(this.capacidade).fill(null);
        this.tamanho = 0;
        this.fatorCarga = 0.75;
    }
    
    /**
     * Função hash simples para strings e números
     */
    private hash(chave: K): number {
        let hashCode = 0;
        const chaveStr = String(chave);
        
        for (let i = 0; i < chaveStr.length; i++) {
            hashCode = (hashCode * 31 + chaveStr.charCodeAt(i)) % this.capacidade;
        }
        
        return Math.abs(hashCode);
    }
    
    /**
     * Insere ou atualiza um par chave-valor
     */
    public inserir(chave: K, valor: V): void {
        const indice = this.hash(chave);
        let entrada = this.buckets[indice];
        
        // Procura se chave já existe
        while (entrada !== null) {
            if (entrada.chave === chave) {
                entrada.valor = valor; // Atualiza valor existente
                return;
            }
            entrada = entrada.proximo;
        }
        
        // Chave não existe, cria nova entrada
        const novaEntrada = new EntradaHash(chave, valor);
        novaEntrada.proximo = this.buckets[indice];
        this.buckets[indice] = novaEntrada;
        this.tamanho++;
        
        // Verifica se precisa redimensionar
        if (this.tamanho > this.capacidade * this.fatorCarga) {
            this.redimensionar();
        }
    }
    
    /**
     * Obtém valor associado a uma chave
     */
    public obter(chave: K): V | null {
        const indice = this.hash(chave);
        let entrada = this.buckets[indice];
        
        while (entrada !== null) {
            if (entrada.chave === chave) {
                return entrada.valor;
            }
            entrada = entrada.proximo;
        }
        
        return null;
    }
    
    /**
     * Remove uma chave e seu valor
     */
    public remover(chave: K): boolean {
        const indice = this.hash(chave);
        let entrada = this.buckets[indice];
        let anterior: EntradaHash<K, V> | null = null;
        
        while (entrada !== null) {
            if (entrada.chave === chave) {
                if (anterior === null) {
                    // Remove primeiro elemento da lista
                    this.buckets[indice] = entrada.proximo;
                } else {
                    // Remove elemento do meio/final
                    anterior.proximo = entrada.proximo;
                }
                
                this.tamanho--;
                return true;
            }
            
            anterior = entrada;
            entrada = entrada.proximo;
        }
        
        return false;
    }
    
    /**
     * Verifica se uma chave existe
     */
    public contem(chave: K): boolean {
        return this.obter(chave) !== null;
    }
    
    /**
     * Obtém todas as chaves
     */
    public obterChaves(): K[] {
        const chaves: K[] = [];
        
        for (let i = 0; i < this.capacidade; i++) {
            let entrada = this.buckets[i];
            
            while (entrada !== null) {
                chaves[chaves.length] = entrada.chave;
                entrada = entrada.proximo;
            }
        }
        
        return chaves;
    }
    
    /**
     * Obtém todos os valores
     */
    public obterValores(): V[] {
        const valores: V[] = [];
        
        for (let i = 0; i < this.capacidade; i++) {
            let entrada = this.buckets[i];
            
            while (entrada !== null) {
                valores[valores.length] = entrada.valor;
                entrada = entrada.proximo;
            }
        }
        
        return valores;
    }
    
    /**
     * Obtém todos os pares chave-valor
     */
    public obterEntradas(): { chave: K; valor: V }[] {
        const entradas: { chave: K; valor: V }[] = [];
        
        for (let i = 0; i < this.capacidade; i++) {
            let entrada = this.buckets[i];
            
            while (entrada !== null) {
                entradas[entradas.length] = {
                    chave: entrada.chave,
                    valor: entrada.valor
                };
                entrada = entrada.proximo;
            }
        }
        
        return entradas;
    }
    
    /**
     * Limpa toda a tabela
     */
    public limpar(): void {
        this.buckets = new Array(this.capacidade).fill(null);
        this.tamanho = 0;
    }
    
    /**
     * Retorna número de elementos
     */
    public obterTamanho(): number {
        return this.tamanho;
    }
    
    /**
     * Verifica se tabela está vazia
     */
    public estaVazia(): boolean {
        return this.tamanho === 0;
    }
    
    /**
     * Obtém estatísticas da tabela
     */
    public obterEstatisticas(): {
        tamanho: number;
        capacidade: number;
        fator_carga_atual: number;
        fator_carga_maximo: number;
        buckets_vazios: number;
        colisoes: number;
        maior_cadeia: number;
    } {
        let bucketsVazios = 0;
        let colisoes = 0;
        let maiorCadeia = 0;
        
        for (let i = 0; i < this.capacidade; i++) {
            let entrada = this.buckets[i];
            
            if (entrada === null) {
                bucketsVazios++;
            } else {
                let tamanhoCadeia = 0;
                
                while (entrada !== null) {
                    tamanhoCadeia++;
                    entrada = entrada.proximo;
                }
                
                if (tamanhoCadeia > 1) {
                    colisoes += tamanhoCadeia - 1;
                }
                
                if (tamanhoCadeia > maiorCadeia) {
                    maiorCadeia = tamanhoCadeia;
                }
            }
        }
        
        return {
            tamanho: this.tamanho,
            capacidade: this.capacidade,
            fator_carga_atual: this.tamanho / this.capacidade,
            fator_carga_maximo: this.fatorCarga,
            buckets_vazios: bucketsVazios,
            colisoes: colisoes,
            maior_cadeia: maiorCadeia
        };
    }
    
    /**
     * Redimensiona a tabela quando fator de carga é excedido
     */
    private redimensionar(): void {
        const bucketsAntigos = this.buckets;
        const capacidadeAntiga = this.capacidade;
        
        this.capacidade *= 2;
        this.buckets = new Array(this.capacidade).fill(null);
        this.tamanho = 0;
        
        // Reinsere todos os elementos
        for (let i = 0; i < capacidadeAntiga; i++) {
            let entrada = bucketsAntigos[i];
            
            while (entrada !== null) {
                this.inserir(entrada.chave, entrada.valor);
                entrada = entrada.proximo;
            }
        }
    }
    
    /**
     * Visualiza distribuição dos buckets
     */
    public visualizarDistribuicao(): string {
        let resultado = "Distribuição dos buckets:\n";
        
        for (let i = 0; i < Math.min(this.capacidade, 20); i++) { // Mostra apenas primeiros 20
            let entrada = this.buckets[i];
            let contador = 0;
            
            while (entrada !== null) {
                contador++;
                entrada = entrada.proximo;
            }
            
            resultado += `Bucket ${i}: `;
            for (let j = 0; j < contador; j++) {
                resultado += "█";
            }
            resultado += ` (${contador})\n`;
        }
        
        if (this.capacidade > 20) {
            resultado += "...\n";
        }
        
        return resultado;
    }
}

/**
 * Contador de frequência usando tabela hash
 */
class ContadorFrequencia<T> {
    private tabela: TabelaHash<T, number>;
    
    constructor() {
        this.tabela = new TabelaHash<T, number>();
    }
    
    /**
     * Incrementa contador para um item
     */
    public contar(item: T): void {
        const contadorAtual = this.tabela.obter(item) || 0;
        this.tabela.inserir(item, contadorAtual + 1);
    }
    
    /**
     * Obtém frequência de um item
     */
    public obterFrequencia(item: T): number {
        return this.tabela.obter(item) || 0;
    }
    
    /**
     * Obtém item mais frequente
     */
    public maisFrequente(): { item: T; frequencia: number } | null {
        const entradas = this.tabela.obterEntradas();
        
        if (entradas.length === 0) {
            return null;
        }
        
        let maisFrequente = entradas[0];
        
        for (let i = 1; i < entradas.length; i++) {
            if (entradas[i].valor > maisFrequente.valor) {
                maisFrequente = entradas[i];
            }
        }
        
        return {
            item: maisFrequente.chave,
            frequencia: maisFrequente.valor
        };
    }
    
    /**
     * Lista todos os itens ordenados por frequência
     */
    public listarPorFrequencia(): { item: T; frequencia: number }[] {
        const entradas = this.tabela.obterEntradas();
        const resultado: { item: T; frequencia: number }[] = [];
        
        for (let i = 0; i < entradas.length; i++) {
            resultado[i] = {
                item: entradas[i].chave,
                frequencia: entradas[i].valor
            };
        }
        
        // Ordena por frequência (bubble sort)
        for (let i = 0; i < resultado.length - 1; i++) {
            for (let j = 0; j < resultado.length - i - 1; j++) {
                if (resultado[j].frequencia < resultado[j + 1].frequencia) {
                    const temp = resultado[j];
                    resultado[j] = resultado[j + 1];
                    resultado[j + 1] = temp;
                }
            }
        }
        
        return resultado;
    }
    
    /**
     * Obtém total de itens únicos
     */
    public totalItensUnicos(): number {
        return this.tabela.obterTamanho();
    }
    
    /**
     * Obtém total de contagens
     */
    public totalContagens(): number {
        const valores = this.tabela.obterValores();
        let total = 0;
        
        for (let i = 0; i < valores.length; i++) {
            total += valores[i];
        }
        
        return total;
    }
}

// Exemplos de uso
console.log("=== EXERCÍCIO 15 - TABELA HASH ===");

const tabela = new TabelaHash<string, number>();

console.log("Tabela vazia:", tabela.estaVazia());

// Inserindo pares chave-valor
tabela.inserir("João", 25);
tabela.inserir("Maria", 30);
tabela.inserir("Pedro", 22);
tabela.inserir("Ana", 28);

console.log("Tamanho:", tabela.obterTamanho());

// Obtendo valores
console.log("Idade do João:", tabela.obter("João"));
console.log("Idade da Ana:", tabela.obter("Ana"));
console.log("Pessoa inexistente:", tabela.obter("Carlos"));

// Verificando existência
console.log("Contém 'Maria':", tabela.contem("Maria"));
console.log("Contém 'Carlos':", tabela.contem("Carlos"));

// Atualizando valor
tabela.inserir("João", 26); // Atualiza idade
console.log("Nova idade do João:", tabela.obter("João"));

// Listando chaves e valores
console.log("Todas as chaves:", tabela.obterChaves());
console.log("Todos os valores:", tabela.obterValores());

// Removendo
console.log("Remover Pedro:", tabela.remover("Pedro"));
console.log("Chaves após remoção:", tabela.obterChaves());

// Estatísticas
console.log("\n--- ESTATÍSTICAS ---");
const stats = tabela.obterEstatisticas();
console.log("Estatísticas:", stats);

// Teste com muitos elementos para demonstrar colisões
console.log("\n--- TESTE DE COLISÕES ---");
const tabelaTeste = new TabelaHash<string, number>(4); // Capacidade pequena para forçar colisões

const nomes = ["Alice", "Bob", "Carol", "David", "Eve", "Frank", "Grace", "Henry"];
for (let i = 0; i < nomes.length; i++) {
    tabelaTeste.inserir(nomes[i], i + 1);
}

const statsColisao = tabelaTeste.obterEstatisticas();
console.log("Estatísticas com colisões:", statsColisao);
console.log("Distribuição:");
console.log(tabelaTeste.visualizarDistribuicao());

// Contador de frequência
console.log("\n--- CONTADOR DE FREQUÊNCIA ---");
const contador = new ContadorFrequencia<string>();

const palavras = ["apple", "banana", "apple", "cherry", "banana", "apple", "date"];
console.log("Contando palavras:", palavras);

for (let i = 0; i < palavras.length; i++) {
    contador.contar(palavras[i]);
}

console.log("Frequência de 'apple':", contador.obterFrequencia("apple"));
console.log("Frequência de 'banana':", contador.obterFrequencia("banana"));

const maisFreq = contador.maisFrequente();
console.log("Mais frequente:", maisFreq);

console.log("Ranking por frequência:");
const ranking = contador.listarPorFrequencia();
for (let i = 0; i < ranking.length; i++) {
    console.log(`  ${i + 1}. ${ranking[i].item}: ${ranking[i].frequencia} vez(es)`);
}

console.log("Total de itens únicos:", contador.totalItensUnicos());
console.log("Total de contagens:", contador.totalContagens());

// Teste de performance
console.log("\n--- TESTE DE PERFORMANCE ---");
const tabelaPerf = new TabelaHash<number, string>();

const inicio = Date.now();

// Insere 1000 elementos
for (let i = 0; i < 1000; i++) {
    tabelaPerf.inserir(i, `valor_${i}`);
}

// Faz 1000 buscas
for (let i = 0; i < 1000; i++) {
    tabelaPerf.obter(Math.floor(Math.random() * 1000));
}

const tempo = Date.now() - inicio;
console.log(`1000 inserções + 1000 buscas: ${tempo}ms`);

const statsPerf = tabelaPerf.obterEstatisticas();
console.log("Fator de carga final:", statsPerf.fator_carga_atual.toFixed(3));
console.log("Colisões:", statsPerf.colisoes);

export { EntradaHash, TabelaHash, ContadorFrequencia };
