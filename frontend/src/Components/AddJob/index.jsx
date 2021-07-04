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

const AddJob = () => {
  const { role, categories, token } = useContext(GlobalContext);
  const history = useHistory();
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);
  const [qualification, setQualification] = useState(initialQualificationData);
  const [experience, setExperience] = useState(initialExperienceData);
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);

  if (!role) {
    history.push("/");
  }

  const handleChange = (value) => (e) => {
    e.persist();

    setPortfolioData((prevState) => ({
      ...prevState,
      [value]: e.target.value,
    }));
  };

  const handleQualificationChange = (value) => (e) => {
    e.persist();

    setQualification((prevState) => ({
      ...prevState,
      [value]: e.target.value,
    }));
  };

  const handleExperienceChange = (value) => (e) => {
    e.persist();

    setExperience((prev) => ({
      ...prev,
      [value]: e.target.value,
    }));
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
    console.log(portfolioData);

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
      .then(() => console.log("success"))
      .catch((err) => console.log(err));
  };

  const renderPortfolioCreation = () => {
    return (
      <>
        <label htmlFor="categories">
          Select Category:
          <select onChange={handleChange("category")} id="categories">
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
            onChange={handleChange("advancedKnowledge")}
          />
        </label>
        <label htmlFor="advancedKnowledgeBulletin">
          Advanced Knowledge Bulletin
          <textarea
            id="advancedKnowledgeBulletin"
            cols="30"
            rows="10"
            onChange={handleChange("advancedKnowledgeBulletin")}
          />
        </label>
        <label htmlFor="skills">
          Skills
          <input type="text" id="skills" onChange={handleChange("skills")} />
        </label>
        <label htmlFor="salary">
          Salary
          <input type="text" id="salary" onChange={handleChange("salary")} />
        </label>
        <label htmlFor="rate">
          Rate
          <input type="text" id="rate" onChange={handleChange("rate")} />
        </label>
        <label htmlFor="disabilityPercent">
          Disability Percent
          <input
            type="number"
            id="disabilityPercent"
            min="0"
            max="100"
            step="5"
            onChange={handleChange("disabilityPercent")}
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

        <input type="submit" onClick={handlePortfolioSubmit} value="Submit" />
      </>
    );
  };

  const renderJobCreation = () => {
    return <p>renderJobCreation</p>;
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
