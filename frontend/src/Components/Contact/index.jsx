/* eslint-disable */
import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";
import { makeContactData } from "./makeContactData";

const initContactData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
  error: undefined,
  disabled: false,
};
const Contact = () => {
  const [contactData, setContactData] = useState(initContactData);

  const onInputChange = (field) => (e) => {
    e.persist();

    setContactData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://apizavrsni.udruga-liberato.hr/v1/contact",
        makeContactData(contactData)
      )
      .then(() =>
        setContactData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
          error: false,
          disabled: true,
        })
      )
      .catch(() =>
        setContactData({
          name: contactData.name,
          email: contactData.email,
          company: contactData.company,
          phone: contactData.phone,
          message: contactData.message,
          error: true,
          disabled: false,
        })
      );
  };
  return (
    <>
      <div className="container justify-content-center align-items-center d-flex flex-column">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <h2 className="ipt-titl mt-5">Contact Us</h2>
            <span className="ipn-subtitle">
              Looking For a design partner? You Found.
            </span>
          </div>
        </div>
        <section>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12"></div>
          </div>
          <div className="col-lg-8 col-sm-12 col-md-8">
            <form>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="validationDefault01">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault01"
                    placeholder="First name"
                    value="Mark"
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="validationDefault02">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault02"
                    placeholder="Last name"
                    value="Otto"
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="validationDefaultUsername">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroupPrepend2"
                      >
                        @
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefaultUsername"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="validationDefault03">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault03"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="validationDefault04">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault04"
                    placeholder="State"
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="validationDefault05">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault05"
                    placeholder="Zip"
                    required
                  />
                </div>
              </div>

              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
