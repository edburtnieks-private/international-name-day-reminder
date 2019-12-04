export const setCountries = (countries) => {
  localStorage.setItem('countries', JSON.stringify(countries));
};

export const getCountries = () => {
  if (localStorage.getItem('countries') === null) {
    return [];
  }

  return JSON.parse(localStorage.getItem('countries'));
};
