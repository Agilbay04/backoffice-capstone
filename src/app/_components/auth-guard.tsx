import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "@/app/auth/_hooks/use-auth";

export default function AuthGuard() {
    const { isAuthenticated } = UseAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}