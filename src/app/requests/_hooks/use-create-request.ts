import type { ApiClientError } from "@/api/client";
import { queryKeys } from "@/api/query-keys";
import { requestsApi } from "@/api/requests/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Parameters<typeof requestsApi.create>[0]) => requestsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.requests.all });
        },
        onError: (error: ApiClientError) => {
            return error;
        },
    });
};
