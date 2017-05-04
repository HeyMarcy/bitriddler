import breakpoints from './breakpoints';

export const getWindowDimensions = () => {
  let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      scrollLeft = (w.pageXOffset || d.scrollLeft) - (d.clientLeft || 0),
      scrollTop = (w.pageYOffset || d.scrollTop)  - (d.clientTop || 0),
      width = w.innerWidth || e.clientWidth || g.clientWidth,
      height = w.innerHeight|| e.clientHeight|| g.clientHeight;

  return {
    scrollLeft,
    scrollTop,
    width,
    height,
  };
}

export const getWindowScrollLeft = () => {
  return getWindowDimensions().scrollLeft || 0;
}

export const getWindowScrollTop = () => {
  return getWindowDimensions().scrollTop || 0;
}

export const getWindowHeight = () => {
  return getWindowDimensions().height;
}

export const getWindowWidth = () => {
  return getWindowDimensions().width;
}

export const isXSScreen = () => {
  return getWindowWidth() < breakpoints.sm;
}

export const isSMScreen = () => {
  return getWindowWidth() >= breakpoints.sm && getWindowWidth() < breakpoints.md;
}

export const isMDScreen = () => {
  return getWindowWidth() >= breakpoints.md && getWindowWidth() < breakpoints.lg;
}

export const isLGScreen = () => {
  return getWindowWidth() >= breakpoints.lg && getWindowWidth() < breakpoints.xl;
}

export const isXLScreen = () => {
  return getWindowWidth() >= breakpoints.xl;
}

export const getGridLimit = ({ rows, ...media }) => {
  return getByMedia(media) * rows;
}

export const getByMedia = (opts = {}, defaultValue = 0) => {
  if (isXSScreen()) {
    return opts.xs || defaultValue;
  }
  else if (isSMScreen()) {
    return opts.sm || opts.xs || defaultValue;
  }
  else if (isMDScreen()) {
    return opts.md || opts.sm || opts.xs || defaultValue;
  }
  else if (isLGScreen()) {
    return opts.lg || opts.md || opts.sm || opts.xs || defaultValue;
  }
  else if (isXLScreen()) {
    return opts.xl || opts.lg || opts.md || opts.sm || opts.xs || defaultValue;
  }
}


export const getScreenName = () => {
  return getByMedia({
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  })
}
