import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import AdminTopNav from "../components/AdminTopNav";
import { useAdminContext } from "../context/AdminContext";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const UpdateSuggestedArticle = () => {
  const [account, setAccount] = useState("");
  const { isNavOpen } = useAdminContext();
  const navigate = useNavigate();
  const location = useLocation();

  // State to store form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    subCategory: "",
    chatgptInstructions: "",
    accounts: [],
    showAtHeader: false,
    image: null,
  });
  
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [id, setId] = useState(location.state?.id || "");
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id === "") {
      navigate("/admin/suggested-articles");
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/suggested-category/single/${id}`
        );

        // Format the date to YYYY-MM-DD
        const formattedDate = new Date(response.data.data.date).toISOString().split("T")[0];

        // Set form data including the formatted date
        setFormData({
          ...response.data.data,
          category:response.data.data.categoryId,
          date: formattedDate,  // Use the formatted date here
        });

      } catch (error) {
        alert("Failed to fetch.");
        navigate("/admin/suggested-articles");
      }
    };

    fetchArticle();

    // Fetch categories and sub-categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category/all');
        setCategories(response.data.categories); // Assuming categories is an array in the response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
    
  }, [id, navigate]);

  // Handle category change and fetch sub-categories
  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory });

    try {
      const response = await axios.get(
        `http://localhost:5000/api/sub-categories/${selectedCategory}`
      );
      setSubCategories(response.data.subCategories); // Assuming sub-categories are fetched based on category
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
    }
  };

  // Handle account change
  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  const handleAddAccount = () => {
    if (formData.accounts.length === 20) {
      alert("You can add a maximum of 20 accounts");
      return;
    }
    if (account.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        accounts: [...prevData.accounts, account],
      }));
      setAccount("");
    }
  };

  const handleRemoveAccount = (val) => {
    const filteredAccs = formData.accounts.filter((v) => v !== val);
    setFormData((prevData) => ({
      ...prevData,
      accounts: filteredAccs,
    }));
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;

    const form = new FormData();
    form.append("category", formData.category);
    form.append("subCategory", formData.subCategory);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("date", formData.date);
    form.append("showAtHeader", formData.showAtHeader);
    form.append("accounts", formData.accounts);
    form.append("chatgptInstructions", formData.chatgptInstructions);
    if (formData.image) form.append("image", formData.image);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/suggested-category/update/${id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Article updated successfully!");
      navigate("/admin/suggested-articles");
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Failed to update article.");
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
          <h2 className="text-[18px] font-[600]">Update Suggested Article</h2>
          <form className="mt-[35px]" onSubmit={handleSubmit}>
            {/* Category and Sub-category */}
            <div>
              <label htmlFor="category" className="text-[14px] leading-[18px] font-[600]">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="mt-6">
              <label htmlFor="subCategory" className="text-[14px] leading-[18px] font-[600]">
                Subcategory
              </label>
              <select
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
              >
                <option value="">Select Sub-category</option>
                {subCategories.map((subCat) => (
                  <option key={subCat._id} value={subCat._id}>
                    {subCat.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="mt-6">
              <label htmlFor="subCategory" className="text-[14px] leading-[18px] font-[600] ">
              Subcategory
              </label>
              <input
                type="text"
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
              />
            </div>

            {/* Title */}
            <div className="mt-6">
              <label htmlFor="title" className="text-[14px] leading-[18px] font-[600]">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <label htmlFor="description" className="text-[14px] leading-[18px] font-[600]">
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

            {/* Date */}
            <div className="mt-6">
              <label htmlFor="date" className="text-[14px] leading-[18px] font-[600]">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
              />
            </div>

            {/* ChatGPT Instructions */}
            <div className="mt-6">
              <label htmlFor="chatgptInstructions" className="text-[14px] leading-[18px] font-[600]">
                ChatGPT Instructions
              </label>
              <textarea
                id="chatgptInstructions"
                name="chatgptInstructions"
                value={formData.chatgptInstructions}
                onChange={handleChange}
                className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[76px] outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                id="showAtHeader"
                name="showAtHeader"
                checked={formData.showAtHeader}
                onChange={handleChange}
                className="mr-2"
              />
              <label
                htmlFor="showAtHeader"
                className="text-[14px] leading-[18px] font-[600]"
              >
                Show at Header
              </label>
            </div>

            {/* Accounts */}
            <div className="mt-6">
              <label
                htmlFor="accounts"
                className="text-[14px] leading-[18px] font-[600]"
              >
                Accounts
              </label>
              <div className="mt-[8px] w-full flex items-center gap-2 h-[42px]">
                <input
                  type="text"
                  id="accounts"
                  name="accounts"
                  value={account}
                  onChange={handleAccountChange}
                  className=" w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-full outline-none focus:border-blue-500"
                />
                <div
                  className="bg-black text-white px-3 h-full rounded-[5px] flex items-center cursor-pointer"
                  onClick={handleAddAccount}
                >
                  Add
                </div>
              </div>

              <div className="flex items-center mt-2 sm:gap-3 gap-1 flex-wrap">
                {formData.accounts.map((acc) => {
                  return (
                    <span className="text-[#000] sm:text-[14px] text-[12px] flex items-center gap-2 bg-[#D7D3BF] px-3 py-1 rounded-[14px]">
                      {acc}{" "}
                      <RxCross2
                        className="sm:text-[14px] text-[12px] cursor-pointer"
                        onClick={() => handleRemoveAccount(acc)}
                      />
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Image */}
            <div className="mt-6">
  <label htmlFor="image" className="text-[14px] leading-[18px] font-[600]">
    Image
  </label>
  <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    onChange={handleChange}
    className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
  />
  {formData.image && (
    <p className=" text-[14px] text-[#627183]">
      Selected File: {formData.image}
    </p>
  )}
</div>

           <div className="mt-8">
           <button
              type="submit"
              className="py-[8px] px-[18px] text-[14px] rounded-[8px] bg-black text-white hover:bg-transparent hover:text-black border border-black transition-all duration-300">
               Update Article
            </button>
           </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSuggestedArticle;
