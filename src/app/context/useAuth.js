import { useContext } from "react";
import {AuthContext} from "@/app/context/AuthContext.jsx";

export function useAuth() {
  return useContext( AuthContext );
}