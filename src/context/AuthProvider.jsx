import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContex = createContext();
export const useAuthContxt = () => useContext(AuthContex);

const AuthProvider = ({ children }) => {
  //that state will have current user data
  const [currentUser, setCurrentUser] = useState(null);
  //it will prevrnt route flicler while checking token
  const [isAuthChecking, setAuthChecking] = useState(true);

  //login
  //this funtion will add token in localstorage
  //then it will save details of use by decode token
  const login = (token) => {
    localStorage.setItem("token", token);
    const userDetails = jwtDecode(token);
    setCurrentUser({
      userId: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };
  //will run while page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthChecking(false);
      return;
    }
    try {
      const userDetails = jwtDecode(token);
      setCurrentUser({
        userId: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
      });
    } catch (error) {
      logout();
    } finally {
      setAuthChecking(false);
    }
  }, []);
  const value = { logout, login, currentUser, isAuthChecking };
  return <AuthContex.Provider value={value}>{children}</AuthContex.Provider>;
};

export default AuthProvider;
