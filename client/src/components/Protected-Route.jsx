import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login"  replace />
    }

    // Render the children (protected content) if authenticated
    return children
}