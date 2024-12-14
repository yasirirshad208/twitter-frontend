import React, { useState, useEffect, useContext, useRef } from 'react';
import "./Header.css";
import { RiMenu3Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestedCategories } from '../features/categoriesSlice';

const Header = () => {
 
  const images = [
    {
      src: './images/mountains.jpg',
      category: 'Adventure',
      date: 'Nov 1, 2024',
      heading: 'Conquer the wild: Exploring terrains and conquering nature',
      text: 'Lorem ipsum dolor sit amet consectetur iincidunt malesuada sed nec eu imperdiet imperdiet nisl nulla gravida urna sit in a enim odio facilisis ut ultrices rhoncus.'
    },
    {
      src: './images/desert.jpg',
      category: 'Travel',
      date: 'Nov 2, 2024',
      heading: 'Journey through the mountains and beyond',
      text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget.'
    },
    {
      src: './images/lake.jpg',
      category: 'Nature',
      date: 'Nov 3, 2024',
      heading: 'Discover the untouched beauty of nature',
      text: 'Etiam ut purus mattis mauris sodales aliquam. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor.'
    }
  ];

  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavActive, setIsNavActive] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setIsAdmin, isAdmin } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to detect outside clicks


  const dispatch = useDispatch();
  const { suggestedData, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchSuggestedCategories());
  }, [dispatch]);

  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentIndex];

  const handleMenuClick = () => {
    setIsNavActive(!isNavActive);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
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
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div>
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${currentImage.src})` }}
      >
        <div className="custom-container hero-styling">
          {/* Navbar */}
          <div className="navbar-home">
            <div className="navbar-content">
              <div className="navbar-logo">Twitter</div>
              <div className={`navbar-home-material ${isNavActive ? 'nav-active' : ''}`}>
                <nav className="navbar-links">
                  <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li onClick={()=>navigate('/news')}>News</li>
                    <li className="relative " ref={dropdownRef}>
  <div className="cursor-pointer" onClick={toggleDropdown}>
    Categories
  </div>
  {isDropdownOpen && (
  <ul
    className="absolute top-full !left-1/2 transform !-translate-x-1/2 !bg-white !shadow-lg z-10 mt-4 flex flex-col rounded-lg !gap-4 animate-dropdown opacity-0 scale-95"
    style={{ 
      animation: isDropdownOpen
        ? "dropdown-appearance 0.3s ease-in-out forwards"
        : "none",
      maxHeight: "23   0px", // Adjust height to fit 5 items
      overflowY: suggestedData.length > 4 ? "auto" : "visible", // Enable scrollbar only for more than 5 items
      scrollbarWidth: "thin", // Thin scrollbar for Firefox
      scrollbarColor: "grey transparent", // Grey scrollbar for Firefox
    }}
  >
     <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap !text-black !text-[15px] rounded-t-lg' onClick={()=>navigate(`/categories`)}>All</li>
    {suggestedData.map((cat, index) => (
      <li
        key={cat._id}
        className={`px-4 py-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap !text-black !text-[15px] 
          ${index === suggestedData.length - 1 ? 'rounded-b-lg' : ''}`}
        onClick={() => {
          setIsDropdownOpen(false);
          navigate(`/article?category=${cat.category}`);
        }}
      >
        {cat.category}
      </li>
    ))}
  </ul>
)}

</li>
                    {isAdmin&&
                    
                    <li onClick={()=>navigate('/admin/users')}>Admin</li>
                    }
                  </ul>
                </nav>
                {isLoggedIn ? (
                <button className="subscribe-button" onClick={handleLogout}>Logout</button>
              ) : (
                <button className="subscribe-button" onClick={()=>navigate('/login')}>Login</button>
              )}
                
              </div>
              <div className="menu-icon" onClick={handleMenuClick}>
                <RiMenu3Fill />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="hero-content">
            <div className="cat-date">
              <span className="category">{currentImage.category}</span>
              <span className="date">{currentImage.date}</span>
            </div>
            <div className="hero-heading">
              <h2>{currentImage.heading}</h2>
              <p className="hero-text">{currentImage.text}</p>
            </div>
          </div>

          {/* Dots for Indicating Current Slide */}
          <div className="dots">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`dot ${currentIndex === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default Header;
