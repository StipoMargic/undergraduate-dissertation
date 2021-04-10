import React from "react";
import "./styles.scss";
import FreelancerCard from "./FreelancerCard";
// TODO: Refactor to userdetail comp

const Freelancers = () => {
  return (
    <>
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="ipt-title">Search Users</h2>
              <span className="ipn-subtitle">Browse All Users</span>
            </div>
          </div>
        </div>
      </div>
      <section className="gray-bg">
        <div className="container">
          <div className="row py-5">
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
            <FreelancerCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Freelancers;
