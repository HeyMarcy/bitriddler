import { injectGlobal } from 'utils/styled-components';
import theme from 'theme/default';
import colors from 'theme/colors';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    font-family: 'Open Sans', sans-serif;
  }

  /* https://material.io/guidelines/style/typography.html# */
  h1, h2, h3, h4, h5, h6, p, a, hr, ul, li, pre {
    padding: 0px;
    margin: 0px;
    font-weight: normal;
  }

  a {
    font-size: 0.9em;
    color: inherit;
    cursor: pointer;
  }

  h1 {
    font-size: 4em;
    line-height: 48px;
    margin: ${theme.h1.verticalMargin}px 0px;
  }

  h2 {
    font-size: 2em;
    line-height: 36px;
    margin: ${theme.h2.verticalMargin}px 0px;
  }

  h3 {
    font-size: 1.4em;
    line-height: 28px;
    margin: ${theme.h3.verticalMargin}px 0px;
  }

  h4 {
    font-size: 1.2em;
    line-height: 28px;
    margin: ${theme.h4.verticalMargin}px 0px;
  }

  h5 {
    font-size: 1em;
    line-height: 21px;
    margin: ${theme.h5.verticalMargin}px 0px;
  }

  h6 {
    font-size: 0.9em;
    line-height: 30px;
    margin: ${theme.h6.verticalMargin}px 0px;
  }

  p {
    font-size: 0.9em;
    line-height: 21px;
    margin: ${theme.p.verticalMargin}px 0px;
  }

  ul {
    margin: ${theme.ul.verticalMargin}px 0px;
  }

  li {
    font-size: 0.9em;
    line-height: 21px;
    list-style-position: inside;
    margin: ${theme.li.verticalMargin}px 0px;
  }

  button {
    height: 36px;
    padding: 8px;
  }
`;
