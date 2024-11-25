import React, { useState, useEffect } from 'react';
import "./Header.css";
import { RiMenu3Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${currentImage.src})` }}
      >
        <div className="page-wrapper hero-styling">
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
                    <li>News</li>
                    <li onClick={()=>navigate('/admin/users')}>Admin</li>
                  </ul>
                </nav>
                <button className="subscribe-button" onClick={()=>navigate('/login')}>Login</button>
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
