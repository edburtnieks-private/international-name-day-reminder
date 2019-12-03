import { getSavedNames, setSavedNames } from './api/name';
import { createNameListItem, createNameButton } from './name-list';

const savedNamesTitle = document.querySelector('#saved-names-title');
const savedNamesList = document.querySelector('#saved-names-list');

export const removeSavedNameListItem = (name) => {
  const itemToDelete = document.querySelector(`[data-name=${name}]`);
  savedNamesList.removeChild(itemToDelete);
};

const removeSavedName = (name) => {
  const names = getSavedNames();

  if (names.includes(name)) {
    const index = names.indexOf(name);
    if (index !== -1) names.splice(index, 1);

    removeSavedNameListItem(name);
    setSavedNames(names);
  }
};

export const setSavedNamesTitle = (title) => {
  savedNamesTitle.textContent = title;
};

export const addSavedNameListItem = (name) => {
  const nameButton = createNameButton(name);
  const savedNameListItem = createNameListItem();

  nameButton.addEventListener('click', () => removeSavedName(name));

  savedNameListItem.dataset.name = name;

  savedNameListItem.appendChild(nameButton);
  savedNamesList.appendChild(savedNameListItem);
};

export const setSavedNamesListItems = (names) => {
  names.forEach((name) => {
    addSavedNameListItem(name);
  });
};
