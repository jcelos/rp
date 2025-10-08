/**
 * DESAFIO INTERMEDIÁRIO 1 - SISTEMAS DE CACHE E OTIMIZAÇÃO DE MEMÓRIA
 * 
 * Implementa sistemas sofisticados de cache (LRU, LFU), estruturas de dados
 * otimizadas para memória e algoritmos de compressão básica.
 * Foca em gerenciamento eficiente de recursos e otimização.
 */

/**
 * Implementação de Cache LRU (Least Recently Used) com complexidade O(1)
 */
class NoLRU<T> {
    public chave: string;
    public valor: T;
    public anterior: NoLRU<T> | null;
    public proximo: NoLRU<T> | null;
    
    constructor(chave: string, valor: T) {
        this.chave = chave;
        this.valor = valor;
        this.anterior = null;
        this.proximo = null;
    }
}

class CacheLRU<T> {
    private capacidade: number;
    private tamanho: number;
    private cache: Map<string, NoLRU<T>>;
    private cabeca: NoLRU<T>;
    private cauda: NoLRU<T>;
    private acessos: number;
    private hits: number;
    private misses: number;
    
    constructor(capacidade: number) {
        this.capacidade = capacidade;
        this.tamanho = 0;
        this.cache = new Map();
        this.acessos = 0;
        this.hits = 0;
        this.misses = 0;
        
        // Nós sentinela
        this.cabeca = new NoLRU<T>('', {} as T);
        this.cauda = new NoLRU<T>('', {} as T);
        this.cabeca.proximo = this.cauda;
        this.cauda.anterior = this.cabeca;
    }
    
    /**
     * Obtém valor do cache
     */
    public obter(chave: string): T | null {
        this.acessos++;
        
        const no = this.cache.get(chave);
        if (!no) {
            this.misses++;
            return null;
        }
        
        // Move para o início (mais recentemente usado)
        this.moverParaInicio(no);
        this.hits++;
        return no.valor;
    }
    
    /**
     * Insere/atualiza valor no cache
     */
    public inserir(chave: string, valor: T): void {
        const noExistente = this.cache.get(chave);
        
        if (noExistente) {
            // Atualiza valor existente
            noExistente.valor = valor;
            this.moverParaInicio(noExistente);
        } else {
            // Novo item
            const novoNo = new NoLRU(chave, valor);
            
            if (this.tamanho >= this.capacidade) {
                // Remove o menos recentemente usado
                this.removerMenosUsado();
            }
            
            this.adicionarNoInicio(novoNo);
            this.cache.set(chave, novoNo);
            this.tamanho++;
        }
    }
    
    /**
     * Remove item do cache
     */
    public remover(chave: string): boolean {
        const no = this.cache.get(chave);
        if (!no) return false;
        
        this.removerNo(no);
        this.cache.delete(chave);
        this.tamanho--;
        return true;
    }
    
    private moverParaInicio(no: NoLRU<T>): void {
        this.removerNo(no);
        this.adicionarNoInicio(no);
    }
    
    private adicionarNoInicio(no: NoLRU<T>): void {
        no.anterior = this.cabeca;
        no.proximo = this.cabeca.proximo;
        
        if (this.cabeca.proximo) {
            this.cabeca.proximo.anterior = no;
        }
        this.cabeca.proximo = no;
    }
    
    private removerNo(no: NoLRU<T>): void {
        if (no.anterior) {
            no.anterior.proximo = no.proximo;
        }
        if (no.proximo) {
            no.proximo.anterior = no.anterior;
        }
    }
    
    private removerMenosUsado(): void {
        const ultimo = this.cauda.anterior;
        if (ultimo && ultimo !== this.cabeca) {
            this.removerNo(ultimo);
            this.cache.delete(ultimo.chave);
            this.tamanho--;
        }
    }
    
