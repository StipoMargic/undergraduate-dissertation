import React, { useContext, useState } from "react";
import { useLocation } from "react-router";
import { GlobalContext } from "../../Context/global";
import FreelancerCard from "./FreelancerCard";

const initialPagination = {
  start: 0,
  end: 9,
};

const FreelancersCategoryList = () => {
  const { state } = useLocation();
  const { portfolios } = useContext(GlobalContext);
  const [pagination, setPagination] = useState(initialPagination);

  const portfoliosByCategory = portfolios.filter(
    (portfolio) =>
      portfolio.attributes.category === state &&
      portfolio.attributes.deletedAt === null
  );

  const handleNext = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start + 9,
      end: prev.end + 9,
    }));
  };

  const handlePrev = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start - 9,
      end: prev.end - 9,
    }));
  };
  return (
    <>
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <span className="ipn-subtitle">
                Browse Portfolios in {state} category
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="gray-bg">
        {portfoliosByCategory.length > 0 ? (
          <div className="container">
            <div className="row py-5">
              {portfoliosByCategory
                .slice(pagination.start, pagination.end)
                .map((portfolio) => {
                  if (portfolio.attributes.deletedAt === null) {
                    return (
                      <FreelancerCard
                        key={portfolio.id}
                        id={portfolio.id}
                        portfolio={portfolio.attributes}
                      />
                    );
                  }
                  return null;
                })}
            </div>
            <div className="row justify-content-center p-3">
              {pagination.start > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="btn btn-outline-info btn-lg mr-3"
                >
                  Previous
                </button>
              )}

              {portfoliosByCategory.length > pagination.end && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-outline-primary btn-lg"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="row my-5 py-5 justify-content-center vh-60 align-items-center">
            <h2 className="text-uppercase font-weight-bold text-info">
              This category is empty!
            </h2>
          </div>
        )}
      </section>
    </>
  );
};

export default FreelancersCategoryList;
