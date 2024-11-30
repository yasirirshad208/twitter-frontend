import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgot from './pages/Forgot';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import News from './pages/News';
import Users from './pages/Users';
import TopCategory from './pages/TopCategory';
import UpdateTopCategory from './pages/UpdateTopCategory';
import SuggestedCategories from './pages/SuggestedCategories';
import AddSuggestedCategory from './pages/AddSuggestedCategory';
import UpdateSuggestedArticle from './pages/UpdateSuggestedArticle';
import Navbar from './components/Navbar';

const AppWrapper = () => {
  const location = useLocation();

  // List of routes where the Navbar should not appear
  const excludedRoutes = [
    "/",
    "/admin/users",
    "/admin/top-articles",
    "/admin/update/top-article",
    "/admin/suggested-articles",
    "/admin/add/suggested-article",
    "/admin/update/suggested-article"
  ];

  // Determine whether to show the Navbar
  const shouldShowNavbar = !excludedRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/top-articles" element={<TopCategory />} />
        <Route path="/admin/update/top-article" element={<UpdateTopCategory />} />
        <Route path="/admin/suggested-articles" element={<SuggestedCategories />} />
        <Route path="/admin/add/suggested-article" element={<AddSuggestedCategory />} />
        <Route path="/admin/update/suggested-article" element={<UpdateSuggestedArticle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
