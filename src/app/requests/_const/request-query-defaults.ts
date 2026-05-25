import type { RequestListQuery } from '@/app/requests/_types/request-list-query';

export const REQUEST_QUERY_DEFAULTS: RequestListQuery = {
    search: '',
    status: 'all',
    priority: 'all',
    page: 1,
    pageSize: 10,
};
