import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapPin,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
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
      .post("http://127.0.0.1:8000/v1/contact", makeContactData(contactData))
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
      <div className="page-title inner-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="ipt-title">Contact Us</h2>
              <span className="ipn-subtitle">
                Looking For a design partner? You Found.
              </span>
            </div>
          </div>
        </div>
        <div className="ht-80" />
      </div>
      <section className="py-lg-5 fcc ht-60">
        <div className="container ">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="contact_side">
                <div className="ct_cmp_social">
                  <ul>
                    <li>
                      <a href="/">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          color="#fff"
                          size="2x"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <FontAwesomeIcon
                          icon={faInstagram}
                          color="#fff"
                          size="2x"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          color="#fff"
                          size="2x"
                        />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="ct_cmp_caption">
                  <h4 className="mb-0">Get in Touch.</h4>
                  <p>Get in touch via mail, call and direct address.</p>
                </div>

                <div className="ct_cmp_address">
                  <div className="ct_cmp_single">
                    <div className="ct_cmp_single_icon">
                      <FontAwesomeIcon icon={faMapPin} />
                    </div>
                    <div className="ct_cmp_brief">
                      <h5>Reach Us:</h5>
                      <span>
                        Kopilica 5, 21000 Split
                        <br />
                        Croatia (local: Hrvatska)
                      </span>
                    </div>
                  </div>
                  <div className="ct_cmp_single">
                    <div className="ct_cmp_single_icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="ct_cmp_brief">
                      <h5>Drop a mail:</h5>
                      <span>info@liberato.io</span>
                    </div>
                  </div>
                  <div className="ct_cmp_single">
                    <div className="ct_cmp_single_icon">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div className="ct_cmp_brief">
                      <h5>Call Us:</h5>
                      <span>+91 256 258 4759</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-8 col-sm-12">
              <form onSubmit={handleSubmit} className="contact_row">
                <div className="form_row_box">
                  <div className="form_row_header">
                    <div className="form_row_header_flex">
                      <img
                        src="assets/img/email.svg"
                        className="img-fluid"
                        width="52"
                        alt=""
                      />
                    </div>
                    <div className="form_row_header_right">
                      <p>
                        Write as a few words about your query and we&apos;ll
                        prepare your query for you within <strong>24</strong>{" "}
                        hours and inform you shortly.
                      </p>

                      {contactData.error === true ? (
                        <h3 className="text-center text-danger mt-2">
                          Sorry something went wrong. Try again...
                        </h3>
                      ) : contactData.error === false ? (
                        <h3 className="text-center text-success mt-2">
                          Your email is send.
                        </h3>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form_row_box_body">
                    <div className="form-row">
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                          <label htmlFor="name">
                            Your Name
                            <input
                              onChange={onInputChange("name")}
                              type="text"
                              id="mame"
                              className="form-control with-light"
                              placeholder="Your Name"
                              value={contactData.name}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">
                            Your e-Mail
                            <input
                              onChange={onInputChange("email")}
                              type="email"
                              id="email"
                              className="form-control with-light"
                              placeholder="liberato@liberato.io"
                              value={contactData.email}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                          <label htmlFor="company">
                            Company
                            <input
                              onChange={onInputChange("company")}
                              type="text"
                              id="company"
                              className="form-control with-light"
                              placeholder="Limitless Ltd."
                              value={contactData.company}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                          <label htmlFor="phone">
                            Phone No.
                            <input
                              onChange={onInputChange("phone")}
                              type="text"
                              id="phone"
                              className="form-control with-light"
                              placeholder="+91 256 584 7863"
                              value={contactData.phone}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label htmlFor="message">
                            Your Query
                            <textarea
                              onChange={onInputChange("message")}
                              className="form-control with-light"
                              id="message"
                              rows={5}
                              placeholder="About Your Query"
                              value={contactData.message}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <button
                            onClick={handleSubmit}
                            type="button"
                            className="btn btn-primary w-100"
                            disabled={contactData.disabled}
                          >
                            Submit Query
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
