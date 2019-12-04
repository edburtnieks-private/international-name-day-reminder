import {
  formatDateYear,
  formatDateMonth,
  currentDate,
  previousMonthDate,
  nextMonthDate,
  monthDays,
} from './utils/date-helpers';
import { savedNamesTitle } from './utils/name-helpers';
import {
  createCalendar,
  changeMonth,
  addNamesToDateCell,
} from './calendar';
import { setSavedNamesTitle, setSavedNamesListItems } from './sidebar';
import {
  getNameDayByDate,
  getSavedNames,
  setNamesInMonth,
  getNamesInMonth,
} from './api/name';
import { getCountries, setCountries } from './api/countries';

const currentYearElement = document.querySelector('#current-year');
const currentMonthElement = document.querySelector('#current-month');
const previousMonthButton = document.querySelector('#previous-month-button');
const nextMonthButton = document.querySelector('#next-month-button');
const countryFilterSelect = document.querySelector('#country-filter');

let dateCellElements;

const getNames = async (month, day) => {
  let names = {};

  if (getNamesInMonth(month)) {
    names = getNamesInMonth(month);
  } else {
    try {
      const response = await getNameDayByDate(month, day);
      const { data } = await response.json();
      names[day] = data[0].namedays;
    } catch (error) {
      console.error(error);
    }
  }

  return names;
};

const createSelectOption = (select, option) => {
  const optionElement = document.createElement('option');

  optionElement.value = option;
  optionElement.textContent = option;

  select.appendChild(optionElement);
};

const addOptionsToSelect = (options, select) => {
  options.forEach((option) => {
    createSelectOption(select, option);
  });
};

const setupCalendar = (date) => {
  const month = date.getMonth();
  const days = monthDays(month);
  const firstWeekDay = new Date(
    date.getFullYear(),
    month,
    1,
  ).getUTCDay() + 1;
  dateCellElements = createCalendar(days, firstWeekDay);
  const allNames = {};
  let countries = [];

  dateCellElements.forEach(async (dateCellElement) => {
    const { day } = dateCellElement;
    const names = await getNames(month, day);

    if (names[1]) {
      if (!getCountries().length) {
        countries = Object.keys(names[1]);
        setCountries(countries);
      }
    }

    addNamesToDateCell(dateCellElement.element, names[day], countryFilterSelect.value);

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
addOptionsToSelect(getCountries(), countryFilterSelect);
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

countryFilterSelect.addEventListener('change', (event) => {
  const country = event.target.value;
  const month = currentDate.getMonth();

  dateCellElements.forEach(async (dateCellElement) => {
    const { day } = dateCellElement;
    const names = await getNames(month, day);

    addNamesToDateCell(dateCellElement.element, names[day], country);
  });
});
