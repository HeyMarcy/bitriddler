import { createSelector } from 'reselect';
import { selectPageStartAnimation } from 'containers/App/selectors';
import contact from 'data/contact';

export default () => createSelector(
  selectPageStartAnimation(),
  (startAnimation) => ({
    startAnimation,
    contact,
  })
);
