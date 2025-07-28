import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {localServer} from './localServer';
// import {localServer} from './localServer'


export const userApi = createApi({
    reducerPath:"userApi",
    // baseQuery:fetchBaseQuery({baseUrl:"http://192.168.1.3:8000/api"}),
    baseQuery:fetchBaseQuery({baseUrl:localServer}),
    tagTypes:["User"],
    endpoints:(builder)=>(
        {
           
            getUsers:builder.query({
                query:()=>"/users/all-users",
                providesTags:["User"]
            }),
            addUsersLogin:builder.mutation({
                query:(users)=>({
                    url:"/users/login/",
                    method:"POST",
                    body:users
                }),
                invalidatesTags:["User"]
            }),
            updateUsersStatus:builder.mutation({
                query:(users)=>({
                    url:`/users/${users.id}/status`,
                    method:"PUT",
                    body:users
                }),
                invalidatesTags:["User"]
            })
           
           
        }
    )
})
export const {useGetUsersQuery,useAddUsersLoginMutation,useUpdateUsersStatusMutation} = userApi