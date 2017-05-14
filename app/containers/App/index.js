import React from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ThemeProvider } from 'utils/styled-components';
import materialUiTheme from 'theme/materialui';
import theme from 'theme/default';
import styled from 'utils/styled-components';

import Loader from 'components/Utils/Loader';
import Header from 'components/Main/Header';
import Menu from 'components/Main/Menu';
import { hexToRgb } from 'utils/colors';
import { white } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import mapValues from 'lodash/mapValues';
import { startPageAnimation } from './actions';
import selectors from './selectors';

const Wrapper = styled.div`
  background-color: ${(props) => props.bgColor};
  ${(props) => !props.noBgTransition && `transition: background-color 1000ms linear;`}
  min-height: 100vh;
`;

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  ${(props) => props.showLoader && `display: none;`}
`;

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  componentWillMount() {
    this.setState({
      showLoader: true,
      isFirstTime: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    // Requesting to change route
    if(nextProps.routeToLoad
      && nextProps.routeToLoad !== nextProps.location.pathname) {
      this.setState({
        showLoader: true,
      });
      this.props.push(nextProps.routeToLoad);
    }

    // Route is ready then start loader leave animation
    if(nextProps.routeReady &&
      nextProps.routeReady !== this.props.routeReady &&
      this.state.showLoader &&
      !this.state.startLoaderLeaveAnimation) {
      this.setState({
        startLoaderLeaveAnimation: true,
      });
    }

    if(nextProps.pagePrimaryColor && this.props.pagePrimaryColor) {
      this.setState({
        isFirstTime: false,
      });
    }
  }

  renderLoader() {
    const {
      startPageAnimation,
    } = this.props;

    const {
      startLoaderLeaveAnimation,
    } = this.state;

    return (
      <LoadingWrapper>
        <Loader
          startLeaveAnimation={startLoaderLeaveAnimation}
          onLeave={() => {
            this.setState({ showLoader: false });
            startPageAnimation();
          }}
        />
      </LoadingWrapper>
    );
  }

  getColorDefaultStyle = (color) => hexToRgb(color);
  getColorStyle = (color) => mapValues(hexToRgb(color), spring);

  render() {
    const {
      startPageAnimation,
      pagePrimaryColor,
      children,
    } = this.props;

    const {
      restLoader,
      showLoader,
      isFirstTime,
    } = this.state;

    const contentColor = pagePrimaryColor || white;

    return (
      <MuiThemeProvider theme={materialUiTheme}>
        <ThemeProvider theme={theme}>
          <Wrapper
            noBgTransition={isFirstTime}
            bgColor={contentColor}
            id="outer-container"
          >
            {/*<Menu
              bgColor={pagePrimaryColor}
            />*/}
            <div id="page-wrap">
              <Header />
              {showLoader && this.renderLoader()}
              <ContentWrapper
                showLoader={showLoader}
              >
                {React.Children.toArray(children)}
              </ContentWrapper>
            </div>
          </Wrapper>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = selectors();

const mapDispatchToProps = {
  startPageAnimation,
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
