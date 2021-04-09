import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
// eslint-disable-next-line import/no-named-as-default
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
