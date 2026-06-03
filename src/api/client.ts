const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

let httpErrorHandler: ((status: number) => void) | null = null;

export function setHttpErrorHandler(handler: (status: number) => void) {
  httpErrorHandler = handler;
}

export class ApiClientError extends Error {
    status: number;
    code?: string;

    constructor({status, message, code}: {status: number; message: string; code?: string}) {
        super(message);
        this.name = 'ApiClientError';
        this.status = status;
        this.code = code;
    }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const error = new ApiClientError({
            status: response.status,
            message: body?.message ?? response.statusText,
            code: body?.code,
        });

        if (response.status === 401 && httpErrorHandler) {
            httpErrorHandler(401);
        } else if (response.status === 403 && httpErrorHandler) {
            httpErrorHandler(403);
        }

        throw error;
    }

    return response.json();
}

export const api = {
    get: <T>(path: string) => request<T>(path),

    post: <T>(path: string, body: unknown) => request<T>(path, {
        method: 'POST',
        body: JSON.stringify(body),
    }),

    put: <T>(path: string, body: unknown) => request<T>(path, {
        method: 'PUT',
        body: JSON.stringify(body),
    }),

    patch: <T>(path: string, body: unknown) => request<T>(path, {
        method: 'PATCH',
        body: JSON.stringify(body),
    }),

    delete: <T>(path: string) => request<T>(path, {
        method: 'DELETE',
    }),
}
