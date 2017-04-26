import jobs from 'data/jobs';
import { createSelector } from 'reselect';
import { selectLoaderLineConfig, selectPageStartAnimation } from 'containers/App/selectors';

export default () => createSelector(
  selectLoaderLineConfig(),
  selectPageStartAnimation(),
  (loadLineConfig, startAnimation) => ({
    loadLineConfig: loadLineConfig && loadLineConfig.toJS(),
    blackcrowsJob: jobs.find(job => job.title === 'Blackcrows'),
    startAnimation,
  })
);
