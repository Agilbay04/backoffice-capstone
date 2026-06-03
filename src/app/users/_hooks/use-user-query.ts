import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/api/users/users';
import { queryKeys } from '@/api/query-keys';
import type { ISingleResponse } from '@/api/types';
import type { IUser } from '@/types/domain';

export function useUserQuery(id: string) {
    return useQuery<ISingleResponse<IUser>>({
        queryKey: queryKeys.users.detail(id),
        queryFn: () => usersApi.getById(id),
        enabled: !!id,
    });
};
