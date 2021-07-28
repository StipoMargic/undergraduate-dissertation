// eslint-disable-next-line import/prefer-default-export
export const makeDeclineData = (jobId, applicantName) => {
  return {
    data: {
      type: "JobApplication",
      attributes: {
        jobId,
        applicantName,
      },
    },
  };
};
