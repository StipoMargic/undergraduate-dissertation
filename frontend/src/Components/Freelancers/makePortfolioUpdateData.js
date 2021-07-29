// eslint-disable-next-line import/prefer-default-export
export const makePortfolioUpdateData = (portfolio) => {
  return {
    data: {
      type: "portfolio",
      id: portfolio.id,
      attributes: {
        advancedKnowledge: portfolio.advancedKnowledge,
        advancedKnowledgeBulletins: portfolio.advancedKnowledgeBulletins,
        skills: portfolio.skills,
        disabilityPercent: +portfolio.disabilityPercent,
        rate: portfolio.rate,
        hour: portfolio.hour,
      },
    },
  };
};
