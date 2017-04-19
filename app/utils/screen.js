import breakpoints from './breakpoints';

export const getWindowDimensions = () => {
  let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      width = w.innerWidth || e.clientWidth || g.clientWidth,
      height = w.innerHeight|| e.clientHeight|| g.clientHeight;

  return {
    width,
    height,
  };
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

export const getGridLimit = (opts = {}) => {
  const rows = opts.rows || 3;
  let cols;

  if (isXSScreen()) cols = opts.xs || 2;
  if (isSMScreen()) cols = opts.sm || 3;
  if (isMDScreen()) cols = opts.md || 4;
  if (isLGScreen()) cols = opts.lg || 4;
  if (isXLScreen()) cols = opts.xl || 4;

  return cols * rows;
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
