import { useContext } from "react";
import {AuthContext} from "@/auth/AuthContext.js";

export function useAuth() {
  return useContext( AuthContext );
}