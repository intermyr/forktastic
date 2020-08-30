export const round = (number) => {
  if (number > 1) {
    return Math.round((parseFloat(number) + Number.EPSILON) * 10) / 10;
  } else return Math.trunc((parseFloat(number)) * 100) / 100
};
