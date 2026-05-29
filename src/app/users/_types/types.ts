import type { TBaseParams } from "@/types/domain";

export type TUserParams = TBaseParams & {
    role?: string;
    status?: string;
};
