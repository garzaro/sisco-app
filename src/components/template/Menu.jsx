import React from 'react'
import MenuGrupo from "./MenuGrupo.jsx";
import MenuItem from "./MenuItem.jsx";

export default function Menu({className = ''}) {
  return (
    <aside className={`py-7 px-7 bg-zinc-900 border-r " ${className}>`}>
      <nav className="flex flex-col gap-4">
        <MenuGrupo label="Escola">
          <MenuItem label="Consultar" />
          <MenuItem label="CadastrarUsuario" />
        </MenuGrupo>

        <MenuGrupo label="Usuario">
          <MenuItem label="Cadastrar" href="cadastrar-usuario" />
        </MenuGrupo>

        <MenuGrupo>

        </MenuGrupo>
      </nav>
    </aside>
    )
}

// export default function Menu({ className = "" }) {
//   return (
//     <aside
//       className={`bg-zinc-900 text-white p-4 space-y-3 ${className}`}
//     >
//       <nav className="flex flex-col space-y-2">
//         <a href="#" className="hover:bg-zinc-700 p-2 rounded">
//           Dashboard
//         </a>
//         <a href="#" className="hover:bg-zinc-700 p-2 rounded">
//           Usuários
//         </a>
//         <a href="#" className="hover:bg-zinc-700 p-2 rounded">
//           Configurações
//         </a>
//       </nav>
//     </aside>
//   )
// }