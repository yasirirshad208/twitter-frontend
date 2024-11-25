import React, { useEffect, useState } from 'react';
import AdminNav from '../components/AdminNav';
import AdminTopNav from '../components/AdminTopNav';
import axios from 'axios';

const NewsCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news-category/all');
        setCategories(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news categories.');
        setLoading(false);
      }
    };

    fetchNewsCategories();
  }, []);

  return (
    <div className='relative'>
      <AdminNav />
      <AdminTopNav />
      <div
        className='px-[12px] sm:px-[50px] py-[20px] bg-[#f8f9fb] color-[#627183] absolute top-[60px] transition-all duration-300'
        style={{
          left: '220px', // Assuming isNavOpen is always true
          width: 'calc(100% - 220px)',
        }}
      >
        <div
          className='w-full rounded-[15px] p-4 bg-white'
          style={{
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
          }}
        >
          <div className='text-[18px] font-bold mb-4 ml-3 leading-[24px] font-[600]'>News Categories</div>

          {loading ? (
            <div className='text-center'>Loading...</div>
          ) : error ? (
            <div className='text-center text-red-500'>{error}</div>
          ) : (
            <div className='overflow-x-auto'>
              <div className='flex items-center justify-between bg-[#f8f9fb] text-[13px] leading-[20px] font-[500] text-[#627183] px-3 py-4 rounded-[5px]'>
                <div className='flex-1 px-3'>#</div>
                <div className='flex-1 px-3'>TOPIC</div>
                <div className='flex-1 px-3'>DESCRIPTION</div>
                <div className='flex-1 px-3'>TYPE</div>
                <div className='flex-1 px-3'>IMAGE</div>
                <div className='flex-1 px-3'>UPDATE</div>
              </div>

              {categories.map((category, index) => (
                <div
                  key={category._id}
                  className='flex items-center justify-between text-[14px] leading-[20px] font-[500] px-3 py-5 rounded-[5px] hover:shadow-custom cursor-pointer'
                >
                  <div className='flex-1 px-3'>{index + 1}</div>
                  <div className='flex-1 px-3'>{category.topic}</div>
                  <div className='flex-1 px-3'>{category.description}</div>
                  <div className='flex-1 px-3'>{category.type}</div>
                  <div className='flex-1 px-3'>
                    <img
                      src={category.image}
                      alt={category.topic}
                      className='w-12 h-12 rounded-full object-cover'
                    />
                  </div>
                  <div className='flex-1 px-3'>
                    <button className='px-2 py-1 bg-blue-500 text-white rounded'>Update</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCategory;
