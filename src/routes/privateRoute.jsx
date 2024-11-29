import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Si no hay un usuario autenticado, redirige a /login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderiza el contenido
  return children;
};

export default PrivateRoute;
