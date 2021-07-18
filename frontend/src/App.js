import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
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
import FreelancersCategoryList from "./Components/Freelancers/FreelancersCategoryList";
import SearchPage from "./Components/Search";
import AdminDashboard from "./Components/Admin";
import CreateCategory from "./Components/Admin/create-category";
import AllUsers from "./Components/Admin/Users/all-users";
import Analytics from "./Components/Admin/analytics";
import ApplyNow from "./Components/ApplyNow";
import Categories from "./Components/Admin/Categories";
import CategoryAdminSingle from "./Components/Admin/Categories/CategoryAdminSingle";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Header />
        <Switch>
          <Route
            path="/admin/create-category"
            exact
            component={CreateCategory}
          />
          <Route path="/admin/categories" exact component={Categories} />
          <Route
            path="/admin/category/:id"
            exact
            component={CategoryAdminSingle}
          />
          <Route path="/admin/users" exact component={AllUsers} />
          <Route path="/admin/analytics" exact component={Analytics} />
          <Route path="/admin" component={AdminDashboard} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/search/:searchTerm" component={SearchPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/freelancers" exact component={FreelancersPage} />
          <Route
            path="/category/:categoryName"
            exact
            component={FreelancersCategoryList}
          />
          <Route path="/freelancers/:id" exact component={FDetail} />
          <Route path="/freelancers/:id/hire-now" exact component={HireNow} />
          <Route path="/jobs/:id" exact component={JDetail} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/jobs" component={JobPage} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/add-job" component={AddJob} />
          <Route path="/verify" component={Verification} />
          <Route path="/apply-now/:id" component={ApplyNow} />
        </Switch>
        <Footer />
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
