import { queryKeys } from "@/api/query-keys";
import { requestsApi } from "@/api/requests/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IUpdateRequestVariables {
    id: string;
    data: Parameters<typeof requestsApi.update>[1];
}

export function useUpdateRequestMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}: IUpdateRequestVariables) => 
            requestsApi.update(id, data),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.requests.all });

            queryClient.invalidateQueries({ queryKey: queryKeys.requests.detail(variables.id) });
        },
    });
};
