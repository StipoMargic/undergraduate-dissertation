const today = new Date();

export const yesterday = () => {
  return new Date(today.getTime() - 24 * 60 * 60 * 1000);
};

export const lastMonth = () => {
  return new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
};
