import { LEAVE_ROUTE, ROUTE_READY, START_PAGE_ANIMATION, SET_PAGE_PRIMARY_COLOR } from './constants';

export const requestToLeaveRoute = (route) => ({
  type: LEAVE_ROUTE,
  route,
});

export const routeIsReady = () => ({
  type: ROUTE_READY,
});

export const setPagePrimaryColor = (primaryColor) => ({
  type: SET_PAGE_PRIMARY_COLOR,
  primaryColor,
});

export const startPageAnimation = () => ({
  type: START_PAGE_ANIMATION,
});
