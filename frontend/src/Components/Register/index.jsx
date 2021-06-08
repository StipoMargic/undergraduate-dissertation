import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { makeRegistrationData } from "./makeRegistrationData";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

const userRegistration = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  city: "",
  occupation: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  about: "",
  role: "Freelancer",
};
const Register = () => {
  const [user, setUser] = useState(userRegistration);
  const [avatar, setAvatar] = useState("");

  const handleInputChange = (inputValue) => (e) => {
    e.persist();

    setUser((prevState) => ({
      ...prevState,
      [inputValue]: e.target.value,
    }));
  };

  const handleRoleClick = (value) => {
    setUser((prevState) => ({
      ...prevState,
      role: value,
    }));
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/register",
        makeRegistrationData(user, avatar)
      )
      .then(() => console.log("success"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="py-3">
        <h4 className="dark-text py-2 text-center">You want to register as:</h4>
        <button
          onClick={() => handleRoleClick("Freelancer")}
          type="button"
          className={`btn w-50 btn-${
            user.role !== "Freelancer" ? "outline-danger" : "primary"
          }`}
        >
          Freelancer
        </button>
        <button
          onClick={() => handleRoleClick("Company")}
          type="button"
          className={`btn w-50 btn-${
            user.role !== "Company" ? "outline-danger" : "primary"
          }`}
        >
          Company
        </button>
      </div>

      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="name">
            Name
            <input
              onChange={handleInputChange("name")}
              type="text"
              id="name"
              className="form-control"
              name="name"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="email_address">
            E-Mail Address
            <input
              onChange={handleInputChange("email")}
              type="text"
              id="email_address"
              className="form-control"
              name="email-address"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password
            <input
              onChange={handleInputChange("password")}
              type="password"
              id="password"
              className="form-control"
              name="password"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">
            Phone Number
            <input
              onChange={handleInputChange("phone")}
              type="text"
              id="phone_number"
              className="form-control"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="address">
            Address
            <input
              onChange={handleInputChange("address")}
              type="text"
              id="address"
              className="form-control"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="city">
            City
            <input
              onChange={handleInputChange("city")}
              type="text"
              id="city"
              className="form-control"
              name="city"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="occupation">
            Occupation
            <input
              onChange={handleInputChange("occupation")}
              type="text"
              id="occupation"
              className="form-control"
              name="occupation"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="facebook">
            Facebook
            <input
              onChange={handleInputChange("facebook")}
              type="text"
              id="facebook"
              className="form-control"
              name="facebook"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="twitter">
            Twitter
            <input
              onChange={handleInputChange("twitter")}
              type="text"
              id="twitter"
              className="form-control"
              name="twitter"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">
            Linkedin
            <input
              onChange={handleInputChange("linkedin")}
              type="text"
              id="linkedin"
              className="form-control"
              name="linkedin"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="about">
            About
            <input
              onChange={handleInputChange("about")}
              type="text"
              id="about"
              className="form-control"
              name="about"
            />
          </label>
        </div>

        <FilePond
          onaddfile={(err, item) => {
            if (err) {
              return;
            }
            setAvatar((file) => file.concat(item.getFileEncodeDataURL()));
          }}
          allowReorder={false}
          allowMultiple={false}
          labelIdle='Drag & Dr`op your files or <span class="filepond--label-action">Browse</span>'
        />

        <div className="col-md-6 offset-md-4 mb-5">
          <button
            onClick={handleRegistration}
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
