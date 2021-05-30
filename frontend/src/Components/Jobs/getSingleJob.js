import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const getSingleJob = (id, setJob) => {
  axios
    .get(`http://127.0.0.1:8000/api/v1/job/${id}?include=user`)
    .then((res) => {
      if (res && res.data) {
        setJob(res.data);
      }
    })
    .catch((err) => console.log(err));
};
