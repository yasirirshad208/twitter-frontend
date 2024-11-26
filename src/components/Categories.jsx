import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import "./categories.css";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  // State to store categories data
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  // Fetch data from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/twitter/trending/categories");
        setCategories(response.data.data); 
        setLoading(false);
      } catch (error) {
        setError("Error fetching categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return text;
  };

  return (
   
   <>
    <section className="categories container mx-auto">
      <div className="categories-heading">
        <h2>Article Categories</h2>
        <button>Browse all articles</button>
      </div>
      <div className="categories-row">
        {categories.map((category, index) => (
          <div className="category-card flex-1" key={index} onClick={()=>navigate(`/trending/articles?trend=${category.trend.replace('#', '')}`)}>
            <div className="category-div">
              <div
                className="category-bg"
                style={{ backgroundImage: `url(${category.media_url})` }}
              >
                <div className="category-overlay"></div>
              </div>
              <div className="arrow">
                <FaArrowRightLong className="arrow-sign" />
              </div>
              <h2 className="category-inner-heading">{category.trend.replace('#', '')}</h2>
              <p className="category-text">{truncateText(category.text)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="popular-now container mx-auto">
    <div className="popular-heading">
    <div><h4 className="heading-h4">Popular Now</h4></div>
      <div className="heading-line"></div>
    </div>

    <div className="popular-row">
      <div className="popular-item" >
        <div className="item-category">
          Travel <div className="item-dot"></div> <span>2 Nov 2024</span>
        </div>

        <h4 className="heading-h4">Unveiling hidden gems: Exploring off-the-beaten-path destinations</h4>
      </div>

      <div className="popular-item item-side-borders" >
      <div className="item-category">
          Travel <div className="item-dot"></div> <span>2 Nov 2024</span>
        </div>

        <h4 className="heading-h4">Unveiling hidden gems: Exploring off-the-beaten-path destinations</h4>
      </div>

      <div className="popular-item">
      <div className="item-category">
          Travel <div className="item-dot"></div> <span>2 Nov 2024</span>
        </div>

        <h4 className="heading-h4">Unveiling hidden gems: Exploring off-the-beaten-path destinations</h4>
      </div>
    </div>
  </section>
   </>
  );
};

export default Categories;






