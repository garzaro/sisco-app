import {Navigate} from "react-router";
import {useAuth} from "@/auth/useAuth.js";

export default function ProtectedRoute ({ children }) {
  const { isAuthenticated } = useAuth();

  if ( !isAuthenticated ) {
    return <Navigate to="/home" replace />
  }

  return children;
};



