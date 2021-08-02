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
import { ADMIN, COMPANY, FREELANCER } from "../../Constants/roles";

const Profile = () => {
  const { username, users, removeAllCookies, token, role, jobs, portfolios } =
    useContext(GlobalContext);
  const { name } = useParams();
  const [user, setUser] = useState();
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleJobDeactivation = (jobId) => (e) => {
    e.preventDefault();

    axios
      .delete(`http://apizavrsni.udruga-liberato.hr/api/v1/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => window.location.reload())
      .catch(() => setError(true));

    window.scrollTo((0, 0));
  };

  const handlePortfolioDeactivation = (portfolioId) => (e) => {
    e.preventDefault();

    axios
      .delete(
        `http://apizavrsni.udruga-liberato.hr/api/v1/portfolios/${portfolioId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => window.location.reload())
      .catch(() => setError(true));

    window.scrollTo((0, 0));
  };

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
      .then(() => {
        removeAllCookies();
        window.location.reload();
      })
      .catch(() => setError(true));

    window.scrollTo(0, 0);
  };

  return (
    <div className="container">
      {error === true && (
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
          <div className="row mt-5">
            <div className="col-lg-8 col-sm-12">
              {role === ADMIN && (
                <p
                  className="text-info text-center font-weight-bold text-uppercase"
                  style={{ verticalAlign: "middle" }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  You don't have any listing's as administrator.
                </p>
              )}
              {role === FREELANCER && (
                <div>
                  <h6>
                    You have {user.attributes.portfolios.length} portfolios.
                  </h6>
                  <table className="table table-bordered table-light table-responsive-sm">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Hourly rate</th>
                        <th scope="col">Hours available per month</th>
                        <th scope="col">Commands</th>
                      </tr>
                    </thead>
                    {user.attributes.portfolios.map((portfolioId, idx) => {
                      const portfolio = portfolios.find(
                        (p) => p.id === portfolioId
                      );
                      return (
                        <tbody>
                          <tr>
                            <th scope="row">{idx + 1}</th>
                            <td>{portfolio.attributes.category}</td>
                            <td>$ {portfolio.attributes.rate}</td>
                            <td>{portfolio.attributes.hour} per month</td>
                            {portfolio.attributes.deletedAt === null ? (
                              <td className="d-flex">
                                <button
                                  className="btn btn-primary btn-sm"
                                  type="button"
                                  onClick={() =>
                                    history.push(`/freelancers/${portfolioId}`)
                                  }
                                >
                                  View
                                </button>
                                <button
                                  className="btn btn-sm ml-2 btn-info"
                                  type="button"
                                  onClick={() =>
                                    history.push(
                                      `/freelancers/edit/${portfolioId}`
                                    )
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm ml-2 btn-danger"
                                  type="button"
                                  onClick={handlePortfolioDeactivation(
                                    portfolioId
                                  )}
                                >
                                  Delete
                                </button>
                              </td>
                            ) : (
                              <td className="text-danger small">
                                This portfolio has been deactivated!
                              </td>
                            )}
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              )}
              {role === COMPANY && (
                <div>
                  <h6 className="text-center py-4">
                    You have {user.attributes.jobs.length} jobs listed.
                  </h6>
                  <table className="table table-bordered table-light">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Position Name</th>
                        <th scope="col">Type of position</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Commands</th>
                      </tr>
                    </thead>
                    {user.attributes.jobs.map((jobId, idx) => {
                      const job = jobs.find((j) => j.id === jobId);
                      return (
                        <tbody>
                          <tr>
                            <th scope="row">{idx + 1}</th>
                            <td>{job.attributes.jobPositionName}</td>
                            <td>{job.attributes.typeOfPosition}</td>
                            <td>$ {job.attributes.salary}</td>
                            {job.attributes.deletedAt === null ? (
                              <td className="d-flex">
                                <button
                                  className="btn btn-primary btn-sm"
                                  type="button"
                                  onClick={() => history.push(`/jobs/${jobId}`)}
                                >
                                  View
                                </button>
                                <button
                                  className="btn btn-sm ml-2 btn-info"
                                  type="button"
                                  onClick={() =>
                                    history.push(`/job/edit/${jobId}`)
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm ml-2 btn-danger"
                                  type="button"
                                  onClick={handleJobDeactivation(jobId)}
                                >
                                  Delete
                                </button>
                              </td>
                            ) : (
                              <td className="text-danger small">
                                This job listing deactivated!
                              </td>
                            )}
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              )}
            </div>
            <div className="col-lg-4 col-sm-12">
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
              <div className="mt-3 pb-5">
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