    /**
     * Obtém estatísticas do cache
     */
    public obterEstatisticas(): {
        tamanho: number;
        capacidade: number;
        taxa_hit: number;
        acessos: number;
        hits: number;
        misses: number;
    } {
        const taxaHit = this.acessos > 0 ? this.hits / this.acessos : 0;
        
        return {
            tamanho: this.tamanho,
            capacidade: this.capacidade,
            taxa_hit: taxaHit,
            acessos: this.acessos,
            hits: this.hits,
            misses: this.misses
        };
    }
    
    /**
     * Lista itens em ordem de uso (mais recente primeiro)
     */
    public listarItensOrdenados(): { chave: string; valor: T }[] {
        const items: { chave: string; valor: T }[] = [];
        let atual = this.cabeca.proximo;
        
        while (atual && atual !== this.cauda) {
            items[items.length] = {
                chave: atual.chave,
                valor: atual.valor
            };
            atual = atual.proximo;
        }
        
        return items;
    }
    
    /**
     * Limpa todo o cache
     */
    public limpar(): void {
        this.cache.clear();
        this.tamanho = 0;
        this.cabeca.proximo = this.cauda;
        this.cauda.anterior = this.cabeca;
        this.acessos = 0;
        this.hits = 0;
        this.misses = 0;
    }
}

/**
 * Implementação de Cache LFU (Least Frequently Used)
 */
class NoLFU<T> {
    public chave: string;
    public valor: T;
    public frequencia: number;
    public timestamp: number;
    
    constructor(chave: string, valor: T) {
        this.chave = chave;
        this.valor = valor;
        this.frequencia = 1;
        this.timestamp = Date.now();
    }
}

class CacheLFU<T> {
    private capacidade: number;
    private tamanho: number;
    private cache: Map<string, NoLFU<T>>;
    private frequencias: Map<number, Set<string>>;
    private frequenciaMinima: number;
    private acessos: number;
    private hits: number;
    
    constructor(capacidade: number) {
        this.capacidade = capacidade;
        this.tamanho = 0;
        this.cache = new Map();
        this.frequencias = new Map();
        this.frequenciaMinima = 0;
        this.acessos = 0;
        this.hits = 0;
    }
    
    /**
     * Obtém valor do cache
     */
    public obter(chave: string): T | null {
        this.acessos++;
        
        const no = this.cache.get(chave);
        if (!no) {
            return null;
        }
        
        this.hits++;
        this.atualizarFrequencia(no);
        return no.valor;
    }
    
    /**
     * Insere/atualiza valor no cache
     */
    public inserir(chave: string, valor: T): void {
        if (this.capacidade <= 0) return;
        
        const noExistente = this.cache.get(chave);
        
        if (noExistente) {
            noExistente.valor = valor;
            this.atualizarFrequencia(noExistente);
        } else {
            if (this.tamanho >= this.capacidade) {
                this.removerMenosFrequente();
            }
            
            const novoNo = new NoLFU(chave, valor);
            this.cache.set(chave, novoNo);
            
            if (!this.frequencias.has(1)) {
                this.frequencias.set(1, new Set());
            }
            this.frequencias.get(1)!.add(chave);
            
            this.frequenciaMinima = 1;
            this.tamanho++;
        }
    }
    
    private atualizarFrequencia(no: NoLFU<T>): void {
        const chave = no.chave;
        const freqAtual = no.frequencia;
        const novaFreq = freqAtual + 1;
        
        // Remove da frequência atual
        const setAtual = this.frequencias.get(freqAtual);
        if (setAtual) {
            setAtual.delete(chave);
            
            if (setAtual.size === 0 && freqAtual === this.frequenciaMinima) {
                this.frequenciaMinima++;
            }
        }
        
        // Adiciona na nova frequência
        if (!this.frequencias.has(novaFreq)) {
            this.frequencias.set(novaFreq, new Set());
        }
        this.frequencias.get(novaFreq)!.add(chave);
        
        no.frequencia = novaFreq;
        no.timestamp = Date.now();
    }
    
    private removerMenosFrequente(): void {
        const setMinimo = this.frequencias.get(this.frequenciaMinima);
        if (!setMinimo || setMinimo.size === 0) return;
        
        // Remove o primeiro item (mais antigo na mesma frequência)
        const chaveRemover = setMinimo.values().next().value;
        setMinimo.delete(chaveRemover);
        this.cache.delete(chaveRemover);
        this.tamanho--;
    }
    
    /**
     * Obtém estatísticas do cache
     */
    public obterEstatisticas(): {
        tamanho: number;
        capacidade: number;
        taxa_hit: number;
        frequencia_minima: number;
        distribuicao_frequencias: Map<number, number>;
    } {
        const taxaHit = this.acessos > 0 ? this.hits / this.acessos : 0;
        const distribuicao = new Map<number, number>();
        
        this.frequencias.forEach((set, freq) => {
            distribuicao.set(freq, set.size);
        });
        
        return {
            tamanho: this.tamanho,
            capacidade: this.capacidade,
            taxa_hit: taxaHit,
            frequencia_minima: this.frequenciaMinima,
            distribuicao_frequencias: distribuicao
        };
    }
    
    /**
     * Lista itens ordenados por frequência
     */
    public listarPorFrequencia(): { chave: string; valor: T; frequencia: number }[] {
        const items: { chave: string; valor: T; frequencia: number }[] = [];
        
        this.cache.forEach((no, chave) => {
            items[items.length] = {
                chave: chave,
                valor: no.valor,
                frequencia: no.frequencia
            };
        });
        
        // Ordena por frequência (maior primeiro)
        for (let i = 0; i < items.length - 1; i++) {
            for (let j = 0; j < items.length - i - 1; j++) {
                if (items[j].frequencia < items[j + 1].frequencia) {
                    const temp = items[j];
                    items[j] = items[j + 1];
                    items[j + 1] = temp;
                }
            }
        }
        
        return items;
    }
}

/**
 * Pool de objetos para reutilização e otimização de memória
 */
class PoolObjetos<T> {
    private objetos: T[];
    private tamanhoMaximo: number;
    private criarFuncao: () => T;
    private resetarFuncao: (obj: T) => void;
    private objetosCriados: number;
    private objetosReutilizados: number;
    
    constructor(
        tamanhoMaximo: number, 
        criarFuncao: () => T, 
        resetarFuncao: (obj: T) => void
    ) {
        this.objetos = [];
        this.tamanhoMaximo = tamanhoMaximo;
        this.criarFuncao = criarFuncao;
        this.resetarFuncao = resetarFuncao;
        this.objetosCriados = 0;
        this.objetosReutilizados = 0;
    }
    
    /**
     * Obtém objeto do pool (reutiliza se disponível)
     */
    public obter(): T {
        if (this.objetos.length > 0) {
            this.objetosReutilizados++;
            const obj = this.objetos.pop()!;
            this.resetarFuncao(obj);
            return obj;
        }
        
        this.objetosCriados++;
        return this.criarFuncao();
    }
    
    /**
     * Retorna objeto para o pool
     */
    public retornar(obj: T): void {
        if (this.objetos.length < this.tamanhoMaximo) {
            this.objetos[this.objetos.length] = obj;
        }
    }
    
    /**
     * Pré-aloca objetos no pool
     */
    public preAlocar(quantidade: number): void {
        for (let i = 0; i < quantidade && this.objetos.length < this.tamanhoMaximo; i++) {
            const obj = this.criarFuncao();
            this.objetos[this.objetos.length] = obj;
            this.objetosCriados++;
        }
    }
    
    /**
     * Obtém estatísticas do pool
     */
    public obterEstatisticas(): {
        tamanho_atual: number;
        tamanho_maximo: number;
        objetos_criados: number;
        objetos_reutilizados: number;
        taxa_reutilizacao: number;
    } {
        const total = this.objetosCriados + this.objetosReutilizados;
        const taxaReutilizacao = total > 0 ? this.objetosReutilizados / total : 0;
        
        return {
            tamanho_atual: this.objetos.length,
            tamanho_maximo: this.tamanhoMaximo,
            objetos_criados: this.objetosCriados,
            objetos_reutilizados: this.objetosReutilizados,
            taxa_reutilizacao: taxaReutilizacao
        };
    }
    
