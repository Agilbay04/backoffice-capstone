import type { TBaseParams } from "@/types/domain";

export type TRequestParams = TBaseParams & {
    status?: string;
    priority?: string;
};
