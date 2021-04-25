import React from "react";
import { useParams } from "react-router-dom";
import JobDetail from "../Components/Jobs/JobDetail";

const JDetail = () => {
  const params = useParams();

  return (
    <>
      <JobDetail id={(params || {}).id} />
    </>
  );
};

export default JDetail;
