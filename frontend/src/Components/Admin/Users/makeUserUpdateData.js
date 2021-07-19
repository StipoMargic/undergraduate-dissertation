// eslint-disable-next-line import/prefer-default-export
export const MakeUserUpdateData = (id, user, avatar) => {
  const { username, email, address, city, password, about } = user;

  console.log(username, email, avatar, address, city, password, about);
  return {
    data: {
      type: "user",
      id,
      attributes: {
        username,
        email,
        avatar,
        address,
        city,
        password,
        about,
      },
    },
  };
};
