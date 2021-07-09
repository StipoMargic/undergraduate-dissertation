// eslint-disable-next-line import/prefer-default-export
export const makeJobApplyData = (subject, message, jobId, resume, username) => {
  return {
    data: {
      type: "JobApplication",
      attributes: {
        subject,
        message,
        jobId,
        resume,
        username,
      },
    },
  };
};
