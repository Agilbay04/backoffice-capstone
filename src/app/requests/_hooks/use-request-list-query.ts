import { useQuery } from "@tanstack/react-query";
import type { TRequestParams } from "../_types/types";
import type { IPaginatedResponse } from "@/api/types";
import type { IRequest } from "@/types/domain";
import { queryKeys } from "@/api/query-keys";
import { requestsApi } from "@/api/requests/requests";

export function useRequestListQuery(params: Partial<TRequestParams>) {
    return useQuery<IPaginatedResponse<IRequest>>({
        queryKey: queryKeys.requests.list(params as Record<string, unknown>),
        queryFn: () => requestsApi.list(params),
    });
}