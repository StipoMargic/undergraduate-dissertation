import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/global";
import Spinner from "../AboutNumbers/Spinner";
import RolesChart from "../Charts/RolesChart";
import CategoryChart from "../Charts/CategoryChart";
import JobChart from "../Charts/JobChart";
import AdminDashboardHeader from "./header";
import ActiveTillJobChart from "../Charts/ActiveTillJobChart";

const Analytics = () => {
  const { loading } = useContext(GlobalContext);
  const history = useHistory();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <AdminDashboardHeader />
          <div className="container mt-5 vh-80">
            <div className="row m-3">
              <button
                className="btn btn-info btn-lg"
                type="submit"
                onClick={history.goBack}
              >
                Go back
              </button>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <RolesChart />
                <Link to="/admin/users" className="btn btn-primary w-100">
                  Check more info
                </Link>
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <CategoryChart />
              </div>
            </div>
            <div className="row mr-3">
              <JobChart />
            </div>
            <div className="row mt-3 pb-3">
              <ActiveTillJobChart />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Analytics;
