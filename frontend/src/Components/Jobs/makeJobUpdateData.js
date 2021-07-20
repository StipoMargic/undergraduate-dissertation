// eslint-disable-next-line import/prefer-default-export
export const makeJobUpdateData = (id, data, activeTill) => {
  return {
    data: {
      type: "job",
      id,
      attributes: {
        jobDuties: data.jobDuties,
        jobDutiesBulletins: data.jobDutiesBulletins,
        skills: data.skills,
        vacancy: +data.vacancy,
        activeTill: activeTill.toDateString(),
        location: data.location,
        salary: +data.salary,
        hours: +data.hours,
        typeOfPosition: data.typeOfPosition,
        disabledFriendly: data.disabledFriendly,
        jobSummary: data.jobSummary,
        jobPositionName: data.jobPositionName,
      },
    },
  };
};
