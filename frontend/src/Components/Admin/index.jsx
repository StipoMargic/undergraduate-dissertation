import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/global";

const AdminDashboard = () => {
  const { role } = useContext(GlobalContext);
  const history = useHistory();

  if (role !== "ROLE_ADMIN") {
    history.push("/");
  }
  return (
    <div className="container justify-content-center vh-60 align-items-center">
      <div className="row mt-5">
        <div className="col">
          <Link to="/admin/create-category" className="btn btn-primary w-100">
            Create category
          </Link>
        </div>
        <div className="col w-100">
          <Link to="analytics" className="btn btn-primary fa-pull w-100">
            Analytics
          </Link>
        </div>
        <div className="col">
          <Link to="users" className="btn btn-primary fa-pull w-100">
            All users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
