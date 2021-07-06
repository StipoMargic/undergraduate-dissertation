import { useContext } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/global";

const Logout = () => {
  const { removeAllCookies } = useContext(GlobalContext);
  const history = useHistory();

  removeAllCookies();
  window.location.reload();
  history.push("/");

  return null;
};

export default Logout;
