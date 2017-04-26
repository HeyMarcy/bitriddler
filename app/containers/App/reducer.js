import { LEAVE_ROUTE, ROUTE_READY, START_PAGE_ANIMATION, SET_PAGE_PRIMARY_COLOR } from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  requestedRoute: {
    route: null,
    loaderLineConfig: null,
    isReady: false,
    startAnimation: true,
    primaryColor: null,
  },
});

export default (state = initialState, action) => {
  switch(action.type) {

    case LEAVE_ROUTE:
      return state.mergeIn(['requestedRoute'], {
        route: action.route,
        loaderLineConfig: action.loaderLineConfig,
        isReady: false,
        startAnimation: false,
      });

    case ROUTE_READY:
      return state.mergeIn(['requestedRoute'], {
        isReady: true,
        primaryColor: action.primaryColor,
      });

    case START_PAGE_ANIMATION:
      return state.mergeIn(['requestedRoute'], {
        loaderLineConfig: action.loaderLineConfig,
        startAnimation: true,
      });
  }
  return state;
}
