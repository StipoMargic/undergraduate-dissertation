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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-md-12">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Slider {...settings}>
            <div className="item px-3 testimonial-center">
              <div className="smart-tes-author">
                <div className="st-author-box">
                  <div className="st-author-thumb">
                    <img
                      src="https://via.placeholder.com/400x400"
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </p>
              </div>
            </div>

            <div className="item testimonial-center">
              <div className="smart-tes-author">
                <div className="st-author-box">
                  <div className="st-author-thumb">
                    <img
                      src="https://via.placeholder.com/400x400"
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </p>
              </div>
            </div>

            <div className="item testimonial-center">
              <div className="smart-tes-author">
                <div className="st-author-box">
                  <div className="st-author-thumb">
                    <img
                      src="https://via.placeholder.com/400x400"
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </p>
              </div>
            </div>

            <div className="item testimonial-center">
              <div className="smart-tes-author">
                <div className="st-author-box">
                  <div className="st-author-thumb">
                    <img
                      src="https://via.placeholder.com/400x400"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="st-author-info">
                    <h4 className="st-author-title">Shrithi Setthi</h4>
                    <span className="st-author-subtitle theme-cl">
                      CEO Of Applio
                    </span>
                  </div>
                </div>
              </div>
              <div className="smart-tes-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et.
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};
export default WhatPeopleSaying;
