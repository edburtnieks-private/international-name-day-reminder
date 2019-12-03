import { getSavedNames, setSavedNames } from './api/name';
import { addSavedNameListItem, removeSavedNameListItem } from './sidebar';

const calendar = document.querySelector('#calendar');

const toggleNameSave = (name) => {
  const names = getSavedNames();

  if (names.includes(name)) {
    const index = names.indexOf(name);
    if (index !== -1) names.splice(index, 1);
    removeSavedNameListItem(name);
  } else {
    names.push(name);
    addSavedNameListItem(name);
  }

  setSavedNames(names);
};

const createDayElement = (day) => {
  const dayElement = document.createElement('div');

  dayElement.textContent = day;
  dayElement.className = 'day';

  return dayElement;
};

const createNameWrapperElement = () => {
  const nameWrapperElement = document.createElement('div');

  nameWrapperElement.className = 'names';

  return nameWrapperElement;
};

const createNameButton = (name) => {
  const nameButton = document.createElement('button');

  nameButton.textContent = name.trim();
  nameButton.className = 'name-button';
  nameButton.addEventListener('click', () => toggleNameSave(name));

  return nameButton;
};

const createDateCellElement = async (day, names) => {
  const dateCellElement = document.createElement('div');

  const nameWrapperElement = createNameWrapperElement();
  const dayElement = createDayElement(day);

  dateCellElement.className = 'date-cell';
  dateCellElement.appendChild(dayElement);
  dateCellElement.appendChild(nameWrapperElement);

  if (names) {
    names.forEach((name) => {
      const nameButton = createNameButton(name);
      nameWrapperElement.appendChild(nameButton);
    });
  }

  return dateCellElement;
};

export const createCalendar = (days, firstWeekDay, names) => {
  calendar.innerHTML = '';

  days.forEach(async (day) => {
    const dateCellElement = await createDateCellElement(day, names[day]);
    calendar.appendChild(dateCellElement);
  });

  calendar.style.setProperty(
    '--first-week-day',
    firstWeekDay,
  );
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
