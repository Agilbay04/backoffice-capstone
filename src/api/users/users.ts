import { api } from '@/api/client';
import type { User } from '@/types/domain';
import type { UserListQuery } from '@/app/users/_types/user-list-query';
import type { PaginatedResponse, SingleResponse } from '@/api/types';

export const usersApi = {
    list: (params?: Partial<UserListQuery>) => {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.append('search', params.search);
        if (params?.role) searchParams.append('role', params.role);
        if (params?.status) searchParams.append('status', params.status);
        if (params?.page) searchParams.append('page', String(params.page));
        if (params?.pageSize) searchParams.append('pageSize', String(params.pageSize));

        const queryString = searchParams.toString();
        return api.get<PaginatedResponse<User>>(`/api/users${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id: string) => api.get<SingleResponse<User>>(`/api/users/${id}`),
    create: (data: Partial<User>) => api.post<SingleResponse<User>>('/api/users', data),
    update: (id: string, data: Partial<User>) => api.put<SingleResponse<User>>(`/api/users/${id}`, data),
    patch: (id: string, data: Partial<User>) => api.patch<SingleResponse<User>>(`/api/users/${id}`, data),
    delete: (id: string) => api.delete<{ status_code: number; message: string; success: boolean }>(`/api/users/${id}`),
};
