import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import FreelancersPage from "./Pages/FreelancersPage";
import FDetail from "./Pages/FDetail";
import ContactPage from "./Pages/ContactPage";
import JobPage from "./Pages/JobPage";
import JDetail from "./Pages/JDetail";
import Register from "./Components/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/freelancers" exact component={FreelancersPage} />
        <Route path="/freelancers/:id" exact component={FDetail} />
        <Route path="/jobs/:id" exact component={JDetail} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/jobs" component={JobPage} />
        <Route path="/register" component={Register} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
