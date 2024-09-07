export const countOccurrences = (array: string[]) => {
    return array.reduce((acc: Record<string, number>, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  };
  