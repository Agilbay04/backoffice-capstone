import { createContext, useContext, useState, useCallback, type ReactNode } 
from "react";
import type { AuthRequest, AuthResponse } from "@/types/domain";
import { MOCK_USERS } from "@/app/users/_mocks/users";

interface AuthContextType {
    user: AuthResponse | null;
    isAuthenticated: boolean;
    login: (authRequest: AuthRequest) => Promise<{ 
        success: boolean; 
        error?: string 
    }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthResponse | null>(null);

    const login = useCallback(async (authRequest: AuthRequest): Promise<{ 
        success: boolean; 
        error?: string 
    }> => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const user = MOCK_USERS?.find(u => 
            u?.email === authRequest?.email 
            && u?.password === authRequest?.password
        );

        if (user) {
            const { id, name, email, role, status }: AuthResponse = user;
            setUser({ id, name, email, role, status });
            return { success: true };
        } else {
            return { success: false, error: "Invalid email or password" };
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
