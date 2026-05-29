import { api } from '@/api/client';
import type { IUser } from '@/types/domain';
import type { TUserParams } from '@/app/users/_types/types';
import type { PaginatedResponse, SingleResponse } from '@/api/types';

export const usersApi = {
    list: (params?: Partial<TUserParams>) => {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.append('search', params.search);
        if (params?.role) searchParams.append('role', params.role);
        if (params?.status) searchParams.append('status', params.status);
        if (params?.page) searchParams.append('page', String(params.page));
        if (params?.pageSize) searchParams.append('pageSize', String(params.pageSize));

        const queryString = searchParams.toString();
        return api.get<PaginatedResponse<IUser>>(`/api/users${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id: string) => api.get<SingleResponse<IUser>>(`/api/users/${id}`),
    create: (data: Partial<IUser>) => api.post<SingleResponse<IUser>>('/api/users', data),
    update: (id: string, data: Partial<IUser>) => api.put<SingleResponse<IUser>>(`/api/users/${id}`, data),
    patch: (id: string, data: Partial<IUser>) => api.patch<SingleResponse<IUser>>(`/api/users/${id}`, data),
    delete: (id: string) => api.delete<{ status_code: number; message: string; success: boolean }>(`/api/users/${id}`),
};
