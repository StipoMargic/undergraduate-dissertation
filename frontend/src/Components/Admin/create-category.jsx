import React, { useContext, useState } from "react";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import axios from "axios";
import { MakeCategoryPostData } from "./makeCategoryPostData";
import { GlobalContext } from "../../Context/global";

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

const CreateCategory = () => {
  const { token } = useContext(GlobalContext);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState(initialFormData);

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
      .post(
        "http://127.0.0.1:8000/api/v1/category",
        MakeCategoryPostData(formData.name, formData.description, image),
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          {formData.error === true ? (
            <small className="text-danger">Something went wrong!</small>
          ) : formData.error === false ? (
            <small className="text-success">
              You created {formData.name} category
            </small>
          ) : (
            ""
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="row">
            <label htmlFor="name">Name of category:</label>
            <input
              type="text"
              id="name"
              placeholder="Name of category"
              value={formData.name}
              className="form-control"
              required
              onChange={handleChange}
              name="name"
            />
            {formData.name === "" && (
              <small className="small text-muted">
                This field is required.
              </small>
            )}
          </div>
          <div className="row mb-5">
            <label htmlFor="description" className="mt-3 ">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Type category description"
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
          </div>
          {renderImageUpload()}
          <div className="row mt-5 justify-content-center">
            <button
              type="submit"
              className="btn btn-lg btn-outline-primary my-3"
              onClick={handleSubmit}
              disabled={formData.disabled}
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
