import { queryKeys } from "@/api/query-keys";
import { requestsApi } from "@/api/requests/requests";
import type { ISingleResponse } from "@/api/types";
import type { IRequest } from "@/types/domain";
import { useQuery } from "@tanstack/react-query";

export function useRequestQuery(id: string) {
    return useQuery<ISingleResponse<IRequest>>({
        queryKey: queryKeys.requests.detail(id),
        queryFn: () => requestsApi.getById(id),
        enabled: !!id,
    });
};
