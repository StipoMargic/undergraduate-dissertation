import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/portfolios")
      .then((res) => {
        if (res && res.data) {
          setPortfolios([...res.data.data]);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/api/v1/categories")
      .then((res) => {
        if (res && res.data) {
          setCategories([...res.data.data]);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/api/v1/jobs")
      .then((res) => {
        if (res && res.data) {
          setJobs([...res.data.data]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider value={{ categories, jobs, portfolios }}>
      {children}
    </GlobalContext.Provider>
  );
};
