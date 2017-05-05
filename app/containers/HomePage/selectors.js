import { createSelector } from 'reselect';
import { selectPageStartAnimation } from 'containers/App/selectors';

export default () => createSelector(
  selectPageStartAnimation(),
  (startAnimation) => ({
    startAnimation,
  })
);
