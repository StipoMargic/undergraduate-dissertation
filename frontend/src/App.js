import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import HomepageHero from "./Components/HomepageHero";
import NewestJob from "./Components/NewestJobs";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <HomepageHero />
      <NewestJob />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
