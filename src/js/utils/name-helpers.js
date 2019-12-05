import { getSavedNames } from '../api/name';

export const encodedName = (name) => encodeURIComponent(name.replace('\'', ' '));

export const savedNamesTitle = () => {
  const title = Object.keys(getSavedNames()).length ? 'Upcoming name days' : 'No upcoming name days';
  return title;
};
