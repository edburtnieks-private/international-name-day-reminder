import { getSavedNames, setSavedNames } from './api/name';
import { savedNamesTitle } from './utils/name-helpers';
import {
  addSavedNameListItemToSidebar,
  removeSavedNameListItemFromSidebar,
  setSavedNamesTitle,
} from './sidebar';
import {
  createNameList,
  createNameListItem,
  createNameButton,
  updateNameListItemStyles,
} from './name-list';

const calendar = document.querySelector('#calendar');

const toggleNameSave = (nameListItem, name) => {
  const names = getSavedNames();

  if (names.includes(name)) {
    const index = names.indexOf(name);
    if (index !== -1) names.splice(index, 1);
    updateNameListItemStyles(nameListItem, name);
    removeSavedNameListItemFromSidebar(name);
  } else {
    names.push(name);
    updateNameListItemStyles(nameListItem, name);
    addSavedNameListItemToSidebar(name);
  }

  setSavedNames(names);
  setSavedNamesTitle(savedNamesTitle());
};

const createDayElement = (day) => {
  const dayElement = document.createElement('div');

  dayElement.textContent = day;
  dayElement.className = 'day';

  return dayElement;
};

const createDateCellElement = (day) => {
  const dateCellElement = document.createElement('div');
  const dayElement = createDayElement(day);

  dateCellElement.className = 'date-cell';
  dateCellElement.appendChild(dayElement);

  return dateCellElement;
};

export const addNamesToDateCell = (dateCellElement, names) => {
  if (names) {
    const nameList = createNameList();

    names.forEach((name) => {
      const trimmedName = name.trim();
      const nameButton = createNameButton(trimmedName);
      const nameListItem = createNameListItem(name);

      nameButton.addEventListener('click', () => toggleNameSave(nameListItem, trimmedName));

      if (getSavedNames().includes(name)) {
        nameListItem.classList.add('saved');
      }

      nameListItem.appendChild(nameButton);
      nameList.appendChild(nameListItem);
    });

    dateCellElement.appendChild(nameList);
  }
};

export const createCalendar = (days, firstWeekDay) => {
  calendar.innerHTML = '';
  const dateCellElements = [];

  days.forEach((day) => {
    const dateCellElement = createDateCellElement(day);
    dateCellElements.push({ day, element: dateCellElement });
    calendar.appendChild(dateCellElement);
  });

  calendar.style.setProperty(
    '--first-week-day',
    firstWeekDay,
  );

  return dateCellElements;
};

export const changeMonth = (currentDate, previousMonthDate, nextMonthDate, { isDecrement }) => {
  const newDate = new Date(
    currentDate.setMonth(
      isDecrement
        ? currentDate.getMonth() - 1
        : currentDate.getMonth() + 1,
    ),
  );

  const newPreviousMonthDate = new Date(
    previousMonthDate.setMonth(
      isDecrement
        ? previousMonthDate.getMonth() - 1
        : previousMonthDate.getMonth() + 1,
    ),
  );

  const newNextMonthDate = new Date(
    nextMonthDate.setMonth(
      isDecrement
        ? nextMonthDate.getMonth() - 1
        : nextMonthDate.getMonth() + 1,
    ),
  );

  return {
    newDate,
    newPreviousMonthDate,
    newNextMonthDate,
  };
};
