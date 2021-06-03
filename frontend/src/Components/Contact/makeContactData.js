// eslint-disable-next-line import/prefer-default-export
export const makeContactData = (data) => {
  return {
    data: {
      type: "contact",
      attributes: {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.message,
      },
    },
  };
};
