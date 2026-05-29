import { api } from '@/api/client';
import type { IRequest } from '@/types/domain';
import type { IPaginatedResponse, ISingleResponse } from '@/api/types';

interface RequestsListParams {
  search?: string;
  status?: string;
  priority?: string;
  page?: number;
  pageSize?: number;
}

export const requestsApi = {
  list: (params?: RequestsListParams) => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.priority) searchParams.set('priority', params.priority);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    const qs = searchParams.toString();
    return api.get<IPaginatedResponse<IRequest>>(`/api/requests${qs ? `?${qs}` : ''}`);
  },
  getById: (id: string) =>
    api.get<ISingleResponse<IRequest>>(`/api/requests/${id}`),
  create: (data: Partial<IRequest>) =>
    api.post<ISingleResponse<IRequest>>('/api/requests', data),
  update: (id: string, data: Partial<IRequest>) =>
    api.put<ISingleResponse<IRequest>>(`/api/requests/${id}`, data),
  delete: (id: string) =>
    api.delete<{ status_code: number; message: string; success: boolean }>(`/api/requests/${id}`),
  updateStatus: (id: string, status: string) =>
    api.put<ISingleResponse<IRequest>>(`/api/requests/${id}/status`, { status }),
};
