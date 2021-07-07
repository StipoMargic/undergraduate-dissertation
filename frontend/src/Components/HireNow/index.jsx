import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSinglePortfolio } from "../Freelancers/getSinglePortfolio";
import { GlobalContext } from "../../Context/global";

const initialFormData = {
  subject: "",
  message: "",
};

const HireNow = () => {
  const [portfolio, setPortfolio] = useState();
  const { id } = useParams();
  const { username } = useContext(GlobalContext);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    getSinglePortfolio(id, setPortfolio);
  }, [id]);

  const handleChange = (e) => {
    e.persist();

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted");
  };

  const renderForm = () => {
    return (
      <div className="container py-5">
        <form onSubmit={handleSubmit} className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-control"
            placeholder="Write your subject"
          />
          {formData.subject === "" && (
            <small className="text-danger mb-3">This field is required.</small>
          )}
          <label htmlFor="message">Message: </label>
          <textarea
            onChange={handleChange}
            name="message"
            id="message"
            value={formData.message}
            className="form-control"
            placeholder="Write your message"
          />
          {formData.message === "" && (
            <small className="text-danger mb-3">This field is required.</small>
          )}
          <div className="row py-3 justify-content-center">
            <input
              onClick={handleSubmit}
              type="submit"
              value="Submit"
              className="btn btn-lg btn-outline-primary"
            />
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      {portfolio ? (
        <div className="container py-5">
          <h5 className="text-dark text-center font-weight-bold">
            Hi {username} you want to hire{" "}
            <span className="text-primary">
              {portfolio.included[0].attributes.username}
            </span>
          </h5>
          <small className="text-muted">
            <p className="text-center pt-5"> Send him message first</p>
          </small>
          {renderForm()}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HireNow;
