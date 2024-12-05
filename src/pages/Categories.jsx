import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SuggestedCategory from '../components/SuggestedCategory';
import { fetchSuggestedCategories } from '../features/categoriesSlice';

const Categories = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { suggestedData, loading, error } = useSelector((state) => state.categories);
  
    useEffect(() => {
      dispatch(fetchSuggestedCategories());
    }, [dispatch]);

  return (
    <section>
        <div className='custom-container'>
        <div className=" w-full flex flex-wrap gap-6">
              {suggestedData.map((d, index) => (
                <div
                key={index}
                  className={`group relative overflow-hidden rounded-[20px] cursor-pointer ${
                    index === 0
                      ? "w-full md:h-[440px] h-[420px]"
                      : "xl:w-[calc(33%-0.75rem)] md:w-[calc(50%-0.75rem)] w-full h-[420px]"
                  } `}
                  onClick={() => navigate(`/article?category=${d.category}`)}
                >
                  <SuggestedCategory image={d.image} date={d.date} category={d.category} title={d.title} index={index}/>
                </div>
              ))}
            </div>
        </div>
    </section>
  )
}

export default Categories