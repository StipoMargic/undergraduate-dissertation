import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import { GlobalContext } from "../../../Context/global";
import Spinner from "../../AboutNumbers/Spinner";
import AdminDashboardHeader from "../header";

const Categories = () => {
  const { categories, token, loading } = useContext(GlobalContext);
  const [deletionMessage, setDeletionMessage] = useState(null);
  const history = useHistory();

  const handleDelete = (id) => (e) => {
    e.preventDefault();

    axios
      .delete(`http://127.0.0.1:8000/api/v1/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => window.location.reload())
      .catch(() => setDeletionMessage("Something went wrong"));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <AdminDashboardHeader />
          {deletionMessage !== null && (
            <h3 className="text-danger text-center">{deletionMessage}</h3>
          )}
          <div className="row d-flex justify-content-center mt-5">
            <button
              className="btn btn-info btn-lg mr-3"
              type="submit"
              onClick={history.goBack}
            >
              Go back
            </button>
            <button
              className="btn btn-primary btn-lg"
              type="button"
              onClick={() => history.push("/admin/create-category")}
            >
              Add new category
            </button>
          </div>
          <div className="py-3">
            <table className="table table-borderless table-responsive-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Image</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, idx) => {
                  return (
                    <tr
                      className={`${
                        category.attributes.deletedAt !== null
                          ? "bg-danger"
                          : ""
                      }`}
                      key={idx}
                    >
                      <th style={{ verticalAlign: "middle" }} scope="row">
                        {idx + 1}
                      </th>
                      <td style={{ verticalAlign: "middle" }}>
                        {category.attributes.name}
                      </td>{" "}
                      <td style={{ verticalAlign: "middle" }}>
                        {category.attributes.description}
                      </td>
                      <td>
                        <img
                          src={`http://127.0.0.1:8000/images/category/${category.attributes.image}`}
                          alt={category.attributes.name}
                          className="w-25"
                          style={{
                            marginLeft: "50%",
                            transform: "translateX(-50%)",
                          }}
                        />{" "}
                      </td>
                      {!category.attributes.deletedAt ? (
                        <td
                          className="d-flex"
                          style={{ verticalAlign: "middle" }}
                        >
                          <Link
                            to={`/admin/category/${category.id}`}
                            className="btn btn-primary"
                          >
                            {" "}
                            Edit{" "}
                          </Link>
                          <button
                            className="btn btn-danger ml-3"
                            type="submit"
                            onClick={handleDelete(category.id)}
                          >
                            Delete
                          </button>
                        </td>
                      ) : (
                        <td style={{ verticalAlign: "middle" }}>
                          This category is deleted!
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
export default Categories;
