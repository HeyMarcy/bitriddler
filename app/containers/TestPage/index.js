import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { getWindowHeight, getWindowWidth } from 'utils/screen';
import {
  requestToLeaveRoute,
  routeIsReady,
  setPagePrimaryColor,
} from 'containers/App/actions';
import colors from 'theme/colors';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
`;

const PAGE_PRIMARY_COLOR = '#900';

export class TestPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.setPagePrimaryColor(PAGE_PRIMARY_COLOR);
    this.props.routeIsReady();
  }

  render() {
    return (
      <Wrapper>
        <h1>TEST</h1>
        <Loader />
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
};

export default connect(null, mapDispatchToProps)(TestPage);
