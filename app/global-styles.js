import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  /* https://material.io/guidelines/style/typography.html# */
  h1, h2, h3, h4, h5, h6, p, a, hr, ul, li, pre {
    padding: 0px;
    margin: 0px;
    font-weight: normal;
  }

  li {
    list-style-position: inside;
  }

  h1 {
    /* 112sp */
    font-size: 6.98em;
    line-height: 48px;
  }

  h2 {
    /* 56sp */
    font-size: 3.49em;
    line-height: 48px;
  }

  h3 {
    /* 45sp */
    font-size: 2.8em;
    line-height: 48px;
  }

  h4 {
    /* 24sp */
    font-size: 1.49em;
    line-height: 32px;
  }

  h5 {
    /* 20sp */
    font-size: 1.24em;
    line-height: 30px;
  }

  h6 {
    /* 16sp */
    font-size: 0.99em;
    line-height: 30px;
  }

  p {
    /* 24sp */
    font-size: 1.49em;
    line-height: 30px;
  }

  button {
    height: 36px;
    padding: 8px;
  }
`;
