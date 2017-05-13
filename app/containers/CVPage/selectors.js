import { createSelector } from 'reselect';
import jobs from 'data/jobs';
import educations from 'data/educations';
import otherSkills from 'data/otherSkills';
import skills from 'data/skills';
import about from 'data/about';
import contact from 'data/contact';
import hobbies from 'data/hobbies';
import { selectPageStartAnimation } from 'containers/App/selectors';

export default () => createSelector(
  selectPageStartAnimation(),
  (startAnimation) => ({
    about,
    contact,
    hobbies,
    jobs,
    educations,
    skills,
    otherSkills,
    startAnimation,
  })
);
