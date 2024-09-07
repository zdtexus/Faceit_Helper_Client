export const formatDuration = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const totalMinutes = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalMonths = Math.floor(totalDays / 30);
  
    const remainingMinutes = totalMinutes % 60;
    const remainingHours = totalHours % 24;
    const remainingDays = totalDays % 30;
  
    return `${totalMonths > 0 ? `${totalMonths} ${totalMonths > 1 ? "months" : "month"}` : ""} ${
      remainingDays > 0 ? `${remainingDays} ${remainingDays > 1 ? "d" : "d"}` : ""
    } ${remainingHours > 0 ? `${remainingHours} ${remainingHours > 1 ? "h" : "h"}` : ""} ${
      remainingMinutes > 0 ? `${remainingMinutes} ${remainingMinutes > 1 ? "m" : "m"}` : ""
    }`.trim();
  };
  