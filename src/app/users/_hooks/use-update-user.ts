import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/api/users/users';
import { queryKeys } from '@/api/query-keys';

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}: { id: string; data: Parameters<typeof usersApi.update>[1] }) => 
            usersApi.update(id, data),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });

            queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(variables.id) });
        },
    });
};