    /**
     * Limpa o pool
     */
    public limpar(): void {
        this.objetos.length = 0;
        this.objetosCriados = 0;
        this.objetosReutilizados = 0;
    }
}

/**
 * Compressor simples usando Run-Length Encoding
 */
class CompressorRLE {
    
    /**
     * Comprime string usando Run-Length Encoding
     */
    public static comprimirString(texto: string): {
        comprimido: string;
        tamanho_original: number;
        tamanho_comprimido: number;
        taxa_compressao: number;
    } {
        if (texto.length === 0) {
            return {
                comprimido: '',
                tamanho_original: 0,
                tamanho_comprimido: 0,
                taxa_compressao: 0
            };
        }
        
        let comprimido = '';
        let caracterAtual = texto[0];
        let contador = 1;
        
        for (let i = 1; i < texto.length; i++) {
            if (texto[i] === caracterAtual) {
                contador++;
            } else {
                comprimido += this.codificarSegmento(caracterAtual, contador);
                caracterAtual = texto[i];
                contador = 1;
            }
        }
        
        // Último segmento
        comprimido += this.codificarSegmento(caracterAtual, contador);
        
        const taxaCompressao = comprimido.length / texto.length;
        
        return {
            comprimido,
            tamanho_original: texto.length,
            tamanho_comprimido: comprimido.length,
            taxa_compressao: taxaCompressao
        };
    }
    
    /**
     * Descomprime string RLE
     */
    public static descomprimirString(textoComprimido: string): string {
        let resultado = '';
        let i = 0;
        
        while (i < textoComprimido.length) {
            const { caractere, quantidade, proximoIndice } = this.decodificarSegmento(textoComprimido, i);
            
            for (let j = 0; j < quantidade; j++) {
                resultado += caractere;
            }
            
            i = proximoIndice;
        }
        
        return resultado;
    }
    
    private static codificarSegmento(caractere: string, quantidade: number): string {
        if (quantidade === 1) {
            return caractere;
        }
        return quantidade + caractere;
    }
    
    private static decodificarSegmento(texto: string, inicio: number): {
        caractere: string;
        quantidade: number;
        proximoIndice: number;
    } {
        let i = inicio;
        let numeroStr = '';
        
        // Lê número se houver
        while (i < texto.length && texto[i] >= '0' && texto[i] <= '9') {
            numeroStr += texto[i];
            i++;
        }
        
        const quantidade = numeroStr === '' ? 1 : parseInt(numeroStr);
        const caractere = i < texto.length ? texto[i] : '';
        
        return {
            caractere,
            quantidade,
            proximoIndice: i + 1
        };
    }
    
    /**
     * Comprime array de números
     */
    public static comprimirArray(numeros: number[]): {
        comprimido: { valor: number; quantidade: number }[];
        tamanho_original: number;
        tamanho_comprimido: number;
        economia_memoria: number;
    } {
        if (numeros.length === 0) {
            return {
                comprimido: [],
                tamanho_original: 0,
                tamanho_comprimido: 0,
                economia_memoria: 0
            };
        }
        
        const comprimido: { valor: number; quantidade: number }[] = [];
        let valorAtual = numeros[0];
        let contador = 1;
        
        for (let i = 1; i < numeros.length; i++) {
            if (numeros[i] === valorAtual) {
                contador++;
            } else {
                comprimido[comprimido.length] = { valor: valorAtual, quantidade: contador };
                valorAtual = numeros[i];
                contador = 1;
            }
        }
        
        // Último segmento
        comprimido[comprimido.length] = { valor: valorAtual, quantidade: contador };
        
        const economiaMémoria = (numeros.length - comprimido.length) / numeros.length;
        
        return {
            comprimido,
            tamanho_original: numeros.length,
            tamanho_comprimido: comprimido.length,
            economia_memoria: economiaMémoria
        };
    }
    
