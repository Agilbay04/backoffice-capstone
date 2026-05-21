import type { UserListQuery } from "@/app/users/_types/user-list-query";

export const USER_QUERY_DEFAULTS: UserListQuery = {
    search: "",
    role: "all",
    status: "all",
    page: 1,
    pageSize: 10
};