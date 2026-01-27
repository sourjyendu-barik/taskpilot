import { Navigate, Outlet } from "react-router-dom";
import { useAuthContxt } from "../context/AuthProvider";
import Loading from "../components/ReusableDetailLoadingComponents/Loading";

const RequireAuth = () => {
  const { currentUser, isAuthChecking } = useAuthContxt();
  if (isAuthChecking) {
    return <Loading message="Checking authentication..." />;
  }
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
