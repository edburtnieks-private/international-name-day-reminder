const numberOfDatesInMonth = (date) => new Date(
  date.getUTCFullYear(),
  date.getUTCMonth() + 1,
  0,
).getUTCDate();

export const currentDate = new Date();

export const previousMonthDate = new Date(
  new Date().setUTCMonth(currentDate.getUTCMonth() - 1),
);

export const nextMonthDate = new Date(
  new Date().setUTCMonth(currentDate.getUTCMonth() + 1),
);

export const monthDates = (date) => Array.from(
  Array(numberOfDatesInMonth(date)), (_, index) => index + 1,
);

export const formatDateYear = (date) => date.toLocaleDateString('en', {
  year: 'numeric',
});

export const formatDateMonth = (date) => date.toLocaleDateString('en', {
  month: 'long',
});
