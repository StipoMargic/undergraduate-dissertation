// eslint-disable-next-line import/prefer-default-export
export const MakeCategoryPostData = (name, description, image) => {
  return {
    data: {
      type: "category",
      attributes: {
        name,
        description,
        image,
      },
    },
  };
};
