import React, { useState } from 'react'
import { RiMenu3Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isNavActive, setIsNavActive] = useState(false);
    const navigate = useNavigate()

    const handleMenuClick = () => {
        setIsNavActive(!isNavActive);
      };
  return (
    <div className="page-wrapper hero-styling">
          {/* Navbar */}
          <div className="navbar-home bg-white">
            <div className="navbar-content">
              <div className="navbar-logo text-black">Twitter</div>
              <div className={`navbar-home-material ${isNavActive ? 'nav-active' : ''}`}>
                <nav className="navbar-links">
                  <ul>
                    <li className='!text-black'>Home</li>
                    <li className='!text-black'>About</li>
                    <li className='!text-black'>Contact</li>
                    <li className='!text-black'>Tweets</li>
                    <li className='!text-black'>News</li>
                  </ul>
                </nav>
                <button className="subscribe-button !bg-black !text-white" onClick={()=>navigate('/login')}>Login</button>
              </div>
              <div className="menu-icon !text-black" onClick={handleMenuClick}>
                <RiMenu3Fill />
              </div>
            </div>
          </div>
    </div>
  )
}

export default Navbar