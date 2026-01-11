/**
 * Розраховує щоденні бали на основі дня сезону
 * @param date - Дата для розрахунку (за замовчуванням сьогодні)
 * @returns Розраховані бали
 */
export const calculateDailyPoints = (date: Date = new Date()): number => {
  const dayOfSeason = getDayOfSeason(date);

  if (dayOfSeason === 1) {
    return 2; // Перший день сезону = 2 бали
  } else if (dayOfSeason === 2) {
    return 3; // Другий день сезону = 3 бали
  } else {
    // Для третього та наступних днів:
    // 100% балів за попередній день + 60% балів за день перед попереднім
    const prevDayPoints = calculateDailyPoints(new Date(date.getTime() - 24 * 60 * 60 * 1000));
    const dayBeforePrevPoints = calculateDailyPoints(new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000));

    return Math.round(prevDayPoints + (dayBeforePrevPoints * 0.6));
  }
};

/**
 * Отримує день сезону для заданої дати
 * @param date - Дата
 * @returns День сезону (1-91 або 1-92 залежно від сезону)
 */
export const getDayOfSeason = (date: Date): number => {
  const month = date.getMonth() + 1; // JavaScript місяці 0-11
  const day = date.getDate();

  // Визначаємо сезон та перший день сезону
  let seasonStart: { month: number; day: number };

  if ((month === 12 && day >= 1) || (month === 1) || (month === 2) || (month === 3 && day <= 20)) {
    // Зима: 1 грудня - 20 березня
    seasonStart = { month: 12, day: 1 };
  } else if ((month === 3 && day >= 21) || (month === 4) || (month === 5) || (month === 6 && day <= 20)) {
    // Весна: 21 березня - 20 червня
    seasonStart = { month: 3, day: 21 };
  } else if ((month === 6 && day >= 21) || (month === 7) || (month === 8) || (month === 9 && day <= 20)) {
    // Літо: 21 червня - 20 вересня
    seasonStart = { month: 6, day: 21 };
  } else {
    // Осінь: 21 вересня - 30 листопада
    seasonStart = { month: 9, day: 21 };
  }

  // Розраховуємо різницю в днях від початку сезону
  const seasonStartDate = new Date(date.getFullYear(), seasonStart.month - 1, seasonStart.day);
  const diffTime = date.getTime() - seasonStartDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(1, diffDays); // Мінімум 1 день
};

/**
 * Форматує бали для відображення (якщо > 1000, показує в форматі K)
 * @param points - Кількість балів
 * @returns Форматований рядок
 */
export const formatPoints = (points: number): string => {
  if (points >= 1000) {
    return `${Math.floor(points / 1000)}K`;
  }
  return points.toString();
};

/**
 * Отримує поточний сезон
 * @param date - Дата (за замовчуванням сьогодні)
 * @returns Назва сезону
 */
export const getCurrentSeason = (date: Date = new Date()): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 12 && day >= 1) || (month === 1) || (month === 2) || (month === 3 && day <= 20)) {
    return 'Winter';
  } else if ((month === 3 && day >= 21) || (month === 4) || (month === 5) || (month === 6 && day <= 20)) {
    return 'Spring';
  } else if ((month === 6 && day >= 21) || (month === 7) || (month === 8) || (month === 9 && day <= 20)) {
    return 'Summer';
  } else {
    return 'Fall';
  }
};