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

  console.log(username);
  if (username) {
    history.push("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/v1/verify/${verificationCode}`)
      .then(() => history.push("/"))
      .catch(() => setError(true));
  };
  return (
    <div className="container my-5 verification">
      {error && (
        <p className="text-danger">Something went wrong! Try again...</p>
      )}
      <form onSubmit={handleSubmit} className="w-100">
        <label htmlFor="verificationCode">
          <input
            type="text"
            value={verificationCode}
            placeholder="Type your code here"
            id="verificationCode"
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-100 p-3 ml-auto"
          />
        </label>
        <input
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          className="btn btn-primary btn-lg w-50"
        />
      </form>
    </div>
  );
};

export default Verification;
