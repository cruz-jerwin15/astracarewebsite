import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {localServer} from './localServer';
export const courseApi = createApi({
    reducerPath:"courseApi",
    baseQuery:fetchBaseQuery({baseUrl:localServer}),
    tagTypes:["Course"],
    endpoints:(builder)=>(
        {
            getCourses:builder.query({
                query:()=>"/courses/",
                providesTags:["Course"]
            }),
            getCourse:builder.query({
                query:(id)=>`/courses/${id}`,
                providesTags:["Course"]
            }),
            addCourses:builder.mutation({
                query:(courses)=>({
                    url:"/courses/",
                    method:"POST",
                    body:courses
                }),
                invalidatesTags:["Course"]
            }),
            updateCourses:builder.mutation({
                query:(courses)=>({
                    url:`/courses/${courses.id}`,
                    method:"PUT",
                    body:courses
                }),
                invalidatesTags:["Course"]
            }),
            updateCoursesStatus:builder.mutation({
                query:(courses)=>({
                    url:`/courses/${courses.id}/status`,
                    method:"PATCH",
                    body:courses
                }),
                invalidatesTags:["Course"]
            })
           
        }
    )
})
export const {useGetCoursesQuery,useGetCourseQuery,useUpdateCoursesMutation,useUpdateCoursesStatusMutation,useAddCoursesMutation} = courseApi