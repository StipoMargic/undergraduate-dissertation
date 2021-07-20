// eslint-disable-next-line import/prefer-default-export
export const makeJobUpdateData = (id, data, activeTill) => {
  return {
    data: {
      type: "job",
      id,
      attributes: {
        jobDuties: data.attributes.jobDuties,
        jobDutiesBulletins: data.attributes.jobDutiesBulletins,
        skills: data.attributes.skills,
        vacancy: +data.attributes.vacancy,
        activeTill: activeTill.toDateString(),
        location: data.attributes.location,
        salary: +data.attributes.salary,
        hours: +data.attributes.hours,
        typeOfPosition: data.attributes.typeOfPosition,
        disabledFriendly: data.attributes.disableFriendly,
        jobSummary: data.attributes.jobSummary,
        jobPositionName: data.attributes.jobPositionName,
      },
    },
  };
};
