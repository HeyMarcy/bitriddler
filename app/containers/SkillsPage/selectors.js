import { createSelector } from 'reselect';
import skills from 'data/skills';

export default () => createSelector(
  () => ({
    skills,
  })
);
