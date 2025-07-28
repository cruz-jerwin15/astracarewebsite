import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {localServer} from './localServer';
export const questionApi = createApi({
    reducerPath:"questionApi",
    baseQuery:fetchBaseQuery({baseUrl:localServer}),
    tagTypes:["Question"],
    endpoints:(builder)=>(
        {
            getQuestions:builder.query({
                query:()=>"/questions/",
                providesTags:["Question"]
            }),
            getQuestion:builder.query({
                query:(id)=>`/questions/${id}`,
                providesTags:["Question"]
            }),
            getQuestionWithOptions:builder.query({
                query:(form_id)=>`/questions/form/${form_id}/questions-with-options`,
                providesTags:["Question"]
            }),
            addQuestions:builder.mutation({
                query:(questions)=>({
                    url:"/questions/",
                    method:"POST",
                    body:questions
                }),
                invalidatesTags:["Question"]
            }),
            updateQuestions:builder.mutation({
                query:(questions)=>({
                    url:`/questions/${questions.id}`,
                    method:"PUT",
                    body:questions
                }),
                invalidatesTags:["Question"]
            }),
            updateQuestionsStatus:builder.mutation({
                query:(questions)=>({
                    url:`/questions/${questions.id}/status`,
                    method:"PATCH",
                    body:questions
                }),
                invalidatesTags:["Question"]
            })
           
        }
    )
})
export const {useGetQuestionsQuery,useGetQuestionQuery,useGetQuestionWithOptionsQuery,useUpdateQuestionsMutation,useUpdateQuestionsStatusMutation,useAddQuestionsMutation} = questionApi