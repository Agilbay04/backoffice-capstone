import { useContext } from "react";
import { AuthContext, type IAuthContextType } from "../_provider/auth-provider";

export function useAuth(): IAuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
