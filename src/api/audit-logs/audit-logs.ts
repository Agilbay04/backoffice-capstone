import { api } from '@/api/client';
import type { IAuditLog } from '@/types/domain';
import type { IPaginatedResponse, ISingleResponse } from '@/api/types';
import type { TAuditLogParams } from '@/app/audit-logs/_types/types';

export const auditLogsApi = {
  list: (params?: Partial<TAuditLogParams>) => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.perPage) searchParams.set('pageSize', String(params.perPage));
    const qs = searchParams.toString();
    return api.get<IPaginatedResponse<IAuditLog>>(`/api/audit-logs${qs ? `?${qs}` : ''}`);
  },
  getById: (id: string) =>
    api.get<ISingleResponse<IAuditLog>>(`/api/audit-logs/${id}`),
};
