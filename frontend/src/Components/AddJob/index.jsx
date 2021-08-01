import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../../Context/global";
import { makePortfolioPostRequest } from "./makePortfolioPostRequest";
import { makeJobPostRequest } from "./makeJobPostRequest";
import {
  initialExperienceData,
  initialJobData,
  initialPortfolioData,
  initialQualificationData,
} from "./initialData";
import { nextMonth } from "../../Utils/dates";

const AddJob = () => {
  const { role, categories, token } = useContext(GlobalContext);
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);
  const [qualification, setQualification] = useState(initialQualificationData);
  const [experience, setExperience] = useState(initialExperienceData);
  const [jobData, setJobData] = useState(initialJobData);
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState(null);
  const [activeTill, setActiveTill] = useState(nextMonth());
  const [loading, setLoading] = useState();

  const handlePortfolioChange = (value) => (e) => {
    e.persist();

    setPortfolioData((prevState) => ({
      ...prevState,
      [value]: e.target.value,
    }));
  };

  const handleExperienceSplice = (idx) => (e) => {
    e.persist();

    const newExpArray = experiences.splice(idx, 1);
    setExperience(newExpArray);
  };

  const handleQualificationSplice = (idx) => (e) => {
    e.persist();

    const newArr = qualifications.splice(idx, 1);
    setQualification(newArr);
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
  };

  const addExperience = () => {
    console.log(experience.description);
    setExperiences([...experiences, experience]);
  };

  const handlePortfolioSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        "http://apizavrsni.udruga-liberato.hr/api/v1/portfolios",
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

    window.scrollTo(0, 0);
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        "http://apizavrsni.udruga-liberato.hr/api/v1/job",
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
        <div className="container">
          <h2 className="text-center text-uppercase font-weight-bold pt-3">
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
              <input
                type="text"
                className="form-control"
                id="skills"
                value={portfolioData.skills}
                onChange={handlePortfolioChange("skills")}
                placeholder="Divide skills with comma (Word, Excel)."
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
          <div className="row">
            <div className="col">
              <label
                className="mb-0 text-primary text-lg-left font-weight-bold"
                htmlFor="rate"
              >
                Hourly rate:
              </label>
              <input
                type="text"
                className="form-control"
                value={portfolioData.rate}
                id="rate"
                onChange={handlePortfolioChange("rate")}
              />
              <small className="small text-muted">
                Enter how much you charge for hour of your time, in dollars.
              </small>
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
              <small className="small text-muted">
                Enter how much time you are free for freelancer job.
              </small>
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
                  disabled={
                    experience.description == null ||
                    experience.yearEnd == null ||
                    experience.yearStart == null ||
                    experience.jobTitle == null
                  }
                  className="btn btn-lg btn-primary"
                />
              </div>
              {experience.description == null ||
              experience.yearEnd == null ||
              experience.yearStart == null ||
              experience.jobTitle == null ? (
                <div className="row justify-content-center mt-2">
                  <small className="small text-info">
                    You need to enter all data to add experience!
                  </small>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col">
              <h5 className="py-3 text-center font-weight-bold">
                Qualifications
              </h5>
              <div className="text-center">
                <small>
                  You have <strong>{qualifications.length}</strong>{" "}
                  qualifications added.
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
                  disabled={
                    qualification.description == null ||
                    qualification.yearEnd == null ||
                    qualification.yearStart == null ||
                    qualification.nameOfQualification == null
                  }
                />
              </div>
              {qualification.description == null ||
              qualification.yearEnd == null ||
              qualification.yearStart == null ||
              qualification.nameOfQualification == null ? (
                <div className="row justify-content-center mt-2">
                  <small className="small text-info">
                    You need to enter all data to add qualification!
                  </small>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row my-3">
            <div className="col-lg-6 col-sm-12">
              {experiences.length > 0 && (
                <>
                  <small className="small text-info">
                    You already added following experiences:
                  </small>
                  {experiences.map((e, idx) => {
                    return (
                      <div className="bg-light p-3 mt-2 position-relative">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                          className="pos-close"
                          onClick={handleExperienceSplice(idx)}
                        >
                          <FontAwesomeIcon
                            icon={faWindowClose}
                            size="lg"
                            color="red"
                          />
                        </div>
                        <div className="row ml-2 mt-2">
                          <small className="small font-weight-bold">
                            Job Title:
                          </small>
                          <span className="small text-info ml-2">
                            {e.jobTitle}
                          </span>
                        </div>
                        <div className="row ml-2">
                          <small className="small font-weight-bold">
                            Since:
                          </small>
                          <span className="small text-info ml-2 mr-2">
                            {e.yearStart}
                          </span>
                          <small className="small font-weight-bold">
                            till:
                          </small>
                          <span className="small text-info ml-2">
                            {e.yearEnd}
                          </span>
                        </div>
                        <div className="row ml-2">
                          <small className="small font-weight-bold">
                            Description:
                          </small>
                          <span className="small text-info ml-2">
                            {e.description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="col-lg-6 col-sm-12">
              {qualifications.length > 0 && (
                <>
                  <small className="small text-info">
                    You already added following qualifications:
                  </small>
                  {qualifications.map((q, idx) => {
                    return (
                      <div className="bg-light p-3 mt-2 position-relative">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                          className="pos-close"
                          onClick={handleQualificationSplice(idx)}
                        >
                          <FontAwesomeIcon
                            icon={faWindowClose}
                            size="lg"
                            color="red"
                          />
                        </div>
                        <div className="row ml-2 mt-2">
                          <small className="small font-weight-bold">
                            Name of qualification:
                          </small>
                          <span className="small text-info ml-2">
                            {q.nameOfQualification}
                          </span>
                        </div>
                        <div className="row ml-2">
                          <small className="small font-weight-bold">
                            Since:
                          </small>
                          <span className="small text-info ml-2 mr-2">
                            {q.yearStart}
                          </span>
                          <small className="small font-weight-bold">
                            till:
                          </small>
                          <span className="small text-info ml-2">
                            {q.yearEnd}
                          </span>
                        </div>
                        <div className="row ml-2">
                          <small className="small font-weight-bold">
                            Description:
                          </small>
                          <span className="small text-info ml-2">
                            {q.description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className="row justify-content-center  py-5">
            <input
              type="submit"
              disabled={loading}
              onClick={handlePortfolioSubmit}
              className="btn btn-lg btn-outline-primary"
              value="Submit"
            />
          </div>
        </div>
      </>
    );
  };

  const renderJobCreation = () => {
    return (
      <div className="container pt-2">
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
                type="NUMBER"
                min={0}
                max={100}
                step={1}
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
                type="number"
                min={0}
                max={250000}
                step={1000}
                id="salary"
                onChange={handleJobChange("salary")}
                value={jobData.salary}
              />
              <small className="form-text text-muted">
                Please enter monthly salary in dollars, without sign!
              </small>
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
                value={jobData.hours}
              />
              <small className="form-text text-muted">
                Add number of working hours per month!
              </small>
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
                    id="full-time"
                    value="Full time"
                    onChange={handleJobChange("typeOfPosition")}
                    checked={jobData.typeOfPosition === "Full time"}
                  />
                  <label className="form-check-label" htmlFor="full-time">
                    Full time
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="part-time"
                    value="Part time"
                    checked={jobData.typeOfPosition === "Part time"}
                    onChange={handleJobChange("typeOfPosition")}
                  />
                  <label className="form-check-label" htmlFor="part-time">
                    Part time
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="remote"
                    value="Remote"
                    checked={jobData.typeOfPosition === "Remote"}
                    onChange={handleJobChange("typeOfPosition")}
                  />
                  <label className="form-check-label" htmlFor="remote">
                    Remote
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="form-group d-flex">
            <div className="mb-0 text-primary text-lg-left font-weight-bold w-100">
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
          <div className="row w-100 justify-content-center pb-5 mt-3">
            <button
              type="submit"
              onClick={handleJobSubmit}
              className="btn btn-lg btn-outline-primary"
              disabled={loading}
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
          <div className="container">
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
          <div className="container">
            {role === "ROLE_USER"
              ? renderPortfolioCreation()
              : renderJobCreation()}
          </div>
        </>
      ) : (
        <div className="container">
          {role === "ROLE_USER"
            ? renderPortfolioCreation()
            : renderJobCreation()}
        </div>
      )}
    </>
  );
};

export default AddJob;
