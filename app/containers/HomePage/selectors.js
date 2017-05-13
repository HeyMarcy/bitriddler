import { createSelector } from 'reselect';
import { selectPageStartAnimation } from 'containers/App/selectors';
import about from 'data/about';

export default () => createSelector(
  selectPageStartAnimation(),
  (startAnimation) => ({
    startAnimation,
    about,
  })
);
