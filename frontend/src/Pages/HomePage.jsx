import React, { useContext } from "react";
import HomepageHero from "../Components/HomepageHero";
import NewestJob from "../Components/NewestJobs";
import HomeTopCategory from "../Components/HomeTopCategory";
import WhatPeopleSaying from "../Components/Sliders/WhatPeopleSayingSlider";
import { GlobalContext } from "../Context/global";
import Spinner from "../Components/AboutNumbers/Spinner";

export const HomePage = () => {
  const { loading } = useContext(GlobalContext);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <HomepageHero />
          <NewestJob />
          <HomeTopCategory />
          <WhatPeopleSaying />
        </>
      )}
    </>
  );
};

export default HomePage;
