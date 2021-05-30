import React, { useContext } from "react";

import "./styles.scss";
import Category from "./category";
import { GlobalContext } from "../../Context/global";

const HomeTopCategory = () => {
  const { categories } = useContext(GlobalContext);

  return (
    <section className="gray-light p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                Popular Jobs <span className="theme-cl-2">Category</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {categories.map((category) => {
            return (
              <Category
                key={category.attributes.name}
                name={category.attributes.name}
                image={category.attributes.image}
                length={category.attributes.portfolios.length}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeTopCategory;
