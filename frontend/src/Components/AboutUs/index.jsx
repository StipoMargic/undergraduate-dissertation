import React from "react";
import "./styles.scss";
import about from "../../Assets/images/about.svg";

const AboutUs = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <img src={about} alt="about us" className="img-fluid" />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="about-captione">
              <h6 className="text-blue">About LiberatoJob</h6>
              <h2>
                LiberatoJob Job Service – World’s most trusted marketplace
              </h2>
              <p>
                Are you searching for an easy way to find and hire top quality
                freelancers, as well as web developers & designers? Do you want
                to use the best way to advertise your job offers ? If the
                answers is yes, you literally a few clicks away...
              </p>
              <ul className="lists-3 mt-3">
                <li>
                  Designing business solutions to ensure that business processes
                  go smoothly
                </li>
                <li>
                  Connecting with top quality freelancers with proven business
                  experience
                </li>
                <li>Finding perfect matching between customers and clients</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
