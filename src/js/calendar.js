import { getSavedNames, setSavedNames } from './api/name';
import { savedNamesTitle } from './utils/name-helpers';
import {
  addCountryListToDateList,
  removeSavedNameFromCountrySpecificList,
  setSavedNamesTitle,
} from './sidebar';
import {
  createNameList,
  createNameListItem,
  createNameButton,
  updateNameListItemStyles,
} from './name-list';

const calendar = document.querySelector('#calendar');

const toggleNameSave = (nameListItem, nameday, country) => {
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
    } else {
      namedays[country].push(nameday);
      addCountryListToDateList(nameday, country);
    }
  } else {
    namedays[country] = [nameday];
    addCountryListToDateList(nameday, country);
  }

  updateNameListItemStyles(nameListItem, nameday.name);
  setSavedNames(namedays, country);
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

export const addNamesToDateCell = (dateCellElement, nameday, country) => {
  let nameList = dateCellElement.querySelector('.name-list');

  if (dateCellElement.contains(nameList)) {
    while (nameList.firstChild) {
      nameList.removeChild(nameList.firstChild);
    }
  } else {
    nameList = createNameList();
  }

  if (nameday.names[country]) {
    const nameArray = nameday.names[country].split(',');

    nameArray.forEach((name) => {
      const nameObject = {
        name: name.trim(),
        day: nameday.day,
        month: nameday.month,
      };
      const nameButton = createNameButton(nameObject.name);
      const nameListItem = createNameListItem(nameObject);

      nameButton.addEventListener('click', () => toggleNameSave(nameListItem, nameObject, country));

      if (getSavedNames()[country]) {
        getSavedNames()[country].forEach((savedNameday) => {
          if (nameObject.name === savedNameday.name) {
            nameListItem.classList.add('saved');
          }
        });
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
