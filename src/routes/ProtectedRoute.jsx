import {Navigate} from "react-router";
import {useAuth} from "@/auth/useAuth.jsx";


export default function ProtectedRoute ({ children }) {
  const { isAuthenticated } = useAuth();

  if ( !isAuthenticated ) {
    return <Navigate to="/" replace />
  }

  return children;
};



