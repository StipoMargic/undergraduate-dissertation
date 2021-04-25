import React from "react";
import { useParams } from "react-router-dom";
import FreelancerDetail from "../Components/Freelancers/FreelancerDetail";

const FDetail = () => {
  const params = useParams();

  return (
    <>
      <FreelancerDetail id={(params || {}).id} />
    </>
  );
};

export default FDetail;
