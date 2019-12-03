import { encodedName } from './utils/name-helpers';

const createSaveIcon = () => {
  const saveIcon = document.createElement('span');

  saveIcon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" class="save-icon">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  `;

  return saveIcon;
};

const createNameText = (name) => {
  const nameText = document.createElement('span');

  nameText.textContent = name;
  nameText.className = 'name-text';

  return nameText;
};

export const createNameButton = (name) => {
  const nameButton = document.createElement('button');
  const nameText = createNameText(name);
  const saveIcon = createSaveIcon();

  nameButton.className = 'name-button';

  nameButton.appendChild(nameText);
  nameButton.appendChild(saveIcon);

  return nameButton;
};

export const createNameListItem = (name) => {
  const nameListItem = document.createElement('li');

  nameListItem.className = 'name-list-item';
  nameListItem.dataset.name = encodedName(name);

  return nameListItem;
};

export const createNameList = () => {
  const nameList = document.createElement('ul');

  nameList.className = 'name-list';

  return nameList;
};
