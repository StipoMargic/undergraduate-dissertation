import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import JobCard from "../Jobs/JobCard";

const SearchPage = () => {
  const { searchTerm } = useParams();
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/jobs/?filter[name]=${searchTerm}`)
      .then((res) => {
        if (res && res.data) {
          setState([...res.data.data]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <h3 className="text-muted">
            You searched for company name{" "}
            <small className="text-success">{searchTerm}</small>
          </h3>
        </div>
        <div className="row mt-5">
          {state.map((job) => {
            return <JobCard job={job.attributes} id={job.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
