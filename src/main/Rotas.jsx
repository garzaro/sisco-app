import {createHashRouter, RouterProvider} from "react-router-dom";
import Header from "@/pages/home/LandingPage.jsx";
import Home from "@/pages/home/Home.jsx";
import LoginForm from "@/pages/login/login-form.jsx";
import UsuarioCreate from "@/pages/Usuario/cadastrar-usuario.jsx";
import EscolaCreate from "@/pages/escola/cadastrar-escola.jsx";
import DiretorCreate from "@/pages/diretor/cadastro-diretor.jsx";
import ProvedorCreate from "@/pages/provedor/cadastrar-provedor.jsx";


/**
 * createBrowserRouter - sem suporte a hash
 * Funciona em dev (npm start, vite)
 * ❌ Quebra em produção se o servidor não tiver rewrite.
 * Usar createHashRouter
 * **/

export default function Rotas(){
  const router = createHashRouter([
    {
      path: "/", //rota padrao
      // element: <Header />,
      // element: <Pagina />, //layout padrao
      children: [ //rotas filhas

        { index: true, element: <Header /> },
        { path: "home", element: <Home />},
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