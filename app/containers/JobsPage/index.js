import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Measure from 'react-measure';
import styled from 'utils/styled-components';
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

  componentDidMount() {
    this.props.setPagePrimaryColor(this.props.jobs[0].primaryColor);
  }

  render() {
    const {
      jobs,
      startAnimation,
      routeIsReady,
    } = this.props;

    return (
      <Wrapper>
        <Measure whitelist={[ 'height', 'width' ]}>
          {/* Need to re-render when width or height change */}
          {() => (
            <PageContent
              windowWidth={getWindowWidth()}
              windowHeight={getWindowHeight()}
              firstPrimaryColor={jobs[0].primaryColor}
              startEntranceAnimation={startAnimation}
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
