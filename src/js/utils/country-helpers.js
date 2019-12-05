export const countryFullName = (countries) => {
  switch(countries) {
    case 'at':
      return 'Austria';
    case 'dk':
        return 'Denmark';
    case 'fr':
        return 'France';
    case 'it':
        return 'Italy';
    case 'sk':
        return 'Slovakia';
    case 'cz':
        return 'Czechia';
    case 'es':
        return 'Spain';
    case 'hr':
        return 'Croatia';
    case 'pl':
        return 'Poland';
    case 'us':
        return 'United States of America';
    case 'de':
        return 'Germany';
    case 'fi':
        return 'Finland';
    case 'hu':
        return 'Hungary';
    case 'se':
        return 'Sweden';
    default:
      return 'Unknown country name'
  }
};
