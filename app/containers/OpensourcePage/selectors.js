import { createSelector } from 'reselect';
import opensource from 'data/opensource';
import { selectPageStartAnimation } from 'containers/App/selectors';

export default () => createSelector(
  selectPageStartAnimation(),
  (startAnimation) => ({
    opensource,
    startAnimation,
  })
);
