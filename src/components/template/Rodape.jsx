import React from 'react'

export default function Rodape({className = ''}) {
    return (
        <footer className={`${className}`}>
            <div>
                &copy; {new Date().getFullYear()} - Cleber Garzaro. Todos os direitos fudidos.
            </div>
        </footer>
    )
}

// export default function Rodape({ className = "" }) {
//   return (
//     <footer
//       className={`w-full bg-blue-900 text-white flex items-center justify-center ${className}`}
//     >
//       <span className="text-sm">© 2025 Meu Sistema. Todos os direitos reservados.</span>
//     </footer>
//   )
// }
