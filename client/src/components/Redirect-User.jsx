import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";

export const RedirectUser = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/account"  replace />
    }

    // Render the children (protected content) if authenticated
    return children
}