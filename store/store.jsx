import { configureStore } from '@reduxjs/toolkit';
import { sessionUserSlice } from './sessionUser/sessionUserSlice';


export const store = configureStore({
    reducer: {
        sessionUser: sessionUserSlice.reducer
    }
});