import React, { useContext, useState } from 'react';
import { RiMenu3Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setIsAdmin, isAdmin } = useContext(AuthContext);

  const handleMenuClick = () => {
    setIsNavActive(!isNavActive);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    setIsAdmin(false);
  };

  return (
    <header>
      <div className="custom-container hero-styling">
        <div className="bg-white">
          <div className="navbar-content">
            <div className="navbar-logo text-black">Twitter</div>
            <div className={`navbar-home-material ${isNavActive ? 'nav-active' : ''}`}>
              <nav className="navbar-links">
                <ul>
                  <li className="!text-black" onClick={() => navigate('/')}>Home</li>
                  <li className="!text-black">About</li>
                  <li className="!text-black">Contact</li>
                  <li className="!text-black" onClick={() => navigate('/')}>News</li>
                  {isAdmin&&
                    
                    <li className="!text-black" onClick={()=>navigate('/admin/users')}>Admin</li>
                    }
                </ul>
              </nav>
              {isLoggedIn ? (
                <button
                  className="subscribe-button !bg-black !text-white"
                  onClick={handleLogout} // Correctly passing the function reference
                >
                  Logout
                </button>
              ) : (
                <button
                  className="subscribe-button !bg-black !text-white"
                  onClick={() => navigate('/login')}
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
