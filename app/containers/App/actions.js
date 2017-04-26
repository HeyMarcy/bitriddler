import { LEAVE_ROUTE, ROUTE_READY, START_PAGE_ANIMATION, SET_PAGE_PRIMARY_COLOR } from './constants';

export const requestToLeaveRoute = (route, loaderLineConfig) => ({
  type: LEAVE_ROUTE,
  route,
  loaderLineConfig,
});

export const routeIsReady = (primaryColor) => ({
  type: ROUTE_READY,
  primaryColor,
});

export const startPageAnimation = (loaderLineConfig) => ({
  type: START_PAGE_ANIMATION,
  loaderLineConfig,
});
