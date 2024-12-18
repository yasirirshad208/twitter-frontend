import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminTopNav from "../components/AdminTopNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

const AddSubCategory = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [categoryId, setCategoryId] = useState(""); // State for selected category ID
  const [subCategoryName, setSubCategoryName] = useState(""); // State for subcategory name
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isNavOpen } = useAdminContext();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/all");
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        alert("Failed to fetch categories!");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      categoryId,
      subCategory: subCategoryName,
    };

    try {
      await axios.post("http://localhost:5000/api/sub-category/add", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Sub-category added successfully!");
      navigate("/admin/subcategories");
    } catch (error) {
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
          <h2 className="text-[18px] font-[600]">Add Sub-Category</h2>
          {loading ? (
            <div className="text-center">Loading categories...</div>
          ) : (
            <form className="mt-[35px]" onSubmit={handleSubmit}>
              {/* Parent Category Selection */}
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="category" className="text-[14px] font-[600]">
                  Select Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className=" px-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
                >
                  <option value="" disabled>
                    -- Select Parent Category --
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Category Name */}
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="subCategory" className="text-[14px] font-[600]">
                  SubCategory 
                </label>
                <input
                  type="text"
                  id="subCategory"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  className="py-[12px] px-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
                  placeholder="Enter sub-category name"
                  required
                />
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="py-[8px] px-[18px] text-[14px] rounded-[8px] bg-black text-white hover:bg-transparent hover:text-black border border-black transition-all duration-300"
                >
                  Add Sub-Category
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
