import {
  formatDateYear,
  formatDateMonth,
  currentDate,
  previousMonthDate,
  nextMonthDate,
  monthDays,
} from './utils/date-helpers';
import { savedNamesTitle } from './utils/name-helpers';
import { countryFullName } from './utils/country-helpers';
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
import {
  getCountries,
  setCountries,
  getSelectedCountry,
  setSelectedCountry,
} from './api/countries';

const currentYearElement = document.querySelector('#current-year');
const currentMonthElement = document.querySelector('#current-month');
const previousMonthButton = document.querySelector('#previous-month-button');
const nextMonthButton = document.querySelector('#next-month-button');
const countryFilterSelect = document.querySelector('#country-filter');

let dateCellElements;

const getNamedays = async (month, day) => {
  let namedays = {};

  if (getNamesInMonth(month)) {
    namedays = getNamesInMonth(month);
  } else {
    try {
      const response = await getNameDayByDate(month, day);
      const { data } = await response.json();
      namedays[day] = {
        names: data[0].namedays,
        month: data[0].dates.month,
        day: data[0].dates.day,
      };
    } catch (error) {
      console.error(error);
    }
  }

  return namedays;
};

const createSelectOption = (select, option, displayText) => {
  const optionElement = document.createElement('option');

  optionElement.value = option;
  optionElement.textContent = displayText;

  select.appendChild(optionElement);
};

const addFlagToCountrySelect = (country) => {
  countryFilterSelect.className = `flag-icon-background flag-icon-${country}`;
};

const addCountriesToSelect = (countries) => {
  countries.forEach((country) => {
    addFlagToCountrySelect(getSelectedCountry() || countryFilterSelect.value);
    createSelectOption(countryFilterSelect, country, countryFullName(country));
  });
};

const setDefaultCountry = (selectedCountry) => {
  if (selectedCountry) {
    countryFilterSelect.value = selectedCountry;
  }
};

const setupCalendar = async (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const days = monthDays(date);
  const firstWeekDay = new Date(year, month, 1).getUTCDay() + 1;
  const allNamedays = {};

  dateCellElements = createCalendar(days, firstWeekDay);

  await dateCellElements.forEach(async (dateCellElement) => {
    const { day } = dateCellElement;
    const namedays = await getNamedays(month, day);

    if (day === 1) {
      if (!getCountries()) {
        const countries = Object.keys(namedays[day].names);
        addCountriesToSelect(countries);
        setCountries(countries);
      }
    }

    addNamesToDateCell(
      dateCellElement.element,
      namedays[day],
      getSelectedCountry() || countryFilterSelect.value,
    );

    if (!getNamesInMonth(month)) {
      allNamedays[day] = namedays[day];

      if (Object.keys(allNamedays).length === days.length) {
        setNamesInMonth(allNamedays, month);
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

if (getCountries()) {
  addCountriesToSelect(getCountries());
}

setDefaultCountry(getSelectedCountry());
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

  addFlagToCountrySelect(country);
  setSelectedCountry(country);

  dateCellElements.forEach(async (dateCellElement) => {
    const { day } = dateCellElement;
    const namedays = await getNamedays(month, day);

    addNamesToDateCell(dateCellElement.element, namedays[day], country);
  });
});
