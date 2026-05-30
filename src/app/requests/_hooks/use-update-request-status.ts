import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestsApi } from '@/api/requests/requests';
import { queryKeys } from '@/api/query-keys';

export function useUpdateRequestStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) =>
            requestsApi.updateStatus(id, status),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.requests.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.requests.detail(variables.id) });
        },
    });
}