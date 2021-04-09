import React from "react";
import Header from "../Header";
import HomepageHero from "../HomepageHero";
import NewestJob from "../NewestJobs";
import HomeTopCategory from "../HomeTopCategory";
import Footer from "../Footer";

export const HomePage = () => {
  return (
    <>
      <Header />
      <HomepageHero />
      <NewestJob />
      <HomeTopCategory />
      <Footer />
    </>
  );
};

export default HomePage;
