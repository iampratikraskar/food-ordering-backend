import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {

    const {
        isAuthenticated,
        isAdmin
    } = useAuth();


    // Not logged in
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    // Admin should not access
    // customer-only pages
    if (isAdmin) {
        return (
            <Navigate
                to="/admin"
                replace
            />
        );
    }


    return <Outlet />;
};

export default ProtectedRoute;