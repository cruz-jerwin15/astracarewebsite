import { configureStore } from "@reduxjs/toolkit";
import { departmentApi } from "./departmentApi";


export const store = configureStore({
    reducer: { 
        [departmentApi.reducerPath]: departmentApi.reducer
        // [bookApi.reducerPath]: bookApi.reducer,
        

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(departmentApi.middleware),
});
