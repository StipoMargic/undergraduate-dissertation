import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { GlobalContext } from "../../Context/global";
import { makePortfolioUpdateData } from "./makePortfolioUpdateData";
import Spinner from "../AboutNumbers/Spinner";

const FreelancerEdit = () => {
  const { id } = useParams();
  const { portfolios, token, loading } = useContext(GlobalContext);
  const [portfolio, setPortfolio] = useState();
  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    const p = portfolios.find((port) => port.id === id);
    setPortfolio(p);
  }, [portfolios]);

  const handlePortfolioChange = (value) => (e) => {
    e.persist();

    setPortfolio((prevState) => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        [value]: e.target.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://127.0.0.1:8000/api/v1/portfolios/${id}`,
        makePortfolioUpdateData(portfolio),
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        portfolio && (
          <>
            <div className="container my-5">
              {error == null ? (
                <h4 className="text-info text-center mb-2 pt-5">
                  Edit your portfolio...
                </h4>
              ) : error === true ? (
                <h4 className="text-danger text-center mb-2 pt-5">
                  Something went wrong...
                </h4>
              ) : (
                <h4 className="text-success text-center mb-2 pt-5">
                  Your portfolio have been updated...
                </h4>
              )}
              <div className="container">
                <div className="row mb-3">
                  <button
                    className="btn btn-info btn-lg my-5"
                    type="submit"
                    onClick={history.goBack}
                  >
                    Go back
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
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
                      value={portfolio.attributes.advancedKnowledge}
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
                      Divide bulletins with comma (First bulletin, Second
                      bulletin).
                    </small>
                    <textarea
                      id="advancedKnowledgeBulletin"
                      className="form-control"
                      value={portfolio.attributes.advancedKnowledgeBulletins}
                      onChange={handlePortfolioChange(
                        "advancedKnowledgeBulletins"
                      )}
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
                        value={portfolio.attributes.skills}
                        placeholder="Divide skills with comma (Word, Excel)."
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
                        value={portfolio.attributes.disabilityPercent}
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
                        value={portfolio.attributes.rate}
                        onChange={handlePortfolioChange("rate")}
                        id="rate"
                      />
                      <small className="small text-muted">
                        Enter how much you charge for hour of your time, in
                        dollars.
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
                        value={portfolio.attributes.hour}
                        onChange={handlePortfolioChange("hour")}
                        type="text"
                        className="form-control"
                        id="hour"
                      />
                      <small className="small text-muted">
                        Enter how much time you are free for freelancer job.
                      </small>
                    </div>
                  </div>
                  <div className="row py-5 justify-content-center">
                    <button
                      className="btn-primary btn-lg btn"
                      type="submit"
                      onSubmit={handleSubmit}
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default FreelancerEdit;
