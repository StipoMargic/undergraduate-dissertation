import React, { useContext } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/global";

const CandidateList = () => {
  const { role, jobs, username } = useContext(GlobalContext);
  const history = useHistory();

  const jobsArray = jobs.filter((j) => j.attributes.name === username);

  const handleDecline = () => {
    console.log("decline");
  };

  const handleApprove = () => {
    console.log("approve");
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
                  <p className="mr-5">
                    Freelancer: {applicant} applied for{" "}
                    {job.attributes.jobPositionName}{" "}
                    <button
                      className="btn btn-info mL-5"
                      type="submit"
                      onClick={() => history.push(`/jobs/${job.id}`)}
                    >
                      View job ad
                    </button>
                    <button
                      className="btn btn-danger ml-1"
                      type="submit"
                      onClick={handleDecline}
                    >
                      Decline
                    </button>
                    <button
                      className="btn btn-success ml-1"
                      type="submit"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                  </p>
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
