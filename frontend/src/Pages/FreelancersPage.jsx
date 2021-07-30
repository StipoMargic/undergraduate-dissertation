import React, { useContext } from "react";
import Freelancers from "../Components/Freelancers";
import { GlobalContext } from "../Context/global";
import Spinner from "../Components/AboutNumbers/Spinner";

const FreelancersPage = () => {
  const { loading } = useContext(GlobalContext);
  return <>{loading ? <Spinner /> : <Freelancers />}</>;
};

export default FreelancersPage;
