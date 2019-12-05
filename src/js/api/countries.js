export const setCountries = (countries) => {
  localStorage.setItem('countries', JSON.stringify(countries));
};

export const getCountries = () => {
  if (localStorage.getItem('countries') === null) {
    return null;
  }

  return JSON.parse(localStorage.getItem('countries'));
};

export const setSelectedCountry = (country) => {
  localStorage.setItem('selected-country', country);
};

export const getSelectedCountry = () => {
  if (localStorage.getItem('selected-country') === null) {
    return null;
  }
  
  return localStorage.getItem('selected-country');
};
