import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestsApi } from '@/api/requests/requests';
import { queryKeys } from '@/api/query-keys';

export interface IUpdateRequestStatusVariables {
    id: string;
    status: string;
}

export function useUpdateRequestStatusMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: IUpdateRequestStatusVariables) =>
            requestsApi.updateStatus(id, status),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.requests.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.requests.detail(variables.id) });
        },
    });
}