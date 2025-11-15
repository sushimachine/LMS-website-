import { createApi } from "@reduxjs/toolkit/query/react";
import supabaseService from "../Auth/SupabaseService";
import { supabase } from '../conf/conf';

const fakebaseQuery = () => ({
    data : {}
})

export const apiSlice = createApi({

    reducerPath : 'api',
    baseQuery : fakebaseQuery,

    tagTypes : ['courses', 'section', 'chapter'],

    endpoints : (builder) => ({
        getCourses : builder.query({
            async queryFn(){
                try{
                    const {data, error} = await supabase.from('courses').select('*')
                    if(error) throw error
                    return {data : data};
                }
                catch(error){
                    return {error : {status : error.code, data : error.data}}
                }
            },
            providesTags : ['courses'],
        }),
        
        addCourses: builder.mutation({
            async queryFn(newCourse){
                try{
                    const {data, error} = await supabase.from('courses').insert(newCourse).select()
                    if(error) throw error

                    return {data : data}
                }
                catch(error){
                    return {error : {status : error.code, data : error.data}}
                }
            },
            invalidatesTags : ['courses']
        }),

        getCourseDetail : builder.query({
            async queryFn(uId){
                try{
                    const {data, error} = await supabase.from('courses').select('*').eq('id', uId).single()
                    if(error) throw error

                    return {data : data}
                }
                catch(error){
                    return {error : {status : error.code, data : error.data}}
                }
            },
            providesTags: (result, error, id) => [{ type: 'courses', id: id }]
        }),

        getSectionsForCourse : builder.query({
            async queryFn(Id){
                try{
                    const {data, error} = await supabase.from('section').select('*').eq('course_id', Id)
                    if(error) throw error

                    return {data : data}
                }
                catch(error){
                    return {error : {status : error.code, data : error.data}}
                }
            },
            providesTags : ['section']

        }),

        getChapterForSection : builder.query({
            async queryFn(Id){
                try{
                    const {data, error} = await supabase.from('chapter').select('*').eq('section_id', Id)

                    if(error) throw error 

                    return {data : data}
                }
                catch(error){
                    return {error : {status : error.code, data : error.data}}
                }
            },
            providesTags : ['chapter']
        })

    }),

});

export const {useGetCoursesQuery, useAddCoursesMutation, useGetCourseDetailQuery, useGetChapterForSectionQuery, useGetSectionsForCourseQuery} = apiSlice