import React, { useContext, useState, useEffect, useRef } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchSuggestedCategories,
} from "../features/categoriesSlice";

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to detect outside clicks
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setIsAdmin, isAdmin } =
    useContext(AuthContext);

  const dispatch = useDispatch();
  const { suggestedData, allCategories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchSuggestedCategories());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleMenuClick = () => {
    setIsNavActive(!isNavActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <header>
      <div className="custom-container hero-styling">
        <div className="bg-white">
          <div className="navbar-content">
            <div className="navbar-logo text-black">Twitter</div>
            <div
              className={`navbar-home-material ${
                isNavActive ? "nav-active" : ""
              }`}
            >
              <nav className="navbar-links">
                <ul>
                  <li className="!text-black" onClick={() => navigate("/")}>
                    Home
                  </li>
                  <li className="!text-black">About</li>
                  <li className="!text-black">Contact</li>
                  <li className="!text-black" onClick={() => navigate("/")}>
                    News
                  </li>
                  <li className="relative !text-black" ref={dropdownRef}>
                    <div className="cursor-pointer" onClick={toggleDropdown}>
                      Categories
                    </div>
                    {isDropdownOpen && (
                      <ul
                        className="absolute min-w-[150px] top-full !left-1/2 transform py-1 !-translate-x-1/2 !bg-white !shadow-lg z-10 mt-4 flex flex-col rounded-lg !gap-2 animate-dropdown opacity-0 scale-95"
                        style={{
                          animation: isDropdownOpen
                            ? "dropdown-appearance 0.3s ease-in-out forwards"
                            : "none",
                          maxHeight: "230px", // Fixed typo here
                          overflowY:
                            suggestedData.length > 4 ? "auto" : "visible", // Enable scrollbar only for more than 5 items
                          scrollbarWidth: "thin", // Thin scrollbar for Firefox
                          scrollbarColor: "grey transparent", // Grey scrollbar for Firefox
                        }}
                      >
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap !text-black !text-[15px] rounded-t-lg"
                          onClick={() => navigate("/categories")}
                        >
                          All
                        </li>
                        {allCategories.map((cat, index) => (
                          <li
                            key={cat._id}
                            className={`px-4 py-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap group !text-black !text-[15px] ${
                              index === allCategories.length - 1
                                ? "rounded-b-lg"
                                : ""
                            }`}
                          >
                            <div
                              className="w-full h-full"
                              onClick={() => {
                                setIsDropdownOpen(false);
                                navigate(`/categories?id=${cat._id}`);
                              }}
                            >
                              {cat.category}
                            </div>
                            {/* Sub-category dropdown */}
                            <div className="relative left-[100%] top-[-31px] hidden group-hover:block ">
                              <div className="absolute top-0 border shadow-md  rounded-lg left-[17px] z-50 bg-white">
                                <ul className="!gap-2 flex flex-col">
                                  {suggestedData
                                    .filter(
                                      (item) => item.categoryId._id === cat._id
                                    )
                                    .map((item, index) => (
                                      <li
                                        className="px-4 py-2 hover:bg-gray-200 !text-[15px] hover:text-black cursor-pointer !text-black"
                                        onClick={() =>
                                          navigate(`/article?id=${item._id}`)
                                        }
                                      >
                                        {item.subCategory}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>

                  {isAdmin && (
                    <li
                      className="!text-black"
                      onClick={() => navigate("/admin/users")}
                    >
                      Admin
                    </li>
                  )}
                </ul>
              </nav>
              {isLoggedIn ? (
                <button
                  className="subscribe-button !bg-black !text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="subscribe-button !bg-black !text-white"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </div>
            <div className="menu-icon !text-black" onClick={handleMenuClick}>
              <RiMenu3Fill />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
