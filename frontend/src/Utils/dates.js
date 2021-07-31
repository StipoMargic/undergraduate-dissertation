const today = new Date();

export const yesterday = () => {
  return new Date(today.getTime() - 24 * 60 * 60 * 1000);
};

export const lastMonth = () => {
  return new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
};

export const sixMonthsAgo = () => {
  return new Date(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
};

export const threeMonthsAgo = () => {
  return new Date(today.getTime() - 3 * 30 * 24 * 60 * 60 * 1000);
};

export const nextMonth = () => {
  return new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
};
