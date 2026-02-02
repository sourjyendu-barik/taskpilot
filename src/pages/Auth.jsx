import { useState } from "react";
import LoginModal from "../components/modals/LoginModal";
import SignupModal from "../components/modals/SignInModal";
import { useAuthContxt } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../components/ReusableDetailLoadingComponents/Loading";
const Auth = () => {
  const { currentUser, isAuthChecking } = useAuthContxt();
  const [authMode, setAuthMode] = useState(null);
  // if (isAuthChecking) {
  //   return <Loading message="loading....." />;
  // }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="text-center p-4 shadow rounded"
        style={{ width: "380px" }}
      >
        <h2 className="fw-bold text-primary">TaskPilot</h2>
        <p className="text-muted mt-2">Oops! You are not logged in</p>

        <div className="mt-4">
          <p className="mb-1">Already have an account?</p>
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => setAuthMode("login")}
          >
            Login
          </button>
        </div>

        <div className="mt-3">
          <p className="mb-1">New here?</p>
          <button
            className="btn btn-primary w-100"
            onClick={() => setAuthMode("signup")}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* MODALS */}
      {authMode === "login" && (
        <LoginModal
          onClose={() => setAuthMode(null)}
          onGoingToSignUp={() => setAuthMode("signup")}
        />
      )}

      {authMode === "signup" && (
        <SignupModal
          onClose={() => setAuthMode(null)}
          onGoingToLogin={() => setAuthMode("login")}
        />
      )}
    </div>
  );
};

export default Auth;
