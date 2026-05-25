import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/app/auth/_hooks/use-auth";

export default function AuthGuard() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}