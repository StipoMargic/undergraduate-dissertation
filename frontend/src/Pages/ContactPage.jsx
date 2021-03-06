import React, { useContext } from "react";
import Contact from "../Components/Contact";
import { GlobalContext } from "../Context/global";
import Spinner from "../Components/AboutNumbers/Spinner";

const ContactPage = () => {
  const { loading } = useContext(GlobalContext);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <Contact />
        </div>
      )}
      0
    </>
  );
};

export default ContactPage;
