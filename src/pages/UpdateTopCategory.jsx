import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import AdminTopNav from "../components/AdminTopNav";
import { useAdminContext } from "../context/AdminContext";
import axios from "axios";

const UpdateTopCategory = () => {
  const { isNavOpen } = useAdminContext();
  const navigate = useNavigate();
  const location = useLocation()

  const token = localStorage.getItem('token')
  // State to store form data
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    image: null,
  });
  const [id, setId] = useState(location.state?.id || "");


  useEffect(() => {
    if (id === "") {
      navigate("/admin/top-articles");
      return
    }

    const fetchCategory = async()=>{
        try {
            const response = await axios.get(
              `http://localhost:5000/api/news-category/single/${id}`
            );
            setFormData(response.data.data) 
          } catch (error) {
            alert("Failed to fetch.");
            navigate("/admin/top-articles");
          }
    }
    fetchCategory()
  }, [id, navigate]);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;

    const form = new FormData();
    form.append("topic", formData.topic);
    form.append("description", formData.description);
    if (formData.image) form.append("image", formData.image);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/news-category/update/${id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
             
          },
        }
      );
      alert("Category updated successfully!");
      navigate("/admin/top-articles"); // Navigate back after success
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category.");
    }
  };

  return (
    <div className="relative">
      <AdminNav />
      <AdminTopNav />
      <div
        className="px-[12px] sm:px-[50px] h-full py-[20px] bg-[#f8f9fb] color-[#627183] absolute top-[60px] transition-all duration-300"
        style={{
          left: isNavOpen ? "220px" : "0px",
          width: isNavOpen ? "calc(100% - 220px)" : "100%",
        }}
      >
        <div className="md:w-[70%] w-[100%] mx-auto mt-6">
          <h2 className="text-[18px] font-[600]">Update Top Article</h2>
          <form className="mt-[35px]" onSubmit={handleSubmit}>
            {/* Topic */}
            <div className="flex items-center sm:gap-4 gap-2">
              <div className="flex-1">
                <label
                  htmlFor="topic"
                  className="text-[14px] leading-[18px] font-[600]"
                >
                  Topic Name
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label
                htmlFor="description"
                className="text-[14px] leading-[18px] font-[600]"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[76px] outline-none focus:border-blue-500"
              />
            </div>

            {/* Image */}
            <div className="mt-6">
              <label
                htmlFor="image"
                className="text-[14px] leading-[18px] font-[600]"
              >
                Upload Image
              </label>
              <label htmlFor="image">
              <div className='mt-[8px] flex items-center text-[#33333] bg-white w-full py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] cursor-pointer outline-none focus:border-blue-500'>
              {typeof formData.image === "string" && formData.image.includes("uploads")
        ? formData.image.replace("uploads\\", "").replace("uploads/", "")
        : formData.image instanceof File
        ? formData.image.name // Show the file name if it's a File object
        : "No file selected"}
                            </div>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
            </div>

            {/* Save Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="py-[8px] px-[18px] text-[14px] rounded-[8px] bg-black text-white hover:bg-transparent hover:text-black border border-black transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTopCategory;
