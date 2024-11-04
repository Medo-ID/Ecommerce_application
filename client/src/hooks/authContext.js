import React, { createContext, useContext, useEffect, useState } from "react";

const url = process.env.REACT_APP_URL

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Function to check the auth status by calling the server
    const checkAuthStatus = async () => {
        try {
            const response = await fetch(`${url}/api/auth/status`, {
                method: 'GET',
                credentials: 'include' // include cookies in the request
            });
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
        } catch (error) {
            console.error("Error checking auth status:", error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuthStatus()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)