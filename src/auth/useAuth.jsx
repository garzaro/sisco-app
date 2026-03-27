import {useContext} from "react";
import {AuthContext} from "@/auth/AuthContext.jsx";

/**
 * Consumo simples do contexto
 * **/

export function useAuth() {
  return useContext( AuthContext );
}