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
import TopCategory from './pages/Category';
import UpdateTopCategory from './pages/UpdateTopCategory';
import SuggestedCategories from './pages/SuggestedCategories';
import AddSuggestedCategory from './pages/AddSuggestedCategory';
import UpdateSuggestedArticle from './pages/UpdateSuggestedArticle';
import Navbar from './components/Navbar';
import Test from './pages/Test';
import CategoryArticle from './pages/CategoryArticle';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';
import SubCategory from './pages/SubCategory';
import AddSubCategory from './pages/AddSubCategory';
import UpdateSubCategory from './pages/UpdateSubCategory';
import UpdateCategory from './pages/UpdateCategory';

const AppWrapper = () => {
  const location = useLocation();

  // List of routes where the Navbar should not appear
  const excludedRoutes = [
    "/",
    "/admin/users",
    "/admin/categories",
    "/admin/update/top-article",
    "/admin/suggested-articles",
    "/admin/add/suggested-article",
    "/admin/update/suggested-article",
    "/admin/add/category",
    "/admin/sub-categories",
    "/admin/add/sub-category",
    "/admin/update/sub-category",
     "/admin/update/`category"
  ];

  // Determine whether to show the Navbar
  const shouldShowNavbar = !excludedRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/categories" element={<TopCategory />} />
        <Route path="/admin/sub-categories" element={<SubCategory />} />
        <Route path="/admin/add/category" element={<AddCategory />} />
        <Route path="/admin/update/category" element={<UpdateCategory />} />
        <Route path="/admin/add/sub-category" element={<AddSubCategory />} />
        <Route path="/admin/update/sub-category" element={<UpdateSubCategory />} />
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
        <Route path="/test" element={<Test />} />
        <Route path="/article" element={<CategoryArticle />} />
        <Route path="/categories" element={<Categories />} />
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
