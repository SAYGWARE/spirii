import { useState } from "react";
import { trpc } from "./lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "./router";
import { store } from "./store";
import { Provider } from "react-redux";

export const App = () => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            transformer: superjson,
            links: [
                httpBatchLink({
                    url: `http://localhost:5000/trpc`
                }),
            ],
        })
    );

    return (
        <HelmetProvider>
            <trpc.Provider queryClient={queryClient} client={trpcClient}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Router />
                    </Provider>
                </QueryClientProvider>
            </trpc.Provider>
        </HelmetProvider>
    );
};
