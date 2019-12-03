import { getSavedNames, setSavedNames } from './api/name';
import { createNameListItem, createNameButton, updateNameListItemStyles } from './name-list';
import { encodedName } from './utils/name-helpers';

const savedNamesTitle = document.querySelector('#saved-names-title');
const savedNamesList = document.querySelector('#saved-names-list');

export const removeSavedNameListItemFromSidebar = (name) => {
  const itemToDelete = document.querySelector(`#saved-names-list [data-name='${encodedName(name)}']`);
  savedNamesList.removeChild(itemToDelete);
};

const removeSavedName = (name) => {
  const names = getSavedNames();

  if (names.includes(name)) {
    const index = names.indexOf(name);
    if (index !== -1) names.splice(index, 1);

    updateNameListItemStyles(null, name);
    removeSavedNameListItemFromSidebar(name);
    setSavedNames(names);
  }
};

export const setSavedNamesTitle = (title) => {
  savedNamesTitle.textContent = title;
};

export const addSavedNameListItemToSidebar = (name) => {
  const nameButton = createNameButton(name);
  const savedNameListItem = createNameListItem(name);

  nameButton.addEventListener('click', () => removeSavedName(name));

  savedNameListItem.classList.add('saved');

  savedNameListItem.appendChild(nameButton);
  savedNamesList.appendChild(savedNameListItem);

  return savedNameListItem;
};

export const setSavedNamesListItems = (names) => {
  names.forEach((name) => {
    const trimmedName = name.trim();
    addSavedNameListItemToSidebar(trimmedName);
  });
};
