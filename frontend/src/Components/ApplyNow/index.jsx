import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import axios from "axios";
import { GlobalContext } from "../../Context/global";
import { makeJobApplyData } from "./makeJobApplyData";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode);

const initialFormData = {
  subject: "",
  message: "",
  disabled: false,
  error: null,
};

const ApplyNow = () => {
  const { role, token, username } = useContext(GlobalContext);
  const [pdfFile, setPdfFile] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();
  const { id } = useParams();

  if (role === undefined && role !== "ROLE_USER") {
    history.push("/");
  }

  const renderPdfUpload = () => {
    return (
      <>
        <label>Your resume: </label>
        <h6 className="text-info">Only .pdf files! </h6>
        <FilePond
          acceptedFileTypes={["application/pdf"]}
          onaddfile={(err, item) => {
            if (err) {
              return;
            }
            setPdfFile((file) => file.concat(item.getFileEncodeDataURL()));
          }}
          allowReorder={false}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
        {pdfFile === "" && (
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
        `http://127.0.0.1:8000/api/v1/job/${id}/apply-now`,
        makeJobApplyData(
          formData.subject,
          formData.message,
          id,
          pdfFile,
          username
        ),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
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
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              placeholder="Name of category"
              value={formData.subject}
              className="form-control"
              required
              onChange={handleChange}
              name="subject"
            />
            {formData.subject === "" && (
              <small className="small text-muted">
                This field is required.
              </small>
            )}
          </div>
          <div className="row mb-5">
            <label htmlFor="message" className="mt-3 ">
              Message:
            </label>
            <textarea
              name="message"
              placeholder="Type category message"
              className="form-control"
              value={formData.message}
              required
              onChange={handleChange}
            />
            {formData.message === "" && (
              <small className="small text-muted">
                This field is required.
              </small>
            )}
          </div>
          {renderPdfUpload()}
          <div className="row mt-5 justify-content-center">
            <button
              type="submit"
              className="btn btn-lg btn-outline-primary my-3"
              onClick={handleSubmit}
              disabled={formData.disabled}
            >
              Apply now
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplyNow;
