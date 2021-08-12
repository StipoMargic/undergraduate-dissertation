import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import JobCard from "../Jobs/JobCard";
import { GlobalContext } from "../../Context/global";
import Spinner from "../AboutNumbers/Spinner";

const SearchPage = () => {
  const { searchTerm } = useParams();
  const { loading } = useContext(GlobalContext);
  const [state, setState] = useState({ jobs: [], error: null });

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/v1/jobs/?filter[name]=${searchTerm}`
      )
      .then((res) => {
        if (res && res.data) {
          setState({ jobs: [...res.data.data] });
        }
      })
      .catch(() => setState({ jobs: [], error: true }));
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <h3 className="text-muted">
              You searched for company name{" "}
              <small className="text-success">{searchTerm}</small>
            </h3>
            {state.error && (
              <h4 className="text-danger">Something went wrong!</h4>
            )}
          </div>
          <div className="row mt-5">
            {state.jobs.length < 1 ? (
              <h4 className="text-info text-center py-5">
                No results were found!
              </h4>
            ) : (
              <>
                {state.jobs.map((job) => {
                  return (
                    <JobCard key={job.id} job={job.attributes} id={job.id} />
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
