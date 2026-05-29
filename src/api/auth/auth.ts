import { api } from '@/api/client';
import type { IAuthRequest, IAuthResponse } from '@/types/domain';
import type { SingleResponse } from '@/api/types';

export const authApi = {
    login: (authRequest: IAuthRequest) => 
        api.post<SingleResponse<IAuthResponse>>('/api/auth/login', authRequest),
    me: () => api.get<SingleResponse<IAuthResponse>>('/api/auth/me'),
    logout: () => api.post<{ status_code: number; message: string; success: boolean }>('/api/auth/logout', {}),
};
