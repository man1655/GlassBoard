import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import GlassboardLoader from "../components/common/LoadingScreen";


const ProtectedRoute = () => {
  const { token, isAuthChecked } = useSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthChecked) {
    return <GlassboardLoader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
