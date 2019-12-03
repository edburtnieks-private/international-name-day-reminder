const API = 'https://api.abalin.net/get';

export const getNameDayByDate = async (day, month) => {
  const response = await fetch(`${API}/namedays?day=${day}&month=${month + 1}`);
  return response;
};

export const setSavedNames = (names) => {
  localStorage.setItem('saved-names', JSON.stringify(names));
};

export const getSavedNames = () => {
  if (localStorage.getItem('saved-names') === null) {
    return [];
  }

  return JSON.parse(localStorage.getItem('saved-names'));
};

export const setNamesInMonth = (names, month) => {
  localStorage.setItem(`names-${month}`, JSON.stringify(names));
};

export const getNamesInMonth = (month) => {
  if (localStorage.getItem(`names-${month}`) === null) {
    return null;
  }

  return JSON.parse(localStorage.getItem(`names-${month}`));
};
