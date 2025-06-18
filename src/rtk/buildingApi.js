import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const buildingApi = createApi({
    reducerPath:"buildingApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000/api"}),
    tagTypes:["Building"],
    endpoints:(builder)=>(
        {
            getBuildings:builder.query({
                query:()=>"/buildings/",
                providesTags:["Building"]
            }),
            getBuilding:builder.query({
                query:(id)=>`/buildings/${id}`,
                providesTags:["Building"]
            }),
            addBuildings:builder.mutation({
                query:(buildings)=>({
                    url:"/buildings/",
                    method:"POST",
                    body:buildings
                }),
                invalidatesTags:["Building"]
            }),
            updateBuildings:builder.mutation({
                query:(buildings)=>({
                    url:`/buildings/${buildings.id}`,
                    method:"PUT",
                    body:buildings
                }),
                invalidatesTags:["Building"]
            }),
            updateBuildingsStatus:builder.mutation({
                query:(buildings)=>({
                    url:`/buildings/${buildings.id}/status`,
                    method:"PATCH",
                    body:buildings
                }),
                invalidatesTags:["Building"]
            })
           
        }
    )
})
export const {useGetBuildingsQuery,useGetBuildingQuery,useUpdateBuildingsMutation,useUpdateBuildingsStatusMutation,useAddBuildingsMutation} = buildingApi