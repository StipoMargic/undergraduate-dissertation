import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/global";

const Analytics = () => {
  const { role, portfolios, users, jobs, categories } =
    useContext(GlobalContext);
  const history = useHistory();
  let deactivatedPortfolios = 0;
  let deactivatedJobs = 0;
  let expiredJob = 0;

  if (role === undefined && role !== "ROLE_ADMIN") {
    history.push("/");
  }

  portfolios.forEach((p) => {
    if (p.attributes.deletedAt) {
      deactivatedPortfolios += 1;
    }
  });

  jobs.forEach((j) => {
    if (j.attributes.deletedAt) {
      deactivatedJobs += 1;
    }
    // eslint-disable-next-line no-unused-expressions
    if (new Date(j.attributes.activeTill).getTime() < new Date().getTime()) {
      expiredJob += 1;
    }
  });

  return (
    <>
      <div className="container mt-5">
        <div className="row m-3">
          <button
            className="btn btn-info btn-lg"
            type="submit"
            onClick={history.goBack}
          >
            Go back
          </button>
        </div>
        <div className="row py-5">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <p className="text-center">
                  You have{" "}
                  <span className="text-info">
                    <strong>{categories.length}</strong>
                  </span>{" "}
                  categories
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <p className="text-center">
                  You have{" "}
                  <span className="text-info">
                    <strong>{portfolios.length}</strong>{" "}
                  </span>{" "}
                  portfolios.
                </p>
                <Link to="/freelancers" className="w-100 btn btn-primary">
                  Browse portfolios
                </Link>
                <div className="row mt-3 justify-content-center">
                  <div className="col">
                    <p className="text-center text-danger">
                      {deactivatedPortfolios} deactivated.
                    </p>
                  </div>
                  <div className="col">
                    <p className="text-center text-success">
                      {portfolios.length - deactivatedPortfolios} published.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <p className="text-center">
                  You have{" "}
                  <span className="text-info">
                    <strong>{jobs.length}</strong>{" "}
                  </span>{" "}
                  jobs.
                </p>
                <Link to="/jobs" className="w-100 btn btn-primary">
                  Browse jobs
                </Link>
                <div className="row mt-3 justify-content-center">
                  <div className="col-auto">
                    <p className="text-center text-danger">
                      {deactivatedJobs} deactivated.
                    </p>
                  </div>
                  <div className="col-auto">
                    <p className="text-center text-success">
                      {jobs.length - expiredJob - deactivatedJobs} published.
                    </p>
                  </div>
                  <div className="col-auto">
                    <p className="text-center text-info">
                      {expiredJob} expired.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col lg-6">
            <div className="card">
              <div className="card-body">
                <p className="text-center">
                  You have{" "}
                  <span className="text-info">
                    <strong>{users.length}</strong>
                  </span>{" "}
                  users.
                </p>
                <Link to="/admin/users" className="btn btn-primary w-100">
                  Check more info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
