/**
 * PROBLEMA CLÁSSICO DE JOSEPHUS
 * 
 * Implementação eficiente do problema de Josephus que funciona para números grandes.
 * 
 * O problema: n pessoas são colocadas em círculo e são eliminadas em passos de k elementos.
 * Por exemplo:
 * n=7, k=3 => 7 pessoas em círculo, elimina-se cada 3ª pessoa até restar apenas uma
 * 
 * [1,2,3,4,5,6,7] - sequência inicial
 * [1,2,4,5,6,7] => 3 é eliminado
 * [1,2,4,5,7] => 6 é eliminado  
 * [1,4,5,7] => 2 é eliminado
 * [1,4,5] => 7 é eliminado
 * [1,4] => 5 é eliminado
 * [4] => 1 é eliminado, 4 é o sobrevivente!
 */

class JosephusClassico {
    
    /**
     * Resolve o problema de Josephus usando a fórmula matemática iterativa
     * Eficiente O(n) para números grandes
     * @param n Número de pessoas no círculo (deve ser >= 1)
     * @param k Passo de eliminação - elimina cada k-ésima pessoa (deve ser >= 1)
     * @returns Posição do sobrevivente (1-indexado)
     */
    public static josephus(n: number, k: number): number {
        if (n < 1 || k < 1) {
            throw new Error("n e k devem ser maiores ou iguais a 1");
        }
        
        // Caso base: se há apenas 1 pessoa, ela é a sobrevivente
        if (n === 1) {
            return 1; // Retorna 1-indexado
        }
        
        // Fórmula iterativa: J(n,k) = (J(n-1,k) + k) % n
        // Começamos com 0-indexado e convertemos no final
        let resultado = 0;
        
        for (let i = 2; i <= n; i++) {
            resultado = (resultado + k) % i;
        }
        
        return resultado + 1; // Converte para 1-indexado
    }
    
    /**
     * Versão com simulação explícita para números pequenos (demonstração educativa)
     * Complexidade O(n*k) - mais lenta mas educativa
     * @param n Número de pessoas
     * @param k Passo de eliminação
     * @param mostrarPassos Se deve mostrar os passos da eliminação
     * @returns Posição do sobrevivente (1-indexado)
     */
    public static josephusSimulacao(n: number, k: number, mostrarPassos: boolean = true): number {
        if (n < 1 || k < 1) {
            throw new Error("n e k devem ser maiores ou iguais a 1");
        }
        
        // Cria array representando as pessoas (1 a n)
        const pessoas: number[] = [];
        for (let i = 1; i <= n; i++) {
            pessoas[pessoas.length] = i;
        }
        
        let posicao = 0; // Posição atual no círculo (0-indexado)
        
        if (mostrarPassos) {
            console.log(`\n=== SIMULAÇÃO JOSEPHUS (n=${n}, k=${k}) ===`);
            console.log("Círculo inicial:", pessoas);
        }
        
        // Continua eliminando até restar apenas 1 pessoa
        while (pessoas.length > 1) {
            // Calcula a posição da próxima pessoa a ser eliminada
            // (posicao + k - 1) porque contamos k posições incluindo a atual
            posicao = (posicao + k - 1) % pessoas.length;
            
            const eliminado = pessoas[posicao];
            
            if (mostrarPassos) {
                console.log(`Eliminando pessoa ${eliminado} da posição ${posicao + 1} (de ${pessoas.length})`);
            }
            
            // Remove a pessoa eliminada manualmente (sem usar splice)
            const novasPessoas: number[] = [];
            for (let i = 0; i < pessoas.length; i++) {
                if (i !== posicao) {
                    novasPessoas[novasPessoas.length] = pessoas[i];
                }
            }
            
            // Substitui o array original
            pessoas.length = 0;
            for (let i = 0; i < novasPessoas.length; i++) {
                pessoas[i] = novasPessoas[i];
            }
            
            // Ajusta a posição se ela estava no final e agora está fora dos limites
            if (posicao >= pessoas.length) {
                posicao = 0;
            }
            
            if (mostrarPassos) {
                console.log("Círculo atual:", pessoas);
            }
        }
        
        const sobrevivente = pessoas[0];
        
        if (mostrarPassos) {
            console.log(`🏆 SOBREVIVENTE: ${sobrevivente}`);
        }
        
        return sobrevivente;
    }
    
    /**
     * Versão recursiva da solução matemática (para demonstração)
     * @param n Número de pessoas
     * @param k Passo de eliminação
     * @returns Posição do sobrevivente (0-indexado)
     */
    private static josephusRecursivo(n: number, k: number): number {
        if (n === 1) {
            return 0; // Caso base: 0-indexado
        }
        return (this.josephusRecursivo(n - 1, k) + k) % n;
    }
    
    /**
     * Retorna a versão recursiva convertida para 1-indexado
     * @param n Número de pessoas
     * @param k Passo de eliminação
     * @returns Posição do sobrevivente (1-indexado)
     */
    public static josephusRecursivoPublico(n: number, k: number): number {
        return this.josephusRecursivo(n, k) + 1;
    }
    
    /**
     * Compara as diferentes implementações para verificar consistência
     * @param n Número de pessoas
     * @param k Passo de eliminação
     */
    public static testarImplementacoes(n: number, k: number): void {
        console.log(`\n=== TESTE DE IMPLEMENTAÇÕES (n=${n}, k=${k}) ===`);
        
        const resultadoIterativo = this.josephus(n, k);
        const resultadoRecursivo = this.josephusRecursivoPublico(n, k);
        
        console.log(`Resultado iterativo: ${resultadoIterativo}`);
        console.log(`Resultado recursivo: ${resultadoRecursivo}`);
        
        if (n <= 15) { // Só simula para números pequenos para não poluir a saída
            const resultadoSimulacao = this.josephusSimulacao(n, k, false);
            console.log(`Resultado simulação: ${resultadoSimulacao}`);
            
            const todosIguais = resultadoIterativo === resultadoRecursivo && 
                               resultadoRecursivo === resultadoSimulacao;
            console.log(`✅ Todas implementações consistentes: ${todosIguais}`);
        } else {
            const todosIguais = resultadoIterativo === resultadoRecursivo;
            console.log(`✅ Implementações matemáticas consistentes: ${todosIguais}`);
        }
    }
    
    /**
     * Executa uma bateria de testes para validar a implementação
     */
    public static executarTestes(): void {
        console.log("=== BATERIA DE TESTES DO JOSEPHUS CLÁSSICO ===");
        
        // Teste 1: Exemplo do kata original
        console.log("\n--- Teste 1: Exemplo do kata (n=7, k=3) ---");
        const resultado1 = this.josephus(7, 3);
        console.log(`Josephus(7, 3) = ${resultado1} (esperado: 4)`);
        console.log(`✅ Correto: ${resultado1 === 4}`);
        
        // Demonstra com simulação
        this.josephusSimulacao(7, 3);
        
        // Teste 2: Casos básicos
        console.log("\n--- Teste 2: Casos básicos ---");
        const testes = [
            { n: 1, k: 1, esperado: 1 },
            { n: 2, k: 1, esperado: 2 },
            { n: 3, k: 2, esperado: 3 },
            { n: 5, k: 2, esperado: 3 },
            { n: 6, k: 3, esperado: 1 },
            { n: 10, k: 3, esperado: 4 }
        ];
        
        for (let i = 0; i < testes.length; i++) {
            const teste = testes[i];
            const resultado = this.josephus(teste.n, teste.k);
            const correto = resultado === teste.esperado;
            console.log(`Josephus(${teste.n}, ${teste.k}) = ${resultado} (esperado: ${teste.esperado}) ✅ ${correto}`);
        }
        
        // Teste 3: Números grandes (onde simulação seria impraticável)
        console.log("\n--- Teste 3: Números grandes ---");
        console.log(`Josephus(1000, 3) = ${this.josephus(1000, 3)}`);
        console.log(`Josephus(10000, 7) = ${this.josephus(10000, 7)}`);
        console.log(`Josephus(100000, 2) = ${this.josephus(100000, 2)}`);
        console.log(`Josephus(1000000, 13) = ${this.josephus(1000000, 13)}`);
        
        // Teste 4: Casos extremos
        console.log("\n--- Teste 4: Casos extremos ---");
        console.log(`Josephus(100, 1) = ${this.josephus(100, 1)} (k=1 sempre elimina sequencialmente)`);
        console.log(`Josephus(10, 10) = ${this.josephus(10, 10)} (k=n)`);
        console.log(`Josephus(50, 50) = ${this.josephus(50, 50)} (k=n)`);
        
        // Teste 5: Comparação de implementações
        console.log("\n--- Teste 5: Comparação de implementações ---");
        this.testarImplementacoes(8, 3);
        this.testarImplementacoes(12, 5);
        this.testarImplementacoes(1000, 7); // Muito grande para simulação
    }
    
    /**
     * Função utilitária para uso direto - versão simplificada
     * @param n Número de pessoas
     * @param k Passo de eliminação
     * @returns Posição do sobrevivente
     */
    public static survivor(n: number, k: number): number {
        return this.josephus(n, k);
    }
}

// Execução dos testes
JosephusClassico.executarTestes();

// Função global para fácil acesso (compatível com kata)
function josephusSurvivor(n: number, k: number): number {
    return JosephusClassico.survivor(n, k);
}

// Exemplos de uso da função global
console.log("\n=== EXEMPLOS DE USO DA FUNÇÃO GLOBAL ===");
console.log(`josephusSurvivor(7, 3) = ${josephusSurvivor(7, 3)}`);
console.log(`josephusSurvivor(11, 19) = ${josephusSurvivor(11, 19)}`);
console.log(`josephusSurvivor(40, 3) = ${josephusSurvivor(40, 3)}`);

export { JosephusClassico, josephusSurvivor };
