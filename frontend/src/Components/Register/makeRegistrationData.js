// eslint-disable-next-line import/prefer-default-export
export const makeRegistrationData = (user, avatar) => {
  return {
    data: {
      type: "user",
      attributes: {
        username: user.name,
        email: user.email,
        password: user.password,
        role: user.role === "Freelancer" ? "ROLE_USER" : "ROLE_EMPLOYER",
        address: user.address,
        city: user.city,
        phone: user.phone,
        occupation: user.occupation,
        facebook: user.facebook,
        twitter: user.twitter,
        linkedin: user.linkedin,
        avatar,
      },
    },
  };
};
