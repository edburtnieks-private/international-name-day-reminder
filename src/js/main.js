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

const getNames = async (country, month, day) => {
  let names = {};

  if (getNamesInMonth(month)) {
    names = getNamesInMonth(month);
  } else {
    try {
      const response = await getNameDayByDate(country, month, day);
      const { data } = await response.json();
      names[day] = data[0].namedays[country].split(',');
    } catch (error) {
      console.error(error);
    }
  }

  console.log(names);

  return names;
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
    const names = await getNames('us', date.getMonth(), day);

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
