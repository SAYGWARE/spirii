import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Dragon } from "server";

type State = {
    value: {
        dragons: Dragon[];
    };
};
const initialState: State = {
    value: {
        dragons: [],
    },
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setDragons: (state: State, action: PayloadAction<State["value"]["dragons"]>) => {
            state.value.dragons = action.payload;
        },
    },
});

export const { setDragons } = dataSlice.actions;

export default dataSlice.reducer;
