import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthProvider} from "@/auth/AuthProvider.jsx";
import PublicLayout from "@/layout/PublicLayout.jsx";
import LandingPage from "@/pages/home/landingPage.jsx";
import LoginForm from "@/pages/login/LoginForm.jsx";
import UsuarioCreate from "@/pages/Usuario/cadastrar-usuario.jsx";
import Home from "@/pages/home/home.jsx";
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";
import PrivateLayout from "@/layout/PrivateLayout.jsx";
import RedefinirSenha from "@/pages/login/Redefinir-senha.jsx";
import EscolaCreate from "@/pages/escola/cadastrar-escola.jsx";
import DiretorCreate from "@/pages/diretor/cadastro-diretor.jsx";
import ProvedorCreate from "@/pages/provedor/cadastrar-provedor.jsx";
import {Navigate} from "react-router";



/**
 * createBrowserRouter - sem suporte a hash
 * Funciona em dev (npm start, vite)
 * ❌ Quebra em produção se o servidor não tiver rewrite.
 * Usar createHashRouter
 * [] CONTINUAR COM O O LOGIN, REDIRECIONAR PARA HOME AO LOGAR, HEADER PARA LOGIN PAGE VE IA, JA ESTA PRONTO LA
 * Uso replace para não adicionar entrada no histórico do navegador
 *
 * https://github.com/copilot/c/df8b1f8e-d472-44cb-81ea-027ec3ba27b0
 * https://www.robinwieruch.de/react-router/
 *
 * **/

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/** ROTA PUBLICA **/}
        <Route
          path="/"
          element={
          <PublicLayout>
            <LandingPage/>
          </PublicLayout>
        }
      />
      <Route path="/login-form" element={ <LoginForm /> } />
      <Route path="/cadastrar-usuario" element={ <UsuarioCreate /> } />
      <Route path="/redefinir-senha" element={ <RedefinirSenha /> } />

      {/** ROTAS PROTEGIDAS **/}
      <Route
        path="/home"
        element={
        <ProtectedRoute>
          <PrivateLayout>
            <Home />
          </PrivateLayout>
        </ProtectedRoute>
        }
      />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <EscolaCreate />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

      <Route
        path="/cadastrar-escola"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <DiretorCreate />
            </PrivateLayout>
        </ProtectedRoute>
        }
      />

        <Route
          path="/cadastrar-provedor"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <ProvedorCreate />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        {/*** Fallback - qualquer rota não mapeada é redirecionada para a raiz ***/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

const Rotas = () => {
  return(
    <AuthProvider>
      {/** contexto **/}
      <Router>
        <AppRoutes/>
      </Router>
    </AuthProvider>
  );
}
export default Rotas;




/**
 * <Routes>
 *       {/** ROTA PUBLICA **
}
*
<Route path="/cadastrar-usuario" element={<UsuarioCreate/>}/>
* <Route path="/login-form" element={<LoginForm/>}/>
*
* {/** ROTAS PROTEGIDAS **
* <Route element={<ProtectedRoute isAllowed={isLogged} redirectPath="/home"/>}>
  * <Route path="/home" element={<Home/>}/>
  * <Route path="/cadastrar-escola" element={<EscolaCreate/>}/>
  * <Route path="/cadastrar-diretor" element={<DiretorCreate/>}/>
  * <Route path="/cadastrar-provedor" element={<ProvedorCreate/>}/>
  * </Route>
*
* {/** Fallback - qualquer rota não mapeada é redirecionada para a raiz **
* <Route path="*" element={<Navigate to="/" replace/>}/>
*
</Routes>
 * **/





// <Router>
//   <Navbar />
//   <Routes>
//     <Route path="/home" element={<Home />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/signupFormPassword" element={<FormularioSenha />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/consultar-lancamentos" element={<ConsultarLancamentos />} />
//   </Routes>
// </Router>

// <Router>
//   <Routes>
//     <Route index element={ <Pagina />} />
//     <Route path="/" element={ <Home />} />
//     <Route path= "login-form" element={ <LoginForm />} />
//     <Route path= "cadastrar-usuario" element={ <UsuarioCreate /> } />,
//     <Route path= "cadastrar-escola" element={ <EscolaCreate /> } />,
//     <Route path= "cadastrar-diretor" element={ <DiretorCreate /> } />,
//     <Route path= "cadastrar-provedor" element={ <ProvedorCreate /> } />,
//   </Routes>
// </Router>



/**
 *  const router = createHashRouter([
 *     {
 *       path: "/", //rota padrao
 *       // element: <Header />,
 *       element: <Pagina />, //layout padrao
 *       children: [ //rotas filhas
 *         { index: true, element: <Header /> },
 *         { path: "home", element: <Home /> },
 *         { path: "login-form", element: <LoginForm /> },
 *         { path: "cadastrar-usuario", element: <UsuarioCreate /> },
 *         { path: "cadastrar-escola", element: <EscolaCreate /> },
 *         { path: "cadastrar-diretor", element: <DiretorCreate /> },
 *         { path: "cadastrar-provedor", element: <ProvedorCreate /> },
 *       ]
 *     },
 *   ]);
 *   return (
 *     <RouterProvider router={router}/>
 *   )
 *
 *
 *   <Routes>
 *       {/** ROTA PUBLICA **!/
}
****************************************************************************************
 *
<Route path="/" element={!isLogged ? <LandingPage/> : <Navigate to="/home" replace/>}/>
* <Route path="/cadastrar-usuario" element={<UsuarioCreate/>}/>
* <Route path="/login-form" element={<LoginForm/>}/>
*
* {/** ROTAS PROTEGIDAS **
* <Route element={<ProtectedRoute isAllowed={isLogged} redirectPath="/home"/>}>
  * <Route path="/home" element={<Home/>}/>
  * <Route path="/cadastrar-escola" element={<EscolaCreate/>}/>
  * <Route path="/cadastrar-diretor" element={<DiretorCreate/>}/>
  * <Route path="/cadastrar-provedor" element={<ProvedorCreate/>}/>
  * </Route>
*
* {/** Fallback - qualquer rota não mapeada é redirecionada para a raiz **
* <Route path="*" element={<Navigate to="/" replace/>}/>
*
</Routes>
 *
 * **/