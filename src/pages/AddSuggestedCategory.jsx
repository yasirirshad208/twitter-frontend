import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminTopNav from "../components/AdminTopNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";
import { RxCross2 } from "react-icons/rx";

const AddSuggestedCategory = () => {
  const [account, setAccount] = useState("")
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    date: "",
    accounts: [],
    showAtHeader: false,
    image: null,
  });

  const navigate = useNavigate();
  const { isNavOpen } = useAdminContext();
  const token = localStorage.getItem('token')

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAccountChange = (e) => {
    setAccount(e.target.value); // Update local account state
  };

  const handleAddAccount = () => {
    if(formData.accounts.length === 20){
      alert("You can add maximun 20 accounts");
      return
    }
    if (account.trim()) { // Check if account is not empty
      setFormData((prevData) => ({
        ...prevData,
        accounts: [...prevData.accounts, account], // Add the account to the accounts array
      }));
      setAccount(""); // Reset the account input field

      console.log(formData.accounts)
    }
  };

 
  const handleRemoveAccount = (val) => {
    const filteredAccs = formData.accounts.filter((v) => v !== val); 
    setFormData((prevData) => ({
      ...prevData,
      accounts: filteredAccs,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("category", formData.category);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("date", formData.date);
    form.append("showAtHeader", formData.showAtHeader);
    form.append("accounts", formData.accounts);
    if (formData.image) form.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/suggested-category/add",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Suggested category added successfully!");
      navigate("/admin/suggested-articles");
    } catch (error) {
      console.error("Error adding suggested category:", error);
      alert("Failed to add suggested category.");
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
          <h2 className="text-[18px] font-[600]">Add Suggested Category</h2>
          <form className="mt-[35px]" onSubmit={handleSubmit}>
            {/* Category */}
            <div className="flex items-center sm:gap-4 gap-2">
              <div className="flex-1">
                <label
                  htmlFor="category"
                  className="text-[14px] leading-[18px] font-[600]"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Title */}
            <div className="mt-6">
              <label
                htmlFor="title"
                className="text-[14px] leading-[18px] font-[600]"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
                required
              />
            </div>

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
                <div className="bg-black text-white px-3 h-full rounded-[5px] flex items-center cursor-pointer" onClick={handleAddAccount}>Add</div>
              </div>
              
              <div className="flex items-center mt-2 sm:gap-3 gap-1 flex-wrap">
                {formData.accounts.map((acc)=>{
                  return <span className="text-[#000] sm:text-[14px] text-[12px] flex items-center gap-2 bg-[#D7D3BF] px-3 py-1 rounded-[14px]">
                  {acc} <RxCross2 className="sm:text-[14px] text-[12px] cursor-pointer" onClick={()=>handleRemoveAccount(acc)}/>
              </span>
                })

                }
                
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
                required
              />
            </div>

            {/* Date */}
            <div className="mt-6">
              <label
                htmlFor="date"
                className="text-[14px] leading-[18px] font-[600]"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-[8px] w-full text-[#33333] py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Show at Header */}
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

            {/* Image */}
            <div className="mt-6">
              <label
                htmlFor="image"
                className="text-[14px] leading-[18px] font-[600]"
              >
                Upload Image
              </label>
              <label htmlFor="image">
                <div className="mt-[8px] flex items-center text-[#33333] bg-white w-full py-[12px] px-[20px] text-[14px] leading-[20px] border border-[#e1e6f0] rounded-[5px] h-[42px] cursor-pointer outline-none focus:border-blue-500">
                  {formData.image?.name || "No file selected"}
                </div>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="hidden"
                required
              />
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

export default AddSuggestedCategory;
