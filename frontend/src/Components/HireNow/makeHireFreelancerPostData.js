// eslint-disable-next-line import/prefer-default-export
export const makeHireFreelancerPostData = (
  subject,
  message,
  portfolioId,
  companyName
) => {
  return {
    data: {
      type: "FreelancerHire",
      attributes: {
        subject,
        message,
        portfolioId,
        companyName,
      },
    },
  };
};
