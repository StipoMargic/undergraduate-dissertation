import React from "react";

const Spinner = () => {
  window.scrollTo(0, 0);
  return (
    <div className="vh-80 justify-content-center align-items-center d-flex">
      <div
        className="spinner-grow text-primary"
        role="status"
        style={{ height: "7rem", width: "7rem" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
