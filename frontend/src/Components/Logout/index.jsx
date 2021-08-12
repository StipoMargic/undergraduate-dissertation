import { useContext } from "react";
import { GlobalContext } from "../../Context/global";

const Logout = () => {
  const { removeAllCookies } = useContext(GlobalContext);

  removeAllCookies();
  window.location.replace("http://zavrsni.udruga-liberato.hr");

  return null;
};

export default Logout;
