/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'theme/default';
import styled from 'styled-components';

import Header from 'components/Main/Header';
import Menu from 'components/Main/Menu';

const Wrapper = styled.div`
`;

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper id="outer-container">
          <Menu />
          <div id="page-wrap">
            <Header />
            {React.Children.toArray(this.props.children)}
          </div>
        </Wrapper>
      </ThemeProvider>
    );
  }
}
