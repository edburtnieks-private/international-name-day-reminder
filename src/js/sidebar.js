import { getSavedNames, setSavedNames } from './api/name';
import { createNameListItem, createNameButton, updateNameListItemStyles } from './name-list';
import { encodedName, savedNamesTitle } from './utils/name-helpers';
import { createCountryFlag } from './utils/country-helpers';
import { formatMonthDay } from './utils/date-helpers';

const savedNamesTitleElement = document.querySelector('#saved-names-title');
const savedNamesList = document.querySelector('#saved-names-list');

const getFirstNameInCountryList = (month, day, country) => savedNamesList.querySelector(
  `[data-month='${month}'][data-day='${day}'] [data-country='${country}']`,
).firstChild;

export const removeSavedNameFromCountrySpecificList = (nameday, country) => {
  const { month, day } = nameday;
  const firstListItem = getFirstNameInCountryList(month, day, country);
  const dateList = savedNamesList.querySelector(`[data-month='${month}'][data-day='${day}']`);
  const countryListInDate = dateList.querySelector(`[data-country='${country}']`);
  const itemToDelete = countryListInDate.querySelector(`[data-name='${encodedName(nameday.name)}']`);

  // Remove saved name
  countryListInDate.removeChild(itemToDelete);

  // Create country flag for new first saved name
  if (firstListItem === itemToDelete) {
    const newFirstListItem = getFirstNameInCountryList(month, day, country);

    if (newFirstListItem) {
      const countryFlag = createCountryFlag(country);
      newFirstListItem.prepend(countryFlag);
    }
  }

  // If removed all names under country list, remove country list
  if (!countryListInDate.hasChildNodes()) {
    dateList.removeChild(countryListInDate);
  }

  // If removed all names under one date list, remove date list
  if (!dateList.querySelector('[data-country]')) {
    savedNamesList.removeChild(dateList);
  }
};

export const setSavedNamesTitle = (title) => {
  savedNamesTitleElement.textContent = title;
};

const removeSavedName = (nameday, country) => {
  const namedays = getSavedNames();

  if (country in namedays) {
    const nameArray = namedays[country].map((element) => element.name);
    const namedayIndex = nameArray.indexOf(nameday.name);

    if (namedayIndex !== -1) {
      namedays[country].splice(namedayIndex, 1);

      removeSavedNameFromCountrySpecificList(nameday, country);

      if (!namedays[country].length) {
        delete namedays[country];
      }

      updateNameListItemStyles(null, nameday.name);
      setSavedNames(namedays, country);
      setSavedNamesTitle(savedNamesTitle());
    }
  }
};

const createDateList = (month, day) => {
  const dateText = document.createElement('h3');
  const dateList = document.createElement('ul');

  dateText.textContent = formatMonthDay(new Date(new Date().getFullYear(), month - 1, day));

  dateList.dataset.month = month;
  dateList.dataset.day = day;

  dateList.appendChild(dateText);
  savedNamesList.appendChild(dateList);

  return dateList;
};

const createCountrySpecificNameList = (country) => {
  const countrySpecificNameList = document.createElement('ul');

  countrySpecificNameList.dataset.country = country;

  savedNamesList.appendChild(countrySpecificNameList);

  return countrySpecificNameList;
};

const addSavedNameToCountrySpecificList = (nameday, country) => {
  const { name, month, day } = nameday;
  let countryNameList = savedNamesList.querySelector(
    `[data-month='${month}'][data-day='${day}'] [data-country='${country}']`,
  );

  if (!countryNameList) {
    countryNameList = createCountrySpecificNameList(country);
    savedNamesList.appendChild(countryNameList);
  }

  const countryFlag = createCountryFlag(country);
  const nameButton = createNameButton(name);
  const savedNameListItem = createNameListItem(nameday);

  nameButton.addEventListener('click', () => removeSavedName(nameday, country));

  savedNameListItem.classList.add('saved');

  if (!countryNameList.firstChild) {
    savedNameListItem.appendChild(countryFlag);
  }

  savedNameListItem.appendChild(nameButton);
  countryNameList.appendChild(savedNameListItem);

  return countryNameList;
};

export const addCountryListToDateList = (nameday, country) => {
  const { month, day } = nameday;
  let dateList = savedNamesList.querySelector(`[data-month='${month}'][data-day='${day}']`);

  if (!dateList) {
    dateList = createDateList(month, day);
    savedNamesList.appendChild(dateList);
  }

  if (+dateList.dataset.month === month && +dateList.dataset.day === day) {
    const countryNameList = addSavedNameToCountrySpecificList(nameday, country);
    dateList.append(countryNameList);
  }

  return dateList;
};

export const setSavedNamesListItems = (namedays) => {
  const countries = Object.keys(namedays);

  countries.forEach((country) => {
    namedays[country].forEach((nameday) => {
      addCountryListToDateList(nameday, country);
    });
  });
};
