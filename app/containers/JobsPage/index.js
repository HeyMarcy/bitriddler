import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Measure from 'react-measure';
import ScrollArea from 'react-scrollbar';
import styled from 'styled-components';
import { getWindowHeight, getWindowWidth, getWindowScrollTop } from 'utils/screen';
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

const Wrapper = styled.div`
  max-width: 100vw;
  overflow: hidden;
`;

export class JobsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.setState({
      startFirstAnimation: false,
      activeJobIndex: 0,
      activeButtonIndex: 0,
    });

    this.props.setPagePrimaryColor(this.props.jobs[0].primaryColor);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(() => {
      this.handleScroll();
    }, 200);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const topPosition = getWindowScrollTop();
    const sectionThreshold = 0.5;
    const windowHeight = getWindowHeight();

    const topPositionRatio = ((topPosition - windowHeight / 2) / windowHeight) + 0.5;
    const delta = topPositionRatio - Math.floor(topPositionRatio);

    const activeIndex = Math.ceil(topPositionRatio);

    if(delta > sectionThreshold && this.state.activeJobIndex !== activeIndex) {
      this.setState({
        activeJobIndex: activeIndex,
      });
    }
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
    } = this.state;

    return (
      <Wrapper>
        <Measure whitelist={[ 'height', 'width' ]}>
          {/* Need to re-render when width or height change */}
          {() => (
            <PageContent
              windowWidth={getWindowWidth()}
              windowHeight={getWindowHeight()}
              activeJobIndex={activeJobIndex}
              updateActiveJobIndex={(index) => this.setState({ activeJobIndex: index })}
              loaderLineConfig={loaderLineConfig}
              firstPrimaryColor={jobs[0].primaryColor}
              startEntranceAnimation={startAnimation}
              onEntranceAnimationFinish={this.onEntranceAnimationFinish}
              shouldStartJobAnimation={this.shouldStartJobAnimation}
              jobs={jobs}
              routeIsReady={routeIsReady}
            />
          )}
        </Measure>
      </Wrapper>
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
