import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Subscribe from "../components/Subscribe";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSuggestedCategories } from "../features/categoriesSlice";
import SuggestedCategory from "../components/SuggestedCategory";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { suggestedData, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchSuggestedCategories());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Categories />
      <Subscribe />
      <section className="mt-[96px]">
        <div className="custom-container">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section with Cards */}
            <div className="lg:w-[66%] w-full flex flex-wrap gap-6">
              {suggestedData.map((d, index) => (
                <div
                key={index}
                  className={`group relative overflow-hidden rounded-[20px] cursor-pointer ${
                    index === 0
                      ? "w-full md:h-[440px] h-[420px]"
                      : "md:w-[calc(50%-0.75rem)] w-full h-[420px]"
                  } `}
                  onClick={() => navigate(`/article?category=${d.category}`)}
                >
                  <SuggestedCategory image={d.image} date={d.date} category={d.category} title={d.title} index={index}/>
                </div>
              ))}
              <div className="w-full flex justify-center mt-4">
                <Link to="/categories">
                <button className="px-4 py-2 rounded-[50px] bg-black text-white hover:bg-white hover:text-black transition-all duration-300 border border-black border-2">See More</button>
              
                </Link>
                </div>
            </div>

            {/* Right Section - Sticky */}
            <div className="lg:w-[34%] w-full lg:pl-16 md:px-8 sm:px-4 lg:mt-0 mt-10 lg:sticky lg:top-[20px] lg:h-screen  ">
              <div>
                <div className="group w-[70px] h-[70px] rounded-full overflow-hidden mb-4 cursor-pointer">
                  <img
                    src="./images/avatar.jpg"
                    className="w-full h-full rounded-full transition-transform duration-300 group-hover:scale-110"
                    alt="avatar"
                  />
                </div>

                <h4 className="text-[24px] leading-[1.33em] font-[700] hover:text-[#787878] cursor-pointer transition-all duration-300 mb-1">
                  Sophie Moore
                </h4>
                <p className="text-[#787878]">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dignissimos ipsam delectus dolore magnam deserunt reiciendis
                  sequi assumenda aut illo nobis.
                </p>
              </div>
              <div className="bg-[gainsboro] h-[1px] w-full my-[40px]"></div>

              <div>
                <div className="text-[20px] font-[700] leading-[1.5em] mb-8">
                  Latest Articles
                </div>

                <div className="group cursor-pointer">
                  <div className="text-[#787878] mb-4 group-hover:translate-x-4 transition-transform duration-500 font-[500]">
                    Sep 2, 2024
                  </div>
                  <h4 className="leading-[1.34em] text-[rgba(9,9,9)]/85 font-[700] group-hover:translate-x-4 transition-transform duration-500 hover:text-[#787878]">
                    Unveiling hidden gems: Exploring off-the-beaten-path
                    destinations
                  </h4>

                  <div className="my-[32px] h-[1px] w-full bg-[gainsboro]"></div>
                </div>

                <div className="group cursor-pointer">
                  <div className="text-[#787878] mb-4 group-hover:translate-x-4 transition-transform duration-500 font-[500]">
                    Sep 2, 2024
                  </div>
                  <h4 className="leading-[1.34em] text-[rgba(9,9,9)]/85 font-[700] group-hover:translate-x-4 transition-transform duration-500 hover:text-[#787878]">
                    Unveiling hidden gems: Exploring off-the-beaten-path
                    destinations
                  </h4>

                  <div className="my-[32px] h-[1px] w-full bg-[gainsboro]"></div>
                </div>

                <div className="group cursor-pointer">
                  <div className="text-[#787878] mb-4 group-hover:translate-x-4 transition-transform duration-500 font-[500]">
                    Sep 2, 2024
                  </div>
                  <h4 className="leading-[1.34em] text-[rgba(9,9,9)]/85 font-[700] group-hover:translate-x-4 transition-transform duration-500 hover:text-[#787878]">
                    Unveiling hidden gems: Exploring off-the-beaten-path
                    destinations
                  </h4>

                  <div className="my-[32px] h-[1px] w-full bg-[gainsboro]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
