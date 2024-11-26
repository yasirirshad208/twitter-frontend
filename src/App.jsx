import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Form from './pages/form';
import UpdateTopCategory from './pages/UpdateTopCategory';
import SuggestedCategories from './pages/SuggestedCategories';
import AddSuggestedCategory from './pages/AddSuggestedCategory';
import UpdateSuggestedArticle from './pages/UpdateSuggestedArticle';
import TrendingArticles from './pages/TrendingArticles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/news" element={<News />} /> */}
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/top-articles" element={<TopCategory />} />
        <Route path="/admin/top-form" element={<Form />} />
        <Route path="/admin/update/top-article" element={<UpdateTopCategory />} />
        <Route path="/admin/suggested-articles" element={<SuggestedCategories />} />
        <Route path="/admin/add/suggested-article" element={<AddSuggestedCategory />} />
        <Route path="/admin/update/suggested-article" element={<UpdateSuggestedArticle />} />
        <Route path="/trending/articles" element={<TrendingArticles />} />
      </Routes>
    </Router>
  );
}

export default App;



