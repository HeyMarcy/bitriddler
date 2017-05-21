import { createSelector } from 'reselect';
import jobs from 'data/jobs';
import educations from 'data/educations';
import otherSkills from 'data/otherSkills';
import skills from 'data/skills';
import about from 'data/about';
import contact from 'data/contact';
import hobbies from 'data/hobbies';
import workenvironment from 'data/workenvironment';
import awards from 'data/awards';
import references from 'data/references';
import { selectPageStartAnimation } from 'containers/App/selectors';

export default () => createSelector(
  selectPageStartAnimation(),
  (startAnimation) => ({
    about,
    contact,
    hobbies,
    jobs: jobs.filter(job => !job.hideInResume),
    educations,
    skills,
    awards: awards.filter(job => !job.hideInResume),
    references: references.filter(reference => !reference.hideInResume),
    otherSkills,
    workenvironment,
    startAnimation,
  })
);
