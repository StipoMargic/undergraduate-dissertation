// eslint-disable-next-line import/prefer-default-export
export const MakeUserUpdateData = (id, user, avatar) => {
  return {
    data: {
      type: "user",
      id,
      attributes: {
        username: user.username,
        email: user.email,
        password: user.password,
        avatar,
        address: user.address,
        city: user.city,
        phone: user.phone,
        occupation: user.occupation,
        facebook: user.facebook,
        linkedin: user.linkedin,
        twitter: user.twitter,
        about: user.about,
      },
      relationships: [],
    },
  };
};
