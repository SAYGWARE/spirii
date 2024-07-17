import type { inferAsyncReturnType } from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = async ({ req }: trpcExpress.CreateExpressContextOptions) => {
    return {};
};

export type Context = inferAsyncReturnType<typeof createContext>;
