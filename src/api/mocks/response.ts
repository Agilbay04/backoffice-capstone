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

export function single<T>(data: T, message = 'Success get data.') {
    return {
        status_code: 200,
        message,
        data,
        success: true,
        version: VERSION,
    };
}

export function created<T>(data: T) {
    return {
        status_code: 201,
        message: 'Success create data.',
        data,
        success: true,
        version: VERSION,
    };
}

export function updated<T>(data: T) {
    return {
        status_code: 200,
        message: 'Success update data.',
        data,
        success: true,
        version: VERSION,
    };
}

export function deleted() {
    return {
        status_code: 200,
        message: 'Success delete data.',
        success: true,
        version: VERSION,
    };
}

export function errorResponse(status: number, message: string, code?: string) {
    return {
        status_code: status,
        message,
        code,
        success: false,
        version: VERSION,
    };
}
