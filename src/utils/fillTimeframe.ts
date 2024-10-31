export function fillWeeks(startDate: Date, endDate?: Date) {
  if (!endDate) {
    endDate = new Date();
  }

  // Adjust startDate to the previous Monday
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));

  // Generate all weeks within the date range, starting on Monday
  const weeks = [];
  let weekStart = new Date(startDate);
  while (weekStart <= endDate) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weeks.push({
      start: new Date(weekStart),
      end: new Date(weekEnd),
      label: `${String(weekStart.getMonth() + 1).padStart(2, '0')}/${String(
        weekStart.getDate(),
      ).padStart(2, '0')}`,
    });
    weekStart.setDate(weekStart.getDate() + 7);
  }

  return weeks;
}

export function fillMonths(startDate: Date, endDate?: Date) {
  if (!endDate) {
    endDate = new Date();
  }

  //ensure start date is the first day of the month
  startDate.setDate(1);

  const months = [];
  let monthStart = new Date(startDate);
  while (monthStart <= endDate) {
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthEnd.getMonth() + 1);
    monthEnd.setDate(0);
    months.push({
      start: new Date(monthStart),
      end: new Date(monthEnd),
      label: `${String(monthStart.getMonth() + 1).padStart(2, '0')}/${String(
        monthStart.getDate(),
      ).padStart(2, '0')}`,
    });
    monthStart.setMonth(monthStart.getMonth() + 1);
  }

  return months;
}
