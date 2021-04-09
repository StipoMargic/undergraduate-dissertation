import React from "react";
import Header from "../Components/Header";
import HomepageHero from "../Components/HomepageHero";
import NewestJob from "../Components/NewestJobs";
import HomeTopCategory from "../Components/HomeTopCategory";
import Footer from "../Components/Footer";
import WhatPeopleSaying from "../Components/Sliders/WhatPeopleSayingSlider";

export const HomePage = () => {
  return (
    <>
      <Header />
      <HomepageHero />
      <NewestJob />
      <HomeTopCategory />
      <WhatPeopleSaying />
      <Footer />
    </>
  );
};

export default HomePage;
