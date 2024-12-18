import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "../components/AdminNav";
import AdminTopNav from "../components/AdminTopNav";
import { useAdminContext } from "../context/AdminContext";

const UpdateSubCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {}; // Get the id from the state
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const { isNavOpen } = useAdminContext();

  useEffect(() => {
    if (!id) {
      navigate("/admin/sub-categories");
      return;
    }
  
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await axios.get("http://localhost:5000/api/category/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(categoriesRes.data.categories);
  
        // Fetch existing sub-category data
        const subCategoryRes = await axios.get(`http://localhost:5000/api/sub-category/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const { categoryId, subCategory } = subCategoryRes.data.data;
        setCategoryId(categoryId);
        setSubCategoryName(subCategory); // Ensure this is set correctly
  
      } catch (error) {
        alert("Error fetching data!");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id, navigate, token]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/sub-category/update/${id}`,
        { categoryId, subCategory: subCategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Sub-category updated successfully!");
      navigate("/admin/sub-categories");
    } catch (error) {
      alert("Error updating sub-category!");
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
          <h2 className="text-[18px] font-[600]">Update Sub-Category</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <form className="mt-[35px]" onSubmit={handleSubmit}>
              {/* Category Dropdown */}
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="category" className="text-[14px] font-[600]">
                  Select Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="px-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
                >
                  <option value="">-- Select Category --</option>
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
                  id="subCategory"
                  type="text"
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
                  Update Sub-Category
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
