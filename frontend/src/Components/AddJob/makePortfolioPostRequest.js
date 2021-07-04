// eslint-disable-next-line import/prefer-default-export
export const makePortfolioPostRequest = (
  portfolio,
  qualifications,
  experiences
) => {
  return {
    data: {
      type: "portfolio",
      attributes: {
        category: portfolio.category,
        advancedKnowledge: portfolio.advancedKnowledge,
        advancedKnowledgeBulletins: portfolio.advancedKnowledgeBulletins,
        skills: portfolio.skills,
        salary: portfolio.salary,
        disabilityPercent: portfolio.disabilityPercent,
        rate: portfolio.rate,
        hour: portfolio.hour,
        qualifications,
        experiences,
      },
    },
  };
};
