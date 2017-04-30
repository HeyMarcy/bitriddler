import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import { Scrollbars } from 'react-custom-scrollbars';
import ScrollArea from 'react-scrollbar';
import styled from 'styled-components';
import { getWindowHeight, getWindowWidth } from 'utils/screen';
import {
  setPagePrimaryColor,
  routeIsReady,
  requestToLeaveRoute,
} from 'containers/App/actions';
import {
  grey900,
  black,
} from 'material-ui/styles/colors';
import PageContent from './Content';
import selector from './selectors';

export class JobsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.setState({
      startFirstAnimation: false,
      activeJobIndex: 0,
      activeButtonIndex: 0,
    });

    this.props.setPagePrimaryColor(this.props.jobs[0].primaryColor);
  }

  handleScroll = ({ topPosition }) => {
    const sectionThreshold = 0.75;

    const topPositionRatio = ((topPosition - getWindowHeight() / 2) / getWindowHeight()) + 0.5;
    const delta = topPositionRatio - Math.floor(topPositionRatio);

    const activeIndex = Math.ceil(topPositionRatio);

    if(delta > sectionThreshold && this.state.activeJobIndex !== activeIndex) {
      this.setState({
        activeJobIndex: activeIndex,
      });
    }

    if(this.state.stoppedScrolling) {
      this.setState({
        stoppedScrolling: false,
      });
    }

    if(this.scrollingTimeout) {
      clearTimeout(this.scrollingTimeout);
    }

    this.scrollingTimeout = setTimeout(() => {
      console.log("stopped scrolling");
      this.setState({
        stoppedScrolling: true,
      });
    }, 100);
  }

  shouldStartJobAnimation = (index) => {
    if(index === 0) {
      return this.state.startFirstAnimation;
    }

    return index <= this.state.activeJobIndex;
  }

  onEntranceAnimationFinish = () => this.setState({ startFirstAnimation: true });

  render() {
    const {
      loaderLineConfig,
      jobs,
      startAnimation,
      routeIsReady,
    } = this.props;

    const {
      activeJobIndex,
      startFirstAnimation,
      stoppedScrolling,
    } = this.state;

    return (
      <ScrollArea
        style={{ maxHeight: '100vh' }}
        speed={0.2}
        smoothScrolling
        onScroll={this.handleScroll}
        horizontal={false}
      >
        <PageContent
          activeJobIndex={activeJobIndex}
          updateActiveJobIndex={(index) => this.setState({ activeJobIndex: index })}
          stoppedScrolling={stoppedScrolling}
          loaderLineConfig={loaderLineConfig}
          firstPrimaryColor={jobs[0].primaryColor}
          startEntranceAnimation={startAnimation}
          onEntranceAnimationFinish={this.onEntranceAnimationFinish}
          shouldStartJobAnimation={this.shouldStartJobAnimation}
          jobs={jobs}
          routeIsReady={routeIsReady}
        />
      </ScrollArea>
    );
  }
}

const mapStateToProps = selector();

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
  onAnimationFinish: requestToLeaveRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsPage);
