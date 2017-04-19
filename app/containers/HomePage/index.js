/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import ScrollArea from 'react-scrollbar';
import { Element, animateScroll } from 'react-scroll';
import styled from 'styled-components';
import About from 'components/Home/About';
import Timeline from 'components/Home/Timeline';
import { getWindowHeight } from 'utils/screen';
import {
  blue400,
} from 'material-ui/styles/colors';
import messages from './messages';

const Wrapper = styled.div`
`;

const StyledScrollArea = styled(ScrollArea)`
  max-height: 100vh;
`;

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static contextTypes = {
    scrollArea: React.PropTypes.object,
  };

  componentWillMount() {
    this.setState({
      scrollValue: 0,
    });
  }

  onScroll = ({ topPosition }) => {
    this.setState({
      scrollValue: topPosition,
    });
  }

  render() {
    const {
      scrollValue,
    } = this.state;

    return (
      <StyledScrollArea
        speed={0.1}
        horizontal={false}
        onScroll={this.onScroll}
        verticalScrollbarStyle={{ background: '#333' }}
        smoothScrolling
      >
        <Element name="about">
          <About
            primaryColor={blue400}
            scrollValue={scrollValue}
            scrollTo={getWindowHeight()}
          />
        </Element>
        <Element name="timeline">
          <Timeline
            scrollValue={scrollValue}
          />
        </Element>
      </StyledScrollArea>
    );
  }
}
