const API = 'https://api.abalin.net/get';

export const getNameDayByDate = async (day, month) => {
  const response = await fetch(`${API}/namedays?day=${day}&month=${month + 1}`);
  return response;
};
