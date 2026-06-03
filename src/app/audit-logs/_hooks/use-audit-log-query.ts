import { useQuery } from '@tanstack/react-query';
import { auditLogsApi } from '@/api/audit-logs/audit-logs';
import { queryKeys } from '@/api/query-keys';
import type { ISingleResponse } from '@/api/types';
import type { IAuditLog } from '@/types/domain';

export function useAuditLogQuery(id: string) {
    return useQuery<ISingleResponse<IAuditLog>>({
        queryKey: queryKeys.auditLogs.detail(id),
        queryFn: () => auditLogsApi.getById(id),
        enabled: !!id,
    });
}
