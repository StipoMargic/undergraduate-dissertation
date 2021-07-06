import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router";
import axios from "axios";
import { GlobalContext } from "../../Context/global";
import { makePortfolioPostRequest } from "./makePortfolioPostRequest";
import { makeJobPostRequest } from "./makeJobPostRequest";

const initialPortfolioData = {
  category: "",
  advancedKnowledge: "",
  advancedKnowledgeBulletins: "",
  skills: "",
  salary: "",
  disabilityPercent: 0,
  rate: "",
  hour: "",
};

const initialQualificationData = {
  nameOfQualification: "",
  yearStart: 2021,
  yearEnd: 2021,
  description: "",
};

const initialExperienceData = {
  jobTitle: "",
  yearStart: 2021,
  yearEnd: 2021,
  description: "",
};

const initialJobData = {
  jobDuties: "",
  jobDutiesBulletins: "",
  skills: "",
  vacancy: "",
  location: "",
  salary: "",
  hours: "",
  typeOfPosition: "",
  disabledFriendly: true,
  jobSummary: "",
  jobPositionName: "",
};

const AddJob = () => {
  const { role, categories, token } = useContext(GlobalContext);
  const history = useHistory();
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);
  const [qualification, setQualification] = useState(initialQualificationData);
  const [experience, setExperience] = useState(initialExperienceData);
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [jobData, setJobData] = useState(initialJobData);
  const [error, setError] = useState(false);
  const [activeTill, setActiveTill] = useState(new Date());

  if (!role) {
    history.push("/");
  }

  const handlePortfolioChange = (value) => (e) => {
    e.persist();

    setPortfolioData((prevState) => ({
      ...prevState,
      [value]: e.target.value,
    }));
  };

  const handleJobChange = (value) => (e) => {
    e.persist();

    if (value === "disabledFriendly") {
      setJobData((prev) => ({
        ...prev,
        [value]: e.target.checked,
      }));
    } else {
      setJobData((prev) => ({
        ...prev,
        [value]: e.target.value,
      }));
    }
  };

  const handleQualificationChange = (value) => (e) => {
    e.persist();

    if (value === "yearStart" || value === "yearEnd") {
      setQualification((prev) => ({
        ...prev,
        [value]: +e.target.value,
      }));
    } else {
      setQualification((prevState) => ({
        ...prevState,
        [value]: e.target.value,
      }));
    }
  };

  const handleExperienceChange = (value) => (e) => {
    e.persist();
    if (value === "yearStart" || value === "yearEnd") {
      setExperience((prev) => ({
        ...prev,
        [value]: +e.target.value,
      }));
    } else {
      setExperience((prev) => ({
        ...prev,
        [value]: e.target.value,
      }));
    }
  };

  const addQualification = () => {
    setQualifications([...qualifications, qualification]);
    setQualification(initialQualificationData);
  };

  const addExperience = () => {
    setExperiences([...experiences, experience]);
    setExperience(initialExperienceData);
  };

  const handlePortfolioSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/v1/portfolios",
        makePortfolioPostRequest(portfolioData, qualifications, experiences),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => history.push("/freelancers"))
      .catch(() => setError(true));
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/v1/job",
        makeJobPostRequest(jobData, activeTill),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => history.push("/jobs"))
      .catch(() => setError(true));
  };

  const renderPortfolioCreation = () => {
    return (
      <>
        <label htmlFor="categories">
          Select Category:
          <select onChange={handlePortfolioChange("category")} id="categories">
            <option>Click here for categories</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.attributes.name}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="advancedKnowledge">
          Advanced Knowledge:
          <textarea
            id="advancedKnowledge"
            cols="30"
            rows="2"
            onChange={handlePortfolioChange("advancedKnowledge")}
          />
        </label>
        <label htmlFor="advancedKnowledgeBulletin">
          Advanced Knowledge Bulletin
          <textarea
            id="advancedKnowledgeBulletin"
            cols="30"
            rows="10"
            onChange={handlePortfolioChange("advancedKnowledgeBulletins")}
          />
        </label>
        <label htmlFor="skills">
          Skills
          <input
            type="text"
            id="skills"
            onChange={handlePortfolioChange("skills")}
          />
        </label>
        <label htmlFor="salary">
          Salary
          <input
            type="text"
            id="salary"
            onChange={handlePortfolioChange("salary")}
          />
        </label>
        <label htmlFor="rate">
          Rate
          <input
            type="text"
            id="rate"
            onChange={handlePortfolioChange("rate")}
          />
        </label>
        <label htmlFor="hour">
          Hour
          <input
            type="text"
            id="hour"
            onChange={handlePortfolioChange("hour")}
          />
        </label>
        <label htmlFor="disabilityPercent">
          Disability Percent
          <input
            type="number"
            id="disabilityPercent"
            min="0"
            max="100"
            step="5"
            onChange={handlePortfolioChange("disabilityPercent")}
          />
        </label>

        <div>
          <h5>Experience</h5>
          <label htmlFor="jobTitle">
            Job title
            <input
              type="text"
              id="jobTitle"
              value={experience.jobTitle}
              onChange={handleExperienceChange("jobTitle")}
            />
          </label>
          <label htmlFor="yearStart">
            Year start
            <input
              type="number"
              id="yearStart"
              min="1950"
              max="2021"
              step="1"
              value={experience.yearStart}
              onChange={handleExperienceChange("yearStart")}
            />
          </label>
          <label htmlFor="yearEnd">
            Year End
            <input
              type="number"
              id="yearEnd"
              min="1950"
              max="2021"
              step="1"
              value={experience.yearEnd}
              onChange={handleExperienceChange("yearEnd")}
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              value={experience.description}
              onChange={handleExperienceChange("description")}
            />
          </label>

          <input type="submit" onClick={addExperience} value="Add experience" />
        </div>

        <div>
          <h5>Qualifications</h5>
          <label htmlFor="nameOfQualification">
            Name of Qualification
            <input
              type="text"
              id="nameOfQualification"
              value={qualification.nameOfQualification}
              onChange={handleQualificationChange("nameOfQualification")}
            />
          </label>
          <label htmlFor="yearStart">
            Year start
            <input
              type="number"
              id="yearStart"
              min="1950"
              max="2021"
              value={qualification.yearStart}
              step="1"
              onChange={handleQualificationChange("yearStart")}
            />
          </label>
          <label htmlFor="yearEnd">
            Year End
            <input
              type="number"
              id="yearEnd"
              min="1950"
              max="2021"
              step="1"
              value={qualification.yearEnd}
              onChange={handleQualificationChange("yearEnd")}
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              value={qualification.description}
              onChange={handleQualificationChange("description")}
            />
          </label>

          <input
            type="submit"
            onClick={addQualification}
            value="Add qualification"
          />
        </div>
        {error && (
          <p className="text-danger">Something went wrong! Try again</p>
        )}
        <input type="submit" onClick={handlePortfolioSubmit} value="Submit" />
      </>
    );
  };

  const renderJobCreation = () => {
    return (
      <div className="container py-5">
        <h2 className="text-dark text-center pb-5">
          Add job listing for your company!
        </h2>
        <form className="form-group" onSubmit={handleJobSubmit}>
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
            value={jobData.jobSummary}
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
            value={jobData.jobDuties}
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
            value={jobData.jobDutiesBulletins}
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
                value={jobData.jobPositionName}
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
                value={jobData.skills}
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
                type="text"
                id="vacancy"
                onChange={handleJobChange("vacancy")}
                value={jobData.vacancy}
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
                value={jobData.location}
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
                type="text"
                id="salary"
                onChange={handleJobChange("salary")}
                value={jobData.salary}
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
                type="text"
                id="hours"
                onChange={handleJobChange("hours")}
                value={jobData.hours}
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
                  onChange={handleJobChange("disabledFriendly")}
                  className="form-check-input"
                  type="checkbox"
                  id="disabledFriendly"
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
          {error && (
            <p className="text-danger">Something went wrong! Try again</p>
          )}
          <div className="row w-100 justify-content-center py-5 mt-5">
            <button
              type="submit"
              onClick={handleJobSubmit}
              className="btn btn-lg btn-outline-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <div className="container py-5">
        {role === "ROLE_USER" ? renderPortfolioCreation() : renderJobCreation()}
      </div>
    </>
  );
};

export default AddJob;
