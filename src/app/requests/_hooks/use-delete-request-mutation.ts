import { queryKeys } from "@/api/query-keys";
import { requestsApi } from "@/api/requests/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteRequestMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => requestsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.requests.all });
        },
    });
}