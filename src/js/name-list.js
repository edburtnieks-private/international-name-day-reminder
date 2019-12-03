const createSaveIcon = () => {
  const saveIcon = document.createElement('svg');

  saveIcon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" class="save-icon">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  `;

  return saveIcon;
};

export const createNameButton = (name) => {
  const nameButton = document.createElement('button');
  const saveIcon = createSaveIcon();

  nameButton.textContent = name;
  nameButton.className = 'name-button';
  nameButton.append(saveIcon);

  return nameButton;
};

export const createNameListItem = () => {
  const nameListItem = document.createElement('li');
  return nameListItem;
};

export const createNameList = () => {
  const nameList = document.createElement('ul');
  nameList.className = 'name-list';
  return nameList;
};
