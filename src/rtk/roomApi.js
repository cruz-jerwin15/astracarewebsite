import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {localServer} from './localServer';
export const roomApi = createApi({
    reducerPath:"roomApi",
    baseQuery:fetchBaseQuery({baseUrl:localServer}),
    tagTypes:["Room"],
    endpoints:(builder)=>(
        {
            getRooms:builder.query({
                query:()=>"/rooms/",
                providesTags:["Room"]
            }),
            getRoom:builder.query({
                query:(id)=>`/rooms/${id}`,
                providesTags:["Room"]
            }),
            addRooms:builder.mutation({
                query:(rooms)=>({
                    url:"/rooms/",
                    method:"POST",
                    body:rooms
                }),
                invalidatesTags:["Room"]
            }),
            updateRooms:builder.mutation({
                query:(rooms)=>({
                    url:`/rooms/${rooms.id}`,
                    method:"PUT",
                    body:rooms
                }),
                invalidatesTags:["Room"]
            }),
            updateRoomsStatus:builder.mutation({
                query:(rooms)=>({
                    url:`/rooms/${rooms.id}/status`,
                    method:"PATCH",
                    body:rooms
                }),
                invalidatesTags:["Room"]
            })
           
        }
    )
})
export const {useGetRoomsQuery,useGetRoomQuery,useUpdateRoomsMutation,useUpdateRoomsStatusMutation,useAddRoomsMutation} = roomApi