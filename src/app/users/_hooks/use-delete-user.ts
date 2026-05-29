import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/api/users/users';
import { queryKeys } from '@/api/query-keys';

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => usersApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
    });
}