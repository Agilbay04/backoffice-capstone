import { api } from '@/api/client';
import type { AuthRequest, AuthResponse } from '@/types/domain';
import type { SingleResponse } from '@/api/types';

export const authApi = {
    login: (authRequest: AuthRequest) => 
        api.post<SingleResponse<AuthResponse>>('/api/auth/login', authRequest),
    me: () => api.get<SingleResponse<AuthResponse>>('/api/auth/me'),
    logout: () => api.post<{ status_code: number; message: string; success: boolean }>('/api/auth/logout', {}),
};
