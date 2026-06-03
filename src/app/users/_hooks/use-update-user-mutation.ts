import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/api/users/users';
import { queryKeys } from '@/api/query-keys';

export interface IUpdateUserVariables {
    id: string;
    data: Parameters<typeof usersApi.update>[1];
}

export function useUpdateUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}: IUpdateUserVariables) => 
            usersApi.update(id, data),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });

            queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(variables.id) });
        },
    });
};
