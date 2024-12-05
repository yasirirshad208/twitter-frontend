import React from "react";

const SuggestedCategory = ({image, date, title, category, index}) => {
  return (
    <div className="w-full h-full">
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url('http://localhost:5000/${image.replace(
            /\\/g,
            "/"
          )}')`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Adventure Label */}
      <div className="bg-white px-3 py-1 rounded-[24px] absolute top-[24px] right-[24px] z-20 font-semibold">
        {category}
      </div>

      {/* Heading Section Overlaid on Image */}
      <div
        className={`absolute bottom-[24px] px-[24px] z-30 text-white w-full ${
          index === 0 ? "w-[470px] md:px-[32px]" : ""
        } `}
      >
        <span className="bg-white/40 px-4 py-2 rounded-[24px] font-semibold">
          {new Date(date).toLocaleDateString("en-GB", {
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
          {title}
        </h2>
      </div>
    </div>
  );
};

export default SuggestedCategory;
