import { createContext, useContext, useState, useCallback, type ReactNode } 
from "react";
import type { AuthRequest, AuthResponse } from "@/types/domain";
import { authApi } from "@/api/auth/auth";
import { ApiClientError } from "@/api/client";

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

const AUTH_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthResponse | null>(() => {
        const saved = localStorage.getItem(AUTH_KEY);
        return saved ? JSON.parse(saved) as AuthResponse : null;
    });

    const login = useCallback(async (authRequest: AuthRequest): Promise<{ 
        success: boolean; 
        error?: string 
    }> => {
        try {
            const response = await authApi.login(authRequest);
            localStorage.setItem(AUTH_KEY, JSON.stringify(response.data));
            setUser(response.data);
            return { success: true };
        } catch (error) {
            if (error instanceof ApiClientError && error?.status === 401) {
                return { success: false, error: error?.message };
            }
            return { success: false, error: 'An unexpected error occurred. Please try again.' };
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_KEY);
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
