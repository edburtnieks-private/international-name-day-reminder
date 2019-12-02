import {
  formatDateYear,
  formatDateMonth,
  currentDate,
  previousMonthDate,
  nextMonthDate,
  monthDays,
} from './utils/date-helpers';
import { createCalendar, changeMonth } from './calendar';
import { getNameDayByDate } from './api/name-day';

const currentYearElement = document.querySelector('#current-year');
const currentMonthElement = document.querySelector('#current-month');
const previousMonthButton = document.querySelector('#previous-month-button');
const nextMonthButton = document.querySelector('#next-month-button');

const setMonthAndYearText = (current, previous, next) => {
  currentYearElement.textContent = formatDateYear(current);
  currentMonthElement.textContent = formatDateMonth(current);
  previousMonthButton.textContent = formatDateMonth(previous);
  nextMonthButton.textContent = formatDateMonth(next);
};

const getNames = async (days, month) => {
  let names = {};

  if (localStorage.getItem(`names-${month}`)) {
    names = JSON.parse(localStorage.getItem(`names-${month}`));
  } else {
    await Promise.all(days.map(async (day) => {
      try {
        const response = await getNameDayByDate(day, month);
        const { data } = await response.json();

        if (!names[day]) {
          names[day] = data.name_cz.split(',');
          return names;
        }
      } catch (error) {
        console.error(error);
      }

      return names;
    }));

    localStorage.setItem(`names-${month}`, JSON.stringify(names));
  }

  return names;
};

const setupCalendar = async (date) => {
  const days = monthDays(date);
  const firstWeekDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
  ).getUTCDay() + 1;
  const names = await getNames(days, date.getMonth());

  createCalendar(days, firstWeekDay, names);
};

setupCalendar(currentDate);
setMonthAndYearText(currentDate, previousMonthDate, nextMonthDate);

previousMonthButton.addEventListener('click', () => {
  const { newDate, newPreviousMonthDate, newNextMonthDate } = changeMonth(
    currentDate,
    previousMonthDate,
    nextMonthDate,
    { isDecrement: true },
  );
  setupCalendar(newDate);
  setMonthAndYearText(newDate, newPreviousMonthDate, newNextMonthDate);
});

nextMonthButton.addEventListener('click', () => {
  const { newDate, newPreviousMonthDate, newNextMonthDate } = changeMonth(
    currentDate,
    previousMonthDate,
    nextMonthDate,
    { isDecrement: false },
  );
  setupCalendar(newDate);
  setMonthAndYearText(newDate, newPreviousMonthDate, newNextMonthDate);
});
