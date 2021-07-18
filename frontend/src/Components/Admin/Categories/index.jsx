import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../../Context/global";

const Categories = () => {
  const { categories, token } = useContext(GlobalContext);

  const handleDelete = (id) => (e) => {
    e.preventDefault();

    axios
      .delete(`http://apizavrsni.udruga-liberato.hr/api/v1/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => console.log("done"))
      .catch(() => console.log("Err"));
  };

  return (
    <>
      <table className="table table-bordered">
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
            if (category.attributes.deleted_at === null) {
              return (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{category.attributes.name}</td>
                  <td>{category.attributes.description}</td>
                  <td>{category.attributes.image}</td>
                  <td>
                    <Link
                      to={`/admin/category/${category.id}`}
                      className="btn btn-primary"
                    >
                      {" "}
                      Edit{" "}
                    </Link>
                    <button
                      className="btn btn-danger"
                      type="submit"
                      onClick={handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </>
  );
};
export default Categories;
