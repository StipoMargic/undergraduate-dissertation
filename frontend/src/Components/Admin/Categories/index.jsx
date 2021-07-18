import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../../Context/global";

const Categories = () => {
  const { categories, token } = useContext(GlobalContext);
  const [deletionMessage, setDeletionMessage] = useState(null);
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
    <div className="container">
      {deletionMessage !== null && (
        <h3 className="text-danger text-center">{deletionMessage}</h3>
      )}
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
  );
};
export default Categories;
