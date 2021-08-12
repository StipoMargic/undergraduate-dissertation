import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const getSingleJob = (id, setJob) => {
  axios
    .get(`http://apizavrsni.udruga-liberato.hr/api/v1/job/${id}?include=user`)
    .then((res) => {
      if (res && res.data) {
        setJob(res.data);
      }
    })
    .catch(() => null);
};
