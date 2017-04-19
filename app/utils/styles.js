import { css } from 'styled-components';
import breakpoints from './breakpoints';
import gradients from 'styles/gradients.json';

export function getGradientStyleByName(name) {
  const gradient = gradients.find(gradient => gradient.name === name);

  if(! gradient) {
    throw new Error("Gradient is not found!");
  }

  return getGradientStyle(...gradient.colors);
}

export function getGradientStyle(color1, color2) {
  return {
    background: color1, /* fallback for old browsers */
    background: `-webkit-linear-gradient(to left, ${color1} , ${color2})`, /* Chrome 10-25, Safari 5.1-6 */
    background: `linear-gradient(to left, ${color1} , ${color2})`, /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  };
}

// use ${unit} in breakpoints to work properly cross-browser and support users
// changing their browsers font-size: https://zellwk.com/blog/media-query-units/
const pxToEm = (px) => `${(px - 1) / 16}em`;

export const addSpacings = ({ verticalPadding, horizontalPadding }, type) => {
  const get = (paddings, screen) => typeof paddings === 'object' ? paddings[screen] : (paddings || 0);

  return `
    @media(min-width: ${pxToEm(breakpoints.xl)}) {
      ${type}: ${get(verticalPadding, 'xl')}px ${get(horizontalPadding, 'xl')}px;
    }
    @media(max-width: ${pxToEm(breakpoints.xl)}) {
      ${type}: ${get(verticalPadding, 'lg')}px ${get(horizontalPadding, 'lg')}px;
    }
    @media(max-width: ${pxToEm(breakpoints.lg)}) {
      ${type}: ${get(verticalPadding, 'md')}px ${get(horizontalPadding, 'md')}px;
    }
    @media(max-width: ${pxToEm(breakpoints.md)}) {
      ${type}: ${get(verticalPadding, 'sm')}px ${get(horizontalPadding, 'sm')}px;
    }
    @media(max-width: ${pxToEm(breakpoints.sm)}) {
      ${type}: ${get(verticalPadding, 'xs')}px ${get(horizontalPadding, 'xs')}px;
    }
  `;
};

export const addMediaProperty = (type, value, append = '') => {
  const get = (screen) => typeof value === 'object' ? value[screen] : value;

  return `
    @media(min-width: ${pxToEm(breakpoints.xl)}) {
      ${type}: ${get('xl')}${append};
    }
    @media(max-width: ${pxToEm(breakpoints.xl)}) {
      ${type}: ${get('lg')}${append};
    }
    @media(max-width: ${pxToEm(breakpoints.lg)}) {
      ${type}: ${get('md')}${append};
    }
    @media(max-width: ${pxToEm(breakpoints.md)}) {
      ${type}: ${get('sm')}${append};
    }
    @media(max-width: ${pxToEm(breakpoints.sm)}) {
      ${type}: ${get('xs')}${append};
    }
  `;
};

export const addFontSizes = ({ fontSize }) => {
  const get = (option, screen) => typeof option === 'object' ? option[screen] : (option || 0);

  return `
    @media(min-width: ${pxToEm(breakpoints.xl)}) {
      font-size: ${get(fontSize, 'xl')}px;
    }
    @media(max-width: ${pxToEm(breakpoints.xl)}) {
      font-size: ${get(fontSize, 'lg')}px;
    }
    @media(max-width: ${pxToEm(breakpoints.lg)}) {
      font-size: ${get(fontSize, 'md')}px;
    }
    @media(max-width: ${pxToEm(breakpoints.md)}) {
      font-size: ${get(fontSize, 'sm')}px;
    }
    @media(max-width: ${pxToEm(breakpoints.sm)}) {
      font-size: ${get(fontSize, 'xs')}px;
    }
  `;
};

export const addPaddings = ({ verticalPadding, horizontalPadding }) =>
  addSpacings({ verticalPadding, horizontalPadding }, 'padding');

export const addMargins = ({ verticalPadding, horizontalPadding }) =>
  addSpacings({ verticalPadding, horizontalPadding }, 'margin');

export const media = {
  // If sm =768 then all screens NOT including 768 will be applied
  xs: (...args) => css`
    @media(max-width: ${pxToEm(breakpoints.sm)}) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media(max-width: ${pxToEm(breakpoints.md)}) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media(max-width: ${pxToEm(breakpoints.lg)}) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media(max-width: ${pxToEm(breakpoints.xl)}) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media(min-width: ${pxToEm(breakpoints.xl)}) {
      ${css(...args)}
    }
  `,
};
