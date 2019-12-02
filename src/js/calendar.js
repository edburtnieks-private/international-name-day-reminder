const calendar = document.querySelector('#calendar');

const createDateCellElement = async (day, names) => {
  const dateCellElement = document.createElement('div');
  const dayElement = document.createElement('div');

  dayElement.textContent = day;
  dayElement.className = 'date-number';

  dateCellElement.className = 'date-cell';
  dateCellElement.appendChild(dayElement);

  if (names) {
    names.forEach((name) => {
      const nameElement = document.createElement('div');
      nameElement.textContent = name.trim();
      dateCellElement.appendChild(nameElement);
    });
  }

  return dateCellElement;
};

export const createCalendar = (days, firstWeekDay, names) => {
  calendar.innerHTML = '';

  days.forEach(async (day) => {
    const dateCellElement = await createDateCellElement(day, names[day]);
    calendar.appendChild(dateCellElement);
  });

  calendar.style.setProperty(
    '--first-week-day',
    firstWeekDay,
  );
};

export const changeMonth = (currentDate, previousMonthDate, nextMonthDate, { isDecrement }) => {
  const newDate = new Date(
    currentDate.setMonth(
      isDecrement
        ? currentDate.getMonth() - 1
        : currentDate.getMonth() + 1,
    ),
  );

  const newPreviousMonthDate = new Date(
    previousMonthDate.setMonth(
      isDecrement
        ? previousMonthDate.getMonth() - 1
        : previousMonthDate.getMonth() + 1,
    ),
  );

  const newNextMonthDate = new Date(
    nextMonthDate.setMonth(
      isDecrement
        ? nextMonthDate.getMonth() - 1
        : nextMonthDate.getMonth() + 1,
    ),
  );

  return {
    newDate,
    newPreviousMonthDate,
    newNextMonthDate,
  };
};
