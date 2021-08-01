import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/global";
import { ADMIN } from "../../Constants/roles";

const AdminDashboardHeader = () => {
  const { role, loading } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    if (loading === false) {
      if (role !== ADMIN) {
        history.push("/");
      }
    }
  }, []);

  return (
    <div className="container justify-content-center  align-items-center mt-5">
      <div className="row mt-5">
        <div className="col-lg-4 col-sm-5 mb-2">
          <Link to="/admin/categories" className="btn btn-primary w-100">
            Categories
          </Link>
        </div>
        <div className="col-lg-4 col-sm-5 mb-2">
          <Link to="/admin/analytics" className="btn btn-primary fa-pull w-100">
            Analytics
          </Link>
        </div>
        <div className="col-lg-4 col-sm-5">
          <Link to="/admin/users" className="btn btn-primary fa-pull w-100">
            All users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
