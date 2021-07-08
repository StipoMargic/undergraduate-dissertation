import React, { useContext, useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import FreelancerCard from "./FreelancerCard";
import { GlobalContext } from "../../Context/global";

const initialPagination = {
  start: 0,
  end: 9,
};

const Freelancers = () => {
  const { portfolios, role } = useContext(GlobalContext);
  const [pagination, setPagination] = useState(initialPagination);

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
              <h2 className="ipt-title">Search Portfolios</h2>
              <span className="ipn-subtitle">Browse All Portfolios</span>
            </div>
          </div>
        </div>
      </div>

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
            {portfolios
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

            {portfolios.length > pagination.end && (
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
      </section>
    </>
  );
};

export default Freelancers;
