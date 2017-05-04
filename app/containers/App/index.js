import React from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ThemeProvider } from 'styled-components';
import materialUiTheme from 'theme/materialui';
import theme from 'theme/default';
import styled from 'styled-components';

import LoadingBar from 'components/LineAnimations/LoadingBar';
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
`;

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
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
      showLoader: false,
      isFirstTime: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    // Requesting to change route
    if(nextProps.routeToLoad
      && nextProps.routeToLoad !== this.props.routeToLoad) {
      this.setState({
        showLoader: true,
      });
      this.props.push(nextProps.routeToLoad);
    }

    if(nextProps.routeReady &&
      nextProps.routeReady !== this.props.routeReady &&
      this.state.showLoader) {
      console.log('was ready');
      setTimeout(() => {
        this.setState({
          restLoader: true,
        });
      }, 2000);
    }

    if(nextProps.pagePrimaryColor && this.props.pagePrimaryColor) {
      this.setState({
        isFirstTime: false,
      });
    }
  }

  renderLoader(lineConfig, restLoader, startPageAnimation) {
    return (
      <LoadingWrapper>
        <LoadingBar
          initialDistance={lineConfig.distance}
          rest={restLoader}
          onRest={(config) => {
            startPageAnimation(config);
            this.setState({
              showLoader: false,
            });
          }}
        />
      </LoadingWrapper>
    );
  }

  getColorDefaultStyle = (color) => hexToRgb(color);
  getColorStyle = (color) => mapValues(hexToRgb(color), spring);

  render() {
    const {
      loaderLineConfig,
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
            <Menu
              bgColor={pagePrimaryColor}
            />
            <div id="page-wrap">
              <Header />
              {showLoader && this.renderLoader(loaderLineConfig, restLoader, startPageAnimation)}
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
