import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./styles.scss";

const getSettings = () => ({
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

const WhatPeopleSaying = () => {
  const settings = getSettings();

  return (
    <section className="gray-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                What People <span className="theme-cl-2">Saying</span>
              </h2>
              <p>
                You are not trusting us? Read some testimonials from our
                users...
              </p>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Slider {...settings}>
          <div className="item px-3 testimonial-center">
            <div className="smart-tes-author">
              <div className="st-author-box">
                <div className="st-author-thumb">
                  <img
                    src="https://randomuser.me/api/portraits/men/83.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="st-author-info">
                  <h4 className="st-author-title">Adam Williams</h4>
                  <span className="st-author-subtitle theme-cl">
                    CEO Of Microwoft
                  </span>
                </div>
              </div>
            </div>
            <div className="smart-tes-content">
              <p>
                LiberatoJon has been an absolute joy to work with from start to
                finish. I am delighted with the final product. Speedy
                communication, an incredibly professional approach, an eye for
                detail, easy to work with, and creative flair - I could not have
                asked for more!
              </p>
            </div>
          </div>

          <div className="item testimonial-center">
            <div className="smart-tes-author">
              <div className="st-author-box">
                <div className="st-author-thumb">
                  <img
                    src="https://randomuser.me/api/portraits/women/83.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="st-author-info">
                  <h4 className="st-author-title">Lilly Wikdoner</h4>
                  <span className="st-author-subtitle theme-cl">
                    Content Writer
                  </span>
                </div>
              </div>
            </div>
            <div className="smart-tes-content">
              <p>
                Excellent work. Efficient and quick and very easy to use job
                platform.
              </p>
            </div>
          </div>

          <div className="item testimonial-center">
            <div className="smart-tes-author">
              <div className="st-author-box">
                <div className="st-author-thumb">
                  <img
                    src="https://randomuser.me/api/portraits/women/11.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="st-author-info">
                  <h4 className="st-author-title">Shaurya Williams</h4>
                  <span className="st-author-subtitle theme-cl">
                    Manager Of Doodle
                  </span>
                </div>
              </div>
            </div>
            <div className="smart-tes-content">
              <p>
                Liberato freelancers reliability and expertise stood out as they
                attentively approached the project. Communication was clear and
                easy and they were able to shape my ideas into the final Ebook,
                exceeding expectations. Professional recommended!
              </p>
            </div>
          </div>

          <div className="item testimonial-center">
            <div className="smart-tes-author">
              <div className="st-author-box">
                <div className="st-author-thumb">
                  <img
                    src="https://randomuser.me/api/portraits/men/11.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="st-author-info">
                  <h4 className="st-author-title">John Setthi</h4>
                  <span className="st-author-subtitle theme-cl">
                    CEO Of Applio
                  </span>
                </div>
              </div>
            </div>
            <div className="smart-tes-content">
              <p>
                Excellent programmers on LiberatoJob platform. They are very
                professional, very talented and finished my complex project for
                the very next week. I will be working over LiberatoJob platform
                again.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};
export default WhatPeopleSaying;
