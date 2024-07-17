import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home";
import { routes } from "@/constants/routes";
import { Error404 } from "@/pages/Error404";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/layout/MainLayout";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setDragons } from "@/store/slices/dataSlice";
import { useDragons } from "@/hooks/useDragons";
import { History } from "@/pages/History";
import { Loader } from "@/components/ui/Loader";

export const Router = () => {
    const getDragons = trpc.getDragons.useQuery();
    const dispatch = useAppDispatch();
    const dragons = useDragons();

    useEffect(() => {
        if (getDragons.data) dispatch(setDragons(getDragons.data));
    }, [getDragons]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route element={<MainLayout />}>
                    <Route path={routes.home} element={<Home />} />
                    <Route path={routes.history} element={<History />} />
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
            {
                dragons.length > 0 ? 
                    <RouterProvider router={router} /> 
                : 
                    <Loader />
            }
        </>
    );
};
