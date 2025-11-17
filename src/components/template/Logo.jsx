import React from 'react'
export default function Logo({ className }) {
  return (
    // space-x-2 - espacamento
    <div className={`flex items-center gap-2 ${className}`}>
         <img src="/siscoblue.png" alt="Logo" className="h-1/12 w-44 rounded-full" />
      <div></div>
    </div>
  )
}