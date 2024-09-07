export const getEloDifference = (index: number, eloValues: number[]) => {
  if (index < 0 || index >= eloValues.length - 1) return { difference: "", colorClass: "" };

  const currentElo = eloValues[index];
  const previousElo = eloValues[index + 1];

  if (previousElo === 0 || currentElo === 0) return { difference: "", colorClass: "" };

  const difference = currentElo - previousElo;
  const colorClass = difference > 0 ? "text-green-500" : "text-red-500";

  return {
    difference: difference !== 0 ? `${difference > 0 ? `+${difference}` : difference}` : "",
    colorClass,
  };
};
