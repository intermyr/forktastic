export const round = (number) => {
  if (number > 1) {
    return Math.trunc(parseFloat(number));
  } else return Math.trunc(parseFloat(number) * 100) / 100;
};
