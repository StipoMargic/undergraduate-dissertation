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
        score,
        message,
      },
      relationships: [],
    },
  };
};
