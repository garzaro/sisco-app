import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./app/home/Home.jsx";
import Pagina from "./components/template/Pagina.jsx";
import CadastrarUsuario from "@/app/Usuario/cadastrar-usuario.jsx";

import '../styles/globals.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/", //rota padrao
      element: <Pagina />, //layout padrao
      children: [ //rotas filhas
        { index: true, element: <Home/> },
        { path: "cadastrar-usuario", element: <CadastrarUsuario /> },
      ]
    },
  ])
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
