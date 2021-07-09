import React from "react";
import "./styles.scss";

const Category = ({ name, image, length }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="urip_cated shadow">
        <img
          src={`http://127.0.0.1:8000/images/category/${image}`}
          alt={name}
          className="category-image"
        />
        <div className="urip_cated_caps">
          <h6 className="cats_urip_title">{name}</h6>
          <span>Jobs found:{length}</span>
        </div>
      </div>
    </div>
  );
};
export default Category;
