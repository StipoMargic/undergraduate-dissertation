import React from "react";
import AboutUs from "../Components/AboutUs";
import WhatPeopleSaying from "../Components/Sliders/WhatPeopleSayingSlider";
import AboutNumbers from "../Components/AboutUs/AboutNumbers";

const AboutPage = () => {
  return (
    <>
      <AboutUs />
      <AboutNumbers />
      <WhatPeopleSaying />
    </>
  );
};

export default AboutPage;
