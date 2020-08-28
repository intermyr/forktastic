export const round = (number) => {
  return (Math.round(parseFloat(number) + Number.EPSILON) * 10) / 10;
};
