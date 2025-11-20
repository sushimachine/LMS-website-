import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { 
  useGetCourseDetailQuery, 
  useUpdateCourseMutation,
  useGetChapterForSectionQuery,
  useGetSectionsForCourseQuery 
} from '../../store/apiSlice';

function EditCourse() {
  // Match the param name from your router (courseId)
  const { courseId } = useParams(); 

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  // Fetch the data
  const { data: course, isLoading } = useGetCourseDetailQuery(courseId);
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  const {data : sections, isSectionLoading} = useGetSectionsForCourseQuery()

  // Pre-fill the form when data arrives
  useEffect(() => {
    if (course) {
      reset({
        title: course.title,
        description: course.description,
        price: course.price,
      });
    }
  }, [course, reset]);

  const onSaveDetails = async (data) => {
    try{
      const imageFile = data.image[0]
      let imageUrl = null
      if(imageFile){
        toast.info('uploading image....')
        imageUrl = await uploadCourseImage(imageFile);
        toast.success('image uloaded succesfully')
      }

      const newCourseInfo = {
        title : data.title,
        description : data.description,
        price : data.price,
        imgUrl : imageUrl,
      }

      await updateCourse(newCourseInfo).unwrap()
    }
    catch(error){
        console.log("failed to add course :" , error)
        toast.error('failed to add')
    }
  };

  // Handle loading state so it doesn't crash
  if (isLoading) return <div>Loading course data...</div>;

  return (
    <div>
      <h1>Edit Course: {course?.title}</h1>
      
      <form onSubmit={handleSubmit(onSaveDetails)} className="h-screen w-screen m-6 flex flex-col gap-6">
        
        <div className="w-3/10 h-15 flex flex-col justify-around">
          <label htmlFor="title" className="font-semibold">Title</label>
          <input 
            type="text" 
            id="title"
            className="w-full h-8 p-4 mt-2 border"
            placeholder="Enter the title"
            // No 'value' prop. react-hook-form handles it via 'reset'
            {...register("title", { required: true })}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>


        <div className="w-3/10 h-20 flex flex-col gap-2">
          <label htmlFor="description" className="font-semibold">Description</label>
          <input 
            type="text"
            id="description"
            className="h-15 w-full pl-4 pt-1 border"
            {...register("description", { required: true })} 
          />
        </div>

        <div className="w-3/10 h-15 flex flex-col gap-2">
          <label htmlFor="price">Course Price</label>
          <input 
            type="number" 
            id="price"
            className="h-7 w-full p-4 border"
            {...register("price", { required: true, valueAsNumber: true })} 
          />
        </div>

        <div className="w-3/10 h-9 mt-4 flex flex-row gap-2 justify-center items-center">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="h-16 w-16 object-cover rounded" 
          />
          
          <label className="font-semibold">Update Image:</label>
          <input type="file" accept="image/*" {...register("image")} />
        </div>

        <div className="h-9 w-3/10 mt-2 text-[#FFFFFF] flex justify-end">
          <button type="submit" className="h-full w-1/4 border bg-[#2563EB]" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>

      <form>
        <h1>Course Chapter</h1>
        
        {sections && sections.map((section) => (
          
        ))}
      </form>
    </div>
  );
}

export default EditCourse;