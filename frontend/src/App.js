import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import Cookies from "js-cookie";
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
import { GlobalProvider } from "./Context/global";
import Logout from "./Components/Logout";
import AddJob from "./Components/AddJob";
import Verification from "./Components/Verification";
import HireNow from "./Components/HireNow";

function App() {
  const ttl = Cookies.get("ttl");

  if (
    ttl < new Date().getDate() ||
    (ttl === 30 && new Date().getDate() === 1) ||
    (ttl === 31 && new Date().getDate() === 1)
  ) {
    Cookies.remove("token");
  }
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/freelancers" exact component={FreelancersPage} />
          <Route path="/freelancers/:id" exact component={FDetail} />
          <Route path="/freelancers/:id/hire-now" exact component={HireNow} />
          <Route path="/jobs/:id" exact component={JDetail} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/jobs" component={JobPage} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/add-job" component={AddJob} />
          <Route path="/verify" component={Verification} />
        </Switch>
        <Footer />
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
