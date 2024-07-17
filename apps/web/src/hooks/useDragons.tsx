import { useAppSelector } from "@/store"

export const useDragons = () => {
    const { dragons } = useAppSelector((state) => state.data.value);
    return dragons;
}
