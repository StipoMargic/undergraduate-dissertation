// eslint-disable-next-line import/prefer-default-export
export const makeCommentData = (portfolio, job, user, score, message) => {
  return {
    jsonapi: {
      version: "1.0",
    },
    data: {
      type: "comment",
      attributes: {
        portfolio,
        job,
        user,
        score: +score,
        message,
      },
      relationships: [],
    },
  };
};
