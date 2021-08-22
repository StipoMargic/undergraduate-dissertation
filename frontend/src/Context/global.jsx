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
  const [loading, setLoading] = useState(true);
  const [portfolioFilter, setPortfolioFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [portfolioSort, setPortfolioSort] = useState("-createdAt");
  const [jobSort, setJobSort] = useState("-createdAt");

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
      .get("http://apizavrsni.udruga-liberato.hr/api/v1/categories", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res && res.data) {
          setCategories([...res.data.data]);
        }
      })
      .catch(() => null);

    axios
      .get("http://apizavrsni.udruga-liberato.hr/api/v1/users", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => setUsers([...res.data.data]))
      .catch(() => null);

    setRole(Cookies.get("role"));
    setUsername(Cookies.get("username"));
    setToken(Cookies.get("token"));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://apizavrsni.udruga-liberato.hr/api/v1/portfolios?sort=${portfolioSort}`,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res && res.data) {
          setPortfolios([...res.data.data]);
          setLoading(false);
        }
      })
      .catch(() => null);
  }, [portfolioSort]);

  useEffect(() => {
    if (portfolioFilter.trim() !== "") {
      setLoading(true);
      axios
        .get(
          `http://apizavrsni.udruga-liberato.hr/api/v1/portfolios?filter[skills]=${portfolioFilter}`,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          if (res && res.data) {
            setPortfolios([...res.data.data]);
            setLoading(false);
          }
        })
        .catch(() => null);
    }
  }, [portfolioFilter]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://apizavrsni.udruga-liberato.hr/api/v1/jobs?sort=${jobSort}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res && res.data) {
          setJobs([...res.data.data]);
          setLoading(false);
        }
      })
      .catch(() => null);
  }, [jobSort]);

  useEffect(() => {
    if (jobFilter.trim() !== "") {
      setLoading(true);
      axios
        .get(
          `http://apizavrsni.udruga-liberato.hr/api/v1/jobs?filter[jobPositionName]=${jobFilter}`,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          if (res && res.data) {
            setJobs([...res.data.data]);
            setLoading(false);
          }
        })
        .catch(() => null);
    }
  }, [jobFilter]);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider
      value={{
        categories,
        jobs,
        portfolios,
        token,
        setTokenWithCookie,
        username,
        role,
        ttl,
        users,
        removeAllCookies,
        setUsers,
        loading,
        setPortfolioFilter,
        setJobFilter,
        setPortfolioSort,
        setJobSort,
        jobSort,
        portfolioSort,
        setLoading,
        jobFilter,
        portfolioFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
