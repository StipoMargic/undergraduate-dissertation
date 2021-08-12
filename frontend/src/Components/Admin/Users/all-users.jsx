import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../Context/global";
import Spinner from "../../AboutNumbers/Spinner";
import AdminDashboardHeader from "../header";
import { ADMIN } from "../../../Constants/roles";

const initialPagination = {
  start: 0,
  end: 10,
};

const AllUsers = () => {
  const { role, users, setUsers, loading } = useContext(GlobalContext);
  const history = useHistory();
  const [pagination, setPagination] = useState(initialPagination);
  const [searchName, setSearchName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://127.0.0.1:8000/api/v1/users?filter[name]=${searchName}`
      )
      .then((res) => {
        setUsers([...res.data.data]);
        setPagination({ start: 0, end: 9 });
      })
      .catch(() => null);
  };

  const handleNext = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start + 10,
      end: prev.end + 10,
    }));
  };

  const handleGetUsers = (e) => {
    e.preventDefault();

    axios
      .get(`http://127.0.0.1:8000/api/v1/users`)
      .then((res) => {
        setUsers([...res.data.data]);
      })
      .catch(() => null);
  };

  const handlePrev = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start - 10,
      end: prev.end - 10,
    }));
  };

  useEffect(() => {
    if (loading === false) {
      if (role !== ADMIN) {
        history.push("/");
      }
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <AdminDashboardHeader />
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                type="text"
                value={searchName}
                placeholder="Type user name..."
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary form-control d-inline-block"
                onClick={handleSubmit}
              >
                Search
              </button>
            </form>
          </div>
          {users && (
            <div className="row mb-3 d-flex justify-content-center mt-5">
              <button
                className="btn btn-info btn-lg"
                type="submit"
                onClick={history.goBack}
              >
                Go back
              </button>
              <button
                type="submit"
                className="btn btn-success btn-lg ml-5"
                onClick={handleGetUsers}
              >
                Reset users
              </button>
              <table className="table table-bordered table-responsive-sm mt-3">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .slice(pagination.start, pagination.end)
                    .map((user, idx) => {
                      return (
                        <tr key={user.id}>
                          <th scope="row">{idx + 1 + pagination.start}</th>
                          <td>
                            <Link to={`/admin/users/${user.id}`}>
                              {user.attributes.username}
                            </Link>
                          </td>
                          <td>
                            <a href={`mailto:${user.attributes.email}`}>
                              {user.attributes.email}
                            </a>
                          </td>
                          <td>
                            {user.attributes.roles[0] === "ROLE_USER"
                              ? "Freelancer"
                              : user.attributes.roles[0] === "ROLE_EMPLOYER"
                              ? "Company"
                              : "Administrator"}
                          </td>
                          <td>
                            {user.attributes.verified === true
                              ? "Verified"
                              : "Not Verified"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="justify-content-center d-flex align-items-center pb-4">
                {pagination.start > 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="btn btn-outline-info btn-lg mr-3"
                  >
                    Previous
                  </button>
                )}

                {users.length > pagination.end && (
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
          )}
        </div>
      )}
    </>
  );
};
export default AllUsers;
