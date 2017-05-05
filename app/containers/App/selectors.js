import { createSelector } from 'reselect';

// makeSelectLocationState expects a plain JS object for the routing state
export const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export const selectAppDomain = () => (state) => state.get('app');

export const selectRouteToLoad = () => createSelector(
  selectAppDomain(),
  (state) => state.getIn(['requestedRoute', 'route'])
);

export const selectRouteReady = () => createSelector(
  selectAppDomain(),
  (state) => state.getIn(['requestedRoute', 'isReady'])
);

export const selectPagePrimaryColor = () => createSelector(
  selectAppDomain(),
  (state) => state.getIn(['requestedRoute', 'primaryColor'])
);

export const selectPageStartAnimation = () => createSelector(
  selectAppDomain(),
  (state) => state.getIn(['requestedRoute', 'startAnimation'])
);

export default () => createSelector(
  selectRouteToLoad(),
  selectRouteReady(),
  selectPagePrimaryColor(),
  selectPageStartAnimation(),
  (routeToLoad, routeReady, pagePrimaryColor, startAnimation) => ({
    routeToLoad,
    routeReady,
    pagePrimaryColor,
    startAnimation,
  })
);