    /**
     * Descomprime array de números
     */
    public static descomprimirArray(comprimido: { valor: number; quantidade: number }[]): number[] {
        const resultado: number[] = [];
        
        for (let i = 0; i < comprimido.length; i++) {
            const segmento = comprimido[i];
            
            for (let j = 0; j < segmento.quantidade; j++) {
                resultado[resultado.length] = segmento.valor;
            }
        }
        
        return resultado;
    }
}

/**
 * Gerenciador de memória com métricas e otimizações
 */
class GerenciadorMemoria {
    private caches: Map<string, CacheLRU<any> | CacheLFU<any>>;
    private pools: Map<string, PoolObjetos<any>>;
    private metricas: {
        alocacoes: number;
        liberacoes: number;
        memoria_total_usada: number;
        pico_memoria: number;
    };
    
    constructor() {
        this.caches = new Map();
        this.pools = new Map();
        this.metricas = {
            alocacoes: 0,
            liberacoes: 0,
            memoria_total_usada: 0,
            pico_memoria: 0
        };
    }
    
    /**
     * Registra cache no gerenciador
     */
    public registrarCache<T>(nome: string, cache: CacheLRU<T> | CacheLFU<T>): void {
        this.caches.set(nome, cache);
    }
    
    /**
     * Registra pool no gerenciador
     */
    public registrarPool<T>(nome: string, pool: PoolObjetos<T>): void {
        this.pools.set(nome, pool);
    }
    
    /**
     * Simula alocação de memória
     */
    public alocar(tamanho: number): void {
        this.metricas.alocacoes++;
        this.metricas.memoria_total_usada += tamanho;
        
        if (this.metricas.memoria_total_usada > this.metricas.pico_memoria) {
            this.metricas.pico_memoria = this.metricas.memoria_total_usada;
        }
    }
    
    /**
     * Simula liberação de memória
     */
    public liberar(tamanho: number): void {
        this.metricas.liberacoes++;
        this.metricas.memoria_total_usada = Math.max(0, this.metricas.memoria_total_usada - tamanho);
    }
    
    /**
     * Obtém relatório completo de memória
     */
    public obterRelatorioMemoria(): {
        metricas_gerais: typeof this.metricas;
        caches: { [nome: string]: any };
        pools: { [nome: string]: any };
        recomendacoes: string[];
    } {
        const relatorioCaches: { [nome: string]: any } = {};
        const relatorioPools: { [nome: string]: any } = {};
        const recomendacoes: string[] = [];
        
        // Análise dos caches
        this.caches.forEach((cache, nome) => {
            const stats = cache.obterEstatisticas();
            relatorioCaches[nome] = stats;
            
            if (stats.taxa_hit < 0.7) {
                recomendacoes[recomendacoes.length] = 
                    `Cache '${nome}' tem baixa taxa de hit (${(stats.taxa_hit * 100).toFixed(1)}%). Considere aumentar capacidade.`;
            }
        });
        
        // Análise dos pools
        this.pools.forEach((pool, nome) => {
            const stats = pool.obterEstatisticas();
            relatorioPools[nome] = stats;
            
            if (stats.taxa_reutilizacao < 0.5) {
                recomendacoes[recomendacoes.length] = 
                    `Pool '${nome}' tem baixa taxa de reutilização (${(stats.taxa_reutilizacao * 100).toFixed(1)}%).`;
            }
        });
        
        // Análise geral
        if (this.metricas.alocacoes > this.metricas.liberacoes * 1.2) {
            recomendacoes[recomendacoes.length] = 
                "Possível vazamento de memória detectado. Alocações excedem liberações significativamente.";
        }
        
        return {
            metricas_gerais: this.metricas,
            caches: relatorioCaches,
            pools: relatorioPools,
            recomendacoes
        };
    }
    
