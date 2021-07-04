import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/global";

const Logout = () => {
  const { removeAllCookies, username } = useContext(GlobalContext);
  const history = useHistory();

  if (!username) {
    history.push("/");
  }

  removeAllCookies();

  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  });

  return (
    <>
      <p>logout</p>
    </>
  );
};

export default Logout;
