import { api } from '@/api/client';
import type { IAuditLog } from '@/types/domain';
import type { IPaginatedResponse, ISingleResponse } from '@/api/types';

interface AuditLogsListParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export const auditLogsApi = {
  list: (params?: AuditLogsListParams) => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    const qs = searchParams.toString();
    return api.get<IPaginatedResponse<IAuditLog>>(`/api/audit-logs${qs ? `?${qs}` : ''}`);
  },
  getById: (id: string) =>
    api.get<ISingleResponse<IAuditLog>>(`/api/audit-logs/${id}`),
};
