import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {localServer} from './localServer';
export const optionApi = createApi({
    reducerPath:"optionApi",
    baseQuery:fetchBaseQuery({baseUrl:localServer}),
    tagTypes:["Option"],
    endpoints:(builder)=>(
        {
            getOptions:builder.query({
                query:()=>"/options/",
                providesTags:["Option"]
            }),
            getOption:builder.query({
                query:(id)=>`/options/${id}`,
                providesTags:["Option"]
            }),
            addOptions:builder.mutation({
                query:(options)=>({
                    url:"/options/",
                    method:"POST",
                    body:options
                }),
                invalidatesTags:["Option"]
            }),
            addOptionsBulk:builder.mutation({
                query:(options)=>({
                    url:"/options/bulk/",
                    method:"POST",
                    body:options
                }),
                invalidatesTags:["Option"]
            }),
            updateOptions:builder.mutation({
                query:(options)=>({
                    url:`/options/${options.id}`,
                    method:"PUT",
                    body:options
                }),
                invalidatesTags:["Option"]
            }),
            updateOptionsStatus:builder.mutation({
                query:(options)=>({
                    url:`/options/${options.id}/status`,
                    method:"PATCH",
                    body:options
                }),
                invalidatesTags:["Option"]
            })
           
        }
    )
})
export const {useGetOptionsQuery,useGetOptionQuery,useUpdateOptionsMutation,useUpdateOptionsStatusMutation,useAddOptionsMutation,useAddOptionsBulkMutation} = optionApi