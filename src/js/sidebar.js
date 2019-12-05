import { getSavedNames, setSavedNames } from './api/name';
import { createNameListItem, createNameButton, updateNameListItemStyles } from './name-list';
import { encodedName, savedNamesTitle } from './utils/name-helpers';
import { createCountryFlag } from './utils/country-helpers';

const savedNamesTitleElement = document.querySelector('#saved-names-title');
const savedNamesList = document.querySelector('#saved-names-list');

const getFirstListItem = (country) => savedNamesList.querySelector(`[data-country='${country}']`).firstChild;

export const removeSavedNameFromCountrySpecificList = (name, country) => {
  const firstListItem = getFirstListItem(country);
  const itemToDelete = document.querySelector(`#saved-names-list [data-name='${encodedName(name)}']`);

  // Remove first saved name
  savedNamesList.querySelector(`[data-country='${country}']`).removeChild(itemToDelete);

  // Create country flag for new first saved name
  if (firstListItem === itemToDelete) {
    const newFirstListItem = getFirstListItem(country);

    if (newFirstListItem) {
      const countryFlag = createCountryFlag(country);
      newFirstListItem.prepend(countryFlag);
    }
  }
};

export const setSavedNamesTitle = (title) => {
  savedNamesTitleElement.textContent = title;
};

const removeSavedName = (name, country) => {
  const names = getSavedNames();

  if (names[country].includes(name)) {
    const index = names[country].indexOf(name);
    if (index !== -1) names[country].splice(index, 1);

    if (!names[country].length) {
      delete names[country];
    }

    updateNameListItemStyles(null, name);
    removeSavedNameFromCountrySpecificList(name, country);
    setSavedNames(names, country);
    setSavedNamesTitle(savedNamesTitle());
  }
};

const createCountrySpecificNameList = (country) => {
  const countrySpecificNameList = document.createElement('ul');

  countrySpecificNameList.dataset.country = country;
  countrySpecificNameList.className = 'country-specific-name-list';

  savedNamesList.appendChild(countrySpecificNameList);

  return countrySpecificNameList;
};

export const addSavedNameToCountrySpecificList = (name, country) => {
  let countryNameList = document.querySelector(`#saved-names-list [data-country=${country}]`);

  if (!countryNameList) {
    countryNameList = createCountrySpecificNameList(country);
    savedNamesList.appendChild(countryNameList);
  }

  const countryFlag = createCountryFlag(country);
  const nameButton = createNameButton(name);
  const savedNameListItem = createNameListItem(name);

  nameButton.addEventListener('click', () => removeSavedName(name, country));

  savedNameListItem.classList.add('saved');

  if (!countryNameList.firstChild) {
    savedNameListItem.appendChild(countryFlag);
  }

  savedNameListItem.appendChild(nameButton);
  countryNameList.appendChild(savedNameListItem);

  return countryNameList;
};

export const setSavedNamesListItems = (names) => {
  const countries = Object.keys(names);

  countries.forEach((country) => {
    names[country].forEach((name) => {
      const trimmedName = name.trim();
      addSavedNameToCountrySpecificList(trimmedName, country);
    });
  });
};
