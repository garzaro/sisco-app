import React from 'react'
import {createHashRouter, RouterProvider} from "react-router-dom";
import Pagina from "@/components/template/Pagina.jsx";
import Home from "@/pages/home/Home.jsx";
import UsuarioCreate from "@/pages/Usuario/cadastrar-usuario.jsx";
import EscolaCreate from "@/pages/escola/cadastrar-escola.jsx";
import DiretorCreate from "@/pages/diretor/cadastro-diretor.jsx";
import ProvedorCreate from "@/pages/provedor/cadastrar-provedor.jsx";
import LoginForm from "@/pages/login/login-form.jsx";

import '../../styles/globals.css';
import 'swiper/swiper.css';
import Header from "@/pages/home/LandingPage.jsx";

/**
 * createBrowserRouter - sem suporte a hash
 * Funciona em dev (npm start, vite)
 * ❌ Quebra em produção se o servidor não tiver rewrite.
 * Usar createHashRouter
 * **/

function App() {
  const router = createHashRouter([
    {
      path: "/", //rota padrao
      element: <Header />,
      // element: <Pagina />, //layout padrao
      children: [ //rotas filhas
        { index: true, element: <Home /> },
        { path: "login-form", element: <LoginForm /> },
        { path: "cadastrar-usuario", element: <UsuarioCreate /> },
        { path: "cadastrar-escola", element: <EscolaCreate /> },
        { path: "cadastrar-diretor", element: <DiretorCreate /> },
        { path: "cadastrar-provedor", element: <ProvedorCreate /> },
      ]
    },
  ]);
  return (
    <RouterProvider router={router}/>
  )
}
export default App
