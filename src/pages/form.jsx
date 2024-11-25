import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    showAtHeader:false,
    category:'',
    date: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('showAtHeader', formData.showAtHeader);
    formPayload.append('image', formData.image);
    formPayload.append('category', formData.category);
    formPayload.append('date', formData.date);

    try {
      const response = await fetch('http://localhost:5000/api/suggested-category/add', {
        method: 'POST',
        body: formPayload,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('suggested category added successfully!');
        
      } else {
        setMessage(data.message || 'Failed to add suggested category.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className='p-6 bg-gray-100'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='title'
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
        <input
          type='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
          placeholder='date'
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
        <input
          type='text'
          name='category'
          value={formData.category}
          onChange={handleChange}
          placeholder='category'
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
        <select name="showAtHeader" >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
        <input
          type='file'
          name='image'
          onChange={handleFileChange}
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
        <button
          type='submit'
          disabled={loading}
          className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {message && <p className='mt-4 text-center text-red-500'>{message}</p>}
    </div>
  );
};

export default Form;
