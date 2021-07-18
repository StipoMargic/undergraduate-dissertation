// eslint-disable-next-line import/prefer-default-export
export const MakeCategoryUpdateData = (id, name, description, image) => {
  return {
    data: {
      type: "category",
      id,
      attributes: {
        name,
        description,
        image,
      },
    },
  };
};
