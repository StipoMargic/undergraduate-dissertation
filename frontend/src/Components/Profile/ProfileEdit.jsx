import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import {FilePond} from "react-filepond";
import axios from "axios";
import {GlobalContext} from "../../Context/global";
import Spinner from "../AboutNumbers/Spinner";
import {MakeUserUpdateData} from "../Admin/Users/makeUserUpdateData";

const ProfileEdit = () => {
  const {name} = useParams()
  const {loading, users, token} = useContext(GlobalContext)
  const [error, setError] = useState(null)
  const user = users.find((u) => u.attributes.username === name)
  const [userInfo, setUserInfo] = useState(user)
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    if (user !== undefined) {
      setUserInfo(user.attributes);
    }
  }, [user]);

  const handleEdit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://apizavrsni.udruga-liberato.hr/api/v1/users/${user.id}`,
        MakeUserUpdateData(user.id, userInfo, avatar),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => window.location.reload())
      .catch(() => setError(true));

    window.scrollTo(0, 0);
  };

  const handleInputChange = (e) => {
    e.persist();

    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
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


  return <>{(loading || userInfo === undefined) ? <Spinner/> : (<>
    <div className="container">
      {error && <p className="text-danger">Error</p>}
      <div className="my-5 col-lg-12 col-sm-12">
        <div className="py-3">
          <form onSubmit={handleEdit}>
            <div className="form-group">
              <label className="w-100" htmlFor="name">
                Name
                <input
                  onChange={handleInputChange}
                  type="text"
                  readOnly
                  id="name"
                  className="form-control w-100"
                  name="username"
                  value={userInfo.username}
                />
              </label>
              <small className="small text-info">This is read only field...</small>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="email_address">
                E-Mail Address
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="email_address"
                  className="form-control w-100"
                  name="email"
                  value={userInfo.email}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="password">
                Password
                <input
                  onChange={handleInputChange}
                  type="password"
                  id="password"
                  className="form-control w-100"
                  name="password"
                  placeholder="Type new password..."
                  value={userInfo.password}
                />
              </label>

            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="phone_number">
                Phone Number
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="phone_number"
                  className="form-control w-100"
                  name="phone"
                  value={userInfo.phone}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="address">
                Address
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="address"
                  className="form-control w-100"
                  name="address"
                  value={userInfo.address}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="city">
                City
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="city"
                  className="form-control w-100"
                  name="city"
                  value={userInfo.city}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="occupation">
                Occupation
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="occupation"
                  className="form-control w-100"
                  name="occupation"
                  value={userInfo.occupation}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="facebook">
                Facebook
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="facebook"
                  className="form-control w-100"
                  name="facebook"
                  value={userInfo.facebook}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="twitter">
                Twitter
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="twitter"
                  className="form-control w-100"
                  name="twitter"
                  value={userInfo.twitter}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="linkedin">
                Linkedin
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="linkedin"
                  className="form-control w-100"
                  name="linkedin"
                  value={userInfo.linkedin}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="about">
                About
                <textarea
                  onChange={handleInputChange}
                  id="about"
                  className="form-control w-100"
                  name="about"
                  value={userInfo.about}
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
    </div>
  </>)}</>
}

export default ProfileEdit;
