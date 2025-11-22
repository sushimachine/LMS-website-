import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoReorderThreeOutline } from "react-icons/io5";
import { useAuth } from '../../Context/Authcontext';

function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAuth();

  const handleToggle = () => {
    toggleSidebar();
  };

  return (
    <div 
      className={`h-screen flex flex-col p-4 text-[#252525] border-r border-[#637083]
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        transition-all duration-100 ease-in-out`}
    >
      
      <div className='flex justify-center mb-8 ml-1 absolute'>
        <IoReorderThreeOutline 
          className={`text-2xl cursor-pointer ${isSidebarOpen ? '' : 'rotate-180'}`}
          onClick={handleToggle}
        />
      </div>

      <nav className="flex flex-col gap-2 mt-10">
        {[
          { to: '/teacher/dashboard', icon: "/image/home_icon.svg", text: "Dashboard" },
          // { to: '/teacher/addCourse', icon: "/image/add_icon.svg", text: "Edit Courses" },
          { to: '/teacher/mycourse', icon: "/image/MyCourses.png", text: "My Courses" },
          { to: '/', icon: "/image/person_tick_icon.png", text: "Students Enrolled" },
        ].map((item) => (
          
          <Link key={item.to} to={item.to} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100'>
            
            <img src={item.icon} alt="" className={item.to === '/' ? 'h-6' : 'h-5 w-5'} />
            
            {isSidebarOpen && (
              <span className='whitespace-nowrap transition-opacity duration-150'>
                {item.text}
              </span>
            )}
          </Link>
          
        ))}
      </nav>
    </div>
  )
}

export default Sidebar