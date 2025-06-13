import { configureStore } from "@reduxjs/toolkit";
import { departmentApi } from "./departmentApi";
import { courseApi } from "./courseApi";
import { sectionApi } from "./sectionApi";


export const store = configureStore({
    reducer: { 
        [departmentApi.reducerPath]: departmentApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [sectionApi.reducerPath]: sectionApi.reducer
        

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(departmentApi.middleware).concat(courseApi.middleware).concat(sectionApi.middleware),
});
