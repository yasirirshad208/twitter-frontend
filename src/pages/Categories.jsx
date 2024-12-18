import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SuggestedCategory from '../components/SuggestedCategory';
import { fetchSuggestedCategories } from '../features/categoriesSlice';

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { suggestedData, loading, error } = useSelector((state) => state.categories);
  const location = useLocation();

  const [filteredData, setFilteredData] = useState([]);

  // Fetch suggested categories on component mount
  useEffect(() => {
    dispatch(fetchSuggestedCategories());
  }, [dispatch]);

  // Filter suggestedData based on the "id" query parameter in the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('id');

    if (categoryFromUrl) {
      const filtered = suggestedData.filter((item) => item.categoryId._id === categoryFromUrl);
      setFilteredData(filtered);
    } else {
      setFilteredData(suggestedData); // Default to show all data if no query param
    }
  }, [location.search, suggestedData]);

  return (
    <section>
      <div className="custom-container">
        <div className="w-full flex flex-wrap gap-6">
          {filteredData.map((d, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-[20px] cursor-pointer ${
                index === 0
                  ? 'w-full md:h-[440px] h-[420px]'
                  : 'xl:w-[calc(33%-0.75rem)] md:w-[calc(50%-0.75rem)] w-full h-[420px]'
              } `}
              onClick={() => navigate(`/article?id=${d._id}`)}
            >
              <SuggestedCategory
                image={d.image}
                date={d.date}
                category={d.subCategory}
                title={d.title}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
