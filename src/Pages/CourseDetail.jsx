import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useGetSectionsForCourseQuery,
  useGetCourseDetailQuery,
  useGetChapterForSectionQuery,
} from "../store/apiSlice";
import Dropdown from "../Components/Dropdown";

function ChapterList({id}){

    const {data : chapters, isLoading : isChaptertloading} = useGetChapterForSectionQuery(id)

    return (
        <div>
            {Array.isArray(chapters) && chapters.map((chapter) => (
                <div key={chapter.id} className="flex justify-between">
                    <p>{chapter.title}</p>
                    <p>{chapter.duration}</p>
                </div>
            ))}
        </div>
    )
}

function CourseDetail() {
  const { courseId } = useParams();
  const { data: sections, isLoading: isSectionLoading } =
    useGetSectionsForCourseQuery(courseId);
  const { data: course, isLoading: isCourseLoading } =
    useGetCourseDetailQuery(courseId);

  if (isSectionLoading || isCourseLoading) {
    return <h1>Course details Loading....</h1>;
  }
  if (!course) return <h1>Course not found</h1>;
  return (
    <div className="flex h-full w-full p-10">

      <div className="flex flex-col gap-4">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <div className="flex flex-row gap-2">
            <span>5</span>
            <ul className="flex flex-row items-center">
                {[...Array(5)].map((_, i) => (
                <li key={i}>
                    <img src="/image/star_icon.png" alt="" />
                </li>
                ))}
            </ul>
            <span>(122)</span>
        </div>
        <div>
            <h1>Course Structure</h1>
            {Array.isArray(sections) && sections.map((section) => {
                 return (
                    <Dropdown
                        key={section.id}
                        title={section.title}
                        subtitle={section.Subtitle}>
                            <ChapterList id={section.id}/>
                    </Dropdown>
                )
            })}
        </div>
        <div>
            <h1>Course Description</h1>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit tempora officiis porro amet dicta quasi, mollitia tempore harum fuga, nam necessitatibus velit magnam aut neque deserunt voluptates. Nemo, repellat quod.</p>
            <ul>
                <li>Understand the basics of programming</li>
                <li>Create dynamic web applications</li>
                <li>Learn how to manipulate the DOM</li>
            </ul>
        </div>
      </div>

      <div
        key={course.id}
        className="h-150 rounded-xl shadow-md flex flex-col hover:shadow-lg transition"
      >
        <img
          className="w-full h-1/2 object-cover rounded-t-xl"
          src={course.imgUrl}
          alt=""
        />
        <div className="h-1/2 w-4/5 ml-3 flex flex-col gap-1 mt-3">
          <h1 className="text-[#0E0E0E] text-1xl font-bold">{course.title}</h1>
          <span>{course.description}</span>
          <div className="flex flex-row gap-2">
            <span>5</span>
            <ul className="flex flex-row items-center">
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <img src="/image/star_icon.png" alt="" />
                </li>
              ))}
            </ul>
            <span>(122)</span>
          </div>
          <h1>{course.price}</h1>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
