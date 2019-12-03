import { getSavedNames, setSavedNames } from './api/name';

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

const createNameButton = (name) => {
  const nameButton = document.createElement('button');

  nameButton.textContent = name.trim();
  nameButton.className = 'name-button';
  nameButton.addEventListener('click', () => removeSavedName(name));

  return nameButton;
};

const createSavedNameListItem = (name) => {
  const savedNameListItem = document.createElement('li');
  const savedNameButton = createNameButton(name);

  savedNameButton.textContent = name;
  savedNameListItem.appendChild(savedNameButton);

  return savedNameListItem;
};

export const setSavedNamesTitle = (title) => {
  savedNamesTitle.textContent = title;
};

export const addSavedNameListItem = (name) => {
  const savedNameListItem = createSavedNameListItem(name);
  savedNameListItem.dataset.name = name;
  savedNamesList.appendChild(savedNameListItem);
};

export const createSavedNamesList = (names) => {
  names.forEach((name) => {
    addSavedNameListItem(name);
  });
};
