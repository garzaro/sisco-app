import React from 'react'
import Logo from "./Logo.jsx";
import MenuUsuario from "./MenuUsuario.jsx";

export default function Cabecalho({ className }) {
  return (
    <header
      className={`
      w-full
      flex items-center
      px-7 border-b border-zinc-800
      justify-between
      ${ className }`}
    >
      <nav className="flex justify-between items-center gap-2 boxed">
        <Logo />
        <MenuUsuario/>
      </nav>
    </header>
    )
}


// export default function Cabecalho({ className = "" }) {
//   return (
//     <header
//       className={`w-full bg-blue-700 text-white flex items-center justify-between px-6 ${className}`}
//     >
//       <h1 className="text-xl font-semibold">Meu Sistema</h1>
//       <nav className="space-x-4">
//         <a href="#" className="hover:underline">
//           Início
//         </a>
//         <a href="#" className="hover:underline">
//           Sobre
//         </a>
//       </nav>
//     </header>
//   )
// }