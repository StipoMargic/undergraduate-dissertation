import React, { useContext } from "react";
import "./styles.scss";
import FreelancerCard from "./FreelancerCard";
import { GlobalContext } from "../../Context/global";

const Freelancers = () => {
  const { portfolios } = useContext(GlobalContext);
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
          <div className="row py-5">
            {portfolios.map((portfolio) => {
              return (
                <FreelancerCard
                  key={portfolio.id}
                  id={portfolio.id}
                  portfolio={portfolio.attributes}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Freelancers;
