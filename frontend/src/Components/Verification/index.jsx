import "./styles.scss";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/global";

const Verification = () => {
  const { username } = useContext(GlobalContext);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  if (username) {
    history.push("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://apizavrsni.udruga-liberato.hr/v1/verify/${verificationCode}`
      )
      .then(() => history.push("/"))
      .catch(() => setError(true));
  };
  return (
    <div className="container pt-5">
      {error && (
        <p className="text-danger">Something went wrong! Try again...</p>
      )}
      <form onSubmit={handleSubmit} className="form-inline pt-5">
        <div className="form-group mb-2 w-75">
          <label htmlFor="verificationCode" className="sr-only">
            Email
          </label>
          <input
            type="text"
            className="form-control w-100 btn-outline-dark"
            id="verificationCode"
            value={verificationCode}
            placeholder="Type your code here"
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-2 w-25"
          onClick={handleSubmit}
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default Verification;
