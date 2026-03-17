import React from 'react'
import Rotas from "@/routes/Rotas.jsx";

import '../../styles/globals.css';
import 'swiper/swiper.css';

function App() {
  return (
    <Rotas />
  );
}
export default App


/**
 * <Router>
 *       <Routes>
 *         <Route index element={ <Pagina />} />
 *         <Route path="/" element={ <Home />} />
 *         <Route path= "login-form" element={ <LoginForm />} />
 *         <Route path= "cadastrar-usuario" element={ <UsuarioCreate /> } />,
 *         <Route path= "cadastrar-escola" element={ <EscolaCreate /> } />,
 *         <Route path= "cadastrar-diretor" element={ <DiretorCreate /> } />,
 *         <Route path= "cadastrar-provedor" element={ <ProvedorCreate /> } />,
 *       </Routes>
 *     </Router>
 *
 * **/
