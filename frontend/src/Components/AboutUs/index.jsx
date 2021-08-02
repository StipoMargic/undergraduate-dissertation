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
                Let&apos;s Short Story About LiberatoJob
                <br />
                Job Service.
              </h2>
              <p>
                Find & hire top freelancers, web developers & designers or just{" "}
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                advertise job openings in your company. World's most trusted
                marketplace. Receive quotes in seconds, post your job online,
                and many more is just few clicks away...
              </p>
              <ul className="lists-3 mt-3">
                <li>A business solution designed for teams</li>
                <li>
                  Connect to freelancers with proven business experience
                </li>{" "}
                <li>
                  Get matched with the perfect talent by a customer success ...
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
