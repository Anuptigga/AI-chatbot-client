import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsLogin(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUserLogin = (userData) => {
    setIsLogin(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    
  };

  const handleUserLogout = () => {
    setIsLogin(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout successful!");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setUser,
        handleUserLogin,
        handleUserLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}