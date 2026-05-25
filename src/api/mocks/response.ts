export const VERSION = '1.0.0';

export function paginated<T>(items: T[], total: number, page: number, pageSize: number) {
    return {
        status_code: 200,
        message: 'Success get all data.',
        items,
        meta: {
            total_page: Math.ceil(total / pageSize),
            total,
            page,
            page_size: pageSize,
        },
        success: true,
        version: VERSION,
    };
}

export function apiResponse<T>(message: string, options?: {
    status_code?: number;
    data?: T;
    code?: string;
    success?: boolean;
}) {
    const { status_code = 200, data, code, success = true } = options ?? {};
    return {
        status_code,
        message,
        ...(data !== undefined && { data }),
        ...(code !== undefined && { code }),
        success,
        version: VERSION,
    };
}
