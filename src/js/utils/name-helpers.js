import { getSavedNames } from '../api/name';

export const isSavedNames = () => getSavedNames().length;
