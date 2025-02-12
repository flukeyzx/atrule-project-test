import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

const ProtectedRoute = ({ Component }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return user ? <Component /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
