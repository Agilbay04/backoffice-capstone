import type { AuditLogListQuery } from '@/app/audit-logs/_types/audit-log-list-query';

export const AUDIT_LOG_QUERY_DEFAULTS: AuditLogListQuery = {
    search: '',
    page: 1,
    pageSize: 20,
};
