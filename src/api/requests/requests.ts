import { api } from '@/api/client';
import type { Request } from '@/types/domain';
import type { PaginatedResponse, SingleResponse } from '@/api/types';

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
    return api.get<PaginatedResponse<Request>>(`/api/requests${qs ? `?${qs}` : ''}`);
  },
  getById: (id: string) =>
    api.get<SingleResponse<Request>>(`/api/requests/${id}`),
  create: (data: Partial<Request>) =>
    api.post<SingleResponse<Request>>('/api/requests', data),
  update: (id: string, data: Partial<Request>) =>
    api.put<SingleResponse<Request>>(`/api/requests/${id}`, data),
  delete: (id: string) =>
    api.delete<{ status_code: number; message: string; success: boolean }>(`/api/requests/${id}`),
  updateStatus: (id: string, status: string) =>
    api.put<SingleResponse<Request>>(`/api/requests/${id}/status`, { status }),
};
