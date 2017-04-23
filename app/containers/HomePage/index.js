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
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ScrollArea from 'react-scrollbar';
import { Element, animateScroll } from 'react-scroll';
import styled from 'styled-components';
import About from 'components/Home/About';
import StackGrid from 'components/Home/StackGrid';
import Timeline from 'components/Home/Timeline';
import SectionPagination from 'components/Main/SectionPagination';
import { getWindowHeight } from 'utils/screen';
import {
  blue600,
  black,
} from 'material-ui/styles/colors';
import selector from './selectors';
import messages from './messages';

const Wrapper = styled.div`
`;

const StyledScrollArea = styled(ScrollArea)`
  max-height: 100vh;
`;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static contextTypes = {
    scrollArea: React.PropTypes.object,
  };

  componentWillMount() {
    this.setState({
      scrollValue: 0,
      activeIndex: 0,
    });
  }

  onScroll = ({ topPosition }) => {
    this.setState({
      scrollValue: topPosition,
    });
  }

  getIndicators = (colors, activeIndex) => ([
      {
        onClick: () => console.log("Kareem Mohamed"),
        isActive: activeIndex === 0,
      },
      {
        onClick: () => this.scrollTo(1),
        isActive: activeIndex === 1,
      },
  ]);

  getActiveIndex = (scrollValue) => {
    return Math.ceil((scrollValue - getWindowHeight() / 2) / getWindowHeight()) || 0;
  }

  render() {
    const {
      scrollValue,
    } = this.state;

    const {
      jobs,
      stacks,
    } = this.props;

    const colors = [
      blue600,
      black,
    ];

    const activeIndex = this.getActiveIndex(scrollValue);

    return (
      <StyledScrollArea
        speed={0.4}
        horizontal={false}
        onScroll={this.onScroll}
        verticalScrollbarStyle={{ background: '#333' }}
        smoothScrolling
      >
        <StackGrid
          stacks={stacks}
          scrollValue={scrollValue}
        />
        <About
          primaryColor={colors[0]}
          scrollValue={scrollValue}
          scrollTo={getWindowHeight()}
        />
        <Timeline
          primaryColor={colors[1]}
          jobs={jobs}
          scrollValue={scrollValue}
        />
        <SectionPagination
          length={2}
          sectionHeight={getWindowHeight()}
          activeIndex={activeIndex}
        />
      </StyledScrollArea>
    );
  }
}

const mapStateToProps = selector();

export default connect(mapStateToProps, null)(HomePage);
