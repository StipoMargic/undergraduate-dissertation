import React, { useContext } from "react";
import Jobs from "../Components/Jobs";
import { GlobalContext } from "../Context/global";
import Spinner from "../Components/AboutNumbers/Spinner";

const JobPage = () => {
  const { loading } = useContext(GlobalContext);
  return <>{loading ? <Spinner /> : <Jobs />}</>;
};

export default JobPage;
