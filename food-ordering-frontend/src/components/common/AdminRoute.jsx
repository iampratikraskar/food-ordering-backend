import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {
    const { isAuthenticated, isAdmin } = useAuth();

    // Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but not admin
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    // Admin
    return <Outlet />;
};

export default AdminRoute;