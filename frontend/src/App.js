import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import HomepageHero from "./Components/HomepageHero";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <HomepageHero />
    </BrowserRouter>
  );
}

export default App;
