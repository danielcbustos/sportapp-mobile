import { createSlice } from "@reduxjs/toolkit";

const defaultUser = {
    id: "",
    userName: "",
    email: "",
    token: "",
    name: "",
    lastName: "",
    role: "Visitante",
};
export const sessionUserSlice = createSlice({
    name: "sessionUser",
    initialState: {
        userInfo: defaultUser,
    },
    reducers: {
        setUserState: (state, action) => {
            state.userInfo = action.payload;

        },
        setDefaultUser: (state) => {
            state.userInfo = defaultUser;
        },
        loginUser: (state, action) => {
            state.userInfo = action.payload;
        },
    },
});

export const { setUserState, setDefaultUser, loginUser } = sessionUserSlice.actions;

export default sessionUserSlice.reducer;