import React from 'react'
import { useGetTeachermycourseQuery } from '../../store/apiSlice'
import { useAuth } from '../../Context/Authcontext'

function Mycourse() {

    const {user} = useAuth()
    const {data : mycourses, isLoading, isError} = useGetTeachermycourseQuery(user.id)

    if(isLoading) return <h1>loading....</h1>

    if(isError) return <h1>Error loading mycourse.</h1>
  return (
    <div className="w-full h-full flex flex-col items-center m-5">
      <div className="w-3/4 h-30 flex flex-row justify-around items-center p-4">
        <div className="w-1/3 flex flex-col">
          <h1 className="text-3xl font-bold">course List</h1>
          <p><span className="text-[#2563EB]">Home</span> / course list</p>
        </div>

        <div className="w-2/3 relative flex flex-row items-center justify-end">
          <img
            src="/image/search_icon.svg"
            className="absolute pl-2 left-1"
            alt=""
          />
          <input
            type="text"
            placeholder="Search for mycourses"
            className="h-10 w-full p-6 pl-10 border border-[#6B728033] bg-[#FFFFFF]"
          />
          <button className="absolute w-1/5 h-9 bg-[#2563EB] right-1 text-[#FFFFFF] rounded-sm">
            Search
          </button>
        </div>
      </div>

      <div className=" w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {Array.isArray(mycourses) && mycourses.map((mycourse) =>{ 
          console.log("Image URL:", mycourse.imgUrl);
          return (
          <div key={mycourse.id} className="h-80 rounded-xl shadow-md flex flex-col hover:shadow-lg transition">
            <img className="w-full h-1/2 object-cover rounded-t-xl" src={mycourse.imgUrl} alt="" />
            <div className="h-1/2 w-4/5 ml-3 flex flex-col gap-1 mt-3">
              <h1 className="text-[#0E0E0E] text-1xl font-bold">{mycourse.title}</h1>
              <span>{mycourse.description}</span>
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
              <h1>{mycourse.price}</h1>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default Mycourse
