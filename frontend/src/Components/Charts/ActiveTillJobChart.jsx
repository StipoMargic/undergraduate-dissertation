import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { inSevenDays } from "../../Utils/dates";
import { GlobalContext } from "../../Context/global";

const calculateDaysLeft = (activeTill) => {
  return parseInt(
    (new Date(activeTill) - new Date()) / (24 * 60 * 60 * 1000),
    10
  );
};

const ActiveTillJobChart = () => {
  const { jobs } = useContext(GlobalContext);
  const [activeJobs, setActiveJobs] = useState([]);
  const [activeTill, setActiveTill] = useState(inSevenDays());
  const [dateError, setDateError] = useState(false);
  const [showActiveJobs, setShowActiveJobs] = useState(true);
  const [paginationNumber, setPaginationNumber] = useState(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: 5,
    page: 1,
  });
  const [ranking, setRanking] = useState("Descending");

  const updateNavigation = () => {
    setPagination({
      start: 0,
      end: paginationNumber,
      page: 1,
    });
  };

  useEffect(() => {
    updateNavigation();
  }, [paginationNumber]);

  const handleNext = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start + paginationNumber,
      end: prev.end + paginationNumber,
      page: prev.page + 1,
    }));
  };

  const handlePrev = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start - paginationNumber,
      end: prev.end - paginationNumber,
      page: prev.page - 1,
    }));
  };

  useEffect(() => {
    if (new Date().getTime() > activeTill.getTime()) {
      setDateError(true);
    } else {
      const activeJobsArray = jobs.filter(
        (job) =>
          new Date(job.attributes.activeTill).getTime() >
            new Date().getTime() &&
          new Date(job.attributes.activeTill).getTime() <
            activeTill.getTime() &&
          job.attributes.deletedAt === null
      );
      if (ranking === "Ascending") {
        const sortedArray = activeJobsArray.sort(
          (a, b) =>
            new Date(a.attributes.activeTill).getTime() -
            new Date(b.attributes.activeTill).getTime()
        );
        setActiveJobs(sortedArray);
      } else {
        const sortedArray = activeJobsArray.sort(
          (a, b) =>
            new Date(b.attributes.activeTill).getTime() -
            new Date(a.attributes.activeTill).getTime()
        );
        setActiveJobs(sortedArray);
      }
      setDateError(false);
    }
  }, [jobs, activeTill, ranking, paginationNumber]);

  const renderActiveJobs = () => {
    return (
      <ul className="list-group">
        {activeJobs.slice(pagination.start, pagination.end).map((activeJob) => {
          return (
            <li
              key={activeJob.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <Link to={`/jobs/${activeJob.id}`}>
                {activeJob.attributes.jobPositionName} by{" "}
                {activeJob.attributes.name}
              </Link>
              {calculateDaysLeft(activeJob.attributes.activeTill) === 0 ? (
                <span className="badge badge-danger badge-pill">
                  Expires today.
                </span>
              ) : (
                <span className="badge badge-primary badge-pill">
                  {calculateDaysLeft(activeJob.attributes.activeTill)} days
                  left.
                </span>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const handleActiveJobShow = () => {
    setShowActiveJobs(!showActiveJobs);
  };

  return (
    <>
      <div className="col-lg-4 col-sm-12 mt-5">
        {dateError && (
          <p className="text-danger">Pick newer date then today!</p>
        )}
        <div className="d-flex">
          <p className="mr-3">Choose active till date for jobs: </p>
          <DatePicker
            className="mt-1 form-control"
            selected={activeTill}
            onChange={(date) => setActiveTill(date)}
          />
        </div>
        {dateError === false && (
          <div className="row mt-4">
            <p className="ml-2">
              You have{" "}
              <small className="small text-success">{activeJobs.length}</small>{" "}
              till{" "}
              <small className="small text-info">
                {new Date(activeTill).toDateString()}
              </small>
            </p>
          </div>
        )}
        <div className="mt-3 justify-content-center d-flex  mb-2">
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={handleActiveJobShow}
          >
            {showActiveJobs === false
              ? "Show active jobs"
              : "Hide job listings"}
          </button>
        </div>
      </div>
      <div className="col-lg-8 col-sm-12">
        {showActiveJobs && (
          <>
            <div className="row mb-2">
              <div className="col-lg-4 col-sm-5 mb-2">
                <select
                  id="sort"
                  className="form-control"
                  onChange={(e) => setRanking(e.target.value)}
                >
                  <option value="Ascending">Ascending</option>
                  <option value="Descending" selected>
                    Descending
                  </option>
                </select>
              </div>

              <div className="col-lg-4 col-sm-1" />
              <div className="col-lg-4 col-sm-5 mb-2">
                <select
                  id="sort"
                  className="form-control"
                  onChange={(event) => setPaginationNumber(+event.target.value)}
                >
                  <option value="5" selected>
                    Show 5
                  </option>
                  <option value="10">Show 10</option>
                  <option value="50">Show 50</option>
                </select>
              </div>
            </div>
            {renderActiveJobs()}
            <div className="row justify-content-center mt-4 mb-2">
              {pagination.start > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="btn btn-outline-info btn-lg mr-3"
                >
                  Previous
                </button>
              )}

              {activeJobs.length > pagination.end && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-outline-primary btn-lg"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ActiveTillJobChart;
