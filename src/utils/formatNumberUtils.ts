export const formatNumber = (number: number): string => {
  return number.toLocaleString().replace(/\s/g, ',');
};