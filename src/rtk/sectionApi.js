import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {localServer} from './localServer';
export const sectionApi = createApi({
    reducerPath:"sectionApi",
    baseQuery:fetchBaseQuery({baseUrl:localServer}),
    tagTypes:["Section"],
    endpoints:(builder)=>(
        {
            getSections:builder.query({
                query:()=>"/sections/",
                providesTags:["Section"]
            }),
            getSection:builder.query({
                query:(id)=>`/sections/${id}`,
                providesTags:["Section"]
            }),
            addSections:builder.mutation({
                query:(sections)=>({
                    url:"/sections/",
                    method:"POST",
                    body:sections
                }),
                invalidatesTags:["Section"]
            }),
            updateSections:builder.mutation({
                query:(sections)=>({
                    url:`/sections/${sections.id}`,
                    method:"PUT",
                    body:sections
                }),
                invalidatesTags:["Section"]
            }),
            updateSectionsStatus:builder.mutation({
                query:(sections)=>({
                    url:`/sections/${sections.id}/status`,
                    method:"PATCH",
                    body:sections
                }),
                invalidatesTags:["Section"]
            })
           
        }
    )
})
export const {useGetSectionsQuery,useGetSectionQuery,useUpdateSectionsMutation,useUpdateSectionsStatusMutation,useAddSectionsMutation} = sectionApi