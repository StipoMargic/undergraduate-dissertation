import React, { useContext, useState } from "react";
import "./styles.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router";
import axios from "axios";
import { GlobalContext } from "../../Context/global";
import { makePortfolioPostRequest } from "./makePortfolioPostRequest";
import { makeJobPostRequest } from "./makeJobPostRequest";
import {
  initialExperienceData,
  initialJobData,
  initialPortfolioData,
  initialQualificationData,
} from "./initialData";

const AddJob = () => {
  const { role, categories, token } = useContext(GlobalContext);
  const history = useHistory();
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);
  const [qualification, setQualification] = useState(initialQualificationData);
  const [experience, setExperience] = useState(initialExperienceData);
  const [jobData, setJobData] = useState(initialJobData);
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState(null);
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
      .then(() => setError(false))
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
      .then(() => setError(false))
      .catch(() => setError(true));
  };

  const renderPortfolioCreation = () => {
    return (
      <>
        <h2 className="text-center text-uppercase py-5 font-weight-bold">
          Fill your portfolio and get hired!
        </h2>
        <div className="row py-2">
          <label
            className="mb-0 text-primary text-lg-left font-weight-bold"
            htmlFor="categories"
          >
            Select Category:
          </label>
          <select
            className="form-control form-control-lg"
            onChange={handlePortfolioChange("category")}
            id="categories"
          >
            <option>Click here for categories</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.attributes.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="row py-2">
          <label
            className="mb-0 text-primary text-lg-left font-weight-bold"
            htmlFor="advancedKnowledge"
          >
            Advanced Knowledge:
          </label>
          <textarea
            id="advancedKnowledge"
            className="form-control"
            value={portfolioData.advancedKnowledge}
            onChange={handlePortfolioChange("advancedKnowledge")}
          />
        </div>
        <div className="row py-2">
          <label
            className="mb-0 text-primary text-lg-left font-weight-bold"
            htmlFor="advancedKnowledgeBulletin"
          >
            Advanced Knowledge Bulletins:
          </label>
          <small className="form-text text-muted">
            Divide bulletins with comma (First bulletin, Second bulletin).
          </small>
          <textarea
            id="advancedKnowledgeBulletin"
            className="form-control"
            value={portfolioData.advancedKnowledgeBulletins}
            onChange={handlePortfolioChange("advancedKnowledgeBulletins")}
          />
        </div>
        <div className="row py-3">
          <div className="col">
            <label
              className="mb-0 text-primary text-lg-left font-weight-bold"
              htmlFor="skills"
            >
              Skills:
            </label>
            <small className="form-text text-muted">
              Divide skills with comma (Word, Excel).
            </small>
            <input
              type="text"
              className="form-control"
              id="skills"
              value={portfolioData.skills}
              onChange={handlePortfolioChange("skills")}
            />
          </div>
          <div className="col">
            <label
              className="mb-0 text-primary text-lg-left font-weight-bold"
              htmlFor="disabilityPercent"
            >
              Disability Percent:
            </label>
            <input
              type="number"
              id="disabilityPercent"
              min="0"
              max="100"
              step="5"
              className="form-control"
              value={portfolioData.disabilityPercent}
              onChange={handlePortfolioChange("disabilityPercent")}
            />
          </div>
        </div>
        <div className="row py-3">
          <div className="col">
            <label
              className="mb-0 text-primary text-lg-left font-weight-bold"
              htmlFor="salary"
            >
              Salary:
            </label>
            <input
              type="text"
              className="form-control"
              value={portfolioData.salary}
              id="salary"
              onChange={handlePortfolioChange("salary")}
            />
          </div>
          <div className="col">
            <label
              className="mb-0 text-primary text-lg-left font-weight-bold"
              htmlFor="rate"
            >
              Rate:
            </label>
            <input
              type="text"
              className="form-control"
              value={portfolioData.rate}
              id="rate"
              onChange={handlePortfolioChange("rate")}
            />
          </div>
          <div className="col">
            <label
              className="mb-0 text-primary text-lg-left font-weight-bold"
              htmlFor="hour"
            >
              Hour:
            </label>
            <input
              value={portfolioData.hour}
              type="text"
              className="form-control"
              id="hour"
              onChange={handlePortfolioChange("hour")}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5 className="py-3 text-center font-weight-bold">Experience</h5>
            <div className="text-center">
              <small>
                You have <strong>{experiences.length}</strong> experiences
                added.
              </small>
            </div>
            <label
              className=" mb-0 text-primary text-lg-left font-weight-bold"
              htmlFor="jobTitle"
            >
              Job title:
            </label>
            <input
              type=" text"
              className=" form-control"
              id="jobTitle"
              value={experience.jobTitle}
              onChange={handleExperienceChange("jobTitle")}
            />
            <div className="row py-2">
              <div className="col">
                <label
                  className=" mb-0 text-primary text-lg-left font-weight-bold"
                  htmlFor=" yearStart"
                >
                  Year start:
                </label>
                <input
                  type=" number"
                  className="form-control"
                  id=" yearStart"
                  min="1950"
                  max="2021"
                  step="1"
                  value={experience.yearStart}
                  onChange={handleExperienceChange("yearStart")}
                />
              </div>
              <div className="col">
                <label
                  className="mb-0 text-primary text-lg-left font-weight-bold"
                  htmlFor="yearEnd"
                >
                  Year End:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="yearEnd"
                  min="1950"
                  max="2021"
                  step="1"
                  value={experience.yearEnd}
                  onChange={handleExperienceChange("yearEnd")}
                />
              </div>
            </div>
            <label
              className="mb-0 text-primary text-lg-left font-weight-bold"
              htmlFor="description"
            >
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={experience.description}
              onChange={handleExperienceChange("description")}
            />
            <div className="row justify-content-center mt-3">
              <input
                type="submit"
                onClick={addExperience}
                value="Add experience"
                className="btn btn-lg btn-primary"
              />
            </div>
          </div>
          <div className="col">
            <h5 className="py-3 text-center font-weight-bold">
              Qualifications
            </h5>
            <div className="text-center">
              <small>
                You have <strong>{qualifications.length}</strong> qualifications
                added.
              </small>
            </div>
            <label
              className="mb-0 text-primary text-lg-left font-weight-bold"
              htmlFor="nameOfQualification"
            >
              Name of Qualification:
            </label>
            <input
              type="text"
              className="form-control"
              id="nameOfQualification"
              value={qualification.nameOfQualification}
              onChange={handleQualificationChange("nameOfQualification")}
            />
            <div className="row py-2">
              <div className="col">
                <label
                  className="mb-0 text-primary text-lg-left font-weight-bold"
                  htmlFor="yearStart"
                >
                  Year start:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="yearStart"
                  min="1950"
                  max="2021"
                  value={qualification.yearStart}
                  step="1"
                  onChange={handleQualificationChange("yearStart")}
                />
              </div>
              <div className="col">
                <label
                  className="mb-0 text-primary text-lg-left font-weight-bold"
                  htmlFor="yearEnd"
                >
                  Year End:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="yearEnd"
                  min="1950"
                  max="2021"
                  step="1"
                  value={qualification.yearEnd}
                  onChange={handleQualificationChange("yearEnd")}
                />
              </div>
            </div>
            <label
              className="mb-0 text-primary text-lg-left font-weight-bold"
              htmlFor="description"
            >
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={qualification.description}
              onChange={handleQualificationChange("description")}
            />
            <div className="row justify-content-center mt-3">
              <input
                type="submit"
                onClick={addQualification}
                value="Add qualification"
                className="btn btn-lg btn-primary"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center  py-5">
          <input
            type="submit"
            onClick={handlePortfolioSubmit}
            className="btn btn-lg btn-outline-primary"
            value="Submit"
          />
        </div>
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
      {error ? (
        <>
          <div className="errModal">
            <h5 className="text-center text-danger pt-3">
              Ups! Something went wrong...
            </h5>
            <p>We could not finish your listing! Contact us or try again!</p>
            <a href="/add-job" className="btn btn-sm btn-outline-primary">
              Try again
            </a>
          </div>
          <div className="container py-5">
            {role === "ROLE_USER"
              ? renderPortfolioCreation()
              : renderJobCreation()}
          </div>
        </>
      ) : error === false ? (
        <>
          <div className="sucModal">
            <h5 className="text-center text-success pt-3">
              Yay! All went good...
            </h5>
            <p>You are done! Check your posting now...</p>
            <a href="/" className="btn btn-sm btn-outline-primary">
              Go home
            </a>
          </div>
          <div className="container py-5">
            {role === "ROLE_USER"
              ? renderPortfolioCreation()
              : renderJobCreation()}
          </div>
        </>
      ) : (
        <div className="container py-5">
          {role === "ROLE_USER"
            ? renderPortfolioCreation()
            : renderJobCreation()}
        </div>
      )}
    </>
  );
};

export default AddJob;
