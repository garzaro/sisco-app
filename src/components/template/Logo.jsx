import React from 'react'
export default function Logo({ className }) {
  return (
    <>
      {/*space-x-2 - espacamento*/}
      {/*<div className={`flex items-center gap-2 ${className}`}>*/}
      {/*   <img src="/sisco-blue.png" alt="Logo" className="h-1/12 w-44 rounded-full" />*/}
      {/*  <div></div>*/}
      {/*</div>*/}

      {/**logo**/}
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-10 h-10 bg-linear-to-br from-blue-900 to-blue-700 rounded flex items-center
         justify-center"
        >
          <span className="text-zinc-200 font-bold text-lg" style={{ fontFamily: "Poppins" }}>
            SE
          </span>
        </div>
        <span className="font-bold text-gray-200 text-lg" style={{ fontFamily: "Poppins" }}>
          Sistema Consulta Escolar
        </span>
      </div>
    </>
  )
}