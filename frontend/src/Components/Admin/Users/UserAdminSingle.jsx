import { useParams } from "react-router";
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
  const { id } = useParams();
  const user = users.find((u) => u.id === id);
  const [newUserInfo, setNewUserInfo] = useState(user);
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (user !== undefined) {
      setNewUserInfo(user.attributes);
    }
  }, [user]);

  const handleEdit = (e) => {
    e.preventDefault();

    axios.put(
      `http://apizavrsni.udruga-liberato.hr/api/v1/users/${id}`,
      MakeUserUpdateData(id, newUserInfo, avatar),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleInputChange = (e) => {
    e.persist();

    setNewUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(avatar);

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
      {newUserInfo && (
        <div className="container">
          <div className="row">
            <div className=" my-5 col-9">
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
            <div className="col-2">zer</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAdminSingle;
