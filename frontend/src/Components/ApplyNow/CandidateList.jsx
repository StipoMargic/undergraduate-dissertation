import React, { useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { GlobalContext } from "../../Context/global";
import { makeDeclineData } from "./makeDeclineData";
import { makeApproveData } from "./makeApproveData";
import { FREELANCER } from "../../Constants/roles";

const CandidateList = () => {
  const { role, jobs, username, token } = useContext(GlobalContext);
  const history = useHistory();

  const jobsArray = jobs.filter((j) => j.attributes.name === username);

  const handleDecline = (jobId, applicantName) => (e) => {
    e.preventDefault();

    axios
      .post(
        `http://apizavrsni.udruga-liberato.hr/api/v1/job/${jobId}/decline`,
        makeDeclineData(jobId, applicantName),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => null)
      .catch(() => null);
  };

  const handleApprove = (jobId, applicantName) => (e) => {
    e.preventDefault();

    axios
      .post(
        `http://apizavrsni.udruga-liberato.hr/api/v1/job/${jobId}/approve`,
        makeApproveData(jobId, applicantName),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => null)
      .catch(() => null);
  };

  const renderApplied = () => {
    return (
      <div className="container vh-80">
        <h3 className="text-center m-5">Candidate list for {username}</h3>
        <div className="row">
          {jobsArray.map((job) => {
            if (job.attributes.applied.length > 0) {
              return (
                <table className="table table-bordered table-responsive-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Applicant name</th>
                      <th scope="col">Job position name</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  {job.attributes.applied.map((applicant) => {
                    return (
                      <tbody key={job.id}>
                        <tr>
                          <th scope="row" style={{ verticalAlign: "middle" }}>
                            1
                          </th>
                          <td style={{ verticalAlign: "middle" }}>
                            {applicant}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {job.attributes.jobPositionName}
                          </td>
                          <td className="d-flex">
                            <button
                              className="btn btn-info mr-1"
                              type="submit"
                              onClick={() => history.push(`/jobs/${job.id}`)}
                            >
                              View job ad
                            </button>
                            <button
                              className="btn btn-danger mr-1"
                              type="submit"
                              onClick={handleDecline(job.id, applicant)}
                            >
                              Decline
                            </button>
                            <button
                              className="btn btn-success mr-1"
                              type="submit"
                              onClick={handleApprove(job.id, applicant)}
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };
  return <>{role === FREELANCER ? history.push("/") : renderApplied()}</>;
};

export default CandidateList;
