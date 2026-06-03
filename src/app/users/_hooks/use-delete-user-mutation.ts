import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/api/users/users';
import { queryKeys } from '@/api/query-keys';
import type { ApiClientError } from '@/api/client';

export function useDeleteUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => usersApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
        onError: (error: ApiClientError) => {            
            return error;
        },
    });
}