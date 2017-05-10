import { createSelector } from 'reselect';
import opensource from 'data/opensource';

export default () => createSelector(
  () => ({
    opensource,
  })
);
