import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import GlassboardLoader from "../components/common/LoadingScreen";
import LandingPage from "../pages/LandingPage";


const ProtectedRoute = () => {
  const { token, isAuthChecked } = useSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthChecked) {
    return <LandingPage />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
