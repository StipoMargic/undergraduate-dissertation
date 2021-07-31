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
      .delete(`http://apizavrsni.udruga-liberato.hr/api/v1/category/${id}`, {
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
          <div className="row mt-5">
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
          <table className="table table-bordered mt-5">
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
                      category.attributes.deletedAt !== null ? "bg-danger" : ""
                    }`}
                    key={idx}
                  >
                    <th scope="row">{idx + 1}</th>
                    <td>{category.attributes.name}</td>{" "}
                    <td>{category.attributes.description}</td>
                    <td>
                      <img
                        src={`http://apizavrsni.udruga-liberato.hr/images/category/${category.attributes.image}`}
                        alt={category.attributes.name}
                        className="w-25"
                      />{" "}
                    </td>
                    {!category.attributes.deletedAt && (
                      <td>
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
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default Categories;
