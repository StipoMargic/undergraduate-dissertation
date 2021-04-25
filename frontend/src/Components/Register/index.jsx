import React, { useState } from "react";
import "./styles.scss";

const userRegistration = {
  fullName: "",
  email: "",
};
const Register = () => {
  const [chooser, setChooser] = useState("Freelancer");
  const [user, setUser] = useState(userRegistration);
  const handleChooserClick = (value) => {
    setChooser(value);
  };

  console.log(user);
  console.log(setUser);
  console.log(2);
  return (
    <div className="container">
      <div className="py-3">
        <h4 className="dark-text py-2 text-center">You want to register as:</h4>
        <button
          onClick={() => handleChooserClick("Freelancer")}
          type="button"
          className={`btn w-50 btn-${
            chooser !== "Freelancer" ? "outline-danger" : "primary"
          }`}
        >
          Freelancer
        </button>
        <button
          onClick={() => handleChooserClick("Company")}
          type="button"
          className={`btn w-50 btn-${
            chooser !== "Company" ? "outline-danger" : "primary"
          }`}
        >
          Company
        </button>
      </div>

      <form>
        <div className="form-group">
          <label htmlFor="full_name">
            Full Name
            <input
              type="text"
              id="full_name"
              className="form-control"
              name="full-name"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="email_address">
            E-Mail Address
            <input
              type="text"
              id="email_address"
              className="form-control"
              name="email-address"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="user_name">
            User Name
            <input
              type="text"
              id="user_name"
              className="form-control"
              name="username"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">
            Phone Number
            <input type="text" id="phone_number" className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="present_address">
            Present Address
            <input type="text" id="present_address" className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="permanent_address">
            Permanent Address
            <input
              type="text"
              id="permanent_address"
              className="form-control"
              name="permanent-address"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="nid_number">
            <abbr title="National Id Card">NID</abbr> Number
            <input
              type="text"
              id="nid_number"
              className="form-control"
              name="nid-number"
            />
          </label>
        </div>

        <div className="col-md-6 offset-md-4">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
