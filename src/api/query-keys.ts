export const queryKeys = {
    users: {
        all: ['users'] as const,
        list: (params: Record<string, unknown>) => ['users', 'list', params ] as const,
        detail: (id: string) => ['users', 'detail', id] as const,
    },
    requests: {
        all: ['requests'] as const,
        list: (params: Record<string, unknown>) => ['requests', 'list', params ] as const,
        detail: (id: string) => ['requests', 'detail', id] as const,
    },
    auditLogs: {
        all: ['audit-logs'] as const,
        list: (params: Record<string, unknown>) => ['audit-logs', 'list', params ] as const,
        detail: (id: string) => ['audit-logs', 'detail', id] as const,
    },
};
