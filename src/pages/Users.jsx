import React, { useEffect, useState } from 'react';
import AdminNav from '../components/AdminNav';
import AdminTopNav from '../components/AdminTopNav';
import { useAdminContext } from '../context/AdminContext';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

const Users = () => {
  const { isNavOpen } = useAdminContext();
  const { state, dispatch } = useUserContext(); 
  const [users, setUsers] = useState(state.users); 

const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: 'FETCH_USERS_REQUEST' });
      try {
        const response = await axios.get('http://localhost:5000/api/user/get/all',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data.data }); 
        setUsers(response.data.data); 
      } catch (error) {
        dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message }); 
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleAdminStatusChange = async (userId, currentStatus) => {
    
    const isConfirmed = window.confirm('Are you sure you want to update the admin status?');
  
    if (!isConfirmed) {
      return; 
    }
  let tok = localStorage.getItem('token')
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/update/admin-status/${userId}`,{
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        } 
    
      );
  
      if (response.status === 200) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, isAdmin: !currentStatus } : user
        )); 
        alert('Admin status updated successfully!');
      } else {
        alert('Failed to update admin status.');
      }
    } catch (error) {
      alert('Error occurred while updating admin status.');
      console.error(error)
    }
  };
  

  if (state.loading) {
    return <div>Loading...</div>; 
  }

  if (state.error) {
    return <div>Error: {state.error}</div>; 
  }

  return (
    <div className='relative'>
      <AdminNav />
      <AdminTopNav />
      <div
        className='px-[12px] sm:px-[50px] py-[20px] bg-[#f8f9fb] color-[#627183] absolute top-[60px] transition-all duration-300'
        style={{
          left: isNavOpen ? '220px' : '0px',
          width: isNavOpen ? 'calc(100% - 220px)' : '100%',
        }}
      >
        <div className='w-full rounded-[15px] p-4 bg-white' style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" }}>
          <div className='text-[18px] font-bold mb-4 ml-3 leading-[24px] font-[600]'>Users</div>

          {/* Make the table horizontally scrollable */}
          <div className='overflow-x-auto'>
            <div className='flex items-center justify-between bg-[#f8f9fb] text-[13px] leading-[20px] font-[500] text-[#627183] px-3 py-4 rounded-[5px]'>
              <div className='flex-1 px-3'>#</div>
              <div className='flex-1 px-3'>NAME</div>
              <div className='flex-1 px-3'>EMAIL</div>
              <div className='flex-1 px-3'>PHONE</div>
              {/* <div className='flex-1 px-3'>EMAIL VERIFIED</div> */}
              <div className='flex-1 px-3'>IS ADMIN</div>
              <div className='flex-1 px-3'>CREATED AT</div>
            </div>

            {/* Table Rows */}
            {users.map((user, index) => (
              <div key={user._id} className='flex items-center justify-between text-[14px] leading-[20px] font-[500] px-3 py-5 rounded-[5px] hover:shadow-custom cursor-pointer'>
                <div className='flex-1 px-3'>{++index}</div>
                <div className='flex-1 px-3'>{user.name}</div>
                <div className='flex-1 px-3'>{user.email}</div>
                <div className='flex-1 px-3'>{user.phone}</div>
                {/* <div className='flex-1 px-3'>
                  <span 
                    className={`px-2 py-[1px] rounded-full text-sm font-semibold 
                    ${user.emailVerified ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                  >
                    {user.emailVerified ? 'Yes' : 'No'}
                  </span>
                </div> */}
                <div className='flex-1 px-3'>
                  <span 
                    className={`px-2 py-[1px] rounded-full text-sm font-semibold 
                    ${user.isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
                    onClick={() => handleAdminStatusChange(user._id, user.isAdmin)} // Handle click to update admin status
                  >
                    {user.isAdmin ? 'Yes' : 'No'}
                  </span>
                </div>

                <div className='flex-1 px-3'>
                  {new Date(user.createdAt).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
