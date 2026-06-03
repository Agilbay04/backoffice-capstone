import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/api/users/users";
import { queryKeys } from "@/api/query-keys";
import type { TUserParams } from "@/app/users/_types/types";
import type { IPaginatedResponse } from "@/api/types";
import type { IUser } from "@/types/domain";

export function useUserListQuery(params: Partial<TUserParams>) {
    return useQuery<IPaginatedResponse<IUser>>({
        queryKey: queryKeys.users.list(params as Record<string, unknown>),
        queryFn: () => usersApi.list(params),
    });
};
