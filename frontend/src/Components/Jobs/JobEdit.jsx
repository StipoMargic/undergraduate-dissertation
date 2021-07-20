import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import { GlobalContext } from "../../Context/global";

const JobEdit = () => {
  const { id } = useParams();
  const { jobs } = useContext(GlobalContext);
  const job = jobs.find((j) => j.id === id);
  const [newJobInfo, setNewJobInfo] = useState(job);
  const [activeTill, setActiveTill] = useState(new Date());
  useEffect(() => setNewJobInfo(job), [job]);

  const handleJobEdit = (e) => {
    e.preventDefault();

    console.log(newJobInfo);
  };

  const handleJobChange = (value) => (e) => {
    e.persist();

    if (value === "disableFriendly") {
      setNewJobInfo((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [value]: e.target.checked,
        },
      }));
    } else {
      setNewJobInfo((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [value]: e.target.value,
        },
      }));
    }
  };

  const renderJobCreation = () => {
    return (
      <div className="container py-5">
        <h2 className="text-dark text-center pb-5">
          Add job listing for your company!
        </h2>
        <form className="form-group" onSubmit={handleJobEdit}>
          <label
            htmlFor="jobSummary"
            className="mb-0 text-primary text-lg-left font-weight-bold"
          >
            Job summary:
          </label>
          <textarea
            className="form-control"
            id="jobSummary"
            onChange={handleJobChange("jobSummary")}
            value={newJobInfo.attributes.jobSummary}
          />
          <label
            htmlFor="jobDuties"
            className="mb-0 text-primary text-lg-left font-weight-bold"
          >
            Job Duties:
          </label>
          <textarea
            id="jobDuties"
            className="form-control"
            value={newJobInfo.attributes.jobDuties}
            onChange={handleJobChange("jobDuties")}
          />
          <label
            htmlFor="jobDutiesBulletins"
            className="mb-0 text-primary text-lg-left font-weight-bold"
          >
            Job Duties Bulletins:
          </label>
          <textarea
            className="form-control"
            id="jobDutiesBulletins"
            value={newJobInfo.attributes.jobDutiesBulletins}
            onChange={handleJobChange("jobDutiesBulletins")}
          />
          <small className="form-text text-muted">
            Divide bulletins with comma (First bulletin, Second bulletin).
          </small>
          <div className="row">
            <div className="col">
              <label
                htmlFor="jobPositionName"
                className="mb-0 text-primary text-lg-left font-weight-bold"
              >
                Job position name
              </label>
              <input
                type="text"
                id="jobPositionName"
                className="form-control"
                onChange={handleJobChange("jobPositionName")}
                value={newJobInfo.attributes.jobPositionName}
              />
            </div>
            <div className="col">
              <label
                htmlFor="skills"
                className="mb-0 text-primary text-lg-left font-weight-bold"
              >
                Skills:
              </label>
              <input
                className="form-control"
                type="text"
                id="skills"
                onChange={handleJobChange("skills")}
                value={newJobInfo.attributes.skills}
              />
              <small className="form-text text-muted">
                Divide skills with comma (Word, Excel).
              </small>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                htmlFor="vacancy"
                className="mb-0 text-primary text-lg-left font-weight-bold"
              >
                Vacancy
              </label>
              <input
                className="form-control"
                type="NUMBER"
                min={0}
                max={100}
                step={1}
                id="vacancy"
                onChange={handleJobChange("vacancy")}
                value={newJobInfo.attributes.vacancy}
              />
            </div>
            <div className="col">
              <label
                htmlFor="location"
                className="mb-0 text-primary text-lg-left font-weight-bold"
              >
                Location
              </label>
              <input
                className="form-control"
                type="text"
                id="location"
                onChange={handleJobChange("location")}
                value={newJobInfo.attributes.location}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                htmlFor="salary"
                className="mb-0 text-primary text-lg-left font-weight-bold"
              >
                Salary
              </label>
              <input
                className="form-control"
                type="number"
                min={0}
                max={250000}
                step={1000}
                id="salary"
                onChange={handleJobChange("salary")}
                value={newJobInfo.attributes.salary}
              />
            </div>
            <div className="col">
              <label
                htmlFor="hours"
                className="mb-0 text-primary text-lg-left font-weight-bold"
              >
                Hours
              </label>
              <input
                className="form-control"
                type="number"
                min={0}
                max={360}
                step={1}
                id="hours"
                onChange={handleJobChange("hours")}
                value={newJobInfo.attributes.hours}
              />
            </div>
          </div>
          <fieldset className="form-group pt-3">
            <div className="row">
              <legend className="col-form-label col-sm-2 mb-0 text-primary text-lg-left font-weight-bold">
                Type of position
              </legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    onChange={handleJobChange("typeOfPosition")}
                    id="remote"
                    value="Remote"
                  />
                  <label className="form-check-label" htmlFor="remote">
                    Remote
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="partTime"
                    onChange={handleJobChange("typeOfPosition")}
                    value="Part time"
                  />
                  <label className="form-check-label" htmlFor="partTime">
                    Part time
                  </label>
                </div>
                <div className="form-check disabled">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="fullTime"
                    value="Full time"
                    onChange={handleJobChange("typeOfPosition")}
                  />
                  <label className="form-check-label" htmlFor="fullTime">
                    Full time
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="form-group row">
            <div className="col-sm-2 mb-0 text-primary text-lg-left font-weight-bold">
              Disabled friendly:
            </div>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  onChange={handleJobChange("disableFriendly")}
                  className="form-check-input"
                  type="checkbox"
                  id="disabledFriendly"
                  checked={newJobInfo.attributes.disableFriendly}
                />
              </div>
            </div>
          </div>
          <label
            htmlFor="activeTill"
            className="mb-0 text-primary text-lg-left font-weight-bold"
          >
            Active till
          </label>
          <DatePicker
            selected={activeTill}
            onChange={(date) => setActiveTill(date)}
          />
          <div className="row w-100 justify-content-center py-5 mt-5">
            <button
              type="submit"
              onClick={handleJobEdit}
              className="btn btn-lg btn-outline-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  return <>{newJobInfo === undefined ? 1 : renderJobCreation()}</>;
};

export default JobEdit;
