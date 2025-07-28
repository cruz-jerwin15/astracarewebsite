import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {localServer} from './localServer';
export const formApi = createApi({
    reducerPath:"formApi",
    baseQuery:fetchBaseQuery({baseUrl:localServer}),
    tagTypes:["Form"],
    endpoints:(builder)=>(
        {
            getForms:builder.query({
                query:()=>"/forms/",
                providesTags:["Form"]
            }),
            
            getForm:builder.query({
                query:(id)=>`/forms/id/${id}`,
                providesTags:["Form"]
            }),
            getFormKey:builder.query({
                query:(id)=>`/forms/key/${id}`,
                providesTags:["Form"]
            }),
            addForms:builder.mutation({
                query:(forms)=>({
                    url:"/forms/",
                    method:"POST",
                    body:forms
                }),
                invalidatesTags:["Form"]
            }),
            updateForms:builder.mutation({
                query:(forms)=>({
                    url:`/forms/${forms.id}`,
                    method:"PUT",
                    body:forms
                }),
                invalidatesTags:["Form"]
            }),
            updateFormsStatus:builder.mutation({
                query:(forms)=>({
                    url:`/forms/${forms.id}/status`,
                    method:"PATCH",
                    body:forms
                }),
                invalidatesTags:["Form"]
            })
           
        }
    )
})
export const {useGetFormsQuery,useGetFormQuery,useGetFormKeyQuery,useUpdateFormsMutation,useUpdateFormsStatusMutation,useAddFormsMutation} = formApi