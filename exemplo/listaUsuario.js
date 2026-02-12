/*******************
 🧩 Exemplo: Lista de usuários com estados (loading, vazio e erro)
 🎯 O que o componente faz

 Mostra “Carregando…” enquanto busca dados

 Mostra mensagem de erro, se falhar

 Mostra mensagem de lista vazia, se não houver usuários

 Renderiza uma lista de usuários, se houver dados

 **********************/
import { useEffect, useState } from "react";

export default function ListaUsuarios() {
  /**O quê
   Estados que controlam dados, carregamento e erro.
   Como?
   Cada estado tem uma única responsabilidade.**/
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  /**O quê
   Executa uma ação apenas quando o componente monta.
   Como
   Array de dependências vazio ([]) → executa uma vez.**/
  useEffect(() => {
    // Simulação de requisição
    setTimeout(() => {
      try {
        setUsuarios([
          { id: 1, nome: "Ana" },
          { id: 2, nome: "Carlos" },
          { id: 3, nome: "Marina" }
        ]);
      } catch {
        setError("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);
  /**Renderização condicional com return antecipado
   * O quê   *
   * Renderização condicional baseada no estado.
   * Como
   * Uso de early return (retorno antecipado).
   * **/
  if (loading) {
    return <p>Carregando usuários...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (usuarios.length === 0) {
    return <p>Nenhum usuário encontrado.</p>;
  }
 /**Renderização de lista com map
  * O quê
  * Transforma um array em elementos React.
  * Como
  * map retorna JSX
  * key única e estável (id)
  * Por quê
  * React usa key para reconciliar a lista
  * Evita bugs visuais e renders desnecessários
  * Nunca usar index como key em listas dinâmicas
  * **/
  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.nome}</li>
      ))}
    </ul>
  );
}

/**
 * 🧠 Boas práticas aplicadas aqui
 *
 * ✔ Um componente → uma responsabilidade
 * ✔ Estados simples e explícitos
 * ✔ Renderização previsível
 * ✔ Sem lógica dentro do JSX
 * ✔ Código fácil de ler, testar e evoluir
 *
 * **/

/**
 * 🚫 O que evitar de propósito
 *
 * ❌ JSX com muitos &&
 * ❌ Ternários encadeados
 * ❌ index como key
 * ❌ Estado genérico tipo status = "loading"
 *
 * **/
 /**
  * 📌 Regra de ouro para renderização condicional
  *
  * Se o cenário muda completamente a UI, use return antecipado.
  * Se é apenas um detalhe visual, use condicional dentro do JSX.
  * **/

 /**
  * | Situação                   | Técnica                      |
  * | -------------------------- | ---------------------------- |
  * | Só renderiza se for `true` | `condicao && <Componente />` |
  * | Sempre há duas opções      | `condicao ? A : B`           |
  * | Regra começa a crescer     | Função auxiliar              |
  * | Tela muda completamente    | `return` antecipado          |
  *
  * **/

 /**
  * Mostrar renderização condicional dentro do JSX
  *
  * export default function UsuarioStatus({ ativo, nome }) {
  *   return (
  *     <div>
  *       <h2>{nome}</h2>
  *
  *       {/* renderização condicional aqui **
  *     </div>
  *   );
  * }
  *
  * Operador && (mais comum)
  * {ativo && <span>🟢 Usuário ativo</span>}
  *
  * JSX completo
  *
  * export default function UsuarioStatus({ ativo, nome }) {
  *   return (
  *     <div>
  *       <h2>{nome}</h2>
  *
  *       {ativo && <span>🟢 Usuário ativo</span>}
  *     </div>
  *   );
  * }
  *
  * O quê
  * Renderiza o elemento somente se a condição for true.
  * Como  *
  *
  * Em JavaScript:
  * true && algo → retorna algo
  * false && algo → retorna false (React ignora)
  *
  *  Por quê usar
  * ✔ Simples
  * ✔ Legível
  * ✔ Ideal quando não existe else
  *
  * ⚠️ Atenção
  *
  * Nunca use com valores numéricos:  *
  * {quantidade && <p>{quantidade}</p>} // BUG se quantidade = 0
  *
  * 2️Operador ternário ? :
  *
  * {ativo ? (
  *   <span>🟢 Usuário ativo</span>
  * ) : (
  *   <span>🔴 Usuário inativo</span>
  * )}
  *
  * JSX completo
  * export default function UsuarioStatus({ ativo, nome }) {
  *   return (
  *     <div>
  *       <h2>{nome}</h2>
  *
  *       {ativo ? (
  *         <span>🟢 Usuário ativo</span>
  *       ) : (
  *         <span>🔴 Usuário inativo</span>
  *       )}
  *     </div>
  *   );
  * }
  *
  * ❌ Evite
  *
  * Ternários aninhados:
  * // ruim
  * {ativo ? status === "admin" ? <A /> : <B /> : <C />}
  * Se chegar nisso → extraia lógica.
  *
  * 3  Função auxiliar (boa prática para regras maiores)
  * function renderStatus(ativo) {
  *   if (ativo) {
  *     return <span>🟢 Usuário ativo</span>;
  *   }
  *   return <span>🔴 Usuário inativo</span>;
  * }
  *
  * JSX completo
  * export default function UsuarioStatus({ ativo, nome }) {
  *   function renderStatus() {
  *     return ativo
  *       ? <span>🟢 Usuário ativo</span>
  *       : <span>🔴 Usuário inativo</span>;
  *   }
  *
  *   return (
  *     <div>
  *       <h2>{nome}</h2>
  *       {renderStatus()}
  *     </div>
  *   );
  * }
  *
  * | Situação                   | Técnica                      |
  * | -------------------------- | ---------------------------- |
  * | Só renderiza se for `true` | `condicao && <Componente />` |
  * | Sempre há duas opções      | `condicao ? A : B`           |
  * | Regra começa a crescer     | Função auxiliar              |
  * | Tela muda completamente    | `return` antecipado          |
  *
  * 📌 Frase-chave para React maduro
  *
  * JSX deve parecer HTML.
  * Se parece lógica, está no lugar errado.
  *
  * **/