import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/api/users/users';
import { queryKeys } from '@/api/query-keys';
import type { ApiClientError } from '@/api/client';

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Parameters<typeof usersApi.create>[0]) => usersApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
        onError: (error: ApiClientError) => {
            return error;
        },
    });
};
