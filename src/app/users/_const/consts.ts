import type { TUserParams } from "@/app/users/_types/types";

export const USER_PARAMS_DEFAULT: TUserParams = {
    search: "",
    role: "all",
    status: "all",
    page: 1,
    pageSize: 10
};