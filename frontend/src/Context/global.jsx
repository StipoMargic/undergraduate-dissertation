import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [token, setToken] = useState("");
  const [ttl, setTtl] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);

  const [filter, setFilter] = useState("-createdAt");

  const setTokenWithCookie = (cookie, timeToLive, _username, _role) => {
    Cookies.set("token", cookie);
    Cookies.set("ttl", timeToLive);
    Cookies.set("username", _username);
    Cookies.set("role", _role);
    setToken(cookie);
    setTtl(timeToLive);
  };

  const removeAllCookies = () => {
    Cookies.remove("ttl");
    Cookies.remove("username");
    Cookies.remove("role");
    Cookies.remove("token");
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/categories")
      .then((res) => {
        if (res && res.data) {
          setCategories([...res.data.data]);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/api/v1/users")
      .then((res) => setUsers([...res.data.data]))
      .catch((err) => console.log(err));

    setRole(Cookies.get("role"));
    setUsername(Cookies.get("username"));
    setToken(Cookies.get("token"));
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/portfolios?sort=${filter}`)
      .then((res) => {
        if (res && res.data) {
          setPortfolios([...res.data.data]);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://127.0.0.1:8000/api/v1/jobs?sort=${filter}`)
      .then((res) => {
        if (res && res.data) {
          setJobs([...res.data.data]);
        }
      })
      .catch((err) => console.log(err));
  }, [filter]);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider
      value={{
        categories,
        jobs,
        portfolios,
        token,
        setTokenWithCookie,
        setFilter,
        username,
        role,
        ttl,
        users,
        removeAllCookies,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
