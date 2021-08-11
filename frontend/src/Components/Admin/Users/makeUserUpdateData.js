// eslint-disable-next-line import/prefer-default-export
export const MakeUserUpdateData = (id, user, avatar, password) => {
  const {username, email, address, city, about} = user;
  return {
    data: {
      type: "user",
      id,
      attributes: {
        username,
        email,
        avatar: avatar === "" ? null : avatar,
        address,
        city,
        password: password === "" ? null : password,
        about,
      },
    },
  };
};
