import { LEAVE_ROUTE, ROUTE_READY, START_PAGE_ANIMATION, SET_PAGE_PRIMARY_COLOR } from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  requestedRoute: {
    route: null,
    isReady: false,
    startAnimation: false,
    primaryColor: null,
  },
});

export default (state = initialState, action) => {
  switch(action.type) {

    case LEAVE_ROUTE:
      return state.mergeIn(['requestedRoute'], {
        route: action.route,
        isReady: false,
        startAnimation: false,
      });

    case ROUTE_READY:
      return state.mergeIn(['requestedRoute'], {
        route: '',
        isReady: true,
      });

    case SET_PAGE_PRIMARY_COLOR:
      return state.mergeIn(['requestedRoute'], {
        primaryColor: action.primaryColor,
      });

    case START_PAGE_ANIMATION:
      return state.mergeIn(['requestedRoute'], {
        startAnimation: true,
      });
  }
  return state;
}
