import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminTopNav from "../components/AdminTopNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState(""); // State for category name
  const navigate = useNavigate();
  const { isNavOpen } = useAdminContext();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const data = {
      category: categoryName, // Only the category name
    };

    try {
      await axios.post(
        "http://localhost:5000/api/category/add",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Category added successfully!");
      navigate("/admin/categories");
    } catch (error) {
      console.log(error.response?.data)
      alert(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className="relative">
      <AdminNav />
      <AdminTopNav />
      <div
        className="px-[12px] sm:px-[50px] py-[20px] bg-[#f8f9fb] color-[#627183] absolute top-[60px] transition-all duration-300"
        style={{
          left: isNavOpen ? "220px" : "0px",
          width: isNavOpen ? "calc(100% - 220px)" : "100%",
        }}
      >
        <div className="md:w-[70%] w-[100%] mx-auto mt-6">
          <h2 className="text-[18px] font-[600]">Add Category</h2>
          <form className="mt-[35px]" onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="flex items-center sm:gap-4 gap-2">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="text-[14px] leading-[18px] font-[600]"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="py-[8px] px-[18px] text-[14px] rounded-[8px] bg-black text-white hover:bg-transparent hover:text-black border border-black transition-all duration-300"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
