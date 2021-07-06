// eslint-disable-next-line import/prefer-default-export
export const makeJobPostRequest = (jobData, activeTill) => {
  return {
    data: {
      type: "job",
      attributes: {
        jobDuties: jobData.jobDuties,
        jobDutiesBulletins: jobData.jobDutiesBulletins,
        skills: jobData.skills,
        vacancy: jobData.vacancy,
        activeTill: activeTill.toDateString(),
        location: jobData.location,
        salary: jobData.salary,
        hours: jobData.hours,
        typeOfPosition: jobData.typeOfPosition,
        disabledFriendly: jobData.disabledFriendly,
        jobSummary: jobData.jobSummary,
        jobPositionName: jobData.jobPositionName,
      },
    },
  };
};
