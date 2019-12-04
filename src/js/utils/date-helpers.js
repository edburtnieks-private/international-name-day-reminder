const numberOfDaysInMonth = (month) => new Date(
  new Date().getFullYear(),
  month + 1,
  0,
).getDate();

export const currentDate = new Date();

export const previousMonthDate = new Date(
  new Date().setMonth(currentDate.getMonth() - 1),
);

export const nextMonthDate = new Date(
  new Date().setMonth(currentDate.getMonth() + 1),
);

export const monthDays = (month) => Array.from(
  Array(numberOfDaysInMonth(month)), (_, index) => index + 1,
);

export const formatDateYear = (date) => date.toLocaleDateString('en', {
  year: 'numeric',
});

export const formatDateMonth = (date) => date.toLocaleDateString('en', {
  month: 'long',
});
