import { createContext, useState, useCallback, type ReactNode } from "react";
import type { IAuthRequest, IAuthResponse } from "@/types/domain";
import { authApi } from "@/api/auth/auth";
import { ApiClientError } from "@/api/client";

interface IAuthContextType {
    user: IAuthResponse | null;
    isAuthenticated: boolean;
    login: (authRequest: IAuthRequest) => Promise<{
        success: boolean;
        error?: string;
    }>;
    logout: () => void;
}

const AuthContext = createContext<IAuthContextType | null>(null);

const AUTH_KEY = import.meta.env.VITE_AUTH_KEY || "auth_user";

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IAuthResponse | null>(() => {
        const saved = localStorage.getItem(AUTH_KEY);
        return saved ? JSON.parse(saved) as IAuthResponse : null;
    });

    const login = useCallback(async (authRequest: IAuthRequest): Promise<{
        success: boolean;
        error?: string;
    }> => {
        try {
            const response = await authApi.login(authRequest);
            localStorage.setItem(AUTH_KEY, JSON.stringify(response.data));
            setUser(response.data as IAuthResponse);
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

export { AuthProvider, AuthContext };
export type { IAuthContextType };
