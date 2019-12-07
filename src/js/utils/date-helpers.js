const numberOfDaysInMonth = (date) => new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0,
).getDate();

export const currentDate = new Date();

export const previousMonthDate = new Date(
  new Date().setMonth(currentDate.getMonth() - 1),
);

export const nextMonthDate = new Date(
  new Date().setMonth(currentDate.getMonth() + 1),
);

export const monthDays = (date) => Array.from(
  Array(numberOfDaysInMonth(date)), (_, index) => index + 1,
);

export const formatDateYear = (date) => date.toLocaleDateString('en', {
  year: 'numeric',
});

export const formatDateMonth = (date) => date.toLocaleDateString('en', {
  month: 'long',
});

export const formatMonthDay = (date) => date.toLocaleDateString('en', {
  month: 'long',
  day: 'numeric',
});
