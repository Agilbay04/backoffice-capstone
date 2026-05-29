import { api } from '@/api/client';
import type { IAuthRequest, IAuthResponse } from '@/types/domain';
import type { ISingleResponse } from '@/api/types';

export const authApi = {
    login: (authRequest: IAuthRequest) => 
        api.post<ISingleResponse<IAuthResponse>>('/api/auth/login', authRequest),
    me: () => api.get<ISingleResponse<IAuthResponse>>('/api/auth/me'),
    logout: () => api.post<{ status_code: number; message: string; success: boolean }>('/api/auth/logout', {}),
};
