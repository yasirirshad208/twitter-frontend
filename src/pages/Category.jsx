import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminTopNav from "../components/AdminTopNav";
import axios from "axios";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const TopCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {isNavOpen} = useAdminContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNewsCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/category/all"
        );
        setCategories(response.data.categories);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch top categories."); 
        setLoading(false);
      }
    };

    fetchNewsCategories();
  }, []);

  return (
    <div className="relative">
      <AdminNav />
      <AdminTopNav />
      <div
        className="px-[12px] sm:px-[50px] py-[20px] bg-[#f8f9fb] color-[#627183] absolute top-[60px] transition-all duration-300"
        style={{
          left: isNavOpen ? '220px' : '0px',
          width: isNavOpen ? 'calc(100% - 220px)' : '100%',
        }}
      >
        <div
          className="w-full rounded-[15px] p-4 bg-white"
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
          }}
        >
           <div className="flex justify-between">
            <div className="text-[18px] font-bold mb-4 ml-3 leading-[24px] font-[600]">
              Categories
            </div>
            <div>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded text-[14px]"
                onClick={() => navigate("/admin/add/category")}
              >
                Add Category
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex items-center justify-between bg-[#f8f9fb] text-[13px] leading-[20px] font-[500] text-[#627183] px-3 py-4 rounded-[5px]">
                <div className="flex-1 px-3">#</div>
                <div className="flex-1 px-3">CATEGORY</div>
                <div className="flex-1 px-3">CREATED AT</div>
                <div className="flex-1 px-3">UPDATE</div>
              </div>

                {categories.map((category, index) => (
                  <div
                    key={category._id}
                    className="flex items-center justify-between text-[14px] leading-[20px] font-[500] px-3 py-5 rounded-[5px] hover:shadow-custom cursor-pointer"
                  >
                    <div className="flex-1 px-3">{index + 1}</div>
                    <div className="flex-1 px-3">{category.category}</div>
                    
                  <div className="flex-1 px-3">
  {new Date(category.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(",", "")}
</div>

                    <div className="flex-1 px-3">
                      <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={()=>navigate('/admin/update/category', {state:{id:category._id}})}>
                        Update
                      </button>
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

export default TopCategory;
