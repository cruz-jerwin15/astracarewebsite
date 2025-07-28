import { configureStore } from "@reduxjs/toolkit";
import { departmentApi } from "./departmentApi";
import { courseApi } from "./courseApi";
import { sectionApi } from "./sectionApi";
import { buildingApi } from "./buildingApi";
import { roomApi } from "./roomApi";
import { formApi } from "./formApi";
import { questionApi } from "./questionApi";
import { optionApi } from "./optionApi";
import { userApi } from "./userApi";


export const store = configureStore({
    reducer: { 
        [departmentApi.reducerPath]: departmentApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [sectionApi.reducerPath]: sectionApi.reducer,
        [buildingApi.reducerPath]: buildingApi.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [formApi.reducerPath]: formApi.reducer,
        [questionApi.reducerPath]: questionApi.reducer,
        [optionApi.reducerPath]: optionApi.reducer,
        [userApi.reducerPath]: userApi.reducer
        

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(departmentApi.middleware)
    .concat(courseApi.middleware)
    .concat(sectionApi.middleware)
    .concat(buildingApi.middleware)
    .concat(roomApi.middleware)
    .concat(formApi.middleware)
    .concat(questionApi.middleware)
    .concat(optionApi.middleware)
    .concat(userApi.middleware),
});
