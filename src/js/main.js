import {
  formatDateYear,
  formatDateMonth,
  currentDate,
  previousMonthDate,
  nextMonthDate,
} from './utils/date-helpers';
import { createCalendar, changeMonth } from './utils/calendar-helpers';

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

createCalendar(currentDate);
setMonthAndYearText(currentDate, previousMonthDate, nextMonthDate);

previousMonthButton.addEventListener('click', () => {
  const { newDate, newPreviousMonthDate, newNextMonthDate } = changeMonth({ isDecrement: true });
  createCalendar(newDate);
  setMonthAndYearText(newDate, newPreviousMonthDate, newNextMonthDate);
});

nextMonthButton.addEventListener('click', () => {
  const { newDate, newPreviousMonthDate, newNextMonthDate } = changeMonth({ isDecrement: false });
  createCalendar(newDate);
  setMonthAndYearText(newDate, newPreviousMonthDate, newNextMonthDate);
});
