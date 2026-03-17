import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "@/auth/useAuth.js";
import {Navigate} from "react-router";
import {useEffect} from "react";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/home"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login-foorm', {
//         state: {from: location.pathname},
//         replace: true,
//       });
//     }
//   }, [isAuthenticated, navigate , location]);
//   if (!isAuthenticated) return null; //carrega nada durante redirecionamento
// }


export default ProtectedRoute;


