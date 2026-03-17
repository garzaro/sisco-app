import {useEffect, useState} from "react";
import {authService} from "@/app/service/AuthService.js";
import {AuthContext} from "@/auth/AuthContext.js";

export default function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState( false );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  function login() {
    authService.login();
    setIsAuthenticated(true);
  };

  function logout() {
    authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
}
