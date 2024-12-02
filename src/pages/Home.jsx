import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Subscribe from "../components/Subscribe";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const suggestedCategories = async()=>{
    try {
      const response = await axios.get(
        "http://localhost:5000/api/suggested-category/all"
      );
      setData(response.data.data);
      console.log(response.data)
    } catch (err) {
      console.error(err); 
    }
  };

  useEffect(()=>{
    suggestedCategories()
  })

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
              {data.map((d, index) => (
                <div
                  className={`group relative overflow-hidden rounded-[20px] cursor-pointer ${
                    index === 0 ? "w-full md:h-[440px] h-[420px]" : "md:w-[calc(50%-0.75rem)] w-full h-[420px]"
                  } `}
                  onClick={()=>navigate(`/article?category=${d.category}`)}
                >
                  {/* Zooming Background Image */}
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('http://localhost:5000/${d.image.replace(/\\/g, "/")}')`,
                    }}
                  ></div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                  {/* Adventure Label */}
                  <div className="bg-white px-3 py-1 rounded-[24px] absolute top-[24px] right-[24px] z-20 font-semibold">
                    {d.category}
                  </div>

                  {/* Heading Section Overlaid on Image */}
                  <div
                    className={`absolute bottom-[24px] px-[24px] z-30 text-white w-full ${
                      index === 0 ? "w-[470px] md:px-[32px]" : ""
                    } `}
                  >
                    <span className="bg-white/40 px-4 py-2 rounded-[24px] font-semibold">
                    {new Date(d.date).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
                    </span>
                    <h2
                      className={`font-bold text-[30px] drop-shadow-lg md:mt-5 mt-4 ${
                        index === 0 ? "md:text-[34px]" : ""
                      } `}
                    >
                      {d.title}
                    </h2>
                  </div>
                </div>
              ))}
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos ipsam delectus dolore magnam deserunt reiciendis sequi assumenda aut illo nobis.
                </p>
              </div>
              <div className="bg-[gainsboro] h-[1px] w-full my-[40px]"></div>

              <div>
                <div className="text-[20px] font-[700] leading-[1.5em] mb-8">Latest Articles</div>

                <div className="group cursor-pointer">
                  <div className="text-[#787878] mb-4 group-hover:translate-x-4 transition-transform duration-500 font-[500]">
                    Sep 2, 2024
                  </div>
                  <h4 className="leading-[1.34em] text-[rgba(9,9,9)]/85 font-[700] group-hover:translate-x-4 transition-transform duration-500 hover:text-[#787878]">
                    Unveiling hidden gems: Exploring off-the-beaten-path destinations
                  </h4>

                  <div className="my-[32px] h-[1px] w-full bg-[gainsboro]"></div>
                </div>

                <div className="group cursor-pointer">
                  <div className="text-[#787878] mb-4 group-hover:translate-x-4 transition-transform duration-500 font-[500]">
                    Sep 2, 2024
                  </div>
                  <h4 className="leading-[1.34em] text-[rgba(9,9,9)]/85 font-[700] group-hover:translate-x-4 transition-transform duration-500 hover:text-[#787878]">
                    Unveiling hidden gems: Exploring off-the-beaten-path destinations
                  </h4>

                  <div className="my-[32px] h-[1px] w-full bg-[gainsboro]"></div>
                </div>

                <div className="group cursor-pointer">
                  <div className="text-[#787878] mb-4 group-hover:translate-x-4 transition-transform duration-500 font-[500]">
                    Sep 2, 2024
                  </div>
                  <h4 className="leading-[1.34em] text-[rgba(9,9,9)]/85 font-[700] group-hover:translate-x-4 transition-transform duration-500 hover:text-[#787878]">
                    Unveiling hidden gems: Exploring off-the-beaten-path destinations
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
