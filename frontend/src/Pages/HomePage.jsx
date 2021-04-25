import React from "react";
import HomepageHero from "../Components/HomepageHero";
import NewestJob from "../Components/NewestJobs";
import HomeTopCategory from "../Components/HomeTopCategory";
import WhatPeopleSaying from "../Components/Sliders/WhatPeopleSayingSlider";

export const HomePage = () => {
  return (
    <>
      <HomepageHero />
      <NewestJob />
      <HomeTopCategory />
      <WhatPeopleSaying />
    </>
  );
};

export default HomePage;
