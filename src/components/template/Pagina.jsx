import React from "react"
import Cabecalho from "./Cabecalho.jsx"
import Menu from "./Menu.jsx"
import Rodape from "./Rodape.jsx"
import {Outlet} from "react-router-dom";

/**
 * Componente principal da pagina
 *
 * TODO: Implementar Template da pagina
 * [x] Estrutura basica da aplicação
 * [] A partir dai vamos trazer os detalhes e a estruturacao da pagina padrao
 * [] Pagina recebe props de children
 * [x] cabeçalho
 * [x] rodape
 * [x] Menu na esquerda
 * [x] conteudo a direita
 * **/

export default function Pagina() {
  return (
    <div className="flex flex-col min-h-screen">
      <Cabecalho className="h-20" />
      {/*corpo da pagina*/}
      <div className="flex flex-1 boxed">
        {/*hidden*/}
        <Menu className="hidden lg:block lg:w-64 xl:w-72 bg-zinc-900" />
        {/*conteudo principal*/}
        <main className="flex-1 bg-zinc-900 p-4">
          {/* aqui o React Router renderiza a rota filha com Outlet */}
          <Outlet />
        </main>
      </div>
      <Rodape className="h-20" />
    </div>
  )
}

// export default function Pagina({ children }) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Cabeçalho */}
//       <Cabecalho className="h-20" />
//
//       {/* Corpo da página */}
//       <div className="flex flex-1">
//         {/* Menu lateral */}
//         <Menu className="hidden lg:block lg:w-64 xl:w-72" />
//
//         {/* Conteúdo principal */}
//         <main className="flex-1 bg-zinc-800 text-white p-6">
//           {children}
//         </main>
//       </div>
//
//       {/* Rodapé */}
//       <Rodape className="h-14" />
//     </div>
//   )
// }

/**
 * +-----------------------------------------------------+
 * |                    Cabeçalho                        |
 * +------------------+----------------------------------+
 * |      Menu        |      Conteúdo principal          |
 * |                  |                                  |
 * | (hidden mobile)  |                                  |
 * +------------------+----------------------------------+
 * |                     Rodapé                          |
 * +-----------------------------------------------------+
 *
 * **/