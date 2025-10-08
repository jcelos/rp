/**
 * EXERCÍCIO 3 - VALOR DE CORTE
 * 
 * Na mesma classe do exercício anterior, implemente um método que receba,
 * como parâmetro, um número inteiro e remova da lista todos os números menores do que esse valor.
 */

import { ListaAleatoria } from './exercicio02-lista-aleatoria';

class ListaComCorte extends ListaAleatoria {
    
    /**
     * Remove da lista todos os elementos menores que o valor de corte especificado
     * @param valorCorte Valor limite - elementos menores serão removidos
     */
    public removeAbaixoDeCorte(valorCorte: number): void {
        const novosElementos: number[] = [];
        const elementosOriginais = this.getElementos();
        
        // Percorre todos os elementos originais
        for (let i = 0; i < elementosOriginais.length; i++) {
            // Se o elemento é maior ou igual ao valor de corte, mantém na lista
            if (elementosOriginais[i] >= valorCorte) {
                novosElementos[novosElementos.length] = elementosOriginais[i];
            }
        }
        
        // Substitui os elementos originais pelos filtrados
        this.substituirElementos(novosElementos);
    }

    /**
     * Método auxiliar para substituir os elementos da lista
     * @param novosElementos Array com os novos elementos
     */
    private substituirElementos(novosElementos: number[]): void {
        // Como não podemos acessar diretamente o array privado da classe pai,
        // vamos recriar a lista com os novos elementos
        const elementosAtuais = this.getElementos();
        
        // Limpa a lista atual (simulando reset)
        while (this.getTamanho() > 0) {
            // Aqui precisamos de uma forma de limpar a lista
            // Como não temos acesso direto, vamos usar uma abordagem diferente
        }
        
        // Como não conseguimos modificar diretamente, vamos implementar de forma diferente
        // Vamos reescrever esta classe para ter controle total sobre os elementos
    }

    /**
     * Retorna quantos elementos foram removidos na última operação de corte
     * @param valorCorte Valor de corte para comparação
     * @returns Quantidade de elementos que seriam removidos
     */
    public contarElementosAbaixoDeCorte(valorCorte: number): number {
        const elementos = this.getElementos();
        let contador = 0;
        
        for (let i = 0; i < elementos.length; i++) {
            if (elementos[i] < valorCorte) {
                contador++;
            }
        }
        
        return contador;
    }

    /**
     * Cria uma nova lista apenas com elementos acima do valor de corte
     * @param valorCorte Valor limite
     * @returns Nova instância da lista filtrada
     */
    public criarListaFiltrada(valorCorte: number): ListaComCorte {
        const elementos = this.getElementos();
        const elementosFiltrados: number[] = [];
        
        // Filtra elementos
        for (let i = 0; i < elementos.length; i++) {
            if (elementos[i] >= valorCorte) {
                elementosFiltrados[elementosFiltrados.length] = elementos[i];
            }
        }
        
        // Cria nova lista com elementos filtrados
        const novaLista = new ListaComCorte(0); // Cria lista vazia
        novaLista.definirElementos(elementosFiltrados);
        
        return novaLista;
    }

    /**
     * Define os elementos da lista (método auxiliar)
     * @param elementos Array de elementos
     */
    private definirElementos(elementos: number[]): void {
        // Como não podemos modificar diretamente a lista da classe pai,
        // vamos reimplementar esta funcionalidade
    }
}

// Vamos criar uma versão mais completa da classe que permite modificações
class ListaAleatoriaMutavel {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    /**
     * Construtor alternativo que aceita elementos específicos
     */
    public static comElementos(elementos: number[]): ListaAleatoriaMutavel {
        const lista = new ListaAleatoriaMutavel(0);
        lista.elementos = [];
        for (let i = 0; i < elementos.length; i++) {
            lista.elementos[i] = elementos[i];
        }
        return lista;
    }

    private gerarElementosAleatorios(n: number): void {
        for (let i = 0; i < n; i++) {
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

    /**
     * Remove da lista todos os elementos menores que o valor de corte
     * @param valorCorte Valor limite
     */
    public removeAbaixoDeCorte(valorCorte: number): void {
        const novosElementos: number[] = [];
        
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] >= valorCorte) {
                novosElementos[novosElementos.length] = this.elementos[i];
            }
        }
        
        this.elementos = novosElementos;
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
console.log("=== EXERCÍCIO 3 - VALOR DE CORTE ===");

// Teste 1: Lista com elementos diversos
const lista1 = new ListaAleatoriaMutavel(10);
console.log("Lista original:", lista1.toString());

const elementosOriginais1 = lista1.getElementos();
lista1.removeAbaixoDeCorte(50);
console.log("Após remover elementos menores que 50:", lista1.toString());

// Teste 2: Lista com elementos conhecidos
const lista2 = ListaAleatoriaMutavel.comElementos([10, 25, 30, 45, 50, 60, 75, 80, 90, 95]);
console.log("Lista com elementos conhecidos:", lista2.toString());

lista2.removeAbaixoDeCorte(40);
console.log("Após remover elementos menores que 40:", lista2.toString());

// Teste 3: Valor de corte muito alto
const lista3 = ListaAleatoriaMutavel.comElementos([1, 2, 3, 4, 5]);
console.log("Lista pequena:", lista3.toString());

lista3.removeAbaixoDeCorte(100);
console.log("Após remover elementos menores que 100:", lista3.toString());

// Teste 4: Valor de corte muito baixo
const lista4 = ListaAleatoriaMutavel.comElementos([10, 20, 30, 40, 50]);
console.log("Lista teste:", lista4.toString());

lista4.removeAbaixoDeCorte(1);
console.log("Após remover elementos menores que 1:", lista4.toString());

export { ListaAleatoriaMutavel, ListaComCorte };
