import type { TRequestParams } from '@/app/requests/_types/types';

export const REQUEST_PARAMS_DEFAULT: TRequestParams = {
    search: '',
    status: 'all',
    priority: 'all',
    page: 1,
    pageSize: 10,
};
