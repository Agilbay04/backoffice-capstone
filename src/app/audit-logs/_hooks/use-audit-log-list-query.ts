import { useQuery } from '@tanstack/react-query';
import { auditLogsApi } from '@/api/audit-logs/audit-logs';
import { queryKeys } from '@/api/query-keys';
import type { TAuditLogParams } from '@/app/audit-logs/_types/types';
import type { IPaginatedResponse } from '@/api/types';
import type { IAuditLog } from '@/types/domain';

export function useAuditLogListQuery(params: Partial<TAuditLogParams>) {
    return useQuery<IPaginatedResponse<IAuditLog>>({
        queryKey: queryKeys.auditLogs.list(params as Record<string, unknown>),
        queryFn: () => auditLogsApi.list(params),
    });
}
