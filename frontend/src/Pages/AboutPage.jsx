import React from "react";
import AboutUs from "../Components/AboutUs";
import WhatPeopleSaying from "../Components/Sliders/WhatPeopleSayingSlider";
import AboutNumbers from "../Components/AboutNumbers";
import Team from "../Components/Team";

const AboutPage = () => {
  return (
    <>
      <AboutUs />
      <AboutNumbers />
      <Team />
      <WhatPeopleSaying />
    </>
  );
};

export default AboutPage;
