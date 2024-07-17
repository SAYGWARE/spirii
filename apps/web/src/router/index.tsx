import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home";
import { routes } from "@/constants/routes";
import { Error404 } from "@/pages/Error404";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/layout/MainLayout";

export const Router = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
                <Route>
                    <Route element={<MainLayout />}>
                        <Route path={routes.home} element={<Home />} />
                    </Route>

                    <Route path="*" element={<Error404 />} />
                </Route>
        )
    );

    return (
        <>
            <Helmet>
                <html />
            </Helmet>
            <RouterProvider router={router} />
        </>
    );
};
