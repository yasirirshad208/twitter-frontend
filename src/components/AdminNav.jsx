import React from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import { IoNewspaperOutline } from 'react-icons/io5'
import { LuUsers2 } from 'react-icons/lu'
import {  MdOutlineUnsubscribe } from 'react-icons/md'
import { RiFileList3Line } from 'react-icons/ri'
import { useAdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const AdminNav = () => {
    const { isNavOpen } = useAdminContext()
    const navigate = useNavigate()

  return (
    <div className={`h-[100vh] fixed w-[220px] border-r border-r-[#ccc] px-4 transition-all duration-300`}
    style={{
      left: isNavOpen ? '0' : '-220px',
    }}>
        <div className='text-[28px] text-black font-bold py-5'>
            Twitter
        </div>
        <nav className='text-[15px] mt-7 flex flex-col gap-7 text-black'>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>navigate('/admin/categories')}><BiCategoryAlt className='mr-2 text-[22px]' />Categories</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>navigate('/admin/suggested-articles')}> <RiFileList3Line  className='mr-2 text-[22px]'/>Suggested Articles</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300'><IoNewspaperOutline className='mr-2 text-[22px]'/>Popular News</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300'><MdOutlineUnsubscribe className='mr-2 text-[22px]'/>Subscriptions</div>
            <div className='flex items-center cursor-pointer hover:text-[#787878] transion-all duration-300' onClick={()=>navigate('/admin/users')}><LuUsers2 className='mr-2 text-[22px]'/>Users</div>
        </nav>
    </div>
  )
}

export default AdminNav