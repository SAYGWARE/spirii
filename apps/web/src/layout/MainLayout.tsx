import { useOutlet } from "react-router-dom";

export const MainLayout = () => {
    const outlet = useOutlet();

    return <div>{outlet}</div>;
};
