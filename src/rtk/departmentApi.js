import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const departmentApi = createApi({
    reducerPath:"departmentApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000/api"}),
    tagTypes:["Department"],
    endpoints:(builder)=>(
        {
            getDepartments:builder.query({
                query:()=>"/departments/",
                providesTags:["Department"]
            }),
            getDepartment:builder.query({
                query:(id)=>`/departments/${id}`,
                providesTags:["Department"]
            }),
            addDepartments:builder.mutation({
                query:(departments)=>({
                    url:"/departments/",
                    method:"POST",
                    body:departments
                }),
                invalidatesTags:["Department"]
            }),
            updateDepartments:builder.mutation({
                query:(departments)=>({
                    url:`/departments/${departments.id}`,
                    method:"PUT",
                    body:departments
                }),
                invalidatesTags:["Department"]
            }),
            updateDepartmentsStatus:builder.mutation({
                query:(departments)=>({
                    url:`/departments/${departments.id}/status`,
                    method:"PATCH",
                    body:departments
                }),
                invalidatesTags:["Department"]
            })
           
        }
    )
})
export const {useGetDepartmentsQuery,useGetDepartmentQuery,useUpdateDepartmentsMutation,useUpdateDepartmentsStatusMutation,useAddDepartmentsMutation} = departmentApi