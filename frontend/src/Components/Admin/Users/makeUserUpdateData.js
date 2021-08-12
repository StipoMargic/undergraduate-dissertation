// eslint-disable-next-line import/prefer-default-export
export const MakeUserUpdateData = (id, user, avatar) => {
  const {username, email, address, city, phone, password, about, occupation, facebook, twitter, linkedin} = user;
  console.log(address)
  return {
    data: {
      type: "user",
      id,
      attributes: {
        username,
        email,
        avatar: avatar === "" ? null : avatar,
        phone,
        address,
        city,
        password: password || null,
        about, occupation, facebook, twitter, linkedin
      },
    },
  };
};
