import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { GlobalContext } from "../../Context/global";

const Profile = () => {
  const { username, users, removeAllCookies, token } =
    useContext(GlobalContext);
  const { name } = useParams();
  const [user, setUser] = useState();
  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    setUser(users.find((u) => u.attributes.username === username));
  }, []);

  if (username !== name) {
    history.push("/");
  }

  if (user !== undefined) {
    if (user.attributes.deletedAt !== null) {
      history.push("/");
    }
  }

  const deleteUser = (id) => (e) => {
    e.persist();

    axios
      .delete(`http://apizavrsni.udruga-liberato.hr/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => removeAllCookies())
      .catch(() => setError(true));

    window.scrollTo(0, 0);
  };

  return (
    <div className="container vh-80">
      {error && (
        <smalll className="small text-danger">Something went wrong!</smalll>
      )}
      {user && (
        <div>
          <div className="row m-5 justify-content-center">
            <h5>
              Hello <span className="text-primary">{username}</span> you are
              part of{" "}
              <span className="text-primary">
                {user.attributes.roles[0] === "ROLE_USER"
                  ? "Freelancer"
                  : user.attributes.roles[0] === "ROLE_EMPLOYER"
                  ? "Company"
                  : "Administrator"}
              </span>{" "}
              group.
            </h5>
          </div>
          <div className="row m-5">
            <div className="col-8" />
            <div className="col-4">
              <div className="row justify-content-center mb-4">
                <img
                  src={`http://apizavrsni.udruga-liberato.hr/${user.attributes.avatar}`}
                  className="w-25"
                  alt="avatars"
                />
              </div>
              <div className="font-weight-bold mb-1">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                ACCOUNT INFORMATION'S:
              </div>
              <div className="font-weight-normal text-black-50 mb-1">
                Account created:{" "}
                {new Date(user.attributes.createdAt).toDateString()}
              </div>
              {user.attributes.updatedAt !== null && (
                <div className="font-weight-normal text-black-50 mb-1">
                  Account created:{" "}
                  {new Date(user.attributes.updatedAt).toDateString()}
                </div>
              )}
              <div className="font-weight-normal text-black-50 mb-1">
                Location: {user.attributes.address}, {user.attributes.city}
              </div>
              <div className="font-weight-normal text-black-50 mb-1">
                Occupation: {user.attributes.occupation}
              </div>
              <div className="font-weight-normal text-black-50 mb-1">
                Phone: {user.attributes.phone}
              </div>
              <div className="row justify-content-center m-2">
                <button
                  className="w-100 btn btn-danger"
                  type="submit"
                  onClick={deleteUser(user.id)}
                >
                  Deactivate
                </button>
              </div>
              <div className="_jb_summary light_box p-4">
                <h4>Social Info</h4>
                <ul className="shares_jobs">
                  {user.attributes.facebook && (
                    <li>
                      <a
                        target="_blank"
                        href={user.attributes.facebook}
                        className="share fb"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                    </li>
                  )}
                  {user.attributes.twitter && (
                    <li>
                      <a
                        target="_blank"
                        href={user.attributes.twitter}
                        className="share tw"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </li>
                  )}
                  {user.attributes.linkedin && (
                    <li>
                      <a
                        target="_blank"
                        href={user.attributes.linkedin}
                        className="share ln"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href={`mailto: ${user.attributes.email}`}
                      className="share ln"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                  </li>
                </ul>
              </div>
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
    </div>
  );
};

export default Profile;