    /**
     * Força limpeza de memória em todos os componentes
     */
    public forcarLimpeza(): void {
        this.caches.forEach(cache => {
            if ('limpar' in cache) {
                cache.limpar();
            }
        });
        
        this.pools.forEach(pool => {
            pool.limpar();
        });
        
        this.metricas = {
            alocacoes: 0,
            liberacoes: 0,
            memoria_total_usada: 0,
            pico_memoria: 0
        };
    }
}

// Exemplos de uso e testes
console.log("=== DESAFIO INTERMEDIÁRIO 1 - CACHE E OTIMIZAÇÃO DE MEMÓRIA ===");

// Teste 1: Cache LRU
console.log("--- CACHE LRU ---");
const cacheLRU = new CacheLRU<string>(3);

console.log("Inserindo itens no cache LRU (capacidade: 3)");
cacheLRU.inserir("a", "valor_a");
cacheLRU.inserir("b", "valor_b");
cacheLRU.inserir("c", "valor_c");

console.log("Ordem atual:", cacheLRU.listarItensOrdenados().map(item => item.chave).join(" → "));

console.log("Acessando 'a':", cacheLRU.obter("a"));
console.log("Nova ordem:", cacheLRU.listarItensOrdenados().map(item => item.chave).join(" → "));

console.log("Inserindo 'd' (deve remover o menos usado)");
cacheLRU.inserir("d", "valor_d");
console.log("Ordem final:", cacheLRU.listarItensOrdenados().map(item => item.chave).join(" → "));

const statsLRU = cacheLRU.obterEstatisticas();
console.log(`Taxa de hit: ${(statsLRU.taxa_hit * 100).toFixed(2)}%`);

// Teste 2: Cache LFU
console.log("\n--- CACHE LFU ---");
const cacheLFU = new CacheLFU<number>(3);

console.log("Testando cache LFU com padrões de acesso");
cacheLFU.inserir("x", 1);
cacheLFU.inserir("y", 2);
cacheLFU.inserir("z", 3);

// Acessa alguns itens múltiplas vezes
cacheLFU.obter("x"); // x: freq 2
cacheLFU.obter("x"); // x: freq 3
cacheLFU.obter("y"); // y: freq 2

console.log("Itens por frequência:", 
    cacheLFU.listarPorFrequencia().map(item => `${item.chave}(${item.frequencia})`).join(", "));

console.log("Inserindo 'w' (deve remover menos frequente)");
cacheLFU.inserir("w", 4);

console.log("Nova lista por frequência:", 
    cacheLFU.listarPorFrequencia().map(item => `${item.chave}(${item.frequencia})`).join(", "));

// Teste 3: Pool de Objetos
console.log("\n--- POOL DE OBJETOS ---");

class ObjetoTeste {
    public id: number = 0;
    public dados: string = '';
    
    public resetar(): void {
        this.id = 0;
        this.dados = '';
    }
}

const pool = new PoolObjetos<ObjetoTeste>(
    5,
    () => new ObjetoTeste(),
    (obj) => obj.resetar()
);

console.log("Pré-alocando 3 objetos no pool");
pool.preAlocar(3);

const obj1 = pool.obter();
obj1.id = 1;
obj1.dados = "primeiro objeto";

const obj2 = pool.obter();
obj2.id = 2;
obj2.dados = "segundo objeto";

console.log(`Objeto 1: id=${obj1.id}, dados="${obj1.dados}"`);

console.log("Retornando obj1 para o pool");
pool.retornar(obj1);

const obj3 = pool.obter(); // Deve reutilizar obj1
console.log(`Objeto 3 (reutilizado): id=${obj3.id}, dados="${obj3.dados}"`);

const statsPool = pool.obterEstatisticas();
console.log(`Taxa de reutilização: ${(statsPool.taxa_reutilizacao * 100).toFixed(2)}%`);

// Teste 4: Compressor RLE
console.log("\n--- COMPRESSOR RLE ---");

const textoTeste = "aaabbbccccddddddeeeeeeee";
const resultadoCompressao = CompressorRLE.comprimirString(textoTeste);

