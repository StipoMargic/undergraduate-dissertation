import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { GlobalContext } from "../../Context/global";
import { makePortfolioPostRequest } from "./makePortfolioPostRequest";

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
  activeTill: "",
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

    setJobData((prev) => ({
      ...prev,
      [value]: e.target.value,
    }));
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

  const handlePortfolioSubmit = () => {
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
    console.log("SUBMITTED");
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
      <div className="container">
        <label htmlFor="jobDuties">
          Job Duties
          <textarea
            id="jobDuties"
            cols="30"
            rows="10"
            value={jobData.jobDuties}
            onChange={handleJobChange("jobDuties")}
          />
        </label>
        <label htmlFor="jobDutiesBulletins">
          Job Duties Bulletins
          <input
            type="text"
            id="jobDutiesBulletins"
            value={jobData.jobDutiesBulletins}
            onChange={handleJobChange("jobDutiesBulletins")}
          />
        </label>
        <label htmlFor="skills">
          Skills
          <input
            type="text"
            id="skills"
            onChange={handleJobChange("skills")}
            value={jobData.skills}
          />
        </label>
        <label htmlFor="vacancy">
          Vacancy
          <input
            type="text"
            id="vacancy"
            onChange={handleJobChange("vacancy")}
            value={jobData.vacancy}
          />
        </label>
        <label htmlFor="activeTill">
          Active till
          <input
            type="text"
            id="activeTill"
            onChange={handleJobChange("activeTill")}
            value={jobData.activeTill}
          />
        </label>
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            onChange={handleJobChange("location")}
            value={jobData.location}
          />
        </label>
        <label htmlFor="salary">
          Salary
          <input
            type="text"
            id="salary"
            onChange={handleJobChange("salary")}
            value={jobData.salary}
          />
        </label>
        <label htmlFor="hours">
          Hours
          <input
            type="text"
            id="hours"
            onChange={handleJobChange("hours")}
            value={jobData.hours}
          />
        </label>
        <label htmlFor="typeOfPosition">
          Type of position
          <input
            type="text"
            id="typeOfPosition"
            onChange={handleJobChange("typeOfPosition")}
            value={jobData.typeOfPosition}
          />
        </label>
        <label htmlFor="disabledFriendly">
          Disabled friendly
          <input
            type="text"
            id="disabledFriendly"
            onChange={handleJobChange("disabledFriendly")}
            value={jobData.disabledFriendly}
          />
        </label>
        <label htmlFor="jobSummary">
          Job summary
          <input
            type="text"
            id="jobSummary"
            onChange={handleJobChange("jobSummary")}
            value={jobData.jobSummary}
          />
        </label>
        <label htmlFor="jobPositionName">
          Job position name
          <input
            type="text"
            id="jobPositionName"
            onChange={handleJobChange("jobPositionName")}
            value={jobData.jobPositionName}
          />
        </label>
        {error && (
          <p className="text-danger">Something went wrong! Try again</p>
        )}
        <input type="submit" value="Submit" onClick={handleJobSubmit} />
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
