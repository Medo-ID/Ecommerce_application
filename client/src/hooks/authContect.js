import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Function to check if the session cookie exists
    const checkAuthStatus = () => {
        // Read the cookie value without a request by checking document.cookie
        setIsAuthenticated(document.cookie.includes('session_cookie_name='))
    }

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