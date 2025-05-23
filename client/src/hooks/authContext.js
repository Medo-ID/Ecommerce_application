import { createContext, useContext, useEffect, useState } from "react";

const url = process.env.REACT_APP_API_URL;

console.log(url);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to check the auth status by calling the server
  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${url}/api/auth/status`, {
        method: "GET",
        credentials: "include", // include cookies in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.isAuthenticated);
      setIsAuthenticated(data.isAuthenticated);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
