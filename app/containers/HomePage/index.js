import React from 'react';
import Measure from 'react-measure';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'utils/styled-components';
import About from 'components/Home/About';
import StackGrid from 'components/Home/StackGrid';
import Timeline from 'components/Home/Timeline';
import SectionPagination from 'components/Main/SectionPagination';
import coverImage2560 from 'assets/home/cover2560x1709.jpg';
import coverImage1920 from 'assets/home/cover1920x1282.jpg';
import coverImage768 from 'assets/home/cover768x513.jpg';
import { getWindowHeight, getWindowWidth } from 'utils/screen';
import { homePageFeatures } from 'utils/features';
import {
  requestToLeaveRoute,
  routeIsReady,
  setPagePrimaryColor,
} from 'containers/App/actions';
import colors from 'theme/colors';
import SkillChart from 'components/Home/SkillChart';
import preloadImage from 'components/Utils/Image/preloadImage';
import selector from './selectors';
import messages from './messages';

const Wrapper = styled.div`
  overflow: hidden;
  max-width: 100vw;
  max-height: 100vh;
`;

const Hero = styled.div`
  background: url('${(props) => props.image}');
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
`;

const PAGE_PRIMARY_COLOR = colors.black;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({
      runLeaveAnimation: false,
    });
  }

  componentDidMount() {
    this.props.setPagePrimaryColor(PAGE_PRIMARY_COLOR);
    this.loadImage();
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.imageLoaded && !this.state.imageLoaded) {
      this.props.routeIsReady();
    }
  }

  loadImage() {
    if(!this.state.imageLoaded && !this.state.imageLoading) {
      const src = this.getCoverImage();
      this.setState({ imageLoading: src });
      preloadImage(src, () => {
        this.setState({ imageLoaded: src });
      });
    }
  }

  leavePage = (route) => {
    if(homePageFeatures.showEntranceAnimation()) {
      this.setState({
        runLeaveAnimation: true,
        leaveRoute: route,
      });
    } else {
      this.props.requestToLeaveRoute(route);
    }
  }

  gotoWorkExperience = () => this.leavePage('/work');
  gotoContact = () => this.leavePage('/contact');
  gotoOpensource = () => this.leavePage(`/opensource`);

  getCoverImage = () => {
    const screenWidth = getWindowWidth();
    const screenHeight = getWindowHeight();
    const hThreshold = 40;
    const vThreshold = 40;

    if(screenWidth > (1920 + hThreshold) || screenHeight > (1282 + vThreshold)) {
      return coverImage2560;
    }

    if(screenWidth > (768 + hThreshold) || screenHeight > (513 + vThreshold)) {
      return coverImage1920;
    }

    return coverImage768;
  }

  render() {
    const {
      runLeaveAnimation,
      leaveRoute,
      imageLoaded,
    } = this.state;

    const {
      requestToLeaveRoute,
      routeIsReady,
      startAnimation,
      about,
    } = this.props;

    return (
      <Measure whitelist={['width']}>
        {() => (
          <Wrapper>
            <Hero
              image={this.getCoverImage()}
            />
            <About
              about={about}
              startAnimation={startAnimation}

              showEntranceAnimation={homePageFeatures.showEntranceAnimation()}
              primaryColor={PAGE_PRIMARY_COLOR}

              onLeaveAnimationFinish={() => requestToLeaveRoute(leaveRoute)}
              runLeaveAnimation={runLeaveAnimation}

              onWorkExperienceClick={this.gotoWorkExperience}
              onContactClick={this.gotoContact}
              onOpensourceClick={this.gotoOpensource}
            />
          </Wrapper>
        )}
      </Measure>
    );
  }
}

const mapStateToProps = selector();

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
  requestToLeaveRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
