import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../features/categoriesSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./categories.css";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    // Dispatch fetchCategories only if the categories data is empty
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return text;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <section className="categories custom-container">
        <div className="categories-heading">
          <h2>Article Categories</h2>
          {/* <button>Browse all articles</button> */}
        </div>
        <div className="flex lg:gap-6 md:gap-4 gap-6 md:flex-row flex-col">
          {categories.map((category, index) => (
            <div
              key={index}
              className={
                `group relative overflow-hidden rounded-[20px] cursor-pointer w-full h-[420px]`
                //    ${
                //   index === 0 ? "w-full md:h-[440px] h-[420px]" : "md:w-[calc(50%-0.75rem)] w-full h-[420px]"
                // } `
              }
              onClick={() =>
                navigate(`/news?trend=${category.trend.replace("#", "")}`)
              }
            >
              {/* Zooming Background Image */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${category.media_url}')`,
                }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Adventure Label */}
              <div className="bg-white w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-[24px] absolute top-[24px] right-[24px] z-20 font-semibold">
                <FaArrowRightLong className="arrow-sign" />
              </div>

              {/* Heading Section Overlaid on Image */}
              <div
                className={`absolute bottom-[24px] px-[24px] z-30 text-white w-full `}
              >
                <h2
                  className={`font-bold text-[30px] drop-shadow-lg mb-2 `}
                >
                  {category.trend.replace("#", "")}
                </h2>
                <p className="text-gainsboro" style={{ letterSpacing: "1px" }}>
                  {truncateText(category.text)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="popular-now custom-container">

<div className="text-[24px] font-[700] leading-[1.5em] mb-8">Latest Articles</div>

        <div className="flex flex-col md:flex-row">
                

                <div className="group cursor-pointer md:flex ">
                  <div>
                  <div className="text-[#787878] mb-4 group-hover:translate-x-4 transition-transform duration-500 font-[500]">
                    Sep 2, 2024
                  </div>
                  <h4 className="leading-[1.34em] text-[rgba(9,9,9)]/85 font-[700] group-hover:translate-x-4 transition-transform duration-500 hover:text-[#787878]">
                    Unveiling hidden gems: Exploring off-the-beaten-path destinations
                  </h4>
                  </div>
                  <div className="my-[32px] h-[1px] w-full bg-[gainsboro] block md:hidden"></div>
                  <div className="mx-[32px] w-[1px] h-full bg-[gainsboro] hidden md:block"></div>
                </div>
                <div className="group cursor-pointer md:flex ">
                  <div>
                  <div className="text-[#787878] mb-4 group-hover:translate-x-4 transition-transform duration-500 font-[500]">
                    Sep 2, 2024
                  </div>
                  <h4 className="leading-[1.34em] text-[rgba(9,9,9)]/85 font-[700] group-hover:translate-x-4 transition-transform duration-500 hover:text-[#787878]">
                    Unveiling hidden gems: Exploring off-the-beaten-path destinations
                  </h4>
                  </div>
                  <div className="my-[32px] h-[1px] w-full bg-[gainsboro] block md:hidden"></div>
                  <div className="mx-[32px] w-[1px] h-full bg-[gainsboro] hidden md:block"></div>
                </div>
                <div className="group cursor-pointer md:flex ">
                  <div>
                  <div className="text-[#787878] mb-4 group-hover:translate-x-4 transition-transform duration-500 font-[500]">
                    Sep 2, 2024
                  </div>
                  <h4 className="leading-[1.34em] text-[rgba(9,9,9)]/85 font-[700] group-hover:translate-x-4 transition-transform duration-500 hover:text-[#787878]">
                    Unveiling hidden gems: Exploring off-the-beaten-path destinations
                  </h4>
                  </div>
                  <div className="my-[32px] h-[1px] w-full bg-[gainsboro] block md:hidden"></div>
                  <div className="mx-[32px] w-[1px] h-full bg-[gainsboro] hidden md:block"></div>
                </div>
              </div>
      </section>
    </>
  );
};

export default Categories;
