import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const ScrollToTop = () => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      toggleVisibility();
    });
  }, [visibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-to-top">
      {visibility && (
        <div>
          <FontAwesomeIcon
            onClick={() => scrollToTop()}
            icon={faArrowAltCircleUp}
          />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
