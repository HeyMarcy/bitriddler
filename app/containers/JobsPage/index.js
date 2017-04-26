import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ScrollArea from 'react-scrollbar';
import { Element, animateScroll } from 'react-scroll';
import styled from 'styled-components';
import { getWindowHeight, getWindowWidth } from 'utils/screen';
import {
  routeIsReady,
  requestToLeaveRoute,
} from 'containers/App/actions';
import {
  grey900,
  black,
} from 'material-ui/styles/colors';
import Blackcrows from 'components/Jobs/Blackcrows';
import selector from './selectors';

const Wrapper = styled.div`
`;

const PAGE_PRIMARY_COLOR = grey900;

export class JobsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      loaderLineConfig,
      setPagePrimaryColor,
      blackcrowsJob,
      startAnimation,
    } = this.props;

    return (
      <Wrapper>
        <Blackcrows
          startAnimation={startAnimation}
          blackcrowsJob={blackcrowsJob}
          primaryColor={PAGE_PRIMARY_COLOR}
          loaderLineConfig={loaderLineConfig || {
            distance: getWindowWidth(),
            y: getWindowHeight() / 2,
          }}
          onReady={() => {
            console.log("image loaded");
            this.props.routeIsReady(PAGE_PRIMARY_COLOR);
          }}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = selector();

const mapDispatchToProps = {
  routeIsReady,
  onAnimationFinish: requestToLeaveRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsPage);
