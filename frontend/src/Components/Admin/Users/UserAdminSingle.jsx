import { useHistory, useParams } from "react-router";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../../Context/global";
import { MakeUserUpdateData } from "./makeUserUpdateData";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

const UserAdminSingle = () => {
  const { users, token } = useContext(GlobalContext);
  const history = useHistory();
  const { id } = useParams();
  const user = users.find((u) => u.id === id);
  const [newUserInfo, setNewUserInfo] = useState(user);
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    if (user !== undefined) {
      setNewUserInfo(user.attributes);
    }
  }, [user]);

  const handleEdit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://apizavrsni.udruga-liberato.hr/api/v1/users/${id}`,
        MakeUserUpdateData(id, newUserInfo, avatar),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => window.location.reload())
      .catch(() => setError(true));
  };

  const deleteUser = (e) => {
    e.persist();

    axios
      .delete(`http://apizavrsni.udruga-liberato.hr/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => window.location.reload())
      .catch(() => setError(true));
  };

  const verifyUser = (verificationToken) => (e) => {
    e.preventDefault();

    axios
      .post(
        `http://apizavrsni.udruga-liberato.hr/v1/verify/${verificationToken}`
      )
      .then(() => window.location.reload())
      .catch(() => setError(true));
  };

  const handleInputChange = (e) => {
    e.persist();

    setNewUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const renderUpload = () => {
    return (
      <FilePond
        onaddfile={(err, item) => {
          if (err) {
            return;
          }
          setAvatar((file) => file.concat(item.getFileEncodeDataURL()));
        }}
        allowReorder={false}
        allowMultiple={false}
        labelIdle="Drag & Drop your avatar or Browse"
      />
    );
  };

  return (
    <>
      {error && (
        <div className="container mt-3">
          <h3 className="text-danger text-center">
            Something went wrong! All fields are required!
          </h3>
        </div>
      )}

      {newUserInfo && (
        <div className="container">
          <div className="row">
            <div className=" my-5 col-8">
              <div className="py-3">
                <form onSubmit={handleEdit}>
                  <div className="form-group">
                    <label htmlFor="name">
                      Name
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="name"
                        className="form-control"
                        name="username"
                        value={newUserInfo.username}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email_address">
                      E-Mail Address
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="email_address"
                        className="form-control"
                        name="email"
                        value={newUserInfo.email}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      Password
                      <input
                        onChange={handleInputChange}
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="Type new password..."
                        value={newUserInfo.password}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone_number">
                      Phone Number
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="phone_number"
                        className="form-control"
                        name="phone"
                        value={newUserInfo.phone}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">
                      Address
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="address"
                        className="form-control"
                        name="address"
                        value={newUserInfo.address}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">
                      City
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="city"
                        className="form-control"
                        name="city"
                        value={newUserInfo.city}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="occupation">
                      Occupation
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="occupation"
                        className="form-control"
                        name="occupation"
                        value={newUserInfo.occupation}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="facebook">
                      Facebook
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="facebook"
                        className="form-control"
                        name="facebook"
                        value={newUserInfo.facebook}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="twitter">
                      Twitter
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="twitter"
                        className="form-control"
                        name="twitter"
                        value={newUserInfo.twitter}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="linkedin">
                      Linkedin
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="linkedin"
                        className="form-control"
                        name="linkedin"
                        value={newUserInfo.linkedin}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="about">
                      About
                      <textarea
                        onChange={handleInputChange}
                        type="text"
                        id="about"
                        className="form-control"
                        name="about"
                        value={newUserInfo.about}
                      />
                    </label>
                  </div>

                  {renderUpload()}
                  <div className="row pt-4 d-flex justify-content-center">
                    <button
                      className="btn btn-primary btn-lg w-50"
                      type="submit"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-4 mt-5">
              {user.attributes.roles[0] === "ROLE_EMPLOYER" ? (
                <small className="small">
                  This user is part of Company role
                </small>
              ) : user.attributes.roles[0] === "ROLE_USER" ? (
                <small className="small">This user is Freelancer</small>
              ) : (
                <small className="small">This is Admin</small>
              )}
              {user.attributes.verified ? (
                <div className="py-3">
                  <small className="small text-success">
                    This is user verified!
                  </small>
                </div>
              ) : (
                <div className="py-3">
                  <small className="small mr-2">
                    This is user not verified
                  </small>
                  <button
                    type="submit"
                    onClick={verifyUser(user.attributes.token)}
                    className="btn btn-sm btn-danger"
                  >
                    Verify
                  </button>
                </div>
              )}
              {user.attributes.deletedAt === null ? (
                <div className="py-3">
                  <small className="small text-success">
                    This user is active!
                  </small>
                  <button
                    onClick={deleteUser}
                    type="submit"
                    className="btn ml-2 btn-danger btn-sm"
                  >
                    Deactivate
                  </button>
                </div>
              ) : (
                <div className="py-3">
                  <small className="small text-danger">
                    This user is deactivated!
                  </small>
                </div>
              )}
              <small className="small">
                Created: {new Date(user.attributes.createdAt).toDateString()}
              </small>

              {user.attributes.roles[0] === "ROLE_EMPLOYER" ? (
                <div className="pt-2">
                  <small className="small">
                    You have <span>{user.attributes.jobs.length} jobs.</span>
                  </small>
                </div>
              ) : user.attributes.roles[0] === "ROLE_USER" ? (
                <div className="pt-2">
                  <small className="small">
                    You have{" "}
                    <span>{user.attributes.portfolios.length} portfolios.</span>
                  </small>
                </div>
              ) : (
                ""
              )}
              <div className="mt-3">
                <button
                  className="btn btn-info w-100"
                  type="submit"
                  onClick={history.goBack}
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAdminSingle;
