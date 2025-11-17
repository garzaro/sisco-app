import React from "react"
import { Link } from "react-router-dom"

export default function MenuItem({ label, href, className='' }) {
  return (
    <Link
      to={href}
      className={`
      block px-4 py-2 items-center hover:bg-zinc-800
      rounded-full w-32 h-10 border-b-1 border-transparent
      hover:border-red-500 text-center
      ${className}
      `}
    >
      <span>{label}</span>
    </Link>
  )
}

/**
 * 🧠 3. Dica: deixe o MenuItem mais inteligente
 *
 * Você pode simplificar o uso dele — em vez de precisar passar href manualmente, derive automaticamente o to a partir do label:
 *
 * export default function MenuItem({ label }) {
 *   const path = "/" + label.toLowerCase().replaceAll(" ", "-") replaceAll(/\s+/g, '-')
 *
 *   return (
 *     <Link
 *       to={path}
 *       className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
 *     >
 *       <span>{label}</span>
 *     </Link>
 *   )
 * }
 *
 * **/