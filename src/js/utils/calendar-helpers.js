import {
  currentDate,
  previousMonthDate,
  nextMonthDate,
  monthDates,
} from './date-helpers';

const calendar = document.querySelector('#calendar');

const createDateCellElement = (dateNumber) => {
  const dateCellElement = document.createElement('div');
  const dateElement = document.createElement('div');

  dateCellElement.className = 'date-cell';

  dateElement.textContent = dateNumber;
  dateElement.className = 'date-number';

  dateCellElement.appendChild(dateElement);

  return dateCellElement;
};

export const createCalendar = (date) => {
  calendar.innerHTML = '';

  monthDates(date).forEach((dateNumber) => {
    const dateCellElement = createDateCellElement(dateNumber);
    calendar.appendChild(dateCellElement);
  });

  calendar.style.setProperty(
    '--first-week-day',
    new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      1,
    ).getUTCDay() + 1,
  );
};

export const changeMonth = ({ isDecrement }) => {
  const newDate = new Date(
    currentDate.setUTCMonth(
      isDecrement
        ? currentDate.getUTCMonth() - 1
        : currentDate.getUTCMonth() + 1,
    ),
  );

  const newPreviousMonthDate = new Date(
    previousMonthDate.setUTCMonth(
      isDecrement
        ? previousMonthDate.getUTCMonth() - 1
        : previousMonthDate.getUTCMonth() + 1,
    ),
  );

  const newNextMonthDate = new Date(
    nextMonthDate.setUTCMonth(
      isDecrement
        ? nextMonthDate.getUTCMonth() - 1
        : nextMonthDate.getUTCMonth() + 1,
    ),
  );

  return {
    newDate,
    newPreviousMonthDate,
    newNextMonthDate,
  };
};
