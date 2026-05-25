export interface PaginatedResponse<T> {
    status_code: number;
    message: string;
    items: T[];
    meta: {
        total_page: number;
        total: number;
        page: number;
        per_size: number;
    };
    success: boolean;
    version: string;
}

export interface SingleResponse<T> {
    status_code: number;
    message: string;
    data: T;
    success: boolean;
    version: string;
}
