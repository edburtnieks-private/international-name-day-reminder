const API = 'https://api.abalin.net/';

export const getNameDayByDate = async (country, month, day) => {
  const response = await fetch(`${API}/namedays?country=${country}&month=${month + 1}&day=${day}`);
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
