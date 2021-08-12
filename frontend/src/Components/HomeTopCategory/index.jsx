import React, { useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Category from "./category";
import { GlobalContext } from "../../Context/global";

const HomeTopCategory = () => {
  const { categories, role } = useContext(GlobalContext);

  return (
    <>
      {role !== "ROLE_USER" && (
        <section className="gray-light p-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-9">
                <div className="sec-heading">
                  <h2>
                    Freelancer <span className="theme-cl-2">Category</span>
                  </h2>
                  <p>
                    You need more granular search? Check our freelancers by
                    category we are assured you wil find something that suit
                    your needs{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              {categories.slice(0, 8).map((category) => {
                if (category.attributes.deletedAt === null) {
                  return (
                    <Link
                      to={{
                        pathname: `/category/${category.attributes.name}`,
                        state: category.attributes.name,
                      }}
                      key={category.id}
                    >
                      <Category
                        name={category.attributes.name}
                        image={category.attributes.image}
                        length={category.attributes.portfolios.length}
                      />
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HomeTopCategory;
