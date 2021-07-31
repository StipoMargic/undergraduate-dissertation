import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import FreelancerCard from "./FreelancerCard";
import { GlobalContext } from "../../Context/global";
import FilterOptions from "../FilterOptions";
import { freelancerFilterOptions } from "./freelancerFilterOptions";
import { FREELANCER } from "../../Constants/roles";

const initialPagination = {
  start: 0,
  end: 9,
  page: 1,
};

const Freelancers = () => {
  const { portfolios, role } = useContext(GlobalContext);
  const [pagination, setPagination] = useState(initialPagination);
  const history = useHistory();

  useEffect(() => {
    if (role === FREELANCER) history.push("/");
  }, []);

  const handleNext = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start + 9,
      end: prev.end + 9,
      page: prev.page + 1,
    }));
  };

  const handlePrev = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start - 9,
      end: prev.end - 9,
      page: prev.page - 1,
    }));
  };

  const activePortfolios = portfolios.filter(
    (portfolio) => portfolio.attributes.deletedAt === null
  );
  return (
    <>
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="ipt-title">Search Portfolios</h2>
              <span className="ipn-subtitle">Browse All Portfolios</span>
            </div>
          </div>
        </div>
      </div>
      <FilterOptions options={freelancerFilterOptions} type="portfolios" />
      <section className="gray-bg">
        <div className="container">
          {role === "ROLE_USER" ? (
            <Link to="/add-job">
              <button className="my-2 btn btn-primary btn-lg" type="button">
                Add portfolio
              </button>
            </Link>
          ) : (
            ""
          )}
          <div className="row py-5">
            {activePortfolios
              .slice(pagination.start, pagination.end)
              .map((portfolio) => {
                return (
                  <FreelancerCard
                    key={portfolio.id}
                    id={portfolio.id}
                    portfolio={portfolio.attributes}
                  />
                );
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

            {activePortfolios.length > pagination.end && (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-outline-primary btn-lg"
              >
                Next
              </button>
            )}
          </div>
          <div className="row justify-content-center">
            You are on page {pagination.page} out of{" "}
            {parseInt(Math.ceil(activePortfolios.length / 9), 10)}.
          </div>
        </div>
      </section>
    </>
  );
};

export default Freelancers;
