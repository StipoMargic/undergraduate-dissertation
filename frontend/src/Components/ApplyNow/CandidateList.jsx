import React, { useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { GlobalContext } from "../../Context/global";
import { makeDeclineData } from "./makeDeclineData";
import { makeApproveData } from "./makeApproveData";

const CandidateList = () => {
  const { role, jobs, username, token } = useContext(GlobalContext);
  const history = useHistory();

  const jobsArray = jobs.filter((j) => j.attributes.name === username);

  const handleDecline = (jobId, applicantName) => (e) => {
    e.preventDefault();

    axios
      .post(
        `http://apizavrsni.udruga-liberato-hr/api/v1/job/${jobId}/decline`,
        makeDeclineData(jobId, applicantName),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => console.log("Ok"))
      .catch((err) => console.log(err));
  };

  const handleApprove = (jobId, applicantName) => (e) => {
    e.preventDefault();

    axios
      .post(
        `http://apizavrsni.udruga-liberato-hr/api/v1/job/${jobId}/approve`,
        makeApproveData(jobId, applicantName),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => console.log("Ok"))
      .catch((err) => console.log(err));
  };

  const renderApplied = () => {
    return (
      <div className="container vh-80">
        <h3 className="text-center m-5">Candidate list for {username}</h3>
        <div className="row">
          {jobsArray.map((job) => {
            if (job.attributes.applied.length > 0) {
              return job.attributes.applied.map((applicant) => {
                return (
                  <div className="row" key={job.id}>
                    <p className="pl-5">
                      Freelancer: {applicant} applied for{" "}
                      {job.attributes.jobPositionName}{" "}
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
                        onClick={() => handleDecline(job.id, applicant)}
                      >
                        Decline
                      </button>
                      <button
                        className="btn btn-success mr-1"
                        type="submit"
                        onClick={() => handleApprove(job.id, applicant)}
                      >
                        Approve
                      </button>
                    </p>
                  </div>
                );
              });
            }
            return null;
          })}
        </div>
      </div>
    );
  };
  return <>{role === "ROLE_USER" ? history.push("/") : renderApplied()}</>;
};

export default CandidateList;
