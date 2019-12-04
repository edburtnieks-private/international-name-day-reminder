import {
  formatDateYear,
  formatDateMonth,
  currentDate,
  previousMonthDate,
  nextMonthDate,
  monthDays,
} from './utils/date-helpers';
import { savedNamesTitle } from './utils/name-helpers';
import { createCalendar, changeMonth, addNamesToDateCell } from './calendar';
import { setSavedNamesTitle, setSavedNamesListItems } from './sidebar';
import {
  getNameDayByDate,
  getSavedNames,
  setNamesInMonth,
  getNamesInMonth,
} from './api/name';

const currentYearElement = document.querySelector('#current-year');
const currentMonthElement = document.querySelector('#current-month');
const previousMonthButton = document.querySelector('#previous-month-button');
const nextMonthButton = document.querySelector('#next-month-button');

const getNames = async (day, month) => {
  let allNames = {};

  if (getNamesInMonth(month)) {
    allNames = getNamesInMonth(month);
  } else {
    try {
      const response = await getNameDayByDate(day, month);
      const { data } = await response.json();
      const entries = Object.entries(data[0].namedays);
      allNames[day] = entries;
    } catch (error) {
      console.error(error);
    }
  }

  return allNames;
};

const setupCalendar = async (date) => {
  const days = monthDays(date);
  const firstWeekDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
  ).getUTCDay() + 1;
  const dateCellElements = createCalendar(days, firstWeekDay);
  const allNames = {};

  await dateCellElements.forEach(async (dateCellElement) => {
    const { day } = dateCellElement;
    const names = await getNames(day, date.getMonth());

    addNamesToDateCell(dateCellElement.element, names[day]);

    if (!getNamesInMonth(date.getMonth())) {
      allNames[day] = names[day];

      if (Object.keys(allNames).length === days.length) {
        setNamesInMonth(allNames, date.getMonth());
      }
    }
  });
};

const setMonthAndYearText = (current, previous, next) => {
  currentYearElement.textContent = formatDateYear(current);
  currentMonthElement.textContent = formatDateMonth(current);
  previousMonthButton.textContent = formatDateMonth(previous);
  nextMonthButton.textContent = formatDateMonth(next);
};

setupCalendar(currentDate);
setMonthAndYearText(currentDate, previousMonthDate, nextMonthDate);

setSavedNamesTitle(savedNamesTitle());
setSavedNamesListItems(getSavedNames());

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
