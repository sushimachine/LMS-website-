import React from 'react'
import { Link } from 'react-router-dom'
import { IoReorderThreeOutline } from "react-icons/io5";

function Sidebar() {
  return (
    <div className='h-full w-1/5 flex flex-col p-4'>
      <div className='flex justify-start'>
        <IoReorderThreeOutline />
      </div>
      <div className='flex flex-row p-2'>
        <img src="/image/home_icon.svg" alt="" />
        <span>Dashboard</span>
      </div>
      <div className='flex flex-row p-2'>
        <img src="/image/add_icon.svg" alt="" />
        <span>Add Courses</span>
      </div>
      <div className='flex flex-row p-2'>
        <img src="/image/MyCourse.svg" alt="" />
        <span>My Courses</span>
      </div>
      <div className='flex flex-row p-2'>
        <img src="/image/person_tick_icon.svg" alt="" />
        <span>Students Enrolled</span>
      </div>
    </div>
  )
}

export default Sidebar
