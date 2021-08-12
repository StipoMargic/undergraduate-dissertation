import React, { useContext, useState } from "react";
import "./styles.scss";
import axios from "axios";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useHistory } from "react-router";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { makeRegistrationData } from "./makeRegistrationData";
import { GlobalContext } from "../../Context/global";
import Spinner from "../AboutNumbers/Spinner";
import { goToHome } from "../../Utils/redirects";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

const userRegistration = {
  name: "",
  email: "",
  password: "",
  password2: "",
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
  const { username, loading } = useContext(GlobalContext);
  const history = useHistory();
  const [user, setUser] = useState(userRegistration);
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null);

  if (username) {
    history.push("/");
  }

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
    window.scrollTo(0, 0);
    setPasswordMatch(true);
    if (user.password !== user.password2) {
      setPasswordMatch(false);
    } else {
      axios
        .post(
          "http://apizavrsni.udruga-liberato.hr/api/register",
          makeRegistrationData(user, avatar)
        )
        .then(() => {
          goToHome(2);
          setError(false);
        })
        .catch(() => setError(true));
    }
  };

  const renderHeader = () => {
    return (
      <div className="container">
        <div className="py-3">
          <h4 className="dark-text py-2 text-center">
            You want to register as:
          </h4>
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
      </div>
    );
  };

  const renderFreelancerRegistrationForm = () => {
    return (
      <>
        {renderHeader()}
        <div className="container mt-5">
          {error === false && (
            <p className="text-center font-weight-bold text-success">
              All went alright, check email for verification!
            </p>
          )}
          {error === true && (
            <p className="text-center font-weight-bold text-danger">
              Something went wrong, check required fields!
            </p>
          )}
          <small className="small text-info">
            All fields marked with * are required!{" "}
          </small>
          <form onSubmit={handleRegistration}>
            <h4 className="ml-3 mb-3 text-blue">User info: </h4>
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  onChange={handleInputChange("name")}
                  className="form-control"
                  placeholder="Your name *"
                  required
                />
                {error ||
                  (user.name === "" && (
                    <div className="small text-danger ml-2 mt-1“">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      This field is required or it's already taken!
                    </div>
                  ))}
              </div>
              <div className="col">
                <input
                  onChange={handleInputChange("email")}
                  type="email"
                  placeholder="Email *"
                  className="form-control"
                  required
                />
                {error === true ||
                  (user.email === "" && (
                    <div className="small text-danger ml-2 mt-1“">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      This field is required or it's already taken!
                    </div>
                  ))}
              </div>
            </div>
            <div className="form-row mt-4">
              <div className="col">
                <input
                  type="password"
                  onChange={handleInputChange("password")}
                  className="form-control"
                  placeholder="Your password *"
                  required
                />
                {error ||
                  (user.password === "" && (
                    <div className="small text-danger ml-2 mt-1“">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      This field is required!
                    </div>
                  ))}
              </div>
              <div className="col">
                <input
                  onChange={handleInputChange("password2")}
                  type="password"
                  placeholder="Confirm password *"
                  className="form-control"
                  required
                />
                {error ||
                  (user.password === "" && (
                    <div className="small text-danger ml-2 mt-1“">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      This field is required!
                    </div>
                  ))}
              </div>
            </div>
            {error && !passwordMatch && (
              <div className="small text-danger ml-2 mt-1“">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Passwords doesn't match!
              </div>
            )}
            <h4 className="ml-3 my-3 text-blue">Personal info: </h4>
            <div className="form-row mt-4">
              <div className="col">
                <input
                  onChange={handleInputChange("phone")}
                  type="text"
                  className="form-control"
                  placeholder="Your phone number"
                />
              </div>
              <div className="col">
                <input
                  onChange={handleInputChange("address")}
                  type="text"
                  className="form-control"
                  placeholder="Your Address"
                />
              </div>
              <div className="col">
                <input
                  onChange={handleInputChange("city")}
                  type="text"
                  className="form-control"
                  placeholder="Your City"
                />
              </div>
            </div>
            <div className="form-row mt-4">
              <div className="col-lg-8 col-sm-12">
                <textarea
                  className="form-control"
                  rows={3}
                  required
                  onChange={handleInputChange("about")}
                  placeholder="Give us some information about yourself... *"
                >
                  {user.about}
                </textarea>
                {error ||
                  (user.about === "" && (
                    <div className="small text-danger ml-2 mt-1“">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      This field is required!
                    </div>
                  ))}
              </div>
              <div className="col-lg-4 col-sm-12">
                <input
                  onChange={handleInputChange("occupation")}
                  type="text"
                  className="form-control"
                  placeholder="Your Occupation"
                />
              </div>
            </div>
            <h4 className="ml-3 my-3 text-blue">Social media: </h4>
            <div className="form-row mt-4">
              <div className="col">
                <input
                  onChange={handleInputChange("facebook")}
                  type="text"
                  className="form-control"
                  placeholder="Facebook"
                />
              </div>
              <div className="col">
                <input
                  onChange={handleInputChange("twitter")}
                  type="text"
                  className="form-control"
                  placeholder="Twitter"
                />
              </div>
              <div className="col">
                <input
                  onChange={handleInputChange("linkedin")}
                  type="text"
                  className="form-control"
                  placeholder="Linkedin"
                />
              </div>
            </div>
            <div className="mt-4">
              <FilePond
                acceptedFileTypes={["image/*"]}
                onaddfile={(err, item) => {
                  if (err) {
                    return;
                  }
                  setAvatar((file) => file.concat(item.getFileEncodeDataURL()));
                }}
                allowReorder={false}
                allowMultiple={false}
                labelIdle='Drag & Drop your avatar* or <span class="filepond--label-action">Browse</span>'
              />
            </div>
            {error ||
              (avatar === "" && (
                <div className="small text-danger ml-2 mt-1“">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  This field is required!
                </div>
              ))}
            <div className="row pb-5 justify-content-center">
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
      </>
    );
  };

  return <>{loading ? <Spinner /> : renderFreelancerRegistrationForm()}</>;
};
export default Register;
