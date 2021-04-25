import React from "react";
import "./styles.scss";

const AboutUs = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <img
              src="https://via.placeholder.com/800x950"
              alt="about us"
              className="img-fluid"
            />
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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. avoids pleasure itself, because it
                is pleasure, but because those who do not know how to pursue
                pleasure undertakes laborious
              </p>
              <ul className="lists-3 mt-3">
                <li>At vero eos et accusamus et iusto odio dignissimos</li>
                <li>Nam libero tempore, cum soluta nobis est eligendi</li>
                <li>At vero eos et accusamus et iusto odio dignissimos</li>
              </ul>
              <a href="/" className="btn btn-primary btn-lg">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
