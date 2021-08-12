import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const getSinglePortfolio = (id, setPortfolio) => {
  axios
    .get(
      `http://127.0.0.1:8000/api/v1/portfolios/${id}?include=user,qualifications,experiences`
    )
    .then((res) => {
      if (res && res.data) {
        setPortfolio(res.data);
      }
    })
    .catch(() => null);
};
