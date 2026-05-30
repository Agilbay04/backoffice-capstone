import { api } from '@/api/client';
import type { IUser } from '@/types/domain';
import type { TUserParams } from '@/app/users/_types/types';
import type { IPaginatedResponse, ISingleResponse } from '@/api/types';

export const usersApi = {
    list: (params?: Partial<TUserParams>) => {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.append('search', params.search);
        if (params?.role) searchParams.append('role', params.role);
        if (params?.status) searchParams.append('status', params.status);
        if (params?.page) searchParams.append('page', String(params.page));
        if (params?.perPage) searchParams.append('pageSize', String(params.perPage));

        const queryString = searchParams.toString();
        return api.get<IPaginatedResponse<IUser>>(`/api/users${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id: string) => api.get<ISingleResponse<IUser>>(`/api/users/${id}`),
    create: (data: Partial<IUser>) => api.post<ISingleResponse<IUser>>('/api/users', data),
    update: (id: string, data: Partial<IUser>) => api.put<ISingleResponse<IUser>>(`/api/users/${id}`, data),
    patch: (id: string, data: Partial<IUser>) => api.patch<ISingleResponse<IUser>>(`/api/users/${id}`, data),
    delete: (id: string) => api.delete<{ status_code: number; message: string; success: boolean }>(`/api/users/${id}`),
};
