import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import { Spinner } from "./Spinner";

export const RedirectUser = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Wait until the auth status is confirmed
    if (loading) return <Spinner />;

    // Redirect to the account page if the user is authenticated
    if (isAuthenticated) {
        return <Navigate to="/account" replace />;
    }

    // Render children if not authenticated (login or signup page)
    return children;
};