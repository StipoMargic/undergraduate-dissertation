// eslint-disable-next-line import/prefer-default-export
export const makePortfolioUpdateData = (portfolio) => {
  return {
    data: {
      type: "portfolio",
      id: portfolio.id,
      attributes: {
        advancedKnowledge: portfolio.attributes.advancedKnowledge,
        advancedKnowledgeBulletins:
          portfolio.attributes.advancedKnowledgeBulletins,
        skills: portfolio.attributes.skills,
        disabilityPercent: +portfolio.attributes.disabilityPercent,
        rate: portfolio.attributes.rate,
        hour: portfolio.attributes.hour,
      },
    },
  };
};
