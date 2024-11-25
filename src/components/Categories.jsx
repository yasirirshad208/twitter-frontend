import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import "./categories.css";

const Categories = () => {
  return (
    <>
      <section className="categories container mx-auto">
        <div className="categories-heading">
          <h2>Article Categories</h2>
          <button>Browse all articles</button>
        </div>
        <div className="categories-row">
          <div className="category-card">
            <div className="category-div">
              <div
                className="category-bg"
                style={{ backgroundImage: `url(./images/mountains.jpg)` }}
              >
                <div className="category-overlay"></div>
              </div>
              <div className="arrow">
                <FaArrowRightLong className="arrow-sign" />
              </div>
              <h2 className="category-inner-heading">Travel</h2>
              <p className="category-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut,
                natus quo eos necessitatibus quos optio excepturi facilis
                voluptates quisquam assumenda!
              </p>
            </div>
          </div>
          <div className="category-card">
            <div className="category-div">
              <div
                className="category-bg"
                style={{ backgroundImage: `url(./images/desert.jpg)` }}
              >
                <div className="category-overlay"></div>
              </div>
              <div className="arrow">
                <FaArrowRightLong className="arrow-sign" />
              </div>
              <h2 className="category-inner-heading">Travel</h2>
              <p className="category-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut,
                natus quo eos necessitatibus quos optio excepturi facilis
                voluptates quisquam assumenda!
              </p>
            </div>
          </div>
          <div className="category-card">
            <div className="category-div">
              <div
                className="category-bg"
                style={{ backgroundImage: `url(./images/lake.jpg)` }}
              >
                <div className="category-overlay"></div>
              </div>
              <div className="arrow">
                <FaArrowRightLong className="arrow-sign" />
              </div>
              <h2 className="category-inner-heading">Travel</h2>
              <p className="category-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut,
                natus quo eos necessitatibus quos optio excepturi facilis
                voluptates quisquam assumenda!
              </p>
            </div>
          </div>
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
