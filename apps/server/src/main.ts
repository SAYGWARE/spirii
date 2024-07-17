import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { createContext } from "./context";
import { appRouter } from "./router";
import cors from "cors";

const PORT = 5000;
const url = `http://localhost:${PORT}/trpc`;

const app = express();

app.use(cors());

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

(async () => {
    try {
        app.listen(PORT, () => {
            console.debug(`🚀 Server is ready at ${url}`);
        });
    } catch (err) {
        console.error(err);
        process.exit();
    }
})();
