// utils/calculateAverages.ts

export const calculateAverages = (matches: any[], matchCount: number, selectedStat: string) => {
    // Определяем диапазон для CurrentValues
    const currentStartIndex = 0;
    const currentEndIndex = matchCount;
  
    // Определяем диапазон для PreviousValue
    const previousStartIndex = matchCount;
    const previousEndIndex = matchCount * 2;
  
    // Функция для вычисления среднего значения
    const calculateAverage = (data: any[], stat: string) => {
      if (data.length === 0) return 0;
      const total = data.reduce((acc, match) => acc + parseFloat(match[stat] || '0'), 0);
      return parseFloat((total / data.length).toFixed(2)); // Округление до двух знаков после запятой
    };
  
    // Извлекаем данные для CurrentValues
    const currentMatches = matches.slice(currentStartIndex, currentEndIndex);
    const currentAverage = calculateAverage(currentMatches, selectedStat);
  
    // Извлекаем данные для PreviousValue
    const previousMatches = matches.slice(previousStartIndex, previousEndIndex);
    const previousAverage = previousMatches.length > 0 ? calculateAverage(previousMatches, selectedStat) : null;
  
    // Проверка, есть ли достаточно данных для предыдущего значения
    const showPrevious = previousEndIndex <= matches.length && (previousAverage ?? 0) > 0;
  
    return { currentAverage, previousAverage, showPrevious };
  };
  