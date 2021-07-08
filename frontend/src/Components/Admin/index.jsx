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
      <div className="row">
        <div className="col">
          <Link to="create-category">Create category</Link>
        </div>
        <div className="col">
          <Link to="analytics">Analytics</Link>ž1
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
