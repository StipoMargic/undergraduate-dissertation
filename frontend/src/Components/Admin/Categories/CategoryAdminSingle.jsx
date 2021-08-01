import React, { useContext, useState } from "react";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { GlobalContext } from "../../../Context/global";
import { MakeCategoryUpdateData } from "./makeCategoryUpdateData";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

const initialFormData = {
  name: "",
  description: "",
  disabled: false,
  error: null,
};

const CategoryAdminSingle = () => {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const { categories, token } = useContext(GlobalContext);
  const history = useHistory();
  const { id } = useParams();

  const category = categories.find((cat) => cat.id === id);

  const renderImageUpload = () => {
    return (
      <>
        <FilePond
          onaddfile={(err, item) => {
            if (err) {
              return;
            }
            setImage((file) => file.concat(item.getFileEncodeDataURL()));
          }}
          allowReorder={false}
          allowMultiple={false}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
        {image === "" && (
          <small className="small text-muted">This field is required.</small>
        )}
      </>
    );
  };

  const handleChange = (e) => {
    e.persist();

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://apizavrsni.udruga-liberato.hr/api/v1/category/${category.id}`,
        MakeCategoryUpdateData(
          category.id,
          category.attributes.name,
          formData.description,
          image
        ),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() =>
        setFormData({ name: "", description: "", disabled: true, error: false })
      )
      .catch(() =>
        setFormData({ name: "", description: "", disabled: false, error: true })
      );
  };

  return (
    <>
      {category && (
        <div className="container mt-1">
          <div className="row justify-content-center">
            {formData.error === true ? (
              <small className="text-danger">Something went wrong!</small>
            ) : formData.error === false ? (
              <small className="text-success">
                You updated {formData.name} category
              </small>
            ) : (
              ""
            )}
          </div>
          <div className="container">
            <div className=" mt-3 ">
              {" "}
              <button
                className="btn btn-info btn-lg"
                type="submit"
                onClick={history.goBack}
              >
                Go back
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="form-group">
                <label htmlFor="name">Name of category:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={category.attributes.name}
                  disabled
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="mt-3 ">
                  Description y{" "}
                </label>
                <textarea
                  name="description"
                  placeholder={category.attributes.description}
                  className="form-control"
                  value={formData.description}
                  required
                  onChange={handleChange}
                />
                {formData.description === "" && (
                  <small className="small text-muted">
                    This field is required.
                  </small>
                )}
                {renderImageUpload()}
                <div className="row  pb-3 justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-outline-primary my-3"
                    onClick={handleSubmit}
                    disabled={formData.disabled}
                  >
                    Update category
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryAdminSingle;
