import {useEffect, useMemo, useState} from "react";
import {AuthService} from "@/app/service/AuthService.js";
import {AuthContext} from "@/auth/AuthContext.jsx";



/**
 * Fonte de verdade do estado global de autenticação.
 **/

export function AuthProvider({ children }) {
  const auth = useMemo(() => AuthService(), []);

  const [isAuthenticated, setIsAuthenticated] = useState(() => auth.isAuthenticated());
  const [loggedUser, setLoggedUser] = useState(() => auth.getLoggedUser());

  /**
   * Sincroniza o estado com o armazenamento local ao montar o componente.
   */
  useEffect(() => {
    setIsAuthenticated( auth.isAuthenticated() );
    setLoggedUser( auth.getLoggedUser() );
  }, [ auth ]);

  const login = (token, user = null) => {
    auth.login( token );

    if ( user ){
      auth.saveLoggedUser( user );
      setLoggedUser( user );
    } else {
      const storedUser = auth.getLoggedUser();
      setLoggedUser( storedUser );
    }

    setIsAuthenticated( true );
  };

  const logout = () => {
    auth.logout();
    setLoggedUser( null );
    setIsAuthenticated( false );
  };

  const contextValue = useMemo(() => ({
    isAuthenticated,
    loggedUser,
    login,
    logout
  }), [isAuthenticated, loggedUser]);

  return(
    <AuthContext.Provider value={ contextValue }>
      { children }
    </AuthContext.Provider>
  );
}
