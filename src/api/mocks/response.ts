import type { IPaginatedResponse, ISingleResponse } from "@/api/types";

export const VERSION = import.meta.env.VITE_API_VERSION ?? '1.0.0';

export function paginated<T>(
    items: T[], 
    total: number, 
    page: number, 
    perPage: number
) : IPaginatedResponse<T> {
    return {
        status_code: 200,
        message: 'Success get all data.',
        items,
        meta: {
            total_page: Math.ceil(total / perPage),
            total,
            page,
            per_page: perPage,
        },
        success: true,
        version: VERSION,
    };
}

export function apiResponse<T>(
    message: string, 
    options?: {
        status_code?: number;
        data?: T;
        success?: boolean;
    }
) : ISingleResponse<T> {
    const { status_code = 200, data, success = true } = options ?? {};
    
    return {
        status_code,
        message,
        data,
        success,
        version: VERSION,
    };
}