console.log(`Texto original: "${textoTeste}" (${resultadoCompressao.tamanho_original} chars)`);
console.log(`Texto comprimido: "${resultadoCompressao.comprimido}" (${resultadoCompressao.tamanho_comprimido} chars)`);
console.log(`Taxa de compressão: ${(resultadoCompressao.taxa_compressao * 100).toFixed(2)}%`);

const textoDescomprimido = CompressorRLE.descomprimirString(resultadoCompressao.comprimido);
console.log(`Descomprimido: "${textoDescomprimido}"`);
console.log(`Compressão preservou dados: ${textoTeste === textoDescomprimido}`);

// Teste com array
const arrayTeste = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4];
const arrayComprimido = CompressorRLE.comprimirArray(arrayTeste);

console.log("\nArray original:", arrayTeste);
console.log("Array comprimido:", 
    arrayComprimido.comprimido.map(seg => `${seg.valor}x${seg.quantidade}`).join(", "));
console.log(`Economia de memória: ${(arrayComprimido.economia_memoria * 100).toFixed(2)}%`);

// Teste 5: Gerenciador de Memória
console.log("\n--- GERENCIADOR DE MEMÓRIA ---");
const gerenciador = new GerenciadorMemoria();

gerenciador.registrarCache("cache_usuarios", cacheLRU);
gerenciador.registrarCache("cache_sessoes", cacheLFU);
gerenciador.registrarPool("pool_objetos", pool);

// Simula uso de memória
console.log("Simulando operações de memória...");
for (let i = 0; i < 10; i++) {
    gerenciador.alocar(1024); // Aloca 1KB
    
    if (i % 3 === 0) {
        gerenciador.liberar(512); // Libera 512B
    }
}

const relatorio = gerenciador.obterRelatorioMemoria();
console.log("\n=== RELATÓRIO DE MEMÓRIA ===");
console.log("Alocações:", relatorio.metricas_gerais.alocacoes);
console.log("Liberações:", relatorio.metricas_gerais.liberacoes);
console.log("Memória atual:", relatorio.metricas_gerais.memoria_total_usada, "bytes");
console.log("Pico de memória:", relatorio.metricas_gerais.pico_memoria, "bytes");

console.log("\nCache LRU - Taxa de Hit:", 
    (relatorio.caches["cache_usuarios"].taxa_hit * 100).toFixed(2) + "%");
console.log("Cache LFU - Taxa de Hit:", 
    (relatorio.caches["cache_sessoes"].taxa_hit * 100).toFixed(2) + "%");

if (relatorio.recomendacoes.length > 0) {
    console.log("\nRecomendações:");
    for (let i = 0; i < relatorio.recomendacoes.length; i++) {
        console.log(`- ${relatorio.recomendacoes[i]}`);
    }
}

// Teste 6: Performance Benchmark
console.log("\n--- BENCHMARK DE PERFORMANCE ---");

const testeBench = () => {
    const cacheTest = new CacheLRU<number>(1000);
    const inicio = Date.now();
    
    // Insere 1000 itens
    for (let i = 0; i < 1000; i++) {
        cacheTest.inserir(`item_${i}`, i);
    }
    
    // Faz 5000 acessos aleatórios
    for (let i = 0; i < 5000; i++) {
        const chave = `item_${Math.floor(Math.random() * 1000)}`;
        cacheTest.obter(chave);
    }
    
    const tempo = Date.now() - inicio;
    const stats = cacheTest.obterEstatisticas();
    
    return { tempo, stats };
};

const { tempo, stats } = testeBench();
console.log(`Benchmark completado em ${tempo}ms`);
console.log(`Taxa de hit final: ${(stats.taxa_hit * 100).toFixed(2)}%`);
console.log(`Operações por segundo: ${Math.round((stats.acessos / tempo) * 1000)}`);

export { 
    CacheLRU, 
    CacheLFU, 
    PoolObjetos, 
    CompressorRLE, 
    GerenciadorMemoria 
};
