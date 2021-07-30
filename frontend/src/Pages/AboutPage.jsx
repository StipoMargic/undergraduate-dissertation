import React, { useContext } from "react";
import AboutUs from "../Components/AboutUs";
import { GlobalContext } from "../Context/global";
import Spinner from "../Components/AboutNumbers/Spinner";
import AboutNumbers from "../Components/AboutNumbers";
import Team from "../Components/Team";
import WhatPeopleSaying from "../Components/Sliders/WhatPeopleSayingSlider";

const AboutPage = () => {
  const { loading } = useContext(GlobalContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <AboutUs />
          <AboutNumbers />
          <Team />
          <WhatPeopleSaying />
        </>
      )}
    </>
  );
};

export default AboutPage;
