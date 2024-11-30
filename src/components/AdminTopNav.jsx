import React, { useContext, useEffect } from 'react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { useAdminContext } from '../context/AdminContext'
import AuthContext from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const AdminTopNav = () => {

    const { isNavOpen, updateNavStatus } = useAdminContext()
    const {isAdmin} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
      if(!isAdmin){
        navigate('/')
      }
    },[])
    const handleToggle = ()=>{
        updateNavStatus(!isNavOpen)
    }
  
    return (

    <div className='h-[60px] absolute top-0 border-b border-b-[#ccc] p-4 flex justify-between items-center transition-all duration-300'  style={{
        left: isNavOpen ? '220px' : '0px',
        width: isNavOpen ? 'calc(100% - 220px)' : '100%', 
      }}>
        <div className='text-[26px] flex items-center h-[100%] cursor-pointer' onClick={handleToggle}><HiMenuAlt1 /></div>
        <div className='mr-4'><button className='text-white bg-black px-[22px] py-[10px] rounded-[50px] text-[15px] font-[500]' onClick={()=> navigate('/')}>Website</button></div>
    </div>
  )
}

export default AdminTopNav